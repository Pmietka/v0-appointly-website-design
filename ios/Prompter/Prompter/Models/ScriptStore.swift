import Foundation
import Observation

/// Scripts live in one JSON file on the device. No account, no sync, nothing
/// leaves the phone.
@Observable
final class ScriptStore {
    private(set) var scripts: [Script] = []
    private let fileURL: URL

    var sortedScripts: [Script] {
        scripts.sorted { $0.updatedAt > $1.updatedAt }
    }

    init(fileURL: URL, seedIfEmpty: Bool) {
        self.fileURL = fileURL
        let isFirstLaunch = !FileManager.default.fileExists(atPath: fileURL.path)
        load()
        if isFirstLaunch && seedIfEmpty {
            create(body: SampleScripts.welcome)
        }
    }

    static func makeDefault() -> ScriptStore {
        if AppConfig.isUITest {
            let url = FileManager.default.temporaryDirectory
                .appendingPathComponent("uitest-scripts-\(UUID().uuidString).json")
            let store = ScriptStore(fileURL: url, seedIfEmpty: false)
            if AppConfig.seedSamples {
                for body in SampleScripts.uiTest { store.create(body: body) }
            }
            return store
        }
        let dir = FileManager.default.urls(for: .applicationSupportDirectory, in: .userDomainMask)[0]
        try? FileManager.default.createDirectory(at: dir, withIntermediateDirectories: true)
        return ScriptStore(fileURL: dir.appendingPathComponent("scripts.json"), seedIfEmpty: true)
    }

    func script(_ id: UUID) -> Script? {
        scripts.first { $0.id == id }
    }

    @discardableResult
    func create(body: String = "", title: String? = nil) -> Script {
        let script = Script(body: body, customTitle: title)
        scripts.append(script)
        save()
        return script
    }

    func update(_ id: UUID, body: String) {
        guard let index = scripts.firstIndex(where: { $0.id == id }), scripts[index].body != body else { return }
        scripts[index].body = body
        scripts[index].updatedAt = Date()
        save()
    }

    func delete(_ id: UUID) {
        scripts.removeAll { $0.id == id }
        save()
    }

    private func load() {
        guard let data = try? Data(contentsOf: fileURL),
              let decoded = try? JSONDecoder().decode([Script].self, from: data) else {
            scripts = []
            return
        }
        scripts = decoded
    }

    private func save() {
        do {
            let data = try JSONEncoder().encode(scripts)
            try data.write(to: fileURL, options: [.atomic, .completeFileProtection])
        } catch {
            print("Prompter: couldn't save scripts: \(error)")
        }
    }
}

enum SampleScripts {
    static let welcome = """
    Welcome to Prompter

    Tap Record and this text scrolls right under your camera, so you can read it while looking at the lens.

    Tap the text to pause or keep going. Drag it to move back or skip ahead. Use Speed and Size to get it just right.

    Turn your phone sideways to film in landscape.

    When you're ready, delete this script and paste your own.
    """

    static let uiTest = [
        """
        Monday tip: stop memorizing your scripts

        Here's the thing nobody tells you about filming. You don't need to memorize anything. Put your words on the screen, look at the lens, and talk like you're talking to one person.
        """,
        """
        Listing video: 1420 Maple Ave

        Welcome to 1420 Maple Avenue. Four bedrooms, three baths, and a backyard that was made for summer nights. Let me walk you through it.

        The kitchen was redone last year. Quartz counters, a six burner range, and a pantry you could get lost in.

        Upstairs, the main bedroom has its own balcony and a bathroom with a walk in shower.

        If you want to see it in person, the link to book a showing is below. Let's get you home.
        """,
    ]
}
