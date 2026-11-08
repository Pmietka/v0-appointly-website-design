import AVKit
import Photos
import SwiftUI

/// Watch the take, then save it to Photos, share it, or go again.
struct ReviewView: View {
    let take: Take
    let onClose: () -> Void

    @State private var player: AVPlayer
    @State private var saveState: SaveState = .idle
    @State private var confirmDiscard = false
    /// The length of the actual file, once it's been read.
    @State private var fileDuration: Double?

    enum SaveState: Equatable {
        case idle, saving, saved
        case failed(String)
    }

    init(take: Take, onClose: @escaping () -> Void) {
        self.take = take
        self.onClose = onClose
        _player = State(initialValue: AVPlayer(url: take.url))
    }

    var body: some View {
        GeometryReader { geo in
            let landscape = geo.size.width > geo.size.height
            let layout = landscape ? AnyLayout(HStackLayout(spacing: 0)) : AnyLayout(VStackLayout(spacing: 0))
            layout {
                VideoPlayer(player: player)
                    .background(Color.black)
                actions
                    .frame(width: landscape ? 230 : nil)
                    .padding(16)
            }
        }
        .background(Color.black.ignoresSafeArea())
        .onAppear { player.play() }
        .task {
            if let duration = try? await AVURLAsset(url: take.url).load(.duration), duration.seconds.isFinite {
                fileDuration = duration.seconds
            }
        }
        .onDisappear { player.pause() }
        .confirmationDialog("Throw away this take?", isPresented: $confirmDiscard, titleVisibility: .visible) {
            Button("Discard take", role: .destructive) { close() }
            Button("Keep it", role: .cancel) {}
        } message: {
            Text("It hasn't been saved to Photos.")
        }
    }

    private var actions: some View {
        VStack(spacing: 10) {
            Text("\(ScriptStats.formatDuration(fileDuration ?? take.duration)) take")
                .font(.footnote)
                .foregroundStyle(.secondary)
                .monospacedDigit()

            Button(action: save) {
                switch saveState {
                case .idle, .failed: Label("Save to Photos", systemImage: "square.and.arrow.down")
                case .saving: ProgressView().tint(.black)
                case .saved: Label("Saved to Photos", systemImage: "checkmark")
                }
            }
            .buttonStyle(PrimaryButtonStyle())
            .disabled(saveState == .saving || saveState == .saved)

            ShareLink(item: take.url) {
                Label("Share", systemImage: "square.and.arrow.up")
            }
            .buttonStyle(SecondaryButtonStyle())

            Button {
                if saveState == .saved { close() } else { confirmDiscard = true }
            } label: {
                Label(saveState == .saved ? "New take" : "Retake", systemImage: "arrow.counterclockwise")
            }
            .buttonStyle(SecondaryButtonStyle())

            if case .failed(let message) = saveState {
                Text(message)
                    .font(.footnote)
                    .foregroundStyle(.red)
                    .multilineTextAlignment(.center)
            }
        }
    }

    private func save() {
        saveState = .saving
        PHPhotoLibrary.requestAuthorization(for: .addOnly) { status in
            guard status == .authorized || status == .limited else {
                DispatchQueue.main.async {
                    saveState = .failed("Prompter isn't allowed to add to Photos. Turn it on in Settings, or use Share.")
                }
                return
            }
            PHPhotoLibrary.shared().performChanges({
                PHAssetChangeRequest.creationRequestForAssetFromVideo(atFileURL: take.url)
            }) { success, error in
                DispatchQueue.main.async {
                    saveState = success ? .saved : .failed(error?.localizedDescription ?? "Couldn't save the video.")
                }
            }
        }
    }

    private func close() {
        player.pause()
        try? FileManager.default.removeItem(at: take.url)
        onClose()
    }
}
