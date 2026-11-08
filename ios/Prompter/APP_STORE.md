# App Store listing for Prompter

Everything to paste into App Store Connect. Character limits are Apple's.

## App information

| Field | Value |
| --- | --- |
| Name (30) | `Prompter: Teleprompter Camera` (29). Must be unique on the App Store; if taken, try `Prompter: Script Camera` or `Prompter: Read & Record`. |
| Subtitle (30) | `Your script, right by the lens` (30) |
| Primary category | Photo & Video |
| Secondary category | Productivity |
| Age rating | 4+ (answer "None" to every content question) |
| Privacy Policy URL | `https://getappointly.co/prompter/privacy` |
| Support URL | `https://getappointly.co/prompter/support` |
| Marketing URL | leave empty, or `https://getappointly.co/prompter` |
| Copyright | `2026 Appointly Solutions LLC` |

## Keywords (100)

```
teleprompter,autocue,script,prompter,record,video,vlog,speech,camera,presenter,lines,cue,talking,ai
```

Leave other companies' names out of keywords (no TikTok, YouTube, Instagram, Claude). App Review rejects that under guideline 2.3.7. The description can mention Claude because the app really works with it.

## Promotional text (170, can be changed any time without review)

```
New: connect Claude. Ask for a video script and Claude writes it, sets up the prompter and sends a link. Tap it and you're on the record screen.
```

## Description (4000)

```
Read your script while you look at the lens.

Prompter puts your words in a band right under the camera and scrolls them while you record, so you can talk to your viewers without memorizing anything or glancing away.

LET CLAUDE WRITE IT
Connect Prompter to Claude once. Then ask for a script, like "a 45 second video about our spring sale." Claude writes it, picks the speed and text size, and sends you a link. Tap it and Prompter opens on the record screen, ready to go. You just record.

BUILT FOR FILMING YOURSELF
• Your script scrolls right next to the camera, upright or sideways
• Tap the text to pause, drag it to jump back or skip ahead
• Change speed and text size while you record
• 3 or 5 second countdown, then recording starts and the text starts moving
• Front or back camera, 1080p or 4K, stabilization on
• Turn sideways and the layout follows: text next to the lens, record button on the other side
• Mirror mode for teleprompter glass rigs

SIMPLE BY DESIGN
• Paste a script and hit Record. That's it.
• Watch each take, then save it to Photos or share it
• No account, no watermark, no editing timeline you don't need
• Your scripts and videos stay on your iPhone

PROMPTER PRO
Writing scripts and practicing with the scrolling text are free. Recording needs Prompter Pro, which starts with a free trial.

Prompter Pro is an auto-renewing subscription, billed monthly or yearly. Payment is charged to your Apple ID when you confirm the purchase, or when the free trial ends. The subscription renews automatically unless you turn it off at least 24 hours before the end of the current period, and your account is charged for renewal within 24 hours before the period ends. You can manage or cancel it in your Apple ID settings. Any unused part of a free trial ends when you buy a subscription.

Terms of Use: https://www.apple.com/legal/internet-services/itunes/dev/stdeula/
Privacy Policy: https://getappointly.co/prompter/privacy
```

## Subscriptions

Group: **Prompter Pro**. Both plans in the same group, same level.

| Product ID | Reference name | Duration | Price (example) | Introductory offer |
| --- | --- | --- | --- | --- |
| `pro.yearly` | Pro Yearly | 1 year | $39.99 | Free, 1 week |
| `pro.monthly` | Pro Monthly | 1 month | $6.99 | Free, 1 week |

Localization (English) for each:
- Display name: `Prompter Pro Yearly` / `Prompter Pro Monthly`
- Description (55 max): `Record unlimited takes with the scrolling prompter`

Each subscription also needs a review screenshot: use `07-paywall.png` from the CI screenshots.

Group localization display name: `Prompter Pro`.

## App Privacy

Data Not Collected. The app has no account, analytics or ads. It downloads a script by its link when someone opens a Claude link and then deletes it from the server; nothing about the person is sent.

## Screenshots

Required: 6.9 inch iPhone (1320 x 2868 portrait, or 2868 x 1320 landscape). Up to 10.

Take them on a real iPhone so the camera shows a real person. Suggested set:
1. Record screen, upright, mid script, with a person on camera. Caption: "Your script, right by the lens"
2. Record screen sideways. Caption: "Film upright or sideways"
3. A Claude chat ending in the Prompter link, next to the record screen. Caption: "Claude writes it. You just record."
4. Scripts list. Caption: "All your scripts in one place"
5. Review screen. Caption: "Watch, save, share"

## App Review notes (paste into "Notes" in App Review Information)

```
Prompter is a teleprompter camera. No sign in is needed.

To test: open the "Welcome to Prompter" sample script, tap Record, then tap the red button. Recording requires the Prompter Pro subscription, which offers a free trial; the paywall appears when you tap the red record button without a subscription. Restore Purchases is in Settings (gear icon).

The app asks for camera and microphone access when the record screen opens, and for permission to add to Photos when you tap Save to Photos.

Optional Claude connection: in Claude (claude.ai), a user can add the custom connector https://getappointly.co/prompter/mcp, ask for a script, and receive a link like https://getappointly.co/prompter/s/... that opens the app on the record screen. To see it without Claude, you can open this test link on the device (valid for 7 days from when we generate it): [paste a fresh link here right before submitting]
```

To make that test link: ask Claude (with the connector added) for any short script, or run:

```bash
curl -s -H 'content-type: application/json' -H 'accept: application/json,text/event-stream' https://getappointly.co/prompter/mcp -d '{"jsonrpc":"2.0","id":1,"method":"tools/call","params":{"name":"set_up_recording","arguments":{"title":"App Review sample","script":"Thanks for reviewing Prompter. This script came from the Claude connector.\n\nTap the red button to record."}}}'
```
