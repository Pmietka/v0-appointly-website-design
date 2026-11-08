import SwiftUI
import UIKit

/// How to connect Prompter to Claude. After that, people ask Claude for a
/// script and get a link that opens the app ready to record.
struct ConnectAIView: View {
    @Environment(\.dismiss) private var dismiss
    @State private var copied: String?

    private let examples = [
        "Write a 45 second video about why homeowners should book a spring AC tune-up, and set it up in Prompter.",
        "Turn these notes into a 30 second script and send it to Prompter: ",
        "Make that script shorter and punchier, then send it to Prompter again.",
    ]

    var body: some View {
        NavigationStack {
            ScrollView {
                VStack(alignment: .leading, spacing: 26) {
                    VStack(alignment: .leading, spacing: 10) {
                        Image(systemName: "sparkles")
                            .font(.system(size: 34, weight: .semibold))
                            .foregroundStyle(Color.accentColor)
                        Text("Claude writes it.\nYou just record.")
                            .font(.largeTitle.weight(.bold))
                        Text("Connect Prompter to Claude once. Then ask Claude for a video script: it writes it, sets up the prompter and gives you a link. Tap the link and you're on the record screen.")
                            .foregroundStyle(.secondary)
                    }

                    step(1, "Open Claude's connector settings",
                         "On claude.ai or the Claude desktop app, go to Settings, then Connectors, then Add custom connector.") {
                        Link(destination: AppConfig.claudeConnectorsURL) {
                            Label("Open claude.ai", systemImage: "arrow.up.right.square")
                        }
                        .buttonStyle(SecondaryButtonStyle())
                    }

                    step(2, "Add Prompter",
                         "Name it Prompter and paste this as the server URL:") {
                        copyBox(AppConfig.connectorURL, id: "url")
                    }

                    step(3, "Ask Claude for a script",
                         "In any chat, on your phone or computer. If Claude doesn't use Prompter, turn it on in the chat's tools menu.") {
                        VStack(spacing: 8) {
                            ForEach(examples, id: \.self) { example in
                                copyBox(example, id: example, monospaced: false)
                            }
                        }
                    }

                    Text("Works with any AI app that supports MCP connectors, using the same address. The AI writes the script with your own account; Prompter only receives the finished script and keeps it until you open it.")
                        .font(.footnote)
                        .foregroundStyle(.secondary)
                }
                .padding(20)
                .frame(maxWidth: 560, alignment: .leading)
                .frame(maxWidth: .infinity)
            }
            .background(Color.black.ignoresSafeArea())
            .navigationTitle("Connect Claude")
            .navigationBarTitleDisplayMode(.inline)
            .toolbar {
                ToolbarItem(placement: .confirmationAction) {
                    Button("Done") { dismiss() }
                }
            }
        }
        .accessibilityIdentifier("connectAI")
    }

    private func step<Content: View>(_ number: Int, _ title: String, _ detail: String, @ViewBuilder content: () -> Content) -> some View {
        VStack(alignment: .leading, spacing: 12) {
            HStack(alignment: .firstTextBaseline, spacing: 12) {
                Text("\(number)")
                    .font(.headline)
                    .frame(width: 28, height: 28)
                    .background(Color.white.opacity(0.12), in: Circle())
                VStack(alignment: .leading, spacing: 4) {
                    Text(title).font(.headline)
                    Text(detail).font(.subheadline).foregroundStyle(.secondary)
                }
            }
            content()
        }
    }

    private func copyBox(_ text: String, id: String, monospaced: Bool = true) -> some View {
        Button {
            UIPasteboard.general.string = text
            copied = id
            DispatchQueue.main.asyncAfter(deadline: .now() + 1.6) {
                if copied == id { copied = nil }
            }
        } label: {
            HStack(alignment: .top, spacing: 10) {
                Text(text)
                    .font(monospaced ? .system(.callout, design: .monospaced) : .callout)
                    .multilineTextAlignment(.leading)
                    .frame(maxWidth: .infinity, alignment: .leading)
                Label(copied == id ? "Copied" : "Copy", systemImage: copied == id ? "checkmark" : "doc.on.doc")
                    .labelStyle(.iconOnly)
                    .foregroundStyle(copied == id ? Color.green : Color.accentColor)
            }
            .padding(14)
            .background(Color.white.opacity(0.07), in: RoundedRectangle(cornerRadius: 14, style: .continuous))
        }
        .buttonStyle(.plain)
        .foregroundStyle(.white)
        .accessibilityLabel(copied == id ? "Copied" : "Copy \(text)")
    }
}
