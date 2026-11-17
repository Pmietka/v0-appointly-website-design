"use client";

import { useEffect, useRef, useState } from "react";
import { X, ArrowLeft } from "lucide-react";

import { pixelReady } from "@/components/meta-pixel";
import { deliverLead } from "@/lib/deliver-lead";
import {
  B2B_FORM_SUBMIT_EVENT,
  buildLeadPayload,
  fireCustomPixelEvent,
  fireGtagEvent,
  getBookingParams,
} from "@/lib/tracking";
import "./qualify-modal.css";

/* Shared by /connect and the homepage ad variants (/fb-ads-breakdown,
   /booked-estimates). Must render inside a .dscroll element (fonts, tokens and
   the modal styles are scoped to it). */

// GHL booking widget embedded in the modal after the survey is submitted.
const CALENDAR_BASE = "https://link.getappointly.co/widget/booking/U3zYpjFagC8HFqQw21rC";

/* ============================================================================
   Qualification survey modal. Opens from any CTA. Four steps, then on submit it
   POSTs the lead to GHL and swaps in the booking calendar (prefilled).
   ============================================================================ */

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

/* ----------------------------------------------------------------------------
   Duplicate guard. One person should send one lead to GHL and one Meta Lead
   event, even if they close the modal, refresh, or come back and fill the
   survey in again. Each submit is remembered in localStorage (as a hash of
   email + phone, never the raw details) for SENT_TTL_MS; a repeat with the
   same details inside that window skips the webhook and the pixel and goes
   straight to the calendar. Different details (a typo fixed, someone else on
   the same device) still go through. If storage is blocked we simply can't
   remember, and the submit goes through as before.
   ---------------------------------------------------------------------------- */
const SENT_KEY = "appointly:connect:sent";
const SENT_TTL_MS = 30 * 24 * 60 * 60 * 1000;

// Small non-crypto string hash (FNV-1a), just so raw contact details are never stored.
function hashKey(s: string): string {
  let h = 0x811c9dc5;
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 0x01000193);
  }
  return (h >>> 0).toString(36);
}

function leadKey(email: string, phone: string): string {
  return hashKey(email.trim().toLowerCase() + "|" + normalizePhone(phone));
}

function readSent(): Record<string, number> {
  try {
    const raw = window.localStorage.getItem(SENT_KEY);
    const parsed = raw ? JSON.parse(raw) : {};
    return parsed && typeof parsed === "object" ? parsed : {};
  } catch {
    return {};
  }
}

function wasSent(key: string): boolean {
  const t = readSent()[key];
  return typeof t === "number" && Date.now() - t < SENT_TTL_MS;
}

// Remember (sent = true) or forget (sent = false) a lead, pruning expired ones.
function setSent(key: string, sent: boolean) {
  try {
    const now = Date.now();
    const next: Record<string, number> = {};
    for (const [k, t] of Object.entries(readSent())) {
      if (typeof t === "number" && now - t < SENT_TTL_MS) next[k] = t;
    }
    if (sent) next[key] = now;
    else delete next[key];
    window.localStorage.setItem(SENT_KEY, JSON.stringify(next));
  } catch {
    // Storage blocked (private mode etc). Nothing to remember with.
  }
}

const ROLE_OPTIONS = ["Owner / CEO", "Marketing or Sales Leader", "Salesperson", "Other"];
const REVENUE_OPTIONS = ["$0 - $500K Per Year", "$500K - $1M Per Year", "$1M - $5M Per Year", "$5M+ Per Year"];
const REPS_OPTIONS = ["I run all the leads myself", "1-3 reps", "4-10 reps", "10+ reps"];

/* The modal stays mounted after it is first opened and is only hidden when
   closed, so closing it never throws away a submitted survey: reopening shows
   the same calendar instead of starting the survey over (which used to send
   the lead a second time). It also keeps the calendar iframe and its size. */
export function QualifyModal({
  open,
  onClose,
  extraAnswers,
}: {
  open: boolean;
  onClose: () => void;
  /** Extra fields sent with the lead, for example the landing page path. */
  extraAnswers?: Record<string, string>;
}) {
  const [step, setStep] = useState(1);
  const [role, setRole] = useState("");
  const [revenue, setRevenue] = useState("");
  const [reps, setReps] = useState("");
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [calSrc, setCalSrc] = useState("");
  // Set synchronously on the first submit so a fast double click or double
  // Enter can't get a second one in before React re-renders.
  const sentRef = useRef(false);

  // Lock body scroll while open and close on Escape.
  useEffect(() => {
    if (!open) return;
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
  }, [open, onClose]);

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

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!fullName.trim() || !phone.trim() || !email.trim()) return;
    if (sentRef.current) return;
    sentRef.current = true;

    // Same person, same details, already sent from this browser: skip the
    // pixel and the webhook and just show the calendar again. Building the
    // payload is skipped too, so the stored lead id (which /booked-call uses
    // to fire Schedule once per lead) is not replaced by a new one.
    const key = leadKey(email, phone);
    const duplicate = wasSent(key);

    const parts = fullName.trim().split(/\s+/);
    let first_name = parts.shift() || "";
    let last_name = parts.join(" ");

    if (!duplicate) {
      // 1. Build the universal tracking payload (same shape as the client
      // landing pages): last touch + first touch attribution, click ids,
      // fbc/fbp, IP, hashed user data for CAPI, and a shared event id
      // (capi_event_id) for dedupe.
      const { payload, eventId, offer } = await buildLeadPayload({
        full_name: fullName,
        phone,
        email,
        answers: { role, revenue, reps, source: "apply-page", ...extraAnswers },
      });
      first_name = payload.first_name;
      last_name = payload.last_name;

      // 2. Custom B2BFormSubmit pixel event, for funnel reporting only. The
      //    browser never fires the standard Lead event: Lead is sent server side
      //    (CAPI) only after the call is graded in Slack.
      if (pixelReady) fireCustomPixelEvent(B2B_FORM_SUBMIT_EVENT, eventId, { content_name: "b2b_apply", offer });
      fireGtagEvent("generate_lead", { event_id: eventId, lead_source: payload.lead_source, offer });

      // 3. Deliver to GHL: server route first (adds real IP), browser
      // fallback. Never block the UI on the network. Remember the lead before
      // sending, and forget it again if delivery fails, so a lead that never
      // reached GHL can still be submitted again.
      setSent(key, true);
      void deliverLead(payload).then((result) => {
        if (result === "failed") setSent(key, false);
      });
    }

    // 4. Swap the survey for the booking calendar, prefilled. GHL reads these
    // query params on the iframe src. This calendar's default form has a single
    // combined "Full Name" field, prefilled with `full_name` (the split
    // first_name/last_name keys don't map to it); email/phone fill from `email`
    // and `phone`. The phone must be E.164 or the field ignores it, so normalize.
    // UTMs, Meta ad ids, click ids and landing_page ride along so GHL's own
    // calendar attribution matches (same params as the booking links).
    const params = new URLSearchParams({
      full_name: fullName.trim(),
      first_name,
      last_name,
      email,
      phone: normalizePhone(phone),
      ...getBookingParams(),
    });
    const cal = `${CALENDAR_BASE}?${params.toString()}`;
    setCalSrc(cal);
    setSubmitted(true);
  }

  return (
    <div
      className="qmodal"
      role="dialog"
      aria-modal="true"
      aria-label="Apply for your market"
      aria-hidden={!open}
      // display:none, not visibility:hidden: GHL's form_embed.js sets an
      // inline visibility:visible on the booking iframe, which would show
      // through a visibility-hidden parent.
      style={open ? undefined : { display: "none" }}
      onClick={onClose}
    >
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
                By submitting, you agree to receive calls and texts from Appointly
                Solutions about your inquiry, including automated messages. Message
                frequency varies. Message and data rates may apply. Reply STOP to
                opt out. See our <a href="/privacy">Privacy Policy</a> and{" "}
                <a href="/terms">Terms</a>.
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
