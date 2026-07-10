"use client";

import { Fragment, useEffect, useState } from "react";
import Image from "next/image";
import Script from "next/script";
import {
  Phone, CalendarCheck, Check, X,
  Target, User, Shield, CreditCard, Clock, Lock, LineChart,
} from "lucide-react";

import { PHONE_DISPLAY, PHONE_HREF } from "@/components/site-nav";
import { LazyVidalytics } from "@/components/LazyVidalytics";
import { LazyExternalScript } from "@/components/deferred-loader";

// The /apply hero VSL (Vidalytics embed yab2hhU03er3If8m) and its poster thumbnail.
const VSL_EMBED_ID = "yab2hhU03er3If8m";
const VSL_POSTER =
  "https://fast.vidalytics.com/video/FeX1NGyU/pOKLz4nprExR5OCF/280657/257484__FFMPEG/thumb/thumbnail-5_0.jpg";

/* ============================================================================
   CONFIGURABLE CONSTANTS. Edit these, nothing else, to wire the page up.
   ============================================================================ */

// Every CTA on this page links to this booking calendar.
const BOOKING_URL = "https://client.getappointly.co/strategy-calendar-8186";

// Meta Pixel / dataset id. Fires PageView on load. No click or conversion
// events fire from this page: every CTA is an outbound link to the GHL
// calendar, and the real conversion (the booking) happens there, so firing
// anything here would count intent as a conversion.
const META_PIXEL_ID = "985991997226201";

// The hero VSL is deferred via <LazyVidalytics> (see components/LazyVidalytics).
// To swap the video later, change VSL_EMBED_ID / VSL_POSTER above.

/* ============================================================================
   Meta Pixel helpers
   ============================================================================ */

// A real pixel id is all digits. Anything else (the placeholder) keeps it off.
const pixelReady = /^\d+$/.test(META_PIXEL_ID);

function MetaPixel() {
  if (!pixelReady) return null;
  // Standard Meta Pixel base code, loaded via next/script with afterInteractive
  // so it stays off the critical path. Defines fbq, inits with our id, and
  // fires PageView. Nothing else fires from this page.
  return (
    <>
      <Script id="meta-pixel" strategy="afterInteractive">
        {`!function(f,b,e,n){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[]}(window,document,'script');
fbq('init', '${META_PIXEL_ID}');
fbq('track', 'PageView');`}
      </Script>
      {/* fbevents.js is deferred to first interaction / short timeout to keep it
          off the initial load (TBT) window. The fbq() calls above queue and are
          sent once the library loads. */}
      <LazyExternalScript id="meta-pixel-lib" src="https://connect.facebook.net/en_US/fbevents.js" />
      <noscript>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        height="1"
        width="1"
        style={{ display: "none" }}
        alt=""
        src={`https://www.facebook.com/tr?id=${META_PIXEL_ID}&ev=PageView&noscript=1`}
      />
      </noscript>
    </>
  );
}

/* ============================================================================
   Data
   ============================================================================ */

// Trust badges under the hero CTA (mirrors the reference funnel's badge row).
const TRUST_BADGES = ["No contracts", "Pay per show", "Exclusive estimates"];

// Proof bar stats.
// PLACEHOLDER NUMBERS: confirm these are real and defensible before sending.
const STATS = [
  { v: "$0", l: "Upfront. You only pay when a homeowner shows." },
  { v: "100%", l: "Exclusive. One contractor per market." },
  { v: "8 / mo", l: "Average jobs for newest clients, month two." },
];

// "A Simple, Proven Growth System". Three numbered steps.
const STEPS = [
  { n: 1, t: "Apply & Book", d: "Answer a few quick questions and grab a time on the calendar." },
  { n: 2, t: "Strategy Call", d: "A 20 minute call. We check your market, your numbers, and map the plan. Low pressure." },
  { n: 3, t: "Partner With Us", d: "If it is a fit, we start booking qualified estimates straight onto your calendar." },
];

// Recent client wins (real, approved photo testimonials only).
const CLIENT_WINS = [
  {
    name: "Mark T.", who: "AFAB Services", where: "Port St. Lucie, FL",
    stat: "6 completed jobs in the first month",
    quote: "You've already paved the ground. I just go in and sweep it up. You guys are doing a great job.",
    photo: "/images/proof/mark-afab.webp",
  },
  {
    name: "Andre S.", who: "Great Lakes Elite Coatings", where: "Chicago, IL",
    stat: "8 new jobs in his second month",
    quote: "By the time I show up, they already know they want it. I'm just there to give the number.",
    photo: "/images/proof/andre.webp",
  },
  {
    name: "Carlos V.", who: "Diamond Group", where: "Portland, OR",
    stat: "1st appt covered full onboarding cost",
    quote: "One job paid for everything. From there it just kept coming.",
    photo: "/images/proof/carlos-team.webp",
  },
];

const COMPARE_COLS = ["DIY", "Marketing Agency", "Shared Contacts", "Appointly"];
const COMPARE_ROWS = [
  { label: "Outcome", Icon: Target, kind: "text", out: true, vals: ["All on you. Hard to keep up while you work.", "Promises and meetings. Slow to show results.", "Cold contacts sold to many. You do the chasing.", "Qualified appointments booked on your calendar."] },
  { label: "Who runs it", Icon: User, kind: "text", out: false, vals: ["You", "You manage them", "You chase contacts", "We run everything"] },
  { label: "Upfront risk", Icon: Shield, kind: "text", out: false, vals: ["On you", "On you", "On you", "None. Pay per show"] },
  { label: "What you pay for", Icon: CreditCard, kind: "text", out: false, vals: ["Your time", "Monthly fees", "Contacts that flake", "Booked appointments"] },
  { label: "Works while you're on the job", Icon: Clock, kind: "bin", out: false, vals: [false, false, false, true] },
  { label: "Exclusive to you", Icon: Lock, kind: "bin", out: false, vals: [false, false, false, true] },
  { label: "You only pay for results", Icon: LineChart, kind: "bin", out: false, vals: [false, false, false, true] },
] as const;

/* ============================================================================
   Page
   ============================================================================ */

export default function ApplyClient() {
  // Ad traffic (utm_source or fbclid in the URL) gets the VSL directly under a
  // compressed hero, above the CTA. Checked client side after mount and
  // defaulting to the organic order, so organic visitors get zero layout shift.
  const [adTraffic, setAdTraffic] = useState(false);
  useEffect(() => {
    if (/[?&](utm_source|fbclid)=/i.test(window.location.search)) {
      setAdTraffic(true);
    }
  }, []);

  return (
    <div className="dscroll applypage">
      <MetaPixel />

      {/* Header. Logo left; phone + "Book a Call" CTA right. The book button is
          always visible; the phone hides on small screens where both won't fit. */}
      <nav className="snav applyhead" aria-label="Primary">
        <div className="snav-in">
          <a href="/" className="snav-logo" aria-label="Appointly Solutions home">
            <Image src="/images/appointly-logo-lockup.png" alt="Appointly Solutions" width={129} height={45} priority />
          </a>
          <div className="snav-right">
            <a className="snav-call" href={PHONE_HREF}>
              <Phone className="h-4 w-4" aria-hidden />
              {PHONE_DISPLAY}
            </a>
            <a className="snav-book" href={BOOKING_URL}>
              Book a Call
            </a>
          </div>
        </div>
      </nav>

      {/* Hero. Pay-per-show hook. Organic order: CTA, VSL, CTA. Ad traffic
          (utm_source / fbclid) gets a compressed hero with the VSL first, then
          the CTA and trust badges. */}
      <section className={adTraffic ? "sec applyhero advsl" : "sec applyhero"} id="top">
        <div className="orb a" />
        <div className="wrap">
          <p className="eyebrow">For floor coating contractors</p>
          <h1>
            Only pay when a homeowner{" "}
            <span className="hl">sits down for your estimate.</span>
          </h1>
          <p className="lead">
            {adTraffic
              ? "We generate, qualify, and book exclusive estimates straight onto your calendar."
              : "We generate, qualify, and book exclusive estimates straight onto your calendar. You only pay when a homeowner shows. No contracts. No BS."}
          </p>

          {adTraffic ? (
            <>
              {/* Ad traffic: the VSL comes first, then one CTA with badges. */}
              <div className="herovsl">
                <div className="vslvid">
                  <LazyVidalytics embedId={VSL_EMBED_ID} poster={VSL_POSTER} />
                </div>
                <p className="vslnote">Watch how it works, then apply.</p>
              </div>
              <div className="herocta" id="apply">
                <a className="ctabtn" href={BOOKING_URL}>
                  Yes! I&apos;d Like a Pipeline Full of Estimates
                </a>
                <div className="trustbadges">
                  {TRUST_BADGES.map((b) => (
                    <span className="trustbadge" key={b}><Check aria-hidden /> {b}</span>
                  ))}
                </div>
              </div>
            </>
          ) : (
            <>
              {/* Organic: CTA above the VSL */}
              <div className="herocta">
                <a className="ctabtn" href={BOOKING_URL}>
                  Yes! I&apos;d Like a Pipeline Full of Estimates
                </a>
                <div className="trustbadges">
                  {TRUST_BADGES.map((b) => (
                    <span className="trustbadge" key={b}><Check aria-hidden /> {b}</span>
                  ))}
                </div>
              </div>

              {/* The VSL, front and center */}
              <div className="herovsl">
                <div className="vslvid">
                  <LazyVidalytics embedId={VSL_EMBED_ID} poster={VSL_POSTER} />
                </div>
                <p className="vslnote">Watch how it works, then apply.</p>
              </div>

              {/* CTA below the VSL */}
              <div className="herocta" id="apply">
                <p className="formkicker">
                  <strong>Apply for your market.</strong> We take one floor coating
                  contractor per market. Grab a time and we will confirm on the call
                  whether your area is open.
                </p>
                <a className="ctabtn" href={BOOKING_URL}>
                  Yes! I&apos;d Like a Pipeline Full of Estimates
                </a>
              </div>
            </>
          )}
        </div>
      </section>

      {/* Proof bar stats */}
      <section className="sec proofbar" id="stats">
        <div className="wrap">
          <div className="pbnums">
            {STATS.map((s) => (
              <div className="pbnum" key={s.l}>
                <span className="pbv">{s.v}</span>
                <span className="pbl">{s.l}</span>
              </div>
            ))}
          </div>
          <div className="pbfaces" aria-hidden>
            <Image className="pbface" src="/images/proof/mark-afab.webp" alt="" width={54} height={54} sizes="54px" loading="lazy" />
            <Image className="pbface" src="/images/proof/andre.webp" alt="" width={54} height={54} sizes="54px" loading="lazy" />
            <Image className="pbface" src="/images/proof/carlos-team.webp" alt="" width={54} height={54} sizes="54px" loading="lazy" />
            <span className="pbmore">+12</span>
          </div>
          <p className="pbcap">Real floor coating contractors, real booked estimates.</p>
        </div>
      </section>

      {/* A Simple, Proven Growth System */}
      <section className="sec" id="how-it-works">
        <div className="orb a" />
        <div className="wrap wallhead">
          <p className="eyebrow">How it works</p>
          <h2>A simple, <span className="hl">proven growth system.</span></h2>
        </div>
        <div className="wrap">
          <div className="grid g3">
            {STEPS.map((s) => (
              <div className="step" key={s.n}>
                <div className="sn">{s.n}</div>
                <div className="st">{s.t}</div>
                <div className="sd">{s.d}</div>
              </div>
            ))}
          </div>
          <div className="stepscta">
            <p className="stepsctaline">
              We take one floor coating contractor per market. Find out if yours
              is still open before someone else claims it.
            </p>
            <a className="ctabtn ctabtn-inline" href={BOOKING_URL}>
              Claim Your Market
            </a>
          </div>
        </div>
      </section>

      {/* Comparison table — reasons contractors choose us over the alternatives */}
      <section className="sec tint cmpsec" id="why-us">
        <div className="wrap">
          <p className="cmpeyebrow">Compare the options</p>
          <h2>Why contractors pick us <span className="hl">over the other options.</span></h2>
          <p className="cmpsub">
            We generate the demand, qualify every homeowner, and book appointments
            straight onto your calendar. You just show up and close.
          </p>

          <div className="cmptable">
            <div className="cmpcard">
              <div className="cmpbar" />
              <div className="cmpgrid">
                <div className="ch dim" />
                <div className="ch">DIY</div>
                <div className="ch">Marketing Agency</div>
                <div className="ch">Shared Contacts</div>
                <div className="ch appt"><CalendarCheck className="ci" />Appointly</div>
                {COMPARE_ROWS.map((r) => {
                  const RowIcon = r.Icon;
                  return (
                    <Fragment key={r.label}>
                      <div className={r.out ? "dim out" : "dim"}><RowIcon className="ci" />{r.label}</div>
                      {r.vals.map((v, ci) => {
                        const appt = ci === 3 ? " appt" : "";
                        if (r.kind === "bin") {
                          return (
                            <div key={ci} className={`bin${appt}`}>
                              {v ? <Check className="ci chk" /> : <X className="ci xmark" />}
                            </div>
                          );
                        }
                        return <div key={ci} className={`${r.out ? "out" : ""}${appt}`.trim()}>{v}</div>;
                      })}
                    </Fragment>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="cmpcards">
            {[3, 0, 1, 2].map((ci) => (
              <div key={ci} className={ci === 3 ? "optcard appt" : "optcard"}>
                <div className="optname">{ci === 3 && <CalendarCheck className="ci" />}{COMPARE_COLS[ci]}</div>
                {COMPARE_ROWS.map((r) => {
                  const RowIcon = r.Icon;
                  return (
                    <div className="optrow" key={r.label}>
                      <span className="ol"><RowIcon className="ci" />{r.label}</span>
                      <span className="ov">
                        {r.kind === "bin"
                          ? (r.vals[ci] ? <Check className="ci chk" /> : <X className="ci xmark" />)
                          : r.vals[ci]}
                      </span>
                    </div>
                  );
                })}
              </div>
            ))}
          </div>

          <p className="payoff">You are paying for <strong>booked appointments.</strong></p>
        </div>
      </section>

      {/* Recent Client Wins */}
      <section className="sec" id="wins">
        <div className="wrap wallhead">
          <p className="eyebrow">Proof</p>
          <h2>Recent <span className="hl">client wins.</span></h2>
        </div>
        <div className="wrap">
          <div className="grid g3">
            {CLIENT_WINS.map((t) => (
              <div className="proof" key={t.name}>
                <Image className="photo" src={t.photo} alt={`${t.name} of ${t.who}`} width={1080} height={1350} sizes="(max-width: 768px) 90vw, 360px" loading="lazy" />
                <div className="pin">
                  <div className="who">{t.name} &middot; {t.who}</div>
                  <div className="where">{t.where}</div>
                  <div className="pstat">{t.stat}</div>
                  <div className="quote">&ldquo;{t.quote}&rdquo;</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Closing CTA. Links to the booking calendar. */}
      <section className="sec tint" id="book">
        <div className="wrap wallhead">
          <h2>Ready to <span className="hl">fill your calendar?</span></h2>
          <p className="wallsub">
            Book your strategy call. About 20 minutes &middot; No obligation
            &middot; By application only.
          </p>
          <div className="closingcta">
            <a className="ctabtn ctabtn-inline" href={BOOKING_URL}>
              Yes! I&apos;d Like a Pipeline Full of Estimates
            </a>
          </div>
        </div>
      </section>

      {/* Footer. Minimal: wordmark, phone, privacy, terms only */}
      <footer>
        <div className="wrap">
          <p className="fn">Appointly Solutions</p>
          <p className="fcall">
            Questions? Call us at <a href={PHONE_HREF}>{PHONE_DISPLAY}</a>
          </p>
          <div className="flinks">
            <a href="/privacy">Privacy</a>
            <a href="/terms">Terms</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
