import type { Metadata, Viewport } from "next";
import Image from "next/image";
import Script from "next/script";

import { PHONE_DISPLAY, PHONE_HREF } from "@/components/site-nav";
import "../home.css";
import "./record.css";

/* ============================================================================
   /record: an Appointly-branded page with the SpeakPipe voice recorder, for
   sending us a voice message. Direct-link only, so it stays out of the index.
   ============================================================================ */

// The SpeakPipe inline widget for this page.
const SPEAKPIPE_WIDGET = "https://www.speakpipe.com/widget/inline/cobnkhbv2sa38qt03kknihwg0a9iq97r";

export const viewport: Viewport = {
  themeColor: "#fafafa",
};

export const metadata: Metadata = {
  title: "Leave us a voice message | Appointly Solutions",
  description: "Record a quick voice message for the Appointly Solutions team.",
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
          <p className="eyebrow">Appointly Solutions</p>
          <h1>
            Leave us a <span className="hl">voice message.</span>
          </h1>
          <p className="recsub">
            Tap record, say what&apos;s on your mind, and hit send. It goes
            straight to our team.
          </p>

          <div className="recwidget">
            <iframe
              src={SPEAKPIPE_WIDGET}
              allow="microphone"
              width="100%"
              height="200"
              frameBorder="0"
              title="Record a voice message"
            />
          </div>

          <p className="recnote">
            Your browser will ask for microphone access the first time you record.
          </p>
        </div>
      </main>

      <footer className="recfoot">
        <p>
          Prefer to talk live? Call us at <a href={PHONE_HREF}>{PHONE_DISPLAY}</a>
        </p>
        <p className="recfine">
          &copy; Appointly Solutions &middot; <a href="/privacy">Privacy</a> &middot; <a href="/terms">Terms</a>
        </p>
      </footer>

      <Script src="https://www.speakpipe.com/widget/loader.js" strategy="afterInteractive" charSet="utf-8" />
    </div>
  );
}
