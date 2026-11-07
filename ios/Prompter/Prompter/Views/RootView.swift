import SwiftUI

struct RootView: View {
    @Environment(SubscriptionStore.self) private var subscriptions
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
    }
}
