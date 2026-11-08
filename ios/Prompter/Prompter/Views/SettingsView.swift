import SwiftUI

struct SettingsView: View {
    @Environment(SubscriptionStore.self) private var subscriptions
    @Environment(\.dismiss) private var dismiss

    @AppStorage(Pref.fontSize) private var fontSize: Double = 40
    @AppStorage(Pref.speed) private var speed: Double = 4
    @AppStorage(Pref.countdown) private var countdown: Int = 3
    @AppStorage(Pref.mirror) private var mirror = false
    @AppStorage(Pref.camera) private var camera = "front"
    @AppStorage(Pref.quality) private var quality = VideoQuality.hd.rawValue

    @State private var showPaywall = false
    @State private var showManage = false
    @State private var showConnect = false

    var body: some View {
        NavigationStack {
            Form {
                Section("Subscription") {
                    if subscriptions.isPro {
                        Label("Prompter Pro is active", systemImage: "checkmark.seal.fill")
                        Button("Manage subscription") { showManage = true }
                    } else {
                        Button("Start free trial") { showPaywall = true }
                    }
                    Button("Restore purchases") { Task { await subscriptions.restore() } }
                }

                Section {
                    Button {
                        showConnect = true
                    } label: {
                        Label("Connect Claude", systemImage: "sparkles")
                    }
                } header: {
                    Text("AI")
                } footer: {
                    Text("Claude writes your script, sets up the prompter and sends you a link that opens Prompter ready to record.")
                }

                Section {
                    VStack(alignment: .leading, spacing: 6) {
                        LabeledContent("Text size", value: "\(Int(fontSize))")
                        Slider(value: $fontSize, in: Pref.fontRange, step: 2)
                    }
                    VStack(alignment: .leading, spacing: 6) {
                        LabeledContent("Scroll speed", value: "\(Int(speed))")
                        Slider(value: $speed, in: Pref.speedRange, step: 1)
                    }
                    Picker("Countdown", selection: $countdown) {
                        Text("Off").tag(0)
                        Text("3 seconds").tag(3)
                        Text("5 seconds").tag(5)
                    }
                    Toggle("Mirror text", isOn: $mirror)
                } header: {
                    Text("Prompter")
                } footer: {
                    Text("Mirror text is only for teleprompter glass rigs. You can also change speed and size while recording.")
                }

                Section {
                    Picker("Start with", selection: $camera) {
                        Text("Front camera").tag("front")
                        Text("Back camera").tag("back")
                    }
                    Picker("Quality", selection: $quality) {
                        ForEach(VideoQuality.allCases) { option in
                            Text(option.label).tag(option.rawValue)
                        }
                    }
                } header: {
                    Text("Camera")
                } footer: {
                    Text("4K takes use about four times the storage. If a camera can't do 4K, Prompter records in 1080p.")
                }

                Section("About") {
                    Link("Help", destination: AppConfig.helpURL)
                    Link("Privacy policy", destination: AppConfig.privacyURL)
                    Link("Terms of use", destination: AppConfig.termsURL)
                    Link("Contact support", destination: AppConfig.supportURL)
                    LabeledContent("Version", value: Self.version)
                }
            }
            .navigationTitle("Settings")
            .navigationBarTitleDisplayMode(.inline)
            .toolbar {
                ToolbarItem(placement: .confirmationAction) {
                    Button("Done") { dismiss() }
                }
            }
        }
        .manageSubscriptionsSheet(isPresented: $showManage)
        .sheet(isPresented: $showConnect) { ConnectAIView() }
        .sheet(isPresented: $showPaywall) {
            PaywallView().environment(subscriptions)
        }
        .alert("Subscription", isPresented: Binding(get: { subscriptions.errorMessage != nil }, set: { if !$0 { subscriptions.errorMessage = nil } })) {
            Button("OK", role: .cancel) {}
        } message: {
            Text(subscriptions.errorMessage ?? "")
        }
    }

    static var version: String {
        let info = Bundle.main.infoDictionary
        let short = info?["CFBundleShortVersionString"] as? String ?? "1.0"
        let build = info?["CFBundleVersion"] as? String ?? "1"
        return "\(short) (\(build))"
    }
}
