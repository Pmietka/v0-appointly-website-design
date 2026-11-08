import type { Metadata } from "next";

/* Support page for the Prompter iOS app. App Store Connect requires a support
   URL; the App Store listing links here. */

export const metadata: Metadata = {
  title: "Prompter support",
  description: "Help with the Prompter teleprompter app: connecting Claude, recording, subscriptions.",
  robots: { index: false, follow: false },
  alternates: { canonical: "https://getappointly.co/prompter/support" },
};

const CONTACT = "patrick@getappointly.co";
const CONNECTOR = "https://getappointly.co/prompter/mcp";

const faqs: { q: string; a: string[] }[] = [
  {
    q: "How do I connect Prompter to Claude?",
    a: [
      `On claude.ai or the Claude desktop app, open Settings, then Connectors, then Add custom connector. Name it Prompter and paste ${CONNECTOR} as the server URL.`,
      "Then ask Claude for a script in any chat, for example: \"Write a 45 second video about our spring sale and set it up in Prompter.\" Claude writes it, sets up the prompter and replies with a link. Tap the link on your iPhone and Prompter opens on the record screen.",
      "If Claude doesn't use Prompter, turn the connector on in the chat's tools menu. Other AI apps that support MCP connectors work with the same address.",
    ],
  },
  {
    q: "The link says it has expired",
    a: [
      "Links from Claude work for 7 days, and only until the script is opened in the app (it's saved in your Scripts list after that). Ask Claude to set up the recording again for a fresh link.",
    ],
  },
  {
    q: "How do I film sideways?",
    a: [
      "Turn your phone before you press record. If the screen doesn't rotate, turn off Portrait Orientation Lock in Control Center. The script moves next to the camera and the record button moves to the other side.",
    ],
  },
  {
    q: "The text scrolls too fast or too slow",
    a: [
      "Use Speed + and - on the record screen, even while recording. Tap the text to pause, drag it to jump back or ahead. Size + and - change the text size. Your choices are remembered.",
    ],
  },
  {
    q: "Where do my videos go?",
    a: [
      "After you stop recording you can watch the take, then Save to Photos or Share it. Takes you don't save are deleted when you record again, so save the ones you want to keep.",
    ],
  },
  {
    q: "How does the free trial work?",
    a: [
      "Writing scripts and practicing with the scrolling text are free. Recording needs Prompter Pro, which starts with a free trial. You won't be charged if you cancel at least 24 hours before the trial ends.",
      "To cancel or change your plan: open the Settings app on your iPhone, tap your name, then Subscriptions, then Prompter. Purchases are handled by Apple, so refunds are requested from Apple at reportaproblem.apple.com.",
    ],
  },
  {
    q: "I paid but recording is still locked",
    a: [
      "In Prompter, open Settings (the gear on the Scripts screen) and tap Restore purchases while signed in with the Apple ID you paid with.",
    ],
  },
  {
    q: "The camera or microphone doesn't work",
    a: [
      "Prompter needs permission for both. Open the Settings app, scroll to Prompter, and turn on Camera and Microphone. Close other apps that might be using the camera, then try again.",
    ],
  },
];

export default function PrompterSupportPage() {
  return (
    <main style={{ maxWidth: 680, margin: "0 auto", padding: "48px 20px 80px", lineHeight: 1.6, color: "#18181b" }}>
      <h1 style={{ fontSize: 32, fontWeight: 800, letterSpacing: "-0.02em" }}>Prompter support</h1>
      <p style={{ color: "#52525b", marginTop: 8 }}>
        Prompter is a teleprompter camera for iPhone: your script scrolls right under the camera while you film.
        Can&apos;t find your answer? Email{" "}
        <a href={`mailto:${CONTACT}?subject=Prompter%20support`} style={{ textDecoration: "underline" }}>
          {CONTACT}
        </a>{" "}
        and we&apos;ll get back to you.
      </p>
      {faqs.map((f) => (
        <section key={f.q} style={{ marginTop: 32 }}>
          <h2 style={{ fontSize: 20, fontWeight: 700 }}>{f.q}</h2>
          {f.a.map((t) => (
            <p key={t} style={{ marginTop: 10 }}>
              {t}
            </p>
          ))}
        </section>
      ))}
      <p style={{ marginTop: 40, color: "#71717a" }}>
        <a href="/prompter/privacy" style={{ textDecoration: "underline" }}>
          Privacy policy
        </a>
      </p>
    </main>
  );
}
