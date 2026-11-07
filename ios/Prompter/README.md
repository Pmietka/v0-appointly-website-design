# Prompter for iPhone

A teleprompter camera. Paste a script, hit Record, and the script scrolls right
under the camera while you film, upright or sideways. Free trial, then a
subscription.

What's in it, and nothing else:

- **Scripts:** a list of scripts saved on the phone. Paste, type, edit, swipe to delete.
- **Prompter:** the script scrolls in a band next to the lens. Tap to pause or
  resume, drag to jump around, change speed and text size while recording,
  jump back to the top, optional 3 or 5 second countdown, mirror mode for
  glass rigs.
- **Camera:** front or back, 1080p or 4K, HEVC, stabilization on. The screen
  holds still while a take records, and the video is always upright in the
  file however the phone was held.
- **Sideways:** its own layout. The text hugs the side the camera is on, and
  the shutter moves to the far side like the Camera app.
- **Review:** watch the take, save it to Photos, share it, or go again.
- **Subscription:** monthly and yearly plans with a free trial (StoreKit 2,
  no third party SDK). Restore and manage subscription in Settings.
- **Privacy:** no account, no analytics, no tracking, no watermark. Nothing
  leaves the phone.

## Run it on your iPhone

You need a Mac with Xcode 16 or newer.

1. Open `ios/Prompter/Prompter.xcodeproj` in Xcode.
2. Click the **Prompter** project, then the **Prompter** target, then
   **Signing & Capabilities**. Pick your **Team** (sign in with your Apple ID
   if asked).
3. If Xcode says the bundle ID is taken, change **Bundle Identifier** to
   something unique to you, for example `com.yourname.prompter`.
4. Plug in your iPhone, pick it at the top of the Xcode window, press **Run**.

To try the paywall and a fake purchase without paying: **Product > Scheme >
Edit Scheme > Run > Options > StoreKit Configuration** and pick
`Config/Prompter.storekit`. Purchases made this way are simulated.

## Put it on the App Store

1. **Join the Apple Developer Program** ($99/year) at developer.apple.com.
2. **Sign the Paid Apps Agreement** in App Store Connect under **Business**
   (add your bank and tax info). Subscriptions don't work until this is done.
3. **Create the app** in App Store Connect: **Apps > + > New App**, iOS, the
   bundle ID from step 3 above, and a name. The name has to be unique on the
   App Store, so something like "Prompter: Teleprompter Camera" rather than
   plain "Prompter".
4. **Create the subscriptions** under the app's **Subscriptions**:
   - Subscription group: `Prompter Pro`
   - Product ID `pro.yearly`, 1 year, for example $39.99
   - Product ID `pro.monthly`, 1 month, for example $6.99
   - On each one, **Subscription Prices > Introductory Offers > Free, 1 week**
   - Fill in the display name and description for each.

   The product IDs must match exactly. Prices and trial length can be anything:
   the app reads them from the App Store.
5. **App Privacy:** choose "Data Not Collected".
   **Privacy Policy URL:** `https://getappointly.co/prompter/privacy`
   (this page is in the website repo and must be live).
6. **Screenshots:** the CI run saves screenshots on every build (see below).
   For the listing, take them on a real iPhone so the camera shows a real
   person.
7. **Upload:** in Xcode pick **Any iOS Device**, then **Product > Archive >
   Distribute App > App Store Connect**. When it shows up in App Store Connect,
   attach the build, attach both subscriptions to the version, and submit.

App Review usually takes one to three days. Reviewers test the purchase with a
sandbox account, so make sure step 2 is done first.

## Things to change before launch

- `AppConfig.swift`: support email and privacy URL.
- Bundle ID and team (see above).
- `INFOPLIST_KEY_CFBundleDisplayName` in the target's build settings is the name
  under the icon (currently "Prompter").

## How it's checked

`.github/workflows/ios.yml` runs on every push that touches `ios/`, on a Mac:

1. Builds the app and runs the unit tests, including a full simulated App Store
   purchase against `Config/Prompter.storekit`, so the product IDs, the free
   trial and the unlock path are checked every time.
2. Runs UI tests that walk through the scripts list, editor, recording screen
   (upright, and sideways with the camera on each side), paywall and settings,
   saving a screenshot of each.
3. Builds a Release version for a real iPhone (unsigned) to catch device only
   problems.

Screenshots and logs are attached to each run as `ios-results`.

The simulator has no camera, so recording itself has to be tried on a real
iPhone. That's the one thing CI can't check.

## Code map

| Folder | What's there |
| --- | --- |
| `Prompter/App` | App entry, orientation lock, settings keys |
| `Prompter/Models` | Scripts and on device storage |
| `Prompter/Camera` | Capture session, recording, rotation |
| `Prompter/Prompter` | The scrolling text (UIKit, 120Hz) |
| `Prompter/Store` | Subscriptions (StoreKit 2) and paywall wording |
| `Prompter/Views` | All screens |
| `PrompterTests` | Unit and StoreKit tests |
| `PrompterUITests` | Screenshot walkthrough |
| `Config` | Info.plist extras, StoreKit test file |
