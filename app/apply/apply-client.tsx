"use client";

import { Fragment, useEffect, useRef, useState } from "react";
import {
  Phone, CalendarCheck, Check, X,
  Target, User, Shield, CreditCard, Clock, Lock, LineChart,
} from "lucide-react";

import { PHONE_DISPLAY, PHONE_HREF } from "@/components/site-nav";
import { VidalyticsPlayer } from "../lander/vidalytics-player";

/* ============================================================================
   CONFIGURABLE CONSTANTS. Edit these, nothing else, to wire the page up.
   ============================================================================ */

// GoHighLevel survey widget (the qualifier + lead capture). GHL captures the
// lead inside the iframe, so every contractor who submits feeds the GHL
// recovery sequence even if they do not finish booking.
const SURVEY_BASE = "https://link.getappointly.co/widget/survey/pHjOTCm6PhMSXdHi5VPO";
const SURVEY_ID = "pHjOTCm6PhMSXdHi5VPO";

// GoHighLevel booking widget (the calendar that captures the bookers).
const CALENDAR_SRC = "https://link.getappointly.co/widget/booking/U3zYpjFagC8HFqQw21rC";
const CALENDAR_ID = "U3zYpjFagC8HFqQw21rC";

// GHL embed loader. Auto-resizes the scrolling="no" survey and booking iframes
// so they show their full height with no inner scrollbar. Loaded once.
const GHL_EMBED_JS = "https://link.getappointly.co/js/form_embed.js";

// PLACEHOLDER: paste the numeric Meta Pixel ID. I (Patrick) will paste this.
// While it stays a placeholder the pixel stays dormant (no init, no errors).
const META_PIXEL_ID = "PASTE_META_PIXEL_ID_HERE";

// The hero VSL is the same Vidalytics "in a month, this is your calendar" video
// used on /lander. It lives in ../lander/vidalytics-player. To swap the video
// later, change the embed ids in that one file.

/* ============================================================================
   Meta Pixel helpers
   ============================================================================ */

// A real pixel id is all digits. Anything else (the placeholder) keeps it off.
const pixelReady = /^\d+$/.test(META_PIXEL_ID);

function MetaPixel() {
  useEffect(() => {
    if (!pixelReady) return;
    if (document.getElementById("meta-pixel")) return;
    // Standard Meta Pixel base code. Defines fbq, inits with our id, and fires
    // the PageView. The Lead event is fired on survey submit (see ApplyClient).
    const s = document.createElement("script");
    s.id = "meta-pixel";
    s.text = `!function(f,b,e,v,n,t,s)
{if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};
if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];
s.parentNode.insertBefore(t,s)}(window, document,'script',
'https://connect.facebook.net/en_US/fbevents.js');
fbq('init', '${META_PIXEL_ID}');
fbq('track', 'PageView');`;
    document.head.appendChild(s);
  }, []);

  if (!pixelReady) return null;
  return (
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
  );
}

/* ============================================================================
   GoHighLevel embeds: survey (the qualifier form) and booking calendar.
   ============================================================================ */

// Inject GHL's form_embed.js once. It listens for the iframes' postMessage and
// sets their height so the survey and calendar render fully with no scrollbar.
function GhlEmbedScript() {
  useEffect(() => {
    if (document.getElementById("ghl-embed-js")) return;
    const s = document.createElement("script");
    s.id = "ghl-embed-js";
    s.src = GHL_EMBED_JS;
    s.type = "text/javascript";
    s.async = true;
    document.body.appendChild(s);
  }, []);
  return null;
}

// Append the UTM params, the source tag, and the landing URL to the survey src
// so attribution travels into GHL with the lead.
// NOTE: GHL must be configured to capture these (as contact fields or as the
// contact source). Confirm the field mapping in the survey settings.
function surveySrc(): string {
  if (typeof window === "undefined") return SURVEY_BASE;
  const here = new URLSearchParams(window.location.search);
  const out = new URLSearchParams();
  ["utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content"].forEach((k) => {
    const v = here.get(k);
    if (v) out.set(k, v);
  });
  out.set("source", "apply-page"); // distinguishes this arm from the instant-form arm
  out.set("page_url", window.location.href);
  const qs = out.toString();
  return qs ? `${SURVEY_BASE}?${qs}` : SURVEY_BASE;
}

function GhlSurvey() {
  // Start from the bare src for SSR, then add attribution params on the client
  // (avoids a hydration mismatch since window is not available on the server).
  const [src, setSrc] = useState(SURVEY_BASE);
  useEffect(() => setSrc(surveySrc()), []);
  return (
    <iframe
      className="ghlsurvey"
      src={src}
      id={SURVEY_ID}
      title="Apply for your market"
      scrolling="no"
    />
  );
}

function GhlCalendar() {
  return (
    <iframe
      className="ghlcal"
      src={CALENDAR_SRC}
      id={CALENDAR_ID}
      title="Book your strategy call"
      scrolling="no"
    />
  );
}

/* ============================================================================
   Data
   ============================================================================ */

// Trust badges under the hero CTA (mirrors the reference funnel's badge row).
const TRUST_BADGES = ["No contracts", "Pay per show", "Exclusive leads"];

// Proof bar stats.
// PLACEHOLDER NUMBERS: confirm these are real and defensible before sending.
const STATS = [
  { v: "$0", l: "Ad spend you risk. We front it." },
  { v: "100%", l: "Exclusive. One contractor per market." },
  { v: "8 / mo", l: "Average jobs for newest clients, month two." },
];

// "A Simple, Proven Growth System". Three numbered steps.
const STEPS = [
  { n: 1, t: "Apply & Book", d: "Answer a few quick questions and grab a time on the calendar." },
  { n: 2, t: "Strategy Call", d: "A 20 minute call. We check your market, your numbers, and map the plan. Low pressure." },
  { n: 3, t: "Partner With Us", d: "If it is a fit, we run the ads on our own dime and book qualified estimates onto your calendar." },
];

// Recent client wins (real, approved photo testimonials only).
const CLIENT_WINS = [
  {
    name: "Mark T.", who: "AFAB Services", where: "Port St. Lucie, FL",
    stat: "$6k job, closed on 2nd appointment",
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

const COMPARE_COLS = ["DIY", "Marketing Agency", "Shared Leads", "Appointly"];
const COMPARE_ROWS = [
  { label: "Outcome", Icon: Target, kind: "text", out: true, vals: ["All on you. Hard to keep up while you work.", "Promises and meetings. Slow to show results.", "Cold leads sold to many. You do the chasing.", "Qualified appointments booked on your calendar."] },
  { label: "Who runs it", Icon: User, kind: "text", out: false, vals: ["You", "You manage them", "You chase leads", "We run everything"] },
  { label: "Ad spend risk", Icon: Shield, kind: "text", out: false, vals: ["On you", "On you", "On you", "On us"] },
  { label: "What you pay for", Icon: CreditCard, kind: "text", out: false, vals: ["Your time", "Monthly fees", "Leads that flake", "Booked appointments"] },
  { label: "Works while you're on the job", Icon: Clock, kind: "bin", out: false, vals: [false, false, false, true] },
  { label: "Exclusive to you", Icon: Lock, kind: "bin", out: false, vals: [false, false, false, true] },
  { label: "You only pay for results", Icon: LineChart, kind: "bin", out: false, vals: [false, false, false, true] },
] as const;

/* ============================================================================
   Page
   ============================================================================ */

export default function ApplyClient() {
  const leadFired = useRef(false);
  const [surveyOpen, setSurveyOpen] = useState(false);

  // While the survey popup is open, lock body scroll and close it on Escape.
  useEffect(() => {
    if (!surveyOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setSurveyOpen(false);
    }
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [surveyOpen]);

  // Fire the Meta Pixel Lead event when the GHL survey is submitted. The survey
  // lives in a cross-origin iframe, so we can only observe it through the
  // postMessage that GHL's form_embed.js emits. The exact message shape varies
  // by GHL version, so we match defensively (a submit-like message from the GHL
  // origin) and fire at most once.
  // VERIFY against the live survey, and note the most reliable place to track
  // Lead is inside GHL's own pixel/tracking settings on the survey.
  useEffect(() => {
    if (!pixelReady) return;
    function onMessage(e: MessageEvent) {
      if (typeof e.origin !== "string" || !e.origin.includes("getappointly.co")) return;
      const raw = typeof e.data === "string" ? e.data : JSON.stringify(e.data ?? "");
      if (!/submit/i.test(raw)) return; // resize messages do not contain "submit"
      if (leadFired.current) return;
      leadFired.current = true;
      if (typeof (window as any).fbq === "function") {
        (window as any).fbq("track", "Lead");
      }
    }
    window.addEventListener("message", onMessage);
    return () => window.removeEventListener("message", onMessage);
  }, []);

  return (
    <div className="dscroll">
      <MetaPixel />
      <GhlEmbedScript />

      {/* Header. Logo left, phone right. Nothing else. */}
      <nav className="snav applyhead" aria-label="Primary">
        <div className="snav-in">
          <a href="/" className="snav-logo" aria-label="Appointly Solutions home">
            <img src="/images/appointly-logo-lockup.png" alt="Appointly Solutions" width={129} height={45} />
          </a>
          <a className="snav-call" href={PHONE_HREF}>
            <Phone className="h-4 w-4" aria-hidden />
            {PHONE_DISPLAY}
          </a>
        </div>
      </nav>

      {/* Hero. Pay-per-show hook, VSL, and the survey CTA side by side. */}
      <section className="sec applyhero" id="top">
        <div className="orb a" />
        <div className="wrap">
          <p className="eyebrow">For floor coating contractors</p>
          <h1>
            Only pay when a homeowner{" "}
            <span className="hl">sits down for your estimate.</span>
          </h1>
          <p className="lead">
            We run the ads on our own dime and book prequalified, exclusive
            estimates straight onto your calendar. No contracts. No BS.
          </p>

          <div className="herorow">
            <div className="herovsl">
              <div className="vslvid">
                <VidalyticsPlayer />
              </div>
              <p className="vslnote">Watch how it works, then apply.</p>
            </div>
            <div className="heroform" id="apply">
              <p className="formkicker">
                <strong>Apply for your market.</strong> We take one floor coating
                contractor per market. Answer a few quick questions, then pick a
                time. We will confirm on the call whether your area is open.
              </p>
              <button type="button" className="ctabtn" onClick={() => setSurveyOpen(true)}>
                <span className="ctabtn-top">Check Availability</span>
                <span className="ctabtn-main">Yes! I&apos;d Like a Pipeline Full of Estimates</span>
              </button>
              <div className="trustbadges">
                {TRUST_BADGES.map((b) => (
                  <span className="trustbadge" key={b}><Check aria-hidden /> {b}</span>
                ))}
              </div>
              <p className="formhint">
                Already ready to book? <a href="#book">Pick a time below.</a>
              </p>
            </div>
          </div>
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
            <img className="pbface" src="/images/proof/mark-afab.webp" alt="" width={54} height={54} loading="lazy" />
            <img className="pbface" src="/images/proof/andre.webp" alt="" width={54} height={54} loading="lazy" />
            <img className="pbface" src="/images/proof/carlos-team.webp" alt="" width={54} height={54} loading="lazy" />
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
        </div>
      </section>

      {/* Comparison table */}
      <section className="sec tint cmpsec" id="why-us">
        <div className="wrap">
          <p className="cmpeyebrow">Compare the options</p>
          <h2>Why contractors pick us <span className="hl">over a lead company.</span></h2>
          <p className="cmpsub">
            We front the ad spend, qualify every homeowner, and book appointments
            straight onto your calendar. You just show up and close.
          </p>

          <div className="cmptable">
            <div className="cmpcard">
              <div className="cmpbar" />
              <div className="cmpgrid">
                <div className="ch dim" />
                <div className="ch">DIY</div>
                <div className="ch">Marketing Agency</div>
                <div className="ch">Shared Leads</div>
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
                <img className="photo" src={t.photo} alt={`${t.name} of ${t.who}`} width={1080} height={1350} loading="lazy" />
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

      {/* Closing CTA, the booking calendar */}
      <section className="sec tint" id="book">
        <div className="wrap wallhead">
          <h2>Ready to <span className="hl">fill your calendar?</span></h2>
          <p className="wallsub">
            Book your strategy call. About 20 minutes &middot; No obligation &middot; By application only.
          </p>
        </div>
        <div className="wrap">
          <div className="calwrap">
            <GhlCalendar />
          </div>
        </div>
      </section>

      {/* Survey popup. The GHL survey is mounted only while open so the embed
          script resizes a freshly loaded iframe each time. */}
      {surveyOpen && (
        <div
          className="svmodal"
          role="dialog"
          aria-modal="true"
          aria-label="Apply for your market"
          onClick={() => setSurveyOpen(false)}
        >
          <div className="svmodal-box" onClick={(e) => e.stopPropagation()}>
            <button
              type="button"
              className="svmodal-close"
              aria-label="Close"
              autoFocus
              onClick={() => setSurveyOpen(false)}
            >
              <X aria-hidden />
            </button>
            <div className="svmodal-body">
              <GhlSurvey />
            </div>
          </div>
        </div>
      )}

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
