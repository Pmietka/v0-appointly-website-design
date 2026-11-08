import Foundation
import Observation

/// A script an assistant set up through the Prompter connector (see
/// app/prompter/mcp/route.ts on the website). Matches the JSON served by
/// /api/prompter/s/{id}.
struct SharedRecording: Decodable, Equatable {
    struct Settings: Decodable, Equatable {
        var speed: Int?
        var fontSize: Int?
        var countdown: Int?
        var camera: String?
        var mirror: Bool?
    }

    let title: String
    let script: String
    let settings: Settings
}

/// Turns a tapped link into a script in the library, with the prompter set up
/// the way the assistant chose, and asks the UI to open the record screen.
@MainActor
@Observable
final class ShareImporter {
    enum Phase: Equatable {
        case idle
        case loading
        case failed(String)
    }

    /// Changes every time a link should open the record screen.
    struct OpenRequest: Equatable {
        let scriptID: UUID
        let token = UUID()
    }

    private(set) var phase: Phase = .idle
    private(set) var openRequest: OpenRequest?
    /// True while the record screen is up. Navigation to a new script waits
    /// for it to close, so a link can't pull the screen away mid take.
    var prompterActive = false
    @ObservationIgnored private var autoRecordScriptID: UUID?
    @ObservationIgnored private var lastURL: URL?

    @ObservationIgnored private let store: ScriptStore
    @ObservationIgnored private let session: URLSession
    @ObservationIgnored private let defaults: UserDefaults
    @ObservationIgnored private let apiBase: URL

    init(store: ScriptStore, session: URLSession = .shared, defaults: UserDefaults = .standard, apiBase: URL = AppConfig.shareAPI) {
        self.store = store
        self.session = session
        self.defaults = defaults
        self.apiBase = apiBase
    }

    /// The share id from prompterapp://open?id=... or https://getappointly.co/prompter/s/...
    nonisolated static func shareID(from url: URL) -> String? {
        var candidate: String?
        if url.scheme?.lowercased() == AppConfig.urlScheme {
            candidate = URLComponents(url: url, resolvingAgainstBaseURL: false)?
                .queryItems?.first { $0.name == "id" }?.value
        } else if url.scheme == "https", url.host == "getappointly.co" {
            let parts = url.pathComponents
            if parts.count == 4, parts[1] == "prompter", parts[2] == "s" { candidate = parts[3] }
        }
        guard let id = candidate, id.range(of: "^[A-Za-z0-9_-]{22}$", options: .regularExpression) != nil else { return nil }
        return id
    }

    func handle(_ url: URL) async {
        guard let id = Self.shareID(from: url) else { return }
        guard phase != .loading else { return }
        lastURL = url
        phase = .loading
        do {
            let recording = try await fetch(id)
            let script = apply(recording)
            phase = .idle
            autoRecordScriptID = script.id
            openRequest = OpenRequest(scriptID: script.id)
            // The script is safely on the phone now, so take it off the server.
            Task { await self.deleteRemote(id) }
        } catch let error as ImportError {
            phase = .failed(error.message)
        } catch {
            phase = .failed(ImportError.network.message)
        }
    }

    func retry() async {
        guard let url = lastURL else { return }
        phase = .idle
        await handle(url)
    }

    func dismissError() {
        phase = .idle
    }

    /// True once for the script a link just opened, so the editor jumps straight to recording.
    func consumeAutoRecord(for id: UUID) -> Bool {
        guard autoRecordScriptID == id else { return false }
        autoRecordScriptID = nil
        return true
    }

    /// Adds the script to the library and makes the assistant's choices the prompter settings.
    @discardableResult
    func apply(_ recording: SharedRecording) -> Script {
        let s = recording.settings
        if let speed = s.speed { defaults.set(Double(min(12, max(1, speed))), forKey: Pref.speed) }
        if let size = s.fontSize { defaults.set(Double(min(80, max(24, size))), forKey: Pref.fontSize) }
        if let countdown = s.countdown, [0, 3, 5].contains(countdown) { defaults.set(countdown, forKey: Pref.countdown) }
        if let camera = s.camera, camera == "front" || camera == "back" { defaults.set(camera, forKey: Pref.camera) }
        if let mirror = s.mirror { defaults.set(mirror, forKey: Pref.mirror) }
        let title = recording.title.trimmingCharacters(in: .whitespacesAndNewlines)
        return store.create(body: recording.script, title: title.isEmpty ? nil : title)
    }

    // MARK: Network

    enum ImportError: Error {
        case expired, network, unavailable, invalid

        var message: String {
            switch self {
            case .expired: return "This link has expired or was already opened. Ask Claude to set up the recording again for a fresh link."
            case .network: return "Couldn't load the script. Check your connection and try again."
            case .unavailable: return "Prompter's server is having a moment. Try again in a minute."
            case .invalid: return "That link didn't contain a script Prompter can read."
            }
        }
    }

    private func fetch(_ id: String) async throws -> SharedRecording {
        if AppConfig.isUITest, id == Self.uiTestShareID { return Self.uiTestRecording }
        var request = URLRequest(url: apiBase.appendingPathComponent(id))
        request.cachePolicy = .reloadIgnoringLocalCacheData
        request.timeoutInterval = 20
        let (data, response) = try await session.data(for: request)
        let status = (response as? HTTPURLResponse)?.statusCode ?? 0
        switch status {
        case 200:
            guard let recording = try? JSONDecoder().decode(SharedRecording.self, from: data),
                  !recording.script.trimmingCharacters(in: .whitespacesAndNewlines).isEmpty else {
                throw ImportError.invalid
            }
            return recording
        case 404: throw ImportError.expired
        case 500...599: throw ImportError.unavailable
        default: throw ImportError.network
        }
    }

    private func deleteRemote(_ id: String) async {
        if AppConfig.isUITest { return }
        var request = URLRequest(url: apiBase.appendingPathComponent(id))
        request.httpMethod = "DELETE"
        _ = try? await session.data(for: request)
    }

    // MARK: UI test stand in for the server

    nonisolated static let uiTestShareID = "uitestshare00000000001"
    static let uiTestRecording = SharedRecording(
        title: "From Claude: spring tune-up",
        script: """
        Your AC worked hard last summer. Give it ten minutes of attention before it has to do it again.

        A spring tune-up catches the small stuff, like a weak capacitor or a clogged filter, before it turns into a ninety degree day with no cooling.

        Book yours this week with the link below, and you're set for the season.
        """,
        settings: .init(speed: 5, fontSize: 48, countdown: 3, camera: "front", mirror: false)
    )
}
