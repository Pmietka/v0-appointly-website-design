import SwiftUI

struct ScriptListView: View {
    @Environment(ScriptStore.self) private var store
    @Environment(SubscriptionStore.self) private var subscriptions
    @Environment(ShareImporter.self) private var importer
    @State private var path: [UUID] = []
    @State private var showSettings = false
    @State private var showConnect = false
    @State private var handledRequest: ShareImporter.OpenRequest?

    var body: some View {
        NavigationStack(path: $path) {
            Group {
                if store.scripts.isEmpty {
                    emptyState
                } else {
                    list
                }
            }
            .navigationTitle("Scripts")
            .toolbar {
                ToolbarItem(placement: .topBarLeading) {
                    Button {
                        showSettings = true
                    } label: {
                        Image(systemName: "gearshape")
                    }
                    .accessibilityLabel("Settings")
                    .accessibilityIdentifier("settingsButton")
                }
                ToolbarItem(placement: .topBarTrailing) {
                    Button {
                        open(store.create())
                    } label: {
                        Image(systemName: "plus")
                    }
                    .accessibilityLabel("New script")
                    .accessibilityIdentifier("newScript")
                }
            }
            .navigationDestination(for: UUID.self) { id in
                ScriptEditorView(scriptID: id)
            }
        }
        .sheet(isPresented: $showSettings) {
            SettingsView().environment(subscriptions)
        }
        .sheet(isPresented: $showConnect) {
            ConnectAIView()
        }
        .onChange(of: importer.openRequest) { _, _ in openLinkedScript() }
        .onChange(of: importer.prompterActive) { _, _ in openLinkedScript() }
    }

    /// A script from Claude: close whatever is open and go to it, once the
    /// record screen (if it's up) has been closed.
    private func openLinkedScript() {
        guard let request = importer.openRequest, request != handledRequest, !importer.prompterActive else { return }
        handledRequest = request
        showSettings = false
        showConnect = false
        path = [request.scriptID]
    }

    private var connectRow: some View {
        Button {
            showConnect = true
        } label: {
            HStack(spacing: 12) {
                Image(systemName: "sparkles")
                    .font(.system(size: 18, weight: .semibold))
                    .foregroundStyle(Color.accentColor)
                    .frame(width: 28)
                VStack(alignment: .leading, spacing: 2) {
                    Text("Have Claude write your scripts").font(.subheadline.weight(.semibold))
                    Text("It sets everything up. You just record.").font(.caption).foregroundStyle(.secondary)
                }
                Spacer()
                Image(systemName: "chevron.right").font(.caption.weight(.semibold)).foregroundStyle(.tertiary)
            }
            .contentShape(Rectangle())
        }
        .buttonStyle(.plain)
        .accessibilityIdentifier("connectClaude")
    }

    private var list: some View {
        List {
            Section {
                connectRow
            }
            Section {
                ForEach(store.sortedScripts) { script in
                    NavigationLink(value: script.id) {
                        ScriptRow(script: script)
                    }
                }
                .onDelete { offsets in
                    let ids = offsets.map { store.sortedScripts[$0].id }
                    for id in ids { store.delete(id) }
                }
            }
        }
        .listStyle(.insetGrouped)
    }

    private var emptyState: some View {
        ContentUnavailableView {
            Label("No scripts yet", systemImage: "text.alignleft")
        } description: {
            Text("Paste the script you want to read, then hit Record.")
        } actions: {
            PasteButton(payloadType: String.self) { strings in
                let text = strings.joined(separator: "\n")
                DispatchQueue.main.async {
                    guard !text.isBlank else { return }
                    open(store.create(body: text))
                }
            }
            .buttonBorderShape(.capsule)
            .labelStyle(.titleAndIcon)
            Button("Write one") { open(store.create()) }
            Button("Have Claude write one") { showConnect = true }
        }
    }

    private func open(_ script: Script) {
        path.append(script.id)
    }
}

private struct ScriptRow: View {
    let script: Script

    var body: some View {
        VStack(alignment: .leading, spacing: 4) {
            Text(script.title)
                .font(.headline)
                .lineLimit(1)
            Text("\(ScriptStats.summary(script.body)) · \(script.updatedAt.formatted(.relative(presentation: .named)))")
                .font(.subheadline)
                .foregroundStyle(.secondary)
                .lineLimit(1)
        }
        .padding(.vertical, 4)
    }
}
