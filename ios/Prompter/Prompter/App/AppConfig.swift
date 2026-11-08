import Foundation

enum AppConfig {
    /// Hosted on the website. Must be live before the app is submitted.
    static let privacyURL = URL(string: "https://getappointly.co/prompter/privacy")!
    /// Apple's standard license agreement, which App Review accepts as the terms of use.
    static let termsURL = URL(string: "https://www.apple.com/legal/internet-services/itunes/dev/stdeula/")!
    static let supportURL = URL(string: "mailto:patrick@getappointly.co?subject=Prompter%20support")!

    /// Links from the Claude connector open the app as prompterapp://open?id=...
    /// Must match CFBundleURLSchemes in Config/Info.plist and APP_SCHEME on the website.
    static let urlScheme = "prompterapp"
    /// The MCP connector people add to Claude.
    static let connectorURL = "https://getappointly.co/prompter/mcp"
    static let claudeConnectorsURL = URL(string: "https://claude.ai/settings/connectors")!
    /// Where the app reads (then deletes) a script an assistant set up.
    static let shareAPI = URL(string: "https://getappointly.co/api/prompter/s/")!

    private static let arguments = ProcessInfo.processInfo.arguments
    /// Set by the UI tests: no camera, fresh storage, no first launch paywall.
    static let isUITest = arguments.contains("-UITest")
    static let forcePro = isUITest && arguments.contains("-UITestPro")
    static let seedSamples = isUITest && arguments.contains("-UITestSeed")
}

/// UserDefaults keys. Defaults live next to each @AppStorage use and match these.
enum Pref {
    static let fontSize = "prompter.fontSize"      // Double, default 40
    static let speed = "prompter.speed"            // Double, default 4
    static let countdown = "prompter.countdown"    // Int, default 3
    static let mirror = "prompter.mirror"          // Bool, default false
    static let camera = "camera.position"          // String, "front" or "back"
    static let quality = "camera.quality"          // String, VideoQuality raw value
    static let didOnboard = "app.didOnboard"       // Bool

    static let fontRange: ClosedRange<Double> = 24...80
    static let speedRange: ClosedRange<Double> = 1...12
}
