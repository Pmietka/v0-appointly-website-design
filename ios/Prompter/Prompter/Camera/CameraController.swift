import AVFoundation
import UIKit

enum VideoQuality: String, CaseIterable, Identifiable {
    case hd = "1080"
    case uhd = "4k"

    var id: String { rawValue }
    var label: String { self == .hd ? "1080p HD" : "4K" }
    var preset: AVCaptureSession.Preset { self == .hd ? .hd1920x1080 : .hd4K3840x2160 }
}

/// Owns the capture session. All session work happens on one serial queue,
/// published state is only ever changed on the main thread.
final class CameraController: NSObject, ObservableObject {
    enum Status: Equatable {
        case starting
        case running
        case denied
        case unavailable(String)
    }

    @Published private(set) var status: Status = .starting
    @Published private(set) var micDenied = false
    @Published private(set) var isRecording = false

    let session = AVCaptureSession()
    private let queue = DispatchQueue(label: "prompter.camera.session")
    private let movieOutput = AVCaptureMovieFileOutput()

    // Session queue only.
    private var videoInput: AVCaptureDeviceInput?
    private var audioInput: AVCaptureDeviceInput?

    // Main thread only.
    private weak var previewLayer: AVCaptureVideoPreviewLayer?
    private var currentDevice: AVCaptureDevice?
    private var rotationCoordinator: AVCaptureDevice.RotationCoordinator?
    private var rotationObservation: NSKeyValueObservation?
    private var completion: ((Result<URL, Error>) -> Void)?
    private var observers: [NSObjectProtocol] = []

    override init() {
        super.init()
        let center = NotificationCenter.default
        observers.append(center.addObserver(forName: AVCaptureSession.runtimeErrorNotification, object: session, queue: nil) { [weak self] _ in
            // Media services can reset (for example after a call). Start again.
            self?.queue.async {
                guard let self, !self.session.isRunning else { return }
                self.session.startRunning()
            }
        })
    }

    deinit {
        for observer in observers {
            NotificationCenter.default.removeObserver(observer)
        }
    }

    // MARK: Preview

    func attach(previewLayer: AVCaptureVideoPreviewLayer) {
        self.previewLayer = previewLayer
        previewLayer.session = session
        if let device = currentDevice { makeRotationCoordinator(for: device) }
    }

    private func makeRotationCoordinator(for device: AVCaptureDevice) {
        rotationObservation = nil
        let coordinator = AVCaptureDevice.RotationCoordinator(device: device, previewLayer: previewLayer)
        rotationCoordinator = coordinator
        applyPreviewRotation()
        rotationObservation = coordinator.observe(\.videoRotationAngleForHorizonLevelPreview, options: [.new]) { [weak self] _, _ in
            DispatchQueue.main.async { self?.applyPreviewRotation() }
        }
    }

    private func applyPreviewRotation() {
        guard let angle = rotationCoordinator?.videoRotationAngleForHorizonLevelPreview,
              let connection = previewLayer?.connection,
              connection.isVideoRotationAngleSupported(angle) else { return }
        connection.videoRotationAngle = angle
    }

    // MARK: Session

    /// Asks for access if needed, then opens (or switches to) the given camera.
    func start(position: AVCaptureDevice.Position, quality: VideoQuality) {
        Task {
            let videoAllowed = await Self.requestAccess(for: .video)
            let audioAllowed = await Self.requestAccess(for: .audio)
            await MainActor.run {
                self.micDenied = !audioAllowed
                if !videoAllowed { self.status = .denied }
            }
            guard videoAllowed else { return }
            self.queue.async {
                let error = self.configure(position: position, quality: quality, withAudio: audioAllowed)
                if error == nil, !self.session.isRunning {
                    self.session.startRunning()
                }
                let device = self.videoInput?.device
                DispatchQueue.main.async {
                    if let error {
                        self.status = .unavailable(error)
                        return
                    }
                    if let device, device !== self.currentDevice {
                        self.currentDevice = device
                        self.makeRotationCoordinator(for: device)
                    } else {
                        self.applyPreviewRotation()
                    }
                    self.status = .running
                }
            }
        }
    }

    func stop() {
        queue.async {
            if self.session.isRunning { self.session.stopRunning() }
        }
    }

    /// Returns an error message, or nil when the session is ready. Session queue only.
    private func configure(position: AVCaptureDevice.Position, quality: VideoQuality, withAudio: Bool) -> String? {
        session.beginConfiguration()
        defer { session.commitConfiguration() }

        if videoInput?.device.position != position {
            guard let device = AVCaptureDevice.default(.builtInWideAngleCamera, for: .video, position: position) else {
                return "This device doesn't have a \(position == .front ? "front" : "back") camera."
            }
            // A preset the new camera can't do would block adding it, so go neutral first.
            if session.canSetSessionPreset(.high) { session.sessionPreset = .high }
            if let old = videoInput {
                session.removeInput(old)
                videoInput = nil
            }
            do {
                let input = try AVCaptureDeviceInput(device: device)
                guard session.canAddInput(input) else { return "The camera couldn't be opened." }
                session.addInput(input)
                videoInput = input
            } catch {
                return "The camera couldn't be opened. \(error.localizedDescription)"
            }
        }

        // 4K when asked for and the camera can do it, otherwise 1080p.
        for preset in [quality.preset, .hd1920x1080, .high] where session.canSetSessionPreset(preset) {
            session.sessionPreset = preset
            break
        }

        if withAudio, audioInput == nil,
           let mic = AVCaptureDevice.default(for: .audio),
           let input = try? AVCaptureDeviceInput(device: mic),
           session.canAddInput(input) {
            session.addInput(input)
            audioInput = input
        }

        if !session.outputs.contains(movieOutput) {
            guard session.canAddOutput(movieOutput) else { return "Recording isn't available right now." }
            session.addOutput(movieOutput)
        }

        if let connection = movieOutput.connection(with: .video) {
            if connection.isVideoStabilizationSupported {
                connection.preferredVideoStabilizationMode = .auto
            }
            if movieOutput.availableVideoCodecTypes.contains(.hevc) {
                movieOutput.setOutputSettings([AVVideoCodecKey: AVVideoCodecType.hevc], for: connection)
            }
        }
        return nil
    }

    // MARK: Recording

    func startRecording(completion: @escaping (Result<URL, Error>) -> Void) {
        // Upright in the file however the phone is held when recording starts.
        let angle = rotationCoordinator?.videoRotationAngleForHorizonLevelCapture
        self.completion = completion
        isRecording = true
        queue.async {
            guard self.session.isRunning,
                  !self.movieOutput.isRecording,
                  let connection = self.movieOutput.connection(with: .video),
                  connection.isActive else {
                DispatchQueue.main.async {
                    self.finish(.failure(CameraError.notReady))
                }
                return
            }
            if let angle, connection.isVideoRotationAngleSupported(angle) {
                connection.videoRotationAngle = angle
            }
            let url = FileManager.default.temporaryDirectory
                .appendingPathComponent("take-\(UUID().uuidString)")
                .appendingPathExtension("mov")
            self.movieOutput.startRecording(to: url, recordingDelegate: self)
        }
    }

    func stopRecording() {
        queue.async {
            if self.movieOutput.isRecording { self.movieOutput.stopRecording() }
        }
    }

    private func finish(_ result: Result<URL, Error>) {
        isRecording = false
        let done = completion
        completion = nil
        done?(result)
    }

    static func requestAccess(for type: AVMediaType) async -> Bool {
        switch AVCaptureDevice.authorizationStatus(for: type) {
        case .authorized: return true
        case .notDetermined: return await AVCaptureDevice.requestAccess(for: type)
        default: return false
        }
    }
}

enum CameraError: LocalizedError {
    case notReady
    var errorDescription: String? { "The camera wasn't ready. Give it a second and try again." }
}

extension CameraController: AVCaptureFileOutputRecordingDelegate {
    func fileOutput(_ output: AVCaptureFileOutput, didFinishRecordingTo outputFileURL: URL, from connections: [AVCaptureConnection], error: Error?) {
        // A take cut short by a phone call or full storage is still a usable file.
        var usable = true
        if let error = error as NSError? {
            usable = (error.userInfo[AVErrorRecordingSuccessfullyFinishedKey] as? Bool) ?? false
        }
        DispatchQueue.main.async {
            if usable {
                self.finish(.success(outputFileURL))
            } else {
                try? FileManager.default.removeItem(at: outputFileURL)
                let failure: Error = error ?? CameraError.notReady
                self.finish(.failure(failure))
            }
        }
    }
}
