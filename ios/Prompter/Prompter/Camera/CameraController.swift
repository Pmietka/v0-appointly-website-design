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
/// published state is only ever changed on the main thread. That discipline is
/// what makes the unchecked Sendable below safe.
final class CameraController: NSObject, ObservableObject, @unchecked Sendable {
    enum Status: Equatable {
        case starting
        case running
        /// Another app (a call, FaceTime) has the camera for now.
        case paused
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
    /// True between start() and stop(): the camera should be running.
    private var wantsRunning = false
    /// Stop was tapped before the file output had actually started.
    private var stopRequested = false

    // Main thread only.
    private weak var previewLayer: AVCaptureVideoPreviewLayer?
    private var currentDevice: AVCaptureDevice?
    private var rotationCoordinator: AVCaptureDevice.RotationCoordinator?
    private var rotationObservation: NSKeyValueObservation?
    private var completion: ((Result<URL, Error>) -> Void)?
    private var observers: [NSObjectProtocol] = []

    override init() {
        super.init()
        // Configured by hand below so playback of a take uses the loudspeaker,
        // not the earpiece, while the microphone is open.
        session.automaticallyConfiguresApplicationAudioSession = false
        let center = NotificationCenter.default
        observers.append(center.addObserver(forName: AVCaptureSession.runtimeErrorNotification, object: session, queue: nil) { [weak self] _ in
            // Media services can reset (for example after a call). Start again,
            // unless the camera was stopped on purpose (say, while reviewing a take).
            self?.queue.async {
                guard let self, self.wantsRunning, !self.session.isRunning else { return }
                self.session.startRunning()
            }
        })
        observers.append(center.addObserver(forName: AVCaptureSession.wasInterruptedNotification, object: session, queue: .main) { [weak self] _ in
            guard let self, self.status == .running else { return }
            self.status = .paused
        })
        observers.append(center.addObserver(forName: AVCaptureSession.interruptionEndedNotification, object: session, queue: .main) { [weak self] _ in
            guard let self else { return }
            if self.status == .paused { self.status = .running }
            // A call takes the audio session; set it up again for the next take.
            self.queue.async {
                if self.audioInput != nil { Self.configureAudioSession() }
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
                self.wantsRunning = true
                if audioAllowed { Self.configureAudioSession() }
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
        if isSimulated { return }
        queue.async {
            self.wantsRunning = false
            if self.session.isRunning { self.session.stopRunning() }
        }
    }

    /// Leaving the record screen: stop the camera and hand audio back to other
    /// apps (music that was playing before can resume).
    func shutDown() {
        if isSimulated { return }
        queue.async {
            self.wantsRunning = false
            if self.session.isRunning { self.session.stopRunning() }
            try? AVAudioSession.sharedInstance().setActive(false, options: .notifyOthersOnDeactivation)
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
        if isSimulated {
            self.completion = completion
            simulatedStart = Date()
            isRecording = true
            return
        }
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
            self.stopRequested = false
            self.movieOutput.startRecording(to: url, recordingDelegate: self)
        }
    }

    func stopRecording() {
        if isSimulated {
            guard isRecording else { return }
            let seconds = min(5, max(1, Date().timeIntervalSince(simulatedStart ?? Date())))
            DispatchQueue.global(qos: .userInitiated).async {
                let result = Result { try Self.makeTestClip(seconds: seconds) }
                DispatchQueue.main.async { self.finish(result) }
            }
            return
        }
        queue.async {
            // The output only reports recording a moment after it starts; a
            // quick stop before then is remembered and applied when it does.
            if self.movieOutput.isRecording {
                self.movieOutput.stopRecording()
            } else {
                self.stopRequested = true
            }
        }
    }

    /// Deletes takes left behind if the app was closed while reviewing one.
    static func purgeOldTakes(olderThan age: TimeInterval = 24 * 60 * 60) {
        let fm = FileManager.default
        let dir = fm.temporaryDirectory
        guard let files = try? fm.contentsOfDirectory(at: dir, includingPropertiesForKeys: [.contentModificationDateKey]) else { return }
        let cutoff = Date().addingTimeInterval(-age)
        for file in files where file.lastPathComponent.hasPrefix("take-") && file.pathExtension == "mov" {
            let modified = (try? file.resourceValues(forKeys: [.contentModificationDateKey]))?.contentModificationDate ?? .distantPast
            if modified < cutoff { try? fm.removeItem(at: file) }
        }
    }

    private func finish(_ result: Result<URL, Error>) {
        isRecording = false
        let done = completion
        completion = nil
        done?(result)
    }

    /// Record from the built in mic or a plugged in one, play back on the loudspeaker.
    static func configureAudioSession() {
        let audio = AVAudioSession.sharedInstance()
        do {
            try audio.setCategory(.playAndRecord, mode: .videoRecording, options: [.defaultToSpeaker, .allowBluetoothA2DP])
            try audio.setActive(true)
        } catch {
            print("Prompter: audio session setup failed: \(error)")
        }
    }

    // MARK: Simulator stand in

    /// The simulator has no camera. UI tests use this instead: the camera
    /// reports as running and "recording" produces a short generated clip, so
    /// the review, save and retake screens can be tested on every build.
    private(set) var isSimulated = false
    private var simulatedStart: Date?

    func startSimulated() {
        isSimulated = true
        status = .running
    }

    static func makeTestClip(seconds: Double) throws -> URL {
        let url = FileManager.default.temporaryDirectory
            .appendingPathComponent("take-\(UUID().uuidString)")
            .appendingPathExtension("mov")
        let width = 360, height = 640, fps: Int32 = 15
        let writer = try AVAssetWriter(outputURL: url, fileType: .mov)
        let input = AVAssetWriterInput(mediaType: .video, outputSettings: [
            AVVideoCodecKey: AVVideoCodecType.h264,
            AVVideoWidthKey: width,
            AVVideoHeightKey: height,
        ])
        input.expectsMediaDataInRealTime = false
        let adaptor = AVAssetWriterInputPixelBufferAdaptor(assetWriterInput: input, sourcePixelBufferAttributes: [
            kCVPixelBufferPixelFormatTypeKey as String: kCVPixelFormatType_32BGRA,
            kCVPixelBufferWidthKey as String: width,
            kCVPixelBufferHeightKey as String: height,
        ])
        guard writer.canAdd(input) else { throw CameraError.notReady }
        writer.add(input)
        guard writer.startWriting() else { throw writer.error ?? CameraError.notReady }
        writer.startSession(atSourceTime: .zero)

        for frame in 0..<Int(seconds * Double(fps)) {
            while !input.isReadyForMoreMediaData { Thread.sleep(forTimeInterval: 0.005) }
            var buffer: CVPixelBuffer?
            guard let pool = adaptor.pixelBufferPool,
                  CVPixelBufferPoolCreatePixelBuffer(nil, pool, &buffer) == kCVReturnSuccess,
                  let buffer else { throw CameraError.notReady }
            CVPixelBufferLockBaseAddress(buffer, [])
            if let base = CVPixelBufferGetBaseAddress(buffer) {
                // A slowly brightening gray, so playback visibly moves.
                memset(base, Int32(50 + (frame * 4) % 150), CVPixelBufferGetBytesPerRow(buffer) * height)
            }
            CVPixelBufferUnlockBaseAddress(buffer, [])
            adaptor.append(buffer, withPresentationTime: CMTime(value: CMTimeValue(frame), timescale: fps))
        }
        input.markAsFinished()
        let done = DispatchSemaphore(value: 0)
        writer.finishWriting { done.signal() }
        done.wait()
        guard writer.status == .completed else { throw writer.error ?? CameraError.notReady }
        return url
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
    func fileOutput(_ output: AVCaptureFileOutput, didStartRecordingTo fileURL: URL, from connections: [AVCaptureConnection]) {
        queue.async {
            if self.stopRequested {
                self.stopRequested = false
                self.movieOutput.stopRecording()
            }
        }
    }

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
