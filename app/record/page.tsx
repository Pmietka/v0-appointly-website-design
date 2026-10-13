import type { Metadata, Viewport } from "next";
import Image from "next/image";
import Script from "next/script";

import "../home.css";
import "./record.css";

/* ============================================================================
   /record: voice interview for job applicants. Deliberately bare: a one line
   welcome, the three prompts, the time limit and the SpeakPipe recorder. The
   deadline lives only in the email. Direct-link only, so it stays out of the
   index. For the next hiring round, update ROLE.
   ============================================================================ */

const ROLE = "Appointment Setter";

// The SpeakPipe inline widget for this page.
const SPEAKPIPE_WIDGET = "https://www.speakpipe.com/widget/inline/cobnkhbv2sa38qt03kknihwg0a9iq97r";

const PROMPTS = [
  "Introduce yourself, then give the first few seconds of calling a homeowner who requested a quote.",
  "Answer this question: What industry and role did you perform in your appointment setting experience?",
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
        <Image src="/images/appointly-logo-lockup.png" alt="Appointly Solutions" width={129} height={45} priority />
      </header>

      <main className="recmain">
        <div className="reccard">
          <h1 className="recwelcome">Thanks for applying for the {ROLE} role.</h1>

          <p className="reclead">Record one voice memo that covers:</p>
          <ol className="recsteps">
            {PROMPTS.map((p, i) => (
              <li key={p}>
                <span className="recn">{i + 1}</span>
                <span className="rectx">{p}</span>
              </li>
            ))}
          </ol>

          <p className="recrules"><b>Time limit:</b> 90 seconds max total</p>

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
        </div>
      </main>

      <Script src="https://www.speakpipe.com/widget/loader.js" strategy="afterInteractive" charSet="utf-8" />
    </div>
  );
}
