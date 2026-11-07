import StoreKit
import StoreKitTest
import UIKit
import XCTest
@testable import Prompter

final class ScriptTests: XCTestCase {
    func testTitleUsesFirstLineWithWords() {
        XCTAssertEqual(Script.title(for: "\n\n   Hello there  \nSecond line"), "Hello there")
    }

    func testTitleFallsBackWhenEmpty() {
        XCTAssertEqual(Script.title(for: "  \n \n"), "Untitled script")
    }

    func testLongTitleIsShortened() {
        let title = Script.title(for: String(repeating: "a", count: 100))
        XCTAssertEqual(title.count, 61)
        XCTAssertTrue(title.hasSuffix("…"))
    }

    func testWordCountIgnoresExtraSpacesAndLines() {
        XCTAssertEqual(ScriptStats.wordCount("one\ntwo\n\nthree   four "), 4)
        XCTAssertEqual(ScriptStats.wordCount("   "), 0)
    }

    func testReadTimeIs150WordsPerMinute() {
        let text = Array(repeating: "word", count: 150).joined(separator: " ")
        XCTAssertEqual(ScriptStats.readSeconds(text), 60, accuracy: 0.001)
    }

    func testDurationFormatting() {
        XCTAssertEqual(ScriptStats.formatDuration(0), "0:00")
        XCTAssertEqual(ScriptStats.formatDuration(65), "1:05")
        XCTAssertEqual(ScriptStats.formatDuration(600), "10:00")
        XCTAssertEqual(ScriptStats.formatDuration(-4), "0:00")
    }
}

final class PrompterEngineTests: XCTestCase {
    func testSpeedEightIsOneLinePerSecond() {
        let line = 40 * PrompterEngine.lineHeightMultiple
        XCTAssertEqual(PrompterEngine.pointsPerSecond(speed: 8, fontSize: 40), line, accuracy: 0.0001)
    }

    func testSpeedScalesWithTextSize() {
        XCTAssertEqual(PrompterEngine.pointsPerSecond(speed: 4, fontSize: 80),
                       2 * PrompterEngine.pointsPerSecond(speed: 4, fontSize: 40), accuracy: 0.0001)
    }

    func testTapAtTheEndStartsOver() {
        let engine = PrompterEngine()
        engine.reachedEnd = true
        engine.toggle()
        XCTAssertTrue(engine.isRunning)
        XCTAssertFalse(engine.reachedEnd)
        engine.toggle()
        XCTAssertFalse(engine.isRunning)
    }

    @MainActor
    func testScrollerKeepsShortLinesSideways() throws {
        let host = PrompterScrollHost(engine: PrompterEngine())
        host.frame = CGRect(x: 0, y: 0, width: 800, height: 250)
        host.configure(text: SampleScripts.welcome, fontSize: 40, mirrored: false, column: .leading)
        host.layoutIfNeeded()
        let scroll = try XCTUnwrap(host.subviews.first as? UIScrollView)
        let label = try XCTUnwrap(scroll.subviews.first { $0 is UILabel })
        XCTAssertEqual(label.frame.minX, 20, accuracy: 0.5, "Sideways text hugs the camera side")
        XCTAssertLessThanOrEqual(label.frame.width, 40 * 15 + 0.5, "About 15 ems wide at most")
        XCTAssertGreaterThan(scroll.contentSize.height, scroll.bounds.height, "Long script should be scrollable")
    }
}

final class ScriptStoreTests: XCTestCase {
    private func tempURL() -> URL {
        FileManager.default.temporaryDirectory.appendingPathComponent("scripts-\(UUID().uuidString).json")
    }

    func testScriptsPersistAcrossLaunches() {
        let url = tempURL()
        defer { try? FileManager.default.removeItem(at: url) }

        let first = ScriptStore(fileURL: url, seedIfEmpty: false)
        let script = first.create(body: "First draft")
        first.update(script.id, body: "Final version")

        let second = ScriptStore(fileURL: url, seedIfEmpty: false)
        XCTAssertEqual(second.scripts.count, 1)
        XCTAssertEqual(second.scripts.first?.body, "Final version")

        second.delete(script.id)
        XCTAssertTrue(ScriptStore(fileURL: url, seedIfEmpty: false).scripts.isEmpty)
    }

    func testWelcomeScriptOnlyOnFirstLaunch() {
        let url = tempURL()
        defer { try? FileManager.default.removeItem(at: url) }

        let first = ScriptStore(fileURL: url, seedIfEmpty: true)
        XCTAssertEqual(first.scripts.count, 1)
        XCTAssertEqual(first.scripts.first?.title, "Welcome to Prompter")
        first.delete(first.scripts[0].id)

        XCTAssertTrue(ScriptStore(fileURL: url, seedIfEmpty: true).scripts.isEmpty, "Deleting the welcome script should stick")
    }

    func testNewestScriptListsFirst() {
        let url = tempURL()
        defer { try? FileManager.default.removeItem(at: url) }
        let store = ScriptStore(fileURL: url, seedIfEmpty: false)
        let old = store.create(body: "Old")
        let new = store.create(body: "New")
        XCTAssertEqual(store.sortedScripts.map(\.id), [new.id, old.id])
        store.update(old.id, body: "Old, edited")
        XCTAssertEqual(store.sortedScripts.first?.id, old.id)
    }
}

final class PaywallTextTests: XCTestCase {
    func testTrialLabels() {
        XCTAssertEqual(PaywallText.trialLabel(value: 1, unit: .week), "7-day")
        XCTAssertEqual(PaywallText.trialLabel(value: 3, unit: .day), "3-day")
        XCTAssertEqual(PaywallText.trialLabel(value: 1, unit: .month), "1-month")
    }

    func testYearlySavings() {
        XCTAssertEqual(PaywallText.yearlySavingsPercent(yearly: 39.99, monthly: 6.99), 52)
        XCTAssertNil(PaywallText.yearlySavingsPercent(yearly: 83.88, monthly: 6.99), "No badge when there is no real saving")
        XCTAssertNil(PaywallText.yearlySavingsPercent(yearly: 10, monthly: 0))
    }
}

/// Runs the real StoreKit code against the local App Store simulation in
/// Config/Prompter.storekit, so product IDs, the free trial and the purchase
/// path are all checked on every build.
final class SubscriptionTests: XCTestCase {
    private func makeSession() throws -> SKTestSession {
        let url = URL(fileURLWithPath: #filePath)
            .deletingLastPathComponent()
            .deletingLastPathComponent()
            .appendingPathComponent("Config/Prompter.storekit")
        let session = try SKTestSession(contentsOf: url)
        session.disableDialogs = true
        session.clearTransactions()
        return session
    }

    @MainActor
    func testBothPlansLoadWithAOneWeekFreeTrial() async throws {
        let session = try makeSession()
        defer { session.clearTransactions() }

        let products = try await Product.products(for: SubscriptionStore.productIDs)
        XCTAssertEqual(Set(products.map(\.id)), Set(SubscriptionStore.productIDs))
        for product in products {
            let offer = try XCTUnwrap(product.subscription?.introductoryOffer, "\(product.id) has no trial")
            XCTAssertEqual(offer.paymentMode, .freeTrial)
            XCTAssertEqual(PaywallText.trialLabel(offer), "7-day")
        }
        let yearly = try XCTUnwrap(products.first { $0.id == SubscriptionStore.yearlyID })
        XCTAssertEqual(PaywallText.periodSuffix(yearly), "/year")
        let monthly = try XCTUnwrap(products.first { $0.id == SubscriptionStore.monthlyID })
        XCTAssertEqual(PaywallText.periodSuffix(monthly), "/month")
    }

    @MainActor
    func testBuyingUnlocksPro() async throws {
        let session = try makeSession()
        defer { session.clearTransactions() }

        let store = SubscriptionStore()
        let product = try XCTUnwrap(try await Product.products(for: [SubscriptionStore.monthlyID]).first)
        let isEligible = await store.isEligibleForTrial(product)
        XCTAssertTrue(isEligible, "A new customer should get the free trial")

        let purchased = await store.purchase(product)
        XCTAssertTrue(purchased)
        XCTAssertTrue(store.isPro)
    }
}
