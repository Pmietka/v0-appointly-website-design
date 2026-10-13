import type { Metadata, Viewport } from "next";
import Image from "next/image";
import Script from "next/script";

import "../home.css";
import "./record.css";

/* ============================================================================
   /record: voice interview for Inside Sales Representative applicants. Matches
   the email applicants receive; they record a short memo in the SpeakPipe
   widget below. Direct-link only, so it stays out of the index.

   For the next hiring round, update ROLE and DEADLINE.
   ============================================================================ */

const ROLE = "Inside Sales Representative";
const DEADLINE = "Tuesday, October 13 at 11:59 PM Beirut time";

// The SpeakPipe inline widget for this page.
const SPEAKPIPE_WIDGET = "https://www.speakpipe.com/widget/inline/cobnkhbv2sa38qt03kknihwg0a9iq97r";

const PROMPTS = [
  {
    t: "Introduce yourself",
    d: "Your full name and a 15 second intro about your sales experience.",
  },
  {
    t: "Open the call",
    d: "How you would open a call with an American homeowner who requested a quote for a garage floor coating.",
  },
  {
    t: "Handle the objection",
    d: "How you'd respond if they said “I'm just looking for a price right now.”",
  },
];

export const viewport: Viewport = {
  themeColor: "#fafafa",
};

export const metadata: Metadata = {
  title: `${ROLE} voice interview | Appointly Solutions`,
  description: `Record your voice interview for the ${ROLE} role at Appointly Solutions.`,
  robots: { index: false, follow: false },
  alternates: { canonical: "https://getappointly.co/record" },
};

export default function RecordPage() {
  return (
    <div className="dscroll recpage">
      <header className="rechead">
        <a href="/" aria-label="Appointly Solutions home">
          <Image src="/images/appointly-logo-lockup.png" alt="Appointly Solutions" width={129} height={45} priority />
        </a>
      </header>

      <main className="recmain">
        <div className="orb a" />
        <div className="reccard">
          <p className="eyebrow">{ROLE} &middot; Voice interview</p>
          <h1>
            Let&apos;s hear how you <span className="hl">sound on the phone.</span>
          </h1>
          <p className="recsub">
            Thanks for applying. Your voice is the heart of this job, so record
            a short memo below. <strong>90 seconds max total.</strong>
          </p>

          <ol className="recsteps">
            {PROMPTS.map((p, i) => (
              <li key={p.t}>
                <span className="recn">{i + 1}</span>
                <span className="rectx">
                  <b>{p.t}</b>
                  <span>{p.d}</span>
                </span>
              </li>
            ))}
          </ol>

          <div className="recdue">
            <b>Submit by {DEADLINE}.</b>
            <span>
              This position is very competitive and we review recordings as
              they come in, so the sooner you submit, the better your chances.
            </span>
          </div>

          <div className="recwidget">
            <iframe
              src={SPEAKPIPE_WIDGET}
              allow="microphone"
              width="100%"
              height="200"
              frameBorder="0"
              title="Record your voice interview"
            />
          </div>

          <p className="recnote">
            Your browser will ask for microphone access the first time you record.
            Find a quiet spot before you start.
          </p>
        </div>
      </main>

      <footer className="recfoot">
        <p>Looking forward to hearing it! <span className="recsig">Patrick, Appointly Solutions</span></p>
        <p className="recfine">
          &copy; Appointly Solutions &middot; <a href="/privacy">Privacy</a> &middot; <a href="/terms">Terms</a>
        </p>
      </footer>

      <Script src="https://www.speakpipe.com/widget/loader.js" strategy="afterInteractive" charSet="utf-8" />
    </div>
  );
}
