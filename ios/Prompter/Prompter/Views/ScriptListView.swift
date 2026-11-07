import SwiftUI

struct ScriptListView: View {
    @Environment(ScriptStore.self) private var store
    @Environment(SubscriptionStore.self) private var subscriptions
    @State private var path: [UUID] = []
    @State private var showSettings = false

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
    }

    private var list: some View {
        List {
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
