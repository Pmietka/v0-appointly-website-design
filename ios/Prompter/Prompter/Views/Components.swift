import AVFoundation
import SwiftUI

struct CameraPreview: UIViewRepresentable {
    let camera: CameraController

    func makeUIView(context: Context) -> PreviewView {
        let view = PreviewView()
        view.backgroundColor = .black
        view.previewLayer.videoGravity = .resizeAspectFill
        camera.attach(previewLayer: view.previewLayer)
        return view
    }

    func updateUIView(_ uiView: PreviewView, context: Context) {}

    final class PreviewView: UIView {
        override class var layerClass: AnyClass { AVCaptureVideoPreviewLayer.self }
        // The layer class above guarantees this cast.
        var previewLayer: AVCaptureVideoPreviewLayer { layer as! AVCaptureVideoPreviewLayer }
    }
}

struct PrimaryButtonStyle: ButtonStyle {
    @Environment(\.isEnabled) private var isEnabled

    func makeBody(configuration: Configuration) -> some View {
        configuration.label
            .font(.headline)
            .foregroundStyle(.black)
            .frame(maxWidth: .infinity)
            .padding(.vertical, 16)
            .background(Color.white.opacity(isEnabled ? 1 : 0.35), in: RoundedRectangle(cornerRadius: 16, style: .continuous))
            .opacity(configuration.isPressed ? 0.85 : 1)
            .scaleEffect(configuration.isPressed ? 0.98 : 1)
    }
}

struct SecondaryButtonStyle: ButtonStyle {
    func makeBody(configuration: Configuration) -> some View {
        configuration.label
            .font(.headline)
            .foregroundStyle(.white)
            .frame(maxWidth: .infinity)
            .padding(.vertical, 14)
            .background(Color.white.opacity(0.12), in: RoundedRectangle(cornerRadius: 16, style: .continuous))
            .opacity(configuration.isPressed ? 0.7 : 1)
    }
}

/// Dark glass circle used for the prompter's secondary controls.
struct RoundIconButton: View {
    let systemName: String
    let label: String
    var size: CGFloat = 50
    let action: () -> Void

    var body: some View {
        Button(action: action) {
            Image(systemName: systemName)
                .font(.system(size: size * 0.38, weight: .semibold))
                .frame(width: size, height: size)
                .background(.black.opacity(0.5), in: Circle())
                .contentShape(Circle())
        }
        .foregroundStyle(.white)
        .accessibilityLabel(label)
    }
}

/// "− Speed 4 +" pill.
struct PillStepper: View {
    let label: String
    let value: String
    var compact = false
    let onMinus: () -> Void
    let onPlus: () -> Void

    var body: some View {
        HStack(spacing: 0) {
            Button(action: onMinus) {
                Image(systemName: "minus").frame(width: 38, height: 38).contentShape(Rectangle())
            }
            .accessibilityLabel("Less \(label.lowercased())")
            Group {
                if compact {
                    Text(value)
                } else {
                    Text(label).foregroundStyle(.white.opacity(0.75)) + Text(" \(value)")
                }
            }
            .font(.subheadline.weight(.semibold))
            .monospacedDigit()
            .frame(minWidth: compact ? 34 : 70)
            Button(action: onPlus) {
                Image(systemName: "plus").frame(width: 38, height: 38).contentShape(Rectangle())
            }
            .accessibilityLabel("More \(label.lowercased())")
        }
        .foregroundStyle(.white)
        .background(.black.opacity(0.5), in: Capsule())
        // One control for VoiceOver: "Speed, 4, adjustable", swipe up or down to change.
        .accessibilityElement(children: .ignore)
        .accessibilityLabel(label)
        .accessibilityValue(value)
        .accessibilityAdjustableAction { direction in
            switch direction {
            case .increment: onPlus()
            case .decrement: onMinus()
            @unknown default: break
            }
        }
    }
}

/// The big shutter button: red dot, turns into a red square while recording.
struct RecordButton: View {
    let isRecording: Bool
    var size: CGFloat = 76
    let action: () -> Void

    var body: some View {
        Button(action: action) {
            ZStack {
                Circle()
                    .strokeBorder(.white, lineWidth: 4)
                    .frame(width: size, height: size)
                RoundedRectangle(cornerRadius: isRecording ? 7 : size * 0.41, style: .continuous)
                    .fill(Color(red: 1, green: 0.23, blue: 0.19))
                    .frame(width: isRecording ? size * 0.4 : size * 0.82, height: isRecording ? size * 0.4 : size * 0.82)
            }
            .contentShape(Circle())
            .animation(.easeInOut(duration: 0.2), value: isRecording)
        }
        .accessibilityLabel(isRecording ? "Stop recording" : "Start recording")
        .accessibilityIdentifier("recordButton")
    }
}

extension String {
    var isBlank: Bool { trimmingCharacters(in: .whitespacesAndNewlines).isEmpty }
}
