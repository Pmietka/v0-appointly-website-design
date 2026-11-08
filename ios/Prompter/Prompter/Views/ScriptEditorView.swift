import SwiftUI

struct ScriptEditorView: View {
    let scriptID: UUID
    @Environment(ScriptStore.self) private var store
    @Environment(SubscriptionStore.self) private var subscriptions
    @Environment(ShareImporter.self) private var importer
    @State private var text = ""
    @State private var loaded = false
    @State private var showPrompter = false
    @FocusState private var editing: Bool

    var body: some View {
        ZStack(alignment: .topLeading) {
            TextEditor(text: $text)
                .focused($editing)
                .font(.system(size: 18))
                .lineSpacing(4)
                .scrollContentBackground(.hidden)
                .scrollDismissesKeyboard(.interactively)
                .padding(.horizontal, 12)
                .accessibilityIdentifier("scriptEditor")
            if text.isEmpty {
                Text("Paste or type your script")
                    .font(.system(size: 18))
                    .foregroundStyle(.tertiary)
                    .padding(.horizontal, 17)
                    .padding(.top, 8)
                    .allowsHitTesting(false)
            }
        }
        .background(Color.black)
        .navigationTitle(navigationTitle)
        .navigationBarTitleDisplayMode(.inline)
        .safeAreaInset(edge: .bottom) { bottomBar }
        .toolbar {
            ToolbarItemGroup(placement: .keyboard) {
                Spacer()
                Button("Done") { editing = false }
            }
        }
        .onAppear {
            guard !loaded else { return }
            loaded = true
            text = store.script(scriptID)?.body ?? ""
            if importer.consumeAutoRecord(for: scriptID) {
                // Opened from a Claude link: straight to the record screen,
                // once any sheet that was up has finished closing.
                DispatchQueue.main.asyncAfter(deadline: .now() + 0.6) { showPrompter = true }
            } else if text.isEmpty {
                editing = true
            }
        }
        .onChange(of: text) { _, newValue in
            store.update(scriptID, body: newValue)
        }
        .onDisappear {
            // Don't leave empty scripts lying around. The prompter is never
            // opened for an empty script, so this only runs on the way back.
            if text.isBlank && !showPrompter { store.delete(scriptID) }
        }
        .fullScreenCover(isPresented: $showPrompter) {
            PrompterView(script: text)
                .environment(subscriptions)
                .environment(importer)
        }
    }

    private var navigationTitle: String {
        if text.isBlank { return "New script" }
        if let custom = store.script(scriptID)?.customTitle, !custom.isBlank { return custom }
        return Script.title(for: text)
    }

    private var bottomBar: some View {
        VStack(spacing: 10) {
            HStack {
                Text(text.isBlank ? "No script yet" : ScriptStats.summary(text))
                    .font(.footnote)
                    .foregroundStyle(.secondary)
                    .monospacedDigit()
                Spacer()
                if text.isEmpty {
                    PasteButton(payloadType: String.self) { strings in
                        let pasted = strings.joined(separator: "\n")
                        DispatchQueue.main.async { text = pasted }
                    }
                    .buttonBorderShape(.capsule)
                    .labelStyle(.titleAndIcon)
                }
            }
            Button {
                editing = false
                showPrompter = true
            } label: {
                Label("Record", systemImage: "record.circle")
            }
            .buttonStyle(PrimaryButtonStyle())
            .disabled(text.isBlank)
            .accessibilityIdentifier("openPrompter")
        }
        .padding(.horizontal, 16)
        .padding(.top, 10)
        .padding(.bottom, 8)
        .background(.bar)
    }
}
