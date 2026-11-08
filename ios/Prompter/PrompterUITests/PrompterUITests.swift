import XCTest

/// Walks the main screens and saves a screenshot of each, upright and
/// sideways. CI publishes them so every build can be checked by eye.
final class PrompterUITests: XCTestCase {
    override func setUpWithError() throws {
        continueAfterFailure = false
        XCUIDevice.shared.orientation = .portrait
    }

    override func tearDownWithError() throws {
        XCUIDevice.shared.orientation = .portrait
    }

    private func launch(_ extra: [String]) -> XCUIApplication {
        let app = XCUIApplication()
        app.launchArguments = ["-UITest", "-UITestSeed"] + extra
        app.launch()
        return app
    }

    private func snap(_ name: String) {
        let shot = XCUIScreen.main.screenshot()
        let attachment = XCTAttachment(screenshot: shot)
        attachment.name = name
        attachment.lifetime = .keepAlways
        add(attachment)
        if let dir = ProcessInfo.processInfo.environment["SCREENSHOT_DIR"], !dir.isEmpty {
            try? shot.pngRepresentation.write(to: URL(fileURLWithPath: dir).appendingPathComponent("\(name).png"))
        }
    }

    private func element(_ app: XCUIApplication, labelContaining text: String) -> XCUIElement {
        app.descendants(matching: .any).matching(NSPredicate(format: "label CONTAINS %@", text)).firstMatch
    }

    private func openListingScript(_ app: XCUIApplication) {
        let row = element(app, labelContaining: "Listing video")
        XCTAssertTrue(row.waitForExistence(timeout: 20), "Seeded script should be listed")
        row.tap()
        XCTAssertTrue(app.buttons["openPrompter"].waitForExistence(timeout: 10))
    }

    func testRecordScreenUprightAndSideways() throws {
        let app = launch(["-UITestPro"])
        XCTAssertTrue(element(app, labelContaining: "Listing video").waitForExistence(timeout: 20))
        snap("01-scripts")

        openListingScript(app)
        snap("02-editor")

        app.buttons["openPrompter"].tap()
        XCTAssertTrue(app.buttons["recordButton"].waitForExistence(timeout: 10))
        snap("03-prompter-ready")

        app.buttons["playButton"].tap()
        sleep(3)
        snap("04-prompter-scrolling")

        XCUIDevice.shared.orientation = .landscapeLeft
        sleep(2)
        XCTAssertTrue(app.buttons["recordButton"].exists)
        snap("05-sideways-camera-left")

        XCUIDevice.shared.orientation = .landscapeRight
        sleep(2)
        XCTAssertTrue(app.buttons["recordButton"].exists)
        snap("06-sideways-camera-right")

        XCUIDevice.shared.orientation = .portrait
        sleep(1)
        app.buttons["Back to script"].tap()
        XCTAssertTrue(app.buttons["openPrompter"].waitForExistence(timeout: 10))
    }

    func testFreeUserGetsTheTrialOfferWhenTheyTapRecord() throws {
        let app = launch([])
        openListingScript(app)
        app.buttons["openPrompter"].tap()

        let shutter = app.buttons["recordButton"]
        XCTAssertTrue(shutter.waitForExistence(timeout: 10))
        shutter.tap()

        let close = app.buttons["closePaywall"]
        if !close.waitForExistence(timeout: 10) {
            snap("07-paywall-missing")
            print("UI HIERARCHY:\n\(app.debugDescription)")
        }
        XCTAssertTrue(close.exists, "Paywall should open")
        sleep(2)
        snap("07-paywall")

        app.buttons["closePaywall"].tap()
        XCTAssertTrue(shutter.waitForExistence(timeout: 10))
    }

    func testClaudeLinkOpensStraightToTheRecordScreen() throws {
        let app = launch(["-UITestPro"])
        XCTAssertTrue(element(app, labelContaining: "Have Claude write").waitForExistence(timeout: 20))
        snap("10-scripts-with-claude-row")

        app.buttons["connectClaude"].tap()
        XCTAssertTrue(app.navigationBars["Connect Claude"].waitForExistence(timeout: 10))
        snap("11-connect-claude")
        app.buttons["Done"].tap()

        // The same link Claude's connector hands out (served by a stand in during UI tests).
        app.open(URL(string: "prompterapp://open?id=uitestshare00000000001")!)
        XCTAssertTrue(app.buttons["recordButton"].waitForExistence(timeout: 15), "Link should land on the record screen")
        sleep(1)
        snap("12-opened-from-claude")

        app.buttons["Back to script"].tap()
        XCTAssertTrue(app.navigationBars["From Claude: spring tune-up"].waitForExistence(timeout: 10),
                      "Script is saved in the library under Claude's title")
    }

    func testSettingsAndSidewaysEditor() throws {
        let app = launch(["-UITestPro"])
        let settings = app.buttons["settingsButton"]
        XCTAssertTrue(settings.waitForExistence(timeout: 20))
        settings.tap()
        XCTAssertTrue(app.navigationBars["Settings"].waitForExistence(timeout: 10))
        snap("08-settings")
        app.buttons["Done"].tap()

        openListingScript(app)
        XCUIDevice.shared.orientation = .landscapeLeft
        sleep(2)
        snap("09-editor-sideways")
    }
}
