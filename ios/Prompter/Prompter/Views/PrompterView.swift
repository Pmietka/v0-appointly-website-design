import AVFoundation
import SwiftUI
import UIKit

struct Take: Identifiable {
    let url: URL
    let duration: TimeInterval
    var id: URL { url }
}

/// The camera, the scrolling script and the shutter. Upright, the script sits
/// in a band under the top of the screen. Sideways, it hugs the side the
/// camera is on and the shutter moves to the far side, like the Camera app.
struct PrompterView: View {
    let script: String

    @Environment(\.dismiss) private var dismiss
    @Environment(SubscriptionStore.self) private var subscriptions
    @Environment(ShareImporter.self) private var importer

    @AppStorage(Pref.fontSize) private var fontSize: Double = 40
    @AppStorage(Pref.speed) private var speed: Double = 4
    @AppStorage(Pref.countdown) private var countdownSetting: Int = 3
    @AppStorage(Pref.mirror) private var mirror = false
    @AppStorage(Pref.camera) private var defaultCamera = "front"
    @AppStorage(Pref.quality) private var qualityRaw = VideoQuality.hd.rawValue

    @StateObject private var camera = CameraController()
    @StateObject private var engine = PrompterEngine()

    @State private var position: AVCaptureDevice.Position?
    @State private var countdown: Int?
    @State private var countdownTask: Task<Void, Never>?
    @State private var recordingStart: Date?
    @State private var take: Take?
    @State private var showPaywall = false
    @State private var lensColumn: PrompterColumn = .center
    @State private var alertMessage: String?
    @State private var newScriptWaiting = false
    @State private var isActive = false

    private var isRecording: Bool { recordingStart != nil }
    private var isBusy: Bool { isRecording || countdown != nil }
    private var quality: VideoQuality { VideoQuality(rawValue: qualityRaw) ?? .hd }

    var body: some View {
        ZStack {
            cameraLayer
            GeometryReader { geo in
                Group {
                    if geo.size.width > geo.size.height {
                        landscapeLayout(geo.size)
                    } else {
                        portraitLayout(geo.size)
                    }
                }
                .frame(width: geo.size.width, height: geo.size.height)
                .onAppear { lensColumn = Self.currentLensColumn() }
                .onChange(of: geo.size) { _, _ in lensColumn = Self.currentLensColumn() }
                // Turning straight from one sideways position to the other keeps the
                // same size, so watch the rotation itself too. The new orientation
                // settles a moment after the notification.
                .onReceive(NotificationCenter.default.publisher(for: UIDevice.orientationDidChangeNotification)) { _ in
                    for delay in [0.1, 0.4, 0.9] {
                        DispatchQueue.main.asyncAfter(deadline: .now() + delay) {
                            lensColumn = Self.currentLensColumn()
                        }
                    }
                }
            }
            if let countdown {
                Text("\(countdown)")
                    .font(.system(size: 150, weight: .heavy, design: .rounded))
                    .foregroundStyle(.white)
                    .shadow(color: .black.opacity(0.5), radius: 24)
                    .id(countdown)
                    .transition(.scale(scale: 1.4).combined(with: .opacity))
                    .allowsHitTesting(false)
            }
            statusOverlay
        }
        .environment(\.layoutDirection, .leftToRight)
        // The controls float over the camera; the script has its own size control.
        .dynamicTypeSize(...DynamicTypeSize.xxxLarge)
        .background(Color.black)
        .statusBarHidden()
        .persistentSystemOverlays(.hidden)
        .sensoryFeedback(.impact(weight: .light), trigger: countdown)
        .animation(.easeOut(duration: 0.25), value: countdown)
        .onAppear(perform: activate)
        .onDisappear(perform: teardown)
        .onChange(of: speed) { _, newValue in engine.speed = newValue }
        .onChange(of: importer.openRequest) { _, _ in
            // A new script arrived from Claude. Step out so it can open, but
            // never in the middle of a take or while one is being reviewed.
            if !isBusy && take == nil { dismiss() } else { newScriptWaiting = true }
        }
        .onChange(of: take == nil) { _, reviewClosed in
            // The camera rests while a take is being reviewed, and comes back after.
            if reviewClosed {
                if newScriptWaiting { dismiss() } else { startCamera() }
            } else {
                camera.stop()
            }
        }
        .overlay(alignment: .top) {
            if newScriptWaiting {
                Text("Claude sent a new script. It opens when you finish this take.")
                    .font(.footnote.weight(.semibold))
                    .multilineTextAlignment(.center)
                    .padding(.horizontal, 14)
                    .padding(.vertical, 8)
                    .background(.ultraThinMaterial, in: Capsule())
                    .padding(.top, 60)
                    .padding(.horizontal, 24)
                    .allowsHitTesting(false)
            }
        }
        .sheet(isPresented: $showPaywall) {
            PaywallView().environment(subscriptions)
        }
        .fullScreenCover(item: $take) { take in
            ReviewView(take: take) {
                self.take = nil
                engine.restart()
            }
        }
        .alert("Recording stopped", isPresented: Binding(get: { alertMessage != nil }, set: { if !$0 { alertMessage = nil } })) {
            Button("OK", role: .cancel) {}
        } message: {
            Text(alertMessage ?? "")
        }
    }

    // MARK: Layouts

    private func portraitLayout(_ size: CGSize) -> some View {
        VStack(spacing: 0) {
            HStack {
                backButton(compact: false)
                Spacer()
                flipButton
            }
            .overlay { timerPill }
            .padding(.horizontal, 12)
            .frame(height: 52)

            band(column: .center)
                .frame(height: size.height * 0.40)

            Spacer(minLength: 0)

            VStack(spacing: 16) {
                steppers(compact: false)
                HStack(spacing: 40) {
                    restartButton
                    shutter(size: 76)
                    playButton
                }
            }
            .padding(.bottom, 12)
        }
    }

    private func landscapeLayout(_ size: CGSize) -> some View {
        let lensOnLeft = lensColumn != .trailing
        let sideWidth: CGFloat = 96
        return HStack(spacing: 0) {
            if !lensOnLeft { sideColumn.frame(width: sideWidth) }
            VStack(spacing: 0) {
                band(column: lensOnLeft ? .leading : .trailing)
                    .frame(height: size.height * 0.64)
                Spacer(minLength: 0)
                HStack(spacing: 10) {
                    backButton(compact: true)
                    flipButton
                    timerPill
                    Spacer(minLength: 6)
                    steppers(compact: size.width - sideWidth < 600)
                }
                .padding(.horizontal, 12)
                .padding(.bottom, 8)
            }
            if lensOnLeft { sideColumn.frame(width: sideWidth) }
        }
    }

    private var sideColumn: some View {
        VStack(spacing: 22) {
            restartButton
            shutter(size: 70)
            playButton
        }
        .frame(maxHeight: .infinity)
        .frame(maxWidth: .infinity)
        .background { Color.black.opacity(0.35).ignoresSafeArea() }
    }

    // MARK: Pieces

    @ViewBuilder
    private var cameraLayer: some View {
        if AppConfig.isUITest {
            // The simulator has no camera. A neutral stand in keeps screenshots readable.
            LinearGradient(colors: [Color(white: 0.32), Color(white: 0.1)], startPoint: .top, endPoint: .bottom)
                .ignoresSafeArea()
        } else {
            CameraPreview(camera: camera).ignoresSafeArea()
        }
    }

    private func band(column: PrompterColumn) -> some View {
        PrompterTextView(text: script, fontSize: CGFloat(fontSize), mirrored: mirror, column: column, engine: engine)
            .background { Color.black.opacity(0.55).ignoresSafeArea(edges: [.top, .horizontal]) }
            .overlay(alignment: .bottom) {
                // Just under the band, so it never sits on top of the words.
                if let hint {
                    Text(hint)
                        .font(.footnote.weight(.semibold))
                        .padding(.horizontal, 12)
                        .padding(.vertical, 6)
                        .background(.black.opacity(0.5), in: Capsule())
                        .alignmentGuide(.bottom) { $0[.top] - 10 }
                        .allowsHitTesting(false)
                }
            }
    }

    private var hint: String? {
        if isBusy { return nil }
        if engine.reachedEnd { return "End of script. Tap to start over" }
        // Nothing over the words while they're moving.
        if engine.isRunning { return nil }
        return "Tap to scroll · drag to move"
    }

    private func backButton(compact: Bool) -> some View {
        Button {
            dismiss()
        } label: {
            HStack(spacing: 4) {
                Image(systemName: "chevron.left").font(.system(size: 17, weight: .semibold))
                if !compact { Text("Script").font(.subheadline.weight(.semibold)) }
            }
            .padding(.horizontal, compact ? 0 : 12)
            .frame(minWidth: 44, minHeight: 40)
            .background(.black.opacity(0.5), in: Capsule())
        }
        .foregroundStyle(.white)
        .disabled(isBusy)
        .opacity(isBusy ? 0.4 : 1)
        .accessibilityLabel("Back to script")
    }

    private var flipButton: some View {
        RoundIconButton(systemName: "arrow.triangle.2.circlepath.camera", label: "Flip camera", size: 42) {
            let next: AVCaptureDevice.Position = (position ?? .front) == .front ? .back : .front
            position = next
            if !AppConfig.isUITest { camera.start(position: next, quality: quality) }
        }
        .disabled(isBusy)
        .opacity(isBusy ? 0.4 : 1)
    }

    private var timerPill: some View {
        TimelineView(.periodic(from: .now, by: 0.25)) { context in
            let seconds = recordingStart.map { max(0, context.date.timeIntervalSince($0)) } ?? 0
            HStack(spacing: 6) {
                if isRecording {
                    Circle().fill(.white).frame(width: 8, height: 8)
                }
                Text(String(format: "%d:%02d", Int(seconds) / 60, Int(seconds) % 60))
                    .monospacedDigit()
            }
            .font(.subheadline.weight(.bold))
            .foregroundStyle(.white)
            .padding(.horizontal, 12)
            .padding(.vertical, 7)
            .background(isRecording ? Color.red : Color.black.opacity(0.5), in: Capsule())
        }
        .accessibilityIdentifier("timer")
    }

    private func steppers(compact: Bool) -> some View {
        HStack(spacing: 10) {
            PillStepper(label: "Speed", value: "\(Int(speed))", compact: compact,
                        onMinus: { speed = max(Pref.speedRange.lowerBound, speed - 1) },
                        onPlus: { speed = min(Pref.speedRange.upperBound, speed + 1) })
            PillStepper(label: "Size", value: "\(Int(fontSize))", compact: compact,
                        onMinus: { fontSize = max(Pref.fontRange.lowerBound, fontSize - 4) },
                        onPlus: { fontSize = min(Pref.fontRange.upperBound, fontSize + 4) })
        }
    }

    private var restartButton: some View {
        RoundIconButton(systemName: "arrow.up.to.line", label: "Back to the top", size: 48) {
            engine.restart()
        }
    }

    private var playButton: some View {
        RoundIconButton(systemName: engine.isRunning ? "pause.fill" : "play.fill",
                        label: engine.isRunning ? "Pause scrolling" : "Start scrolling",
                        size: 48) {
            engine.toggle()
        }
        .accessibilityIdentifier("playButton")
    }

    private func shutter(size: CGFloat) -> some View {
        RecordButton(isRecording: isRecording, size: size, action: recordTapped)
            // Free users can still tap it: it opens the trial offer.
            .disabled(subscriptions.isPro && camera.status != .running && !isRecording)
    }

    @ViewBuilder
    private var statusOverlay: some View {
        if !AppConfig.isUITest {
            switch camera.status {
            case .denied:
                messageCard("Prompter needs the camera and microphone to record. Turn them on in Settings.", button: "Open Settings") {
                    if let url = URL(string: UIApplication.openSettingsURLString) { UIApplication.shared.open(url) }
                }
            case .unavailable(let message):
                messageCard(message, button: "Try again") {
                    camera.start(position: position ?? .front, quality: quality)
                }
            case .paused:
                Text("Camera paused while another app is using it.")
                    .font(.callout.weight(.semibold))
                    .multilineTextAlignment(.center)
                    .padding(16)
                    .background(.ultraThinMaterial, in: RoundedRectangle(cornerRadius: 16))
                    .padding(24)
                    .allowsHitTesting(false)
            case .starting, .running:
                if camera.micDenied {
                    VStack {
                        Spacer()
                        Text("Microphone is off, so takes will be silent. Turn it on in Settings.")
                            .font(.footnote.weight(.semibold))
                            .multilineTextAlignment(.center)
                            .padding(10)
                            .background(.black.opacity(0.7), in: RoundedRectangle(cornerRadius: 12))
                            .padding(.horizontal, 24)
                            .padding(.bottom, 150)
                    }
                    .allowsHitTesting(false)
                }
            }
        }
    }

    private func messageCard(_ text: String, button: String, action: @escaping () -> Void) -> some View {
        VStack(spacing: 14) {
            Text(text)
                .multilineTextAlignment(.center)
            Button(button, action: action)
                .buttonStyle(.borderedProminent)
                .tint(.white)
                .foregroundStyle(.black)
        }
        .padding(20)
        .frame(maxWidth: 360)
        .background(.ultraThinMaterial, in: RoundedRectangle(cornerRadius: 18))
        .padding(24)
    }

    // MARK: Behavior

    /// Entering the record screen. Safe to call again: it only sets up once.
    private func activate() {
        guard !isActive else { return }
        isActive = true
        importer.prompterActive = true
        UIDevice.current.beginGeneratingDeviceOrientationNotifications()
        engine.speed = speed
        UIApplication.shared.isIdleTimerDisabled = true
        startCamera()
    }

    private func startCamera() {
        let side = position ?? (defaultCamera == "back" ? .back : .front)
        position = side
        if AppConfig.isUITest {
            camera.startSimulated()
        } else {
            camera.start(position: side, quality: quality)
        }
    }

    private func teardown() {
        // A review sheet on top doesn't count as leaving.
        guard take == nil, isActive else { return }
        isActive = false
        cancelCountdown()
        if isRecording { camera.stopRecording() }
        engine.isRunning = false
        camera.shutDown()
        UIDevice.current.endGeneratingDeviceOrientationNotifications()
        Self.releaseScreen()
        importer.prompterActive = false
    }

    /// Undo everything the record screen changes about the app. Also run when
    /// the screen is dismissed by any route, so nothing can be left stuck.
    static func releaseScreen() {
        OrientationLock.unlock()
        UIApplication.shared.isIdleTimerDisabled = false
    }

    private func recordTapped() {
        if isRecording {
            stopRecording()
            return
        }
        if countdown != nil {
            cancelCountdown()
            return
        }
        guard subscriptions.isPro else {
            showPaywall = true
            return
        }
        guard camera.status == .running else { return }
        guard countdownSetting > 0 else {
            beginRecording()
            return
        }
        let from = countdownSetting
        countdownTask = Task { @MainActor in
            for value in stride(from: from, through: 1, by: -1) {
                countdown = value
                try? await Task.sleep(for: .seconds(1))
                if Task.isCancelled { return }
            }
            countdown = nil
            countdownTask = nil
            beginRecording()
        }
    }

    private func cancelCountdown() {
        countdownTask?.cancel()
        countdownTask = nil
        countdown = nil
    }

    private func beginRecording() {
        OrientationLock.lockCurrent()
        let startedAt = Date()
        recordingStart = startedAt
        engine.reachedEnd = false
        engine.isRunning = true
        camera.startRecording { result in
            OrientationLock.unlock()
            recordingStart = nil
            engine.isRunning = false
            switch result {
            case .success(let url):
                take = Take(url: url, duration: Date().timeIntervalSince(startedAt))
            case .failure(let error):
                alertMessage = error.localizedDescription
            }
        }
    }

    private func stopRecording() {
        engine.isRunning = false
        camera.stopRecording()
    }

    /// Which side the camera is on when the phone is sideways.
    static func currentLensColumn() -> PrompterColumn {
        switch OrientationLock.interfaceOrientation {
        // Home side on the right, so the top of the phone (and its camera) is on the left.
        case .landscapeRight: return .leading
        case .landscapeLeft: return .trailing
        default: return .center
        }
    }
}
