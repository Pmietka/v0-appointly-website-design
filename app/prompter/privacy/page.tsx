import type { Metadata } from "next";

/* Privacy policy for the Prompter iOS app. The App Store listing and the
   paywall inside the app both link here, so this URL must stay live. */

export const metadata: Metadata = {
  title: "Prompter privacy policy",
  description: "How the Prompter teleprompter app handles your data.",
  robots: { index: false, follow: false },
  alternates: { canonical: "https://getappointly.co/prompter/privacy" },
};

const UPDATED = "November 7, 2026";
const CONTACT = "patrick@getappointly.co";

const sections: { h: string; p: string[] }[] = [
  {
    h: "The short version",
    p: [
      "Prompter does not collect your data. There is no account, no analytics, no ads and no tracking. Your scripts and videos stay on your iPhone.",
    ],
  },
  {
    h: "Your scripts",
    p: [
      "Scripts you write or paste are saved only on your device, inside the app. They are never sent to us or to anyone else. Deleting the app deletes them.",
    ],
  },
  {
    h: "Camera, microphone and Photos",
    p: [
      "Prompter uses the camera and microphone only while you are on the recording screen, to record your video. Recordings are kept on your device until you save them to Photos, share them, or record a new take.",
      "Prompter only asks to add videos to Photos. It cannot see or read anything already in your photo library.",
    ],
  },
  {
    h: "Subscriptions",
    p: [
      "Purchases and free trials are handled entirely by Apple through the App Store. We never see your payment details. Apple tells the app whether a subscription is active so it can unlock recording. You can manage or cancel your subscription any time in your iPhone's Settings.",
    ],
  },
  {
    h: "Children",
    p: ["Prompter is not directed at children under 13 and does not knowingly collect information from anyone."],
  },
  {
    h: "Changes",
    p: ["If this policy changes, the new version will be posted on this page with a new date."],
  },
];

export default function PrompterPrivacyPage() {
  return (
    <main style={{ maxWidth: 680, margin: "0 auto", padding: "48px 20px 80px", lineHeight: 1.6, color: "#18181b" }}>
      <h1 style={{ fontSize: 32, fontWeight: 800, letterSpacing: "-0.02em" }}>Prompter privacy policy</h1>
      <p style={{ color: "#71717a", marginTop: 6 }}>Last updated {UPDATED}</p>
      {sections.map((s) => (
        <section key={s.h} style={{ marginTop: 32 }}>
          <h2 style={{ fontSize: 20, fontWeight: 700 }}>{s.h}</h2>
          {s.p.map((t) => (
            <p key={t} style={{ marginTop: 10 }}>
              {t}
            </p>
          ))}
        </section>
      ))}
      <section style={{ marginTop: 32 }}>
        <h2 style={{ fontSize: 20, fontWeight: 700 }}>Contact</h2>
        <p style={{ marginTop: 10 }}>
          Questions? Email <a href={`mailto:${CONTACT}`} style={{ textDecoration: "underline" }}>{CONTACT}</a>.
        </p>
      </section>
    </main>
  );
}
