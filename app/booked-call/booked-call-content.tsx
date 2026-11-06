import Image from "next/image";
import { ArrowUpRight, Check } from "lucide-react";

import { LazyVidalytics } from "@/components/LazyVidalytics";
import { PHONE_DISPLAY, PHONE_HREF } from "@/components/site-nav";
import { FeaturedStories } from "@/components/sales/proof-section";

/* ============================================================================
   /booked-call: the short page a lead sees right after booking a call.
   One column, mobile first: the video, three rules for the call, what we
   decide on it, how they pay, the three video case studies, and a sign off.
   (/lander keeps the long version in app/lander/lander-content.tsx.)
   Styles: home.css, lander.css and sales.css, plus booked-call.css.
   ============================================================================ */

// Same Vidalytics embed this page has always used, and its poster thumbnail.
const VSL_EMBED_ID = "pPhKygFs09UtbTBO";
const VSL_POSTER =
  "https://fast.vidalytics.com/video/FeX1NGyU/7ly5Jas9bcV1jSMM/img/thumbnail/Vsl2.0-Cover-6a33347b2ca87.jpg";

const DECIDE = [
  "Is there enough demand in your market, and is it still open",
  "Do the numbers work at your job size and close rate",
  "What you need in place to handle the volume",
];

export function BookedCallContent({ pixel }: { pixel?: React.ReactNode }) {
  return (
    <div className="dscroll bkc">
      {pixel}

      {/* Minimal header. No booking prompt, this lead already booked a call */}
      <nav className="snav" aria-label="Primary">
        <div className="snav-in">
          <a href="/" className="snav-logo" aria-label="Appointly Solutions home">
            <Image src="/images/appointly-logo-lockup.png" alt="Appointly Solutions" width={129} height={45} priority />
          </a>
        </div>
      </nav>

      {/* 1 + 2 · Top and video */}
      <section className="bkc-top" id="top">
        <div className="orb a" />
        <div className="wrap">
          <p className="eyebrow">Your call is booked</p>
          <h1>
            Here&apos;s how <span className="hl">the call works.</span>
          </h1>
          <p className="lead">
            Watch this first. It covers what we do and how you pay, so we can
            spend the call on your business.
          </p>
          <div className="vslvid">
            <LazyVidalytics embedId={VSL_EMBED_ID} poster={VSL_POSTER} />
          </div>
        </div>
      </section>

      {/* 3 · Three rules, one card */}
      <section className="bkc-sec" id="before">
        <div className="wrap">
          <h2>Before we talk</h2>
          <ol className="bkc-card bkc-rules">
            <li>
              <span className="bkc-n" aria-hidden>1</span>
              <p>
                <strong>Have your numbers.</strong> Average job size, rough close
                rate, how many jobs you do a month now, and how many you want.
              </p>
            </li>
            <li>
              <span className="bkc-n" aria-hidden>2</span>
              <p>
                <strong>Bring whoever decides.</strong> If a partner or spouse signs
                off on business decisions, they need to be on the call.
              </p>
            </li>
            <li>
              <span className="bkc-n" aria-hidden>3</span>
              <p>
                <strong>Need to move it?</strong> Call or text{" "}
                <a href={PHONE_HREF}>{PHONE_DISPLAY}</a> at least a day ahead. No
                shows without notice don&apos;t get rebooked.
              </p>
            </li>
          </ol>
        </div>
      </section>

      {/* 4 · What we decide on the call */}
      <section className="bkc-sec" id="decide">
        <div className="wrap">
          <h2>What we decide together</h2>
          <ul className="bkc-list">
            {DECIDE.map((d) => (
              <li key={d}>
                <span className="exck" aria-hidden><Check /></span>
                {d}
              </li>
            ))}
          </ul>
          <p className="bkc-close">
            By the end you&apos;ll have a yes or no. If it&apos;s a yes, we start
            setup right there.
          </p>
        </div>
      </section>

      {/* 5 · How you pay */}
      <section className="bkc-sec" id="pay">
        <div className="wrap">
          <h2>How you pay</h2>
          <p className="bkc-p">
            You fund your ad spend upfront at cost, with a spend report every
            week. Then you pay $125 to $175 per booked estimate, set per client.
            No setup fee, no retainer, no long contract. No shows and appointments
            you grade a C are credited to your next one.
          </p>
        </div>
      </section>

      {/* 6 · Proof: the three video case studies only */}
      <section className="bkc-sec bkc-proof" id="proof">
        <div className="wrap">
          <h2>Contractors we already book for</h2>
          <FeaturedStories />
          <a className="bkc-more" href="/case-studies#more-proof">
            See all the proof <ArrowUpRight aria-hidden />
          </a>
        </div>
      </section>

      {/* 7 · Sign off */}
      <section className="bkc-sec bkc-end" id="see-you">
        <div className="wrap">
          <p className="bkc-bye">
            See you on the call. Questions? Call or text{" "}
            <a href={PHONE_HREF}>{PHONE_DISPLAY}</a>.
          </p>
        </div>
      </section>

      <footer>
        <div className="wrap">
          <p className="fn">Appointly Solutions</p>
          <div className="flinks">
            <a href="/privacy">Privacy</a>
            <a href="/terms">Terms</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
