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
        let env = ProcessInfo.processInfo.environment
        if let dir = env["SCREENSHOT_DIR"], !dir.isEmpty {
            let file = "\(env["SCREENSHOT_PREFIX"] ?? "")\(name).png"
            try? shot.pngRepresentation.write(to: URL(fileURLWithPath: dir).appendingPathComponent(file))
        }
    }

    private func element(_ app: XCUIApplication, labelContaining text: String) -> XCUIElement {
        app.descendants(matching: .any).matching(NSPredicate(format: "label CONTAINS %@", text)).firstMatch
    }

    /// The shutter's identifier is fixed, so find its current state by label.
    private func button(_ app: XCUIApplication, label: String) -> XCUIElement {
        app.buttons.matching(NSPredicate(format: "label == %@", label)).firstMatch
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

    func testRecordReviewSaveAndRetake() throws {
        let app = launch(["-UITestPro"])
        // Allow Photos access if the system asks.
        addUIInterruptionMonitor(withDescription: "Photos permission") { alert in
            for label in ["Allow Full Access", "Allow", "OK"] where alert.buttons[label].exists {
                alert.buttons[label].tap()
                return true
            }
            return false
        }
        openListingScript(app)
        app.buttons["openPrompter"].tap()

        let shutter = app.buttons["recordButton"]
        XCTAssertTrue(shutter.waitForExistence(timeout: 10))
        XCTAssertTrue(shutter.isEnabled, "Camera stand in should be running")
        shutter.tap()                     // 3 second countdown, then recording
        sleep(5)
        XCTAssertTrue(button(app, label: "Stop recording").exists, "Should be recording after the countdown")
        snap("13-recording")
        button(app, label: "Stop recording").tap()

        let save = app.buttons["Save to Photos"]
        XCTAssertTrue(save.waitForExistence(timeout: 20), "Review screen should open after stopping")
        sleep(1)
        snap("14-review")
        save.tap()
        app.tap() // lets the interruption monitor handle a permission alert if one appeared
        XCTAssertTrue(app.buttons["Saved to Photos"].waitForExistence(timeout: 15), "Take should save to Photos")
        snap("15-saved")

        app.buttons["New take"].tap()
        XCTAssertTrue(shutter.waitForExistence(timeout: 10), "Back on the record screen for another take")
        XCTAssertTrue(button(app, label: "Start recording").exists)
    }

    func testRetakeAsksBeforeThrowingAwayAnUnsavedTake() throws {
        let app = launch(["-UITestPro"])
        openListingScript(app)
        app.buttons["openPrompter"].tap()
        let shutter = app.buttons["recordButton"]
        XCTAssertTrue(shutter.waitForExistence(timeout: 10))
        shutter.tap()
        sleep(5)
        button(app, label: "Stop recording").tap()
        XCTAssertTrue(app.buttons["Retake"].waitForExistence(timeout: 20))
        app.buttons["Retake"].tap()
        XCTAssertTrue(app.buttons["Discard take"].waitForExistence(timeout: 5), "Should confirm before discarding")
        app.buttons["Discard take"].tap()
        XCTAssertTrue(shutter.waitForExistence(timeout: 10))
    }

    func testWritingEditingAndDeletingAScript() throws {
        let app = launch(["-UITestPro"])
        let add = app.buttons["newScript"]
        XCTAssertTrue(add.waitForExistence(timeout: 20))
        add.tap()
        let editor = app.textViews["scriptEditor"]
        XCTAssertTrue(editor.waitForExistence(timeout: 10))
        XCTAssertFalse(app.buttons["openPrompter"].isEnabled, "Record is off until there's a script")
        editor.tap()
        editor.typeText("Quick test script\nSecond line here.")
        XCTAssertTrue(app.buttons["openPrompter"].isEnabled)
        app.navigationBars.buttons.element(boundBy: 0).tap()

        let row = element(app, labelContaining: "Quick test script")
        XCTAssertTrue(row.waitForExistence(timeout: 10), "New script is saved in the list")
        row.swipeLeft()
        app.buttons["Delete"].tap()
        XCTAssertFalse(element(app, labelContaining: "Quick test script").waitForExistence(timeout: 2))

        // An empty new script isn't kept.
        add.tap()
        XCTAssertTrue(editor.waitForExistence(timeout: 10))
        app.navigationBars.buttons.element(boundBy: 0).tap()
        XCTAssertFalse(element(app, labelContaining: "Untitled script").waitForExistence(timeout: 2))
    }

    func testLargeTextSizes() throws {
        let app = XCUIApplication()
        app.launchArguments = ["-UITest", "-UITestSeed", "-UITestPro",
                               "-UIPreferredContentSizeCategoryName", "UICTContentSizeCategoryAccessibilityXL"]
        app.launch()
        XCTAssertTrue(element(app, labelContaining: "Listing video").waitForExistence(timeout: 20))
        snap("16-large-text-scripts")
        openListingScript(app)
        snap("17-large-text-editor")
        app.navigationBars.buttons.element(boundBy: 0).tap()
        app.buttons["connectClaude"].tap()
        XCTAssertTrue(app.navigationBars["Connect Claude"].waitForExistence(timeout: 10))
        snap("18-large-text-connect")
        app.buttons["Done"].tap()
        app.buttons["settingsButton"].tap()
        XCTAssertTrue(app.navigationBars["Settings"].waitForExistence(timeout: 10))
        snap("19-large-text-settings")
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
