import SwiftUI

@main
struct PrompterApp: App {
    @UIApplicationDelegateAdaptor(AppDelegate.self) private var appDelegate
    @State private var scripts: ScriptStore
    @State private var subscriptions: SubscriptionStore
    @State private var importer: ShareImporter

    init() {
        if AppConfig.isUITest {
            // Every UI test run starts from a clean slate.
            if let id = Bundle.main.bundleIdentifier {
                UserDefaults.standard.removePersistentDomain(forName: id)
            }
            UserDefaults.standard.set(true, forKey: Pref.didOnboard)
        }
        DispatchQueue.global(qos: .utility).async { CameraController.purgeOldTakes() }
        let store = ScriptStore.makeDefault()
        _scripts = State(initialValue: store)
        _subscriptions = State(initialValue: SubscriptionStore(forcePro: AppConfig.forcePro))
        _importer = State(initialValue: ShareImporter(store: store))
    }

    var body: some Scene {
        WindowGroup {
            RootView()
                .environment(scripts)
                .environment(subscriptions)
                .environment(importer)
                .preferredColorScheme(.dark)
        }
    }
}

/// Only here so the prompter can hold the screen still while a take is
/// recording. Everything else about orientation is left to the system.
final class AppDelegate: NSObject, UIApplicationDelegate {
    static var orientationMask: UIInterfaceOrientationMask = .allButUpsideDown

    func application(_ application: UIApplication, supportedInterfaceOrientationsFor window: UIWindow?) -> UIInterfaceOrientationMask {
        AppDelegate.orientationMask
    }
}

enum OrientationLock {
    static var activeScene: UIWindowScene? {
        let scenes = UIApplication.shared.connectedScenes.compactMap { $0 as? UIWindowScene }
        return scenes.first { $0.activationState == .foregroundActive } ?? scenes.first
    }

    static var interfaceOrientation: UIInterfaceOrientation {
        activeScene?.effectiveGeometry.interfaceOrientation ?? .portrait
    }

    /// Freeze the screen in whatever way the phone is held right now.
    static func lockCurrent() {
        switch interfaceOrientation {
        case .landscapeLeft: AppDelegate.orientationMask = .landscapeLeft
        case .landscapeRight: AppDelegate.orientationMask = .landscapeRight
        default: AppDelegate.orientationMask = .portrait
        }
        refresh()
    }

    static func unlock() {
        AppDelegate.orientationMask = .allButUpsideDown
        refresh()
    }

    private static func refresh() {
        guard let scene = activeScene else { return }
        for window in scene.windows {
            var controller = window.rootViewController
            while let current = controller {
                current.setNeedsUpdateOfSupportedInterfaceOrientations()
                controller = current.presentedViewController
            }
        }
    }
}
