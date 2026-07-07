"use client";

import { Fragment, useEffect, useState } from "react";
import Image from "next/image";
import Script from "next/script";
import {
  Phone, CalendarCheck, Check, X, ArrowLeft,
  Target, User, Shield, CreditCard, Clock, Lock, LineChart,
} from "lucide-react";

import { PHONE_DISPLAY, PHONE_HREF } from "@/components/site-nav";
import { LazyVidalytics } from "@/components/LazyVidalytics";
import { LazyExternalScript } from "@/components/deferred-loader";

// The hero VSL (Vidalytics embed yab2hhU03er3If8m). No poster thumbnail URL yet,
// so LazyVidalytics fills the 16:9 box with a neutral placeholder until the
// player mounts (which happens automatically just after first paint).
const VSL_EMBED_ID = "yab2hhU03er3If8m";

/* ============================================================================
   CONFIGURABLE CONSTANTS. Edit these, nothing else, to wire the page up.
   ============================================================================ */

// Meta Pixel / dataset id. Fires PageView on load and Lead on survey submit.
const META_PIXEL_ID = "985991997226201";

// The GoHighLevel inbound webhook the survey POSTs to.
const GHL_WEBHOOK_URL = "https://services.leadconnectorhq.com/hooks/bv8PsVl3lvidD0j8bBqP/webhook-trigger/37e334fa-fbb1-438a-9898-b20b6cbd4031";

// GHL booking widget embedded in the modal after the survey is submitted.
const CALENDAR_BASE = "https://link.getappointly.co/widget/booking/U3zYpjFagC8HFqQw21rC";

// The hero VSL is deferred via <LazyVidalytics> (see components/LazyVidalytics).
// To swap the video later, change VSL_EMBED_ID / VSL_POSTER above.

/* ============================================================================
   Meta Pixel helpers
   ============================================================================ */

// A real pixel id is all digits. Anything else (the placeholder) keeps it off.
const pixelReady = /^\d+$/.test(META_PIXEL_ID);

function MetaPixel() {
  if (!pixelReady) return null;
  // Standard Meta Pixel base code, loaded via next/script with afterInteractive so
  // it stays off the critical path but is ready before the survey submit fires Lead.
  // Defines fbq, inits with our id, and fires PageView.
  return (
    <>
      <Script id="meta-pixel" strategy="afterInteractive">
        {`!function(f,b,e,n){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[]}(window,document,'script');
fbq('init', '${META_PIXEL_ID}');
fbq('track', 'PageView');`}
      </Script>
      {/* fbevents.js is deferred to first interaction / short timeout to keep it
          off the initial load (TBT) window. The fbq() calls above and the survey
          Lead event queue and are sent once the library loads. */}
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
   Qualification survey modal. Opens from any CTA. Four steps, then on submit it
   POSTs the lead to GHL and swaps in the booking calendar (prefilled).
   ============================================================================ */

type Tracking = {
  fbclid: string; fbc: string; fbp: string;
  utm_source: string; utm_medium: string; utm_campaign: string;
  utm_term: string; utm_content: string; page_url: string;
};

const EMPTY_TRACKING: Tracking = {
  fbclid: "", fbc: "", fbp: "",
  utm_source: "", utm_medium: "", utm_campaign: "", utm_term: "", utm_content: "",
  page_url: "",
};

// GHL's calendar phone field is an international input: it silently ignores a
// prefill value it can't parse. A number typed as "(555) 123-4567" often fails,
// while E.164 ("+15551234567") populates reliably. Normalize before prefilling:
// keep a leading +, strip everything else to digits, and assume US (+1) for a
// bare 10-digit number.
function normalizePhone(raw: string): string {
  const trimmed = raw.trim();
  const hasPlus = trimmed.startsWith("+");
  const digits = trimmed.replace(/\D/g, "");
  if (!digits) return "";
  if (hasPlus) return "+" + digits;
  if (digits.length === 10) return "+1" + digits;
  if (digits.length === 11 && digits.startsWith("1")) return "+" + digits;
  return "+" + digits;
}

function readCookie(name: string): string {
  if (typeof document === "undefined") return "";
  const escaped = name.replace(/([.$?*|{}()[\]\\/+^])/g, "\\$1");
  const m = document.cookie.match(new RegExp("(?:^|; )" + escaped + "=([^;]*)"));
  return m ? decodeURIComponent(m[1]) : "";
}

// Read the Meta click id + cookies and the UTM params. Called once on page load.
function readTracking(): Tracking {
  if (typeof window === "undefined") return EMPTY_TRACKING;
  const p = new URLSearchParams(window.location.search);
  const get = (k: string) => p.get(k) || "";
  return {
    fbclid: get("fbclid"),
    fbc: readCookie("_fbc"),
    fbp: readCookie("_fbp"),
    utm_source: get("utm_source"),
    utm_medium: get("utm_medium"),
    utm_campaign: get("utm_campaign"),
    utm_term: get("utm_term"),
    utm_content: get("utm_content"),
    page_url: window.location.href,
  };
}

const ROLE_OPTIONS = ["Owner / CEO", "Marketing or Sales Leader", "Salesperson", "Other"];
const REVENUE_OPTIONS = ["$0 - $500K Per Year", "$500K - $1M Per Year", "$1M - $5M Per Year", "$5M+ Per Year"];
const REPS_OPTIONS = ["I run all the leads myself", "1-3 reps", "3-10 reps", "10+ reps"];

function QualifyModal({ tracking, onClose }: { tracking: Tracking; onClose: () => void }) {
  const [step, setStep] = useState(1);
  const [role, setRole] = useState("");
  const [revenue, setRevenue] = useState("");
  const [reps, setReps] = useState("");
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [calSrc, setCalSrc] = useState("");

  // Lock body scroll while open and close on Escape.
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [onClose]);

  // Load GHL's form_embed.js once the calendar is shown. It auto-sizes the
  // iframe, so we never set a fixed height.
  useEffect(() => {
    if (!submitted) return;
    if (document.getElementById("ghl-embed-js")) return;
    const s = document.createElement("script");
    s.id = "ghl-embed-js";
    s.src = "https://link.getappointly.co/js/form_embed.js";
    s.type = "text/javascript";
    s.async = true;
    document.body.appendChild(s);
  }, [submitted]);

  // Progress fills as they advance; full once the calendar shows.
  const pct = submitted ? 100 : step * 25;

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!fullName.trim() || !phone.trim() || !email.trim()) return;

    // 1. Fire the Meta Pixel Lead event.
    if (pixelReady && typeof (window as any).fbq === "function") {
      (window as any).fbq("track", "Lead");
    }

    // 2. Split the full name: first word is the first name, the rest is last.
    const parts = fullName.trim().split(/\s+/);
    const first_name = parts.shift() || "";
    const last_name = parts.join(" ");

    // 3. POST to GHL, fire and forget. Never block the UI on the network.
    const payload = {
      first_name, last_name, phone, email,
      role, revenue, reps,
      fbclid: tracking.fbclid, fbc: tracking.fbc, fbp: tracking.fbp,
      utm_source: tracking.utm_source, utm_medium: tracking.utm_medium,
      utm_campaign: tracking.utm_campaign, utm_term: tracking.utm_term,
      utm_content: tracking.utm_content,
      source: "apply-page",
      page_url: tracking.page_url,
    };
    try {
      fetch(GHL_WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
        keepalive: true,
      }).catch((err) => console.error("Apply webhook failed:", err));
    } catch (err) {
      console.error("Apply webhook failed:", err);
    }

    // 4. Swap the survey for the booking calendar, prefilled. GHL reads these
    // query params on the iframe src. This calendar's default form has a single
    // combined "Full Name" field, prefilled with `full_name` (the split
    // first_name/last_name keys don't map to it); email/phone fill from `email`
    // and `phone`. The phone must be E.164 or the field ignores it, so normalize.
    // first_name/last_name are kept as a harmless fallback if the form is ever
    // switched to split name fields.
    const params = new URLSearchParams({
      full_name: fullName.trim(),
      first_name,
      last_name,
      email,
      phone: normalizePhone(phone),
    });
    const cal = `${CALENDAR_BASE}?${params.toString()}`;
    setCalSrc(cal);
    setSubmitted(true);
  }

  return (
    <div className="qmodal" role="dialog" aria-modal="true" aria-label="Apply for your market" onClick={onClose}>
      <div className="qmodal-box" onClick={(e) => e.stopPropagation()}>
        <div className="qprogress"><span className="qprogress-bar" style={{ width: `${pct}%` }} /></div>
        <button type="button" className="qclose" aria-label="Close" onClick={onClose}>
          <X aria-hidden />
        </button>

        <div className="qbody">
          {submitted ? (
            <iframe
              src={calSrc}
              id="appointly-cal"
              title="Book your strategy call"
              scrolling="no"
              style={{ width: "100%", border: "none", overflow: "hidden" }}
            />
          ) : step === 1 ? (
            <div className="qstep">
              <p className="qlabel">Step 1 of 4</p>
              <h2 className="qquestion">What is your role in the company?</h2>
              <p className="qsubhead">We only partner directly with decision makers.</p>
              <div className="qoptions">
                {ROLE_OPTIONS.map((o) => (
                  <button type="button" key={o} className={`qoption${role === o ? " sel" : ""}`}
                    onClick={() => { setRole(o); setStep(2); }}>{o}</button>
                ))}
              </div>
            </div>
          ) : step === 2 ? (
            <div className="qstep">
              <p className="qlabel">Step 2 of 4</p>
              <h2 className="qquestion">What are you on track to do this year in revenue?</h2>
              <p className="qsubhead">We only ask to see if we would be a good fit.</p>
              <div className="qoptions">
                {REVENUE_OPTIONS.map((o) => (
                  <button type="button" key={o} className={`qoption${revenue === o ? " sel" : ""}`}
                    onClick={() => { setRevenue(o); setStep(3); }}>{o}</button>
                ))}
              </div>
              <button type="button" className="qback" onClick={() => setStep(1)}>
                <ArrowLeft aria-hidden /> Go Back
              </button>
            </div>
          ) : step === 3 ? (
            <div className="qstep">
              <p className="qlabel">Step 3 of 4</p>
              <h2 className="qquestion">How many sales reps do you have?</h2>
              <p className="qsubhead">Including yourself if you run the appointments.</p>
              <div className="qoptions">
                {REPS_OPTIONS.map((o) => (
                  <button type="button" key={o} className={`qoption${reps === o ? " sel" : ""}`}
                    onClick={() => { setReps(o); setStep(4); }}>{o}</button>
                ))}
              </div>
              <button type="button" className="qback" onClick={() => setStep(2)}>
                <ArrowLeft aria-hidden /> Go Back
              </button>
            </div>
          ) : (
            <form className="qstep" onSubmit={handleSubmit}>
              <p className="qlabel">Step 4 of 4</p>
              <h2 className="qquestion">Fill out your details to book your call</h2>
              <p className="qsubhead">Enter your info below — on the next step you&apos;ll pick a time that works for you.</p>
              <input className="qinput" type="text" placeholder="Enter your full name" autoComplete="name"
                value={fullName} onChange={(e) => setFullName(e.target.value)} required autoFocus />
              <input className="qinput" type="tel" placeholder="+1 (555) 000-0000" autoComplete="tel"
                value={phone} onChange={(e) => setPhone(e.target.value)} required />
              <input className="qinput" type="email" placeholder="your@email.com" autoComplete="email"
                value={email} onChange={(e) => setEmail(e.target.value)} required />
              <button type="submit" className="qsubmit">Submit</button>
              <p className="qconsent">
                By submitting you agree to receive calls and texts from Appointly
                about your inquiry.
              </p>
              <button type="button" className="qback" onClick={() => setStep(3)}>
                <ArrowLeft aria-hidden /> Go Back
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
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
  const [open, setOpen] = useState(false);
  const [tracking, setTracking] = useState<Tracking>(EMPTY_TRACKING);

  // Capture Meta + UTM attribution on page load (URL params and cookies).
  useEffect(() => setTracking(readTracking()), []);

  return (
    <div className="dscroll">
      <MetaPixel />
      {open && <QualifyModal tracking={tracking} onClose={() => setOpen(false)} />}

      {/* Header. Logo left; phone + apply CTA right. */}
      <nav className="snav applyhead" aria-label="Primary">
        <div className="snav-in">
          <a href="/" className="snav-logo" aria-label="Appointly Solutions home">
            <Image src="/images/appointly-logo-lockup.png" alt="Appointly Solutions" width={129} height={45} priority />
          </a>
          <div className="applynav-right">
            <a className="snav-call" href={PHONE_HREF}>
              <Phone className="h-4 w-4" aria-hidden />
              {PHONE_DISPLAY}
            </a>
            <button type="button" className="navcta" onClick={() => setOpen(true)}>
              Check Availability
            </button>
          </div>
        </div>
      </nav>

      {/* Hero. Pay-per-show hook, VSL, and the booking CTA side by side. */}
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
                <LazyVidalytics embedId={VSL_EMBED_ID} />
              </div>
              <p className="vslnote">Watch how it works, then apply.</p>
            </div>
            <div className="heroform" id="apply">
              <p className="formkicker">
                <strong>Apply for your market.</strong> We take one floor coating
                contractor per market. Answer a few quick questions, then pick a
                time. We will confirm on the call whether your area is open.
              </p>
              <button type="button" className="ctabtn" onClick={() => setOpen(true)}>
                <span className="ctabtn-top">Check Availability</span>
                <span className="ctabtn-main">Yes! I&apos;d Like a Pipeline Full of Estimates</span>
              </button>
              <div className="trustbadges">
                {TRUST_BADGES.map((b) => (
                  <span className="trustbadge" key={b}><Check aria-hidden /> {b}</span>
                ))}
              </div>
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
            <button type="button" className="ctabtn ctabtn-inline" onClick={() => setOpen(true)}>
              <span className="ctabtn-top">Check Availability</span>
              <span className="ctabtn-main">Claim Your Market</span>
            </button>
          </div>
        </div>
      </section>

      {/* Recent Client Wins */}
      <section className="sec tint" id="wins">
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

      {/* Comparison table (desktop only, hidden on mobile) */}
      <section className="sec cmpsec applycmp" id="why-us">
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

      {/* Closing CTA. Links to the booking calendar. */}
      <section className="sec tint" id="book">
        <div className="wrap wallhead">
          <h2>Ready to <span className="hl">fill your calendar?</span></h2>
          <p className="wallsub">
            Book your strategy call. About 20 minutes &middot; No obligation
            &middot; By application only.
          </p>
          <div className="closingcta">
            <button type="button" className="ctabtn ctabtn-inline" onClick={() => setOpen(true)}>
              <span className="ctabtn-top">Check Availability</span>
              <span className="ctabtn-main">Yes! I&apos;d Like a Pipeline Full of Estimates</span>
            </button>
          </div>
        </div>
      </section>

      {/* Sticky apply CTA on mobile only. Keeps the primary action a thumb-tap
          away while the video plays, no matter how far the page is scrolled. */}
      <div className="mcta">
        <button type="button" className="mcta-btn" onClick={() => setOpen(true)}>
          Check Availability — Apply Now
        </button>
      </div>

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
