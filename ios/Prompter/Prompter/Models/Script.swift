import Foundation

struct Script: Identifiable, Codable, Equatable, Hashable {
    var id = UUID()
    var body: String
    var updatedAt = Date()

    var title: String { Script.title(for: body) }

    /// The first line with words in it, kept short enough for a list row.
    static func title(for body: String) -> String {
        let firstLine = body
            .split(whereSeparator: \.isNewline)
            .map { $0.trimmingCharacters(in: .whitespaces) }
            .first { !$0.isEmpty } ?? ""
        if firstLine.isEmpty { return "Untitled script" }
        return firstLine.count > 60 ? String(firstLine.prefix(60)) + "…" : firstLine
    }
}

enum ScriptStats {
    /// A natural on camera speaking pace.
    static let wordsPerMinute = 150.0

    static func wordCount(_ text: String) -> Int {
        text.split(whereSeparator: { $0.isWhitespace || $0.isNewline }).count
    }

    static func readSeconds(_ text: String) -> Double {
        Double(wordCount(text)) / wordsPerMinute * 60
    }

    static func formatDuration(_ seconds: Double) -> String {
        let total = max(0, Int(seconds.rounded()))
        return String(format: "%d:%02d", total / 60, total % 60)
    }

    static func summary(_ text: String) -> String {
        let words = wordCount(text)
        return "\(words) \(words == 1 ? "word" : "words") · about \(formatDuration(readSeconds(text)))"
    }
}
