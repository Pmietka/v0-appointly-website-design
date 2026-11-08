import SwiftUI

struct RootView: View {
    @Environment(SubscriptionStore.self) private var subscriptions
    @Environment(ShareImporter.self) private var importer
    @Environment(ScriptStore.self) private var store
    @Environment(\.scenePhase) private var scenePhase
    @AppStorage(Pref.didOnboard) private var didOnboard = false
    @State private var showPaywall = false

    var body: some View {
        ScriptListView()
            .onAppear {
                // One look at the trial on first launch. After that it only
                // shows up when someone taps Record.
                guard !didOnboard else { return }
                didOnboard = true
                if !subscriptions.isPro { showPaywall = true }
            }
            .sheet(isPresented: $showPaywall) {
                PaywallView().environment(subscriptions)
            }
            .onChange(of: scenePhase) { _, phase in
                guard phase == .active else { return }
                // Trials and subscriptions can end while the app sits in the
                // background; expirations don't arrive as transaction updates.
                Task { await subscriptions.refreshEntitlements() }
                store.reloadIfNeeded()
            }
            // Links from Claude (prompterapp://open?id=...) land here.
            .onOpenURL { url in
                Task { await importer.handle(url) }
            }
            .onChange(of: importer.phase) { _, phase in
                // A script link wins over the first launch trial screen.
                if phase == .loading { showPaywall = false }
            }
            .overlay {
                if importer.phase == .loading {
                    ZStack {
                        Color.black.opacity(0.6).ignoresSafeArea()
                        VStack(spacing: 14) {
                            ProgressView().controlSize(.large)
                            Text("Loading your script").font(.headline)
                        }
                        .padding(28)
                        .background(.ultraThinMaterial, in: RoundedRectangle(cornerRadius: 20))
                    }
                    .transition(.opacity)
                }
            }
            .alert("Couldn't open that script", isPresented: Binding(
                get: { if case .failed = importer.phase { return true } else { return false } },
                set: { if !$0 { importer.dismissError() } }
            )) {
                Button("Try again") { Task { await importer.retry() } }
                Button("OK", role: .cancel) { importer.dismissError() }
            } message: {
                if case .failed(let message) = importer.phase { Text(message) }
            }
    }
}
