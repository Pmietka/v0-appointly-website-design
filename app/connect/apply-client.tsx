"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Script from "next/script";
import { Phone, Check, X, ArrowLeft } from "lucide-react";

import { PHONE_DISPLAY, PHONE_HREF } from "@/components/site-nav";
import { LazyVidalytics } from "@/components/LazyVidalytics";
import { LazyExternalScript } from "@/components/deferred-loader";
import { OPEN_APPLY_EVENT } from "./apply-button";

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
const REPS_OPTIONS = ["I run all the leads myself", "1-3 reps", "4-10 reps", "10+ reps"];

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
              <p className="qsubhead">Enter your info below. On the next step you&apos;ll pick a time that works for you.</p>
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

// Trust badges under the hero CTA (mirrors the reference funnel's badge row).
const TRUST_BADGES = ["No contracts", "Pay per show", "Exclusive leads"];

/* ============================================================================
   Page
   ============================================================================ */

/* The page shell: pixel, survey modal, header, hero, closing CTA and footer.
   Everything between the hero and the closing CTA (who we are, the wall of
   proof, the process) is server rendered in page.tsx and passed in as
   children; its buttons open the modal through OPEN_APPLY_EVENT. */
export default function ApplyClient({ children }: { children?: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const [tracking, setTracking] = useState<Tracking>(EMPTY_TRACKING);

  // Capture Meta + UTM attribution on page load (URL params and cookies).
  useEffect(() => setTracking(readTracking()), []);

  // Any ApplyButton on the page opens the survey.
  useEffect(() => {
    const onOpen = () => setOpen(true);
    window.addEventListener(OPEN_APPLY_EVENT, onOpen);
    return () => window.removeEventListener(OPEN_APPLY_EVENT, onOpen);
  }, []);

  return (
    <div className="dscroll cnx">
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
            Keep Every Crew Booked Weeks In Advance.{" "}
            <span className="hl">Only Pay When You&apos;re Face to Face With a Qualified Homeowner.</span>
          </h1>
          <p className="lead">
            Our clients get 40 to 60 appointments a month. Unqualified
            estimate, you don&apos;t pay. No contracts. No BS.
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
                <strong>See how many jobs are waiting in your market.</strong>{" "}
                We&apos;ll show you the demand in your area, how many jobs we can
                book you, and the closing rate it takes to make it profitable. One
                contractor per market, so if your area&apos;s open, they&apos;re all yours.
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

      {children}

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
          Check Availability: Apply Now
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
