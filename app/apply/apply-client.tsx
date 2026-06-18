"use client";

import { Fragment, useEffect, useRef, useState } from "react";
import {
  Phone, Star, Plus, CalendarCheck, Check, X,
  Target, User, Shield, CreditCard, Clock, Lock, LineChart,
  MapPin, Ruler, CalendarClock, PhoneCall,
} from "lucide-react";

import { PHONE_DISPLAY, PHONE_HREF } from "@/components/site-nav";
import { VidalyticsPlayer } from "../lander/vidalytics-player";
import { TestimonialWall } from "../lander/testimonial-wall";
import type { Testimonial } from "../lander/page";

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
   Recorded-call transcript (rebuilt here so /apply owns its own copy, no
   em dashes). Same look as the /lander call card.
   ============================================================================ */

const CALL_LINES: { who: "sarah" | "linda"; speaker: string; text: string }[] = [
  { who: "sarah", speaker: "Sarah, Appointly", text: "What's got you interested in getting the garage coated?" },
  { who: "linda", speaker: "Linda, Homeowner", text: "It's been peeling for years, we finally want it done right." },
  { who: "sarah", speaker: "Sarah, Appointly", text: "Got it. And what were you looking to have done?" },
  { who: "linda", speaker: "Linda, Homeowner", text: "The whole two car garage, something durable." },
  { who: "sarah", speaker: "Sarah, Appointly", text: "Great. We have availability at 6 on Tuesday or 5 on Wednesday. We'll bring samples and give you an exact estimate." },
  { who: "linda", speaker: "Linda, Homeowner", text: "Tuesday at 6 works for us." },
];
const CALL_CHECKS = ["Homeowner", "Real project", "In service area", "Time locked"];
const CALL_WAVE = [6, 13, 19, 9, 23, 14, 8, 17, 21, 10, 15, 7, 13, 9, 18, 11];

function CallTranscript() {
  return (
    <figure className="shotfig">
      <div className="callcard">
        <div className="callhd">
          <span className="callphone" aria-hidden><PhoneCall /></span>
          <span className="callmeta">
            <span className="calltitle">Connected in 47 seconds</span>
            <span className="callstatus"><span className="calllive" aria-hidden /> Recorded call</span>
          </span>
          <svg className="callwave" viewBox="0 0 84 24" aria-hidden role="presentation">
            {CALL_WAVE.map((h, i) => (
              <rect key={i} x={i * 5} y={(24 - h) / 2} width="2.6" height={h} rx="1.3" />
            ))}
          </svg>
        </div>
        <div className="calllog">
          {CALL_LINES.map((l, i) => (
            <div className={`callline ${l.who}`} key={i}>
              <span className="callspk">{l.speaker}</span>
              <p className="callsay">{l.text}</p>
            </div>
          ))}
        </div>
        <div className="callchecks">
          {CALL_CHECKS.map((c) => (
            <span className="callchk" key={c}><Check aria-hidden /> {c}</span>
          ))}
        </div>
      </div>
      <figcaption>
        We call in under a minute, qualify on the spot, and only book homeowners
        ready for a real estimate.
      </figcaption>
    </figure>
  );
}

/* ============================================================================
   Data
   ============================================================================ */

const QUALIFICATIONS = [
  { Icon: MapPin, label: "Homeowner is located in your service area." },
  { Icon: Target, label: "Has a real need and interest in floor coating." },
  { Icon: Ruler, label: "Fits your scope on job size and budget." },
  { Icon: CalendarClock, label: "Agreed time for an estimate that fits your calendar." },
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

const FAQ = [
  {
    q: "How does the pricing work?",
    a: "You pay one flat fee for every qualified estimate we book onto your calendar. We front the ad spend ourselves. You never pay for a raw lead, only for a booked homeowner ready for an estimate. We map the exact number to your business on the call.",
  },
  {
    q: "What counts as a booked appointment?",
    a: "A verified homeowner in your service area who wants floor coating work and has agreed to an estimate time that fits your calendar. Not a raw lead or a form fill, an actual booked estimate.",
  },
  {
    q: "What if an appointment doesn't close?",
    a: "Not every estimate closes, and that's normal. We feed your close and no-show data back into targeting so the homeowners we book keep getting more qualified over time.",
  },
  {
    q: "Are my appointments exclusive?",
    a: "Yes. We only work with one contractor per market. The estimates we book are never shared with a local competitor.",
  },
  {
    q: "Is there a long term contract?",
    a: "No long term lock in. You can cancel anytime, we just ask for a short notice period so campaigns can be wound down cleanly.",
  },
  {
    q: "What areas and trades do you cover?",
    a: "Small to mid sized markets across the US and Canada where contractors have room to grow. Our main focus right now is floor coating and epoxy contractors.",
  },
];

const TESTIMONIALS: Testimonial[] = [
  {
    name: "Mark T.",
    who: "AFAB Services",
    where: "Port St. Lucie, FL",
    stat: "$6k job, closed on 2nd appointment",
    quote: "You've already paved the ground. I just go in and sweep it up. You guys are doing a great job.",
    photo: "/images/proof/mark-afab.webp",
  },
  {
    name: "Andre S.",
    who: "Great Lakes Elite Coatings",
    where: "Chicago, IL",
    stat: "8 new jobs in his second month",
    quote: "By the time I show up, they already know they want it. I'm just there to give the number.",
    photo: "/images/proof/andre.webp",
  },
  {
    name: "Carlos V.",
    who: "Diamond Group",
    where: "Portland, OR",
    stat: "1st appt covered full onboarding cost",
    quote: "One job paid for everything. From there it just kept coming.",
    photo: "/images/proof/carlos-team.webp",
  },
  {
    name: "Dave",
    quote: "The appointments were already warmed up. I just showed up and closed.",
    photo: "/images/proof/dave.webp",
  },
  {
    name: "Adrian",
    video: true,
    videoSrc: "/videos/adrian.mp4",
    poster: "/images/proof/adrian-poster.jpg",
    quote: "",
  },
  {
    name: "Nate",
    quote: "After a slow first few weeks, over the last 2 months I'm at a 58% close rate from your appointments, about on par with my own warm leads. You just give me a lot more volume.",
  },
  { name: "Viktor", quote: "I closed 4 of my first 7 appointments." },
  {
    name: "Jose",
    quote: "After closing 4 jobs the first month, I've got 2 more this month that will cross the line, and I'm already at 5 jobs with 8 days left.",
  },
  { name: "Max", quote: "My calendar is full. Hasn't been this way all year." },
];

function Stars() {
  return (
    <div className="stars" aria-label="5 out of 5 stars">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star key={i} className="ci" aria-hidden />
      ))}
    </div>
  );
}

/* ============================================================================
   Page
   ============================================================================ */

export default function ApplyClient() {
  const tMark = TESTIMONIALS.find((t) => t.name === "Mark T.")!;
  const leadFired = useRef(false);

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

      {/* 1 · Header. Logo left, phone right. Nothing else. */}
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

      {/* 2 · Hero. VSL and the apply form side by side (stacks on mobile). */}
      <section className="sec applyhero" id="top">
        <div className="orb a" />
        <div className="wrap">
          <p className="eyebrow">For floor coating contractors</p>
          <h1>
            We book floor coating estimates onto your calendar.{" "}
            <span className="hl">You show up and close.</span>
          </h1>
          <p className="lead">
            We run the ads with our own money. You pay only when a qualified
            homeowner is booked on your calendar. No ad spend risk. No shared leads.
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
                contractor per market. Tell us about your business, then pick a
                time. We will confirm on the call whether your area is open.
              </p>
              <GhlSurvey />
              <p className="formhint">
                Already ready to book? <a href="#book">Pick a time below.</a>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3 · Risk reversal stat block */}
      <section className="sec" id="risk">
        <div className="orb a" />
        <div className="wrap">
          <h2>No risk to you. <span className="hl">We front it all.</span></h2>
          <div className="grid g3">
            <div className="stat"><div className="sv">$0</div><div className="sl">Ad spend risk to you. We front it.</div></div>
            <div className="stat"><div className="sv word">Pay per appointment</div><div className="sl">We book appointments, not leads.</div></div>
            <div className="stat"><div className="sv">8 jobs</div><div className="sl">Average for our newest clients in month two.</div></div>
          </div>
        </div>
      </section>

      {/* 4 · Is this for you filter */}
      <section className="sec tint" id="is-this-for-you">
        <div className="wrap">
          <h2>We are selective. <span className="hl">Is this you?</span></h2>
          <div className="grid g3">
            <div className="qual"><span className="qc" /><span className="qt">You sell to a market with homeowners who can afford premium floor coating.</span></div>
            <div className="qual"><span className="qc" /><span className="qt">Your team can run and close in home estimates.</span></div>
            <div className="qual"><span className="qc" /><span className="qt">You have open capacity for more booked jobs.</span></div>
          </div>
          <p className="answer">
            If that is you, you are leaving <span className="hl">jobs on the table.</span> Apply below.
          </p>
        </div>
      </section>

      {/* 5 · What happens on the call */}
      <section className="sec tint" id="call">
        <div className="wrap wallhead">
          <p className="eyebrow">What happens on the call</p>
          <h2>A working session, <span className="hl">not a sales pitch.</span></h2>
          <p className="wallsub">It runs about 20 minutes and it is low pressure.</p>
        </div>
        <div className="wrap">
          <ul className="agenda">
            <li><span className="ac" aria-hidden /><span className="at"><strong>Your market.</strong> We check whether your area is still open.</span></li>
            <li><span className="ac" aria-hidden /><span className="at"><strong>Your numbers.</strong> Your target jobs per month and your close rate.</span></li>
            <li><span className="ac" aria-hidden /><span className="at"><strong>The plan.</strong> Exactly how we would fill your calendar and what pay per appointment looks like for you.</span></li>
            <li><span className="ac" aria-hidden /><span className="at"><strong>Your call.</strong> If it is a fit we map next steps. If not, we tell you straight.</span></li>
          </ul>
        </div>
      </section>

      {/* 7 · Mark AFAB case study */}
      <section className="sec" id="case-study">
        <div className="wrap">
          <p className="eyebrow">Case study &middot; AFAB Services</p>
          <h2>They show up <span className="hl">ready to buy.</span></h2>
          <article className="casestudy">
            <div className="csvideo">
              <video src="/videos/mark-afab.mp4" poster="/images/proof/mark-afab.webp" controls playsInline preload="metadata" />
            </div>
            <div className="csbody">
              <Stars />
              <blockquote className="csquote">
                &ldquo;You&apos;ve already paved the ground. I just go in and sweep it up.&rdquo;
              </blockquote>
              <p className="csnarr">
                Mark was already running a busy home improvement company that never
                slows down. He had a profitable floor coating business sitting right
                there, and no time to actually sell it.
              </p>
              <p className="csnarr">
                Now we send him homeowners who are mostly ready to go. He shows up,
                gives the estimate, chats, sends the proposal. The jobs pile in.
              </p>
              <div className="csmeta">
                <div className="cswrap">
                  <div className="csname">{tMark.name}</div>
                  <div className="cswho">{tMark.who} &middot; {tMark.where}</div>
                </div>
                {tMark.stat && <span className="csstat">{tMark.stat}</span>}
              </div>
            </div>
          </article>
        </div>
      </section>

      {/* 8 · The recorded call demo */}
      <section className="sec tint" id="demo">
        <div className="wrap wallhead">
          <p className="eyebrow">Appointment quality</p>
          <h2>This is every appointment, <span className="hl">before it reaches your calendar.</span></h2>
        </div>
        <div className="wrap">
          <div className="shotrow">
            <CallTranscript />
          </div>
        </div>
      </section>

      {/* 9 · What a qualified appointment means */}
      <section className="sec" id="quality">
        <div className="wrap">
          <p className="eyebrow">What you&apos;re actually getting</p>
          <h2>What a <span className="hl">qualified appointment</span> means.</h2>
          <ul className="quallist">
            {QUALIFICATIONS.map((q) => {
              const Icon = q.Icon;
              return (
                <li className="qualrow" key={q.label}>
                  <span className="qualicon"><Icon aria-hidden /></span>
                  <span className="qualtext"><span className="quallabel">{q.label}</span></span>
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      {/* 10 · Leads vs booked appointments */}
      <section className="sec tint">
        <div className="wrap">
          <h2>Paying for leads is a <span className="hl">waste of money.</span></h2>
          <div className="cmp">
            <div className="cc bad">
              <div className="ch"><span className="ctag b">Leads</span> Paying for leads</div>
              <ul>
                <li>You chase them yourself</li>
                <li>Call late and they are gone</li>
                <li>30 leads, maybe 2 legit</li>
                <li>Competing with 10 other companies</li>
              </ul>
            </div>
            <div className="cc good">
              <div className="ch"><span className="ctag g">Appointly</span> Booked appointments</div>
              <ul>
                <li>We call within 60 seconds</li>
                <li>Qualified and warmed up</li>
                <li>Only vetted homeowners on your calendar</li>
                <li>They are expecting you, you just show up</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 11 · Comparison table */}
      <section className="sec cmpsec" id="why-us">
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

      {/* 12 · Testimonial wall */}
      <section className="sec" id="wall">
        <div className="wrap wallhead">
          <h2>Real contractors. <span className="hl">Real booked jobs.</span></h2>
          <p className="wallsub">From markets all over the country. Read as many as you want.</p>
        </div>
        <div className="wrap">
          <TestimonialWall items={TESTIMONIALS} />
        </div>
      </section>

      {/* 13 · Founders */}
      <section className="sec tint" id="founders">
        <div className="wrap">
          <p className="eyebrow">Who you&apos;re actually talking to</p>
          <h2>Two hungry entrepreneurial brothers <span className="hl">from Chicago.</span></h2>
          <p className="sub">
            We are both finance majors with years of experience growing businesses,
            and the exact people you want treating your business like their own.
          </p>
          <div className="founders">
            <article className="founder">
              <img className="fphoto" src="/images/team/jacob.jpg" alt="Jacob Mietka, co-founder of Appointly Solutions" width={150} height={150} loading="lazy" />
              <div>
                <div className="fname">Jacob Mietka</div>
                <div className="frole">Co-founder</div>
                <p className="fbio">
                  Leads the speed to lead and booking side. He will talk to you about
                  your business and market.
                </p>
              </div>
            </article>
            <article className="founder">
              <img className="fphoto" src="/images/team/patrick.jpg" alt="Patrick Mietka, co-founder of Appointly Solutions" width={150} height={150} loading="lazy" />
              <div>
                <div className="fname">Patrick Mietka</div>
                <div className="frole">Co-founder</div>
                <p className="fbio">
                  Runs the campaigns and the numbers. He makes sure the ad spend we
                  front turns into estimates on your calendar.
                </p>
              </div>
            </article>
          </div>
        </div>
      </section>

      {/* 14 · FAQ */}
      <section className="sec" id="faq">
        <div className="wrap wallhead">
          <p className="eyebrow">Before we talk</p>
          <h2>Questions you might be <span className="hl">sitting on.</span></h2>
        </div>
        <div className="wrap">
          <div className="faqlist">
            {FAQ.map((f) => (
              <details className="faqitem" key={f.q}>
                <summary>
                  {f.q}
                  <span className="fqi" aria-hidden><Plus className="h-4 w-4" /></span>
                </summary>
                <div className="faqa">{f.a}</div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* 15 · Closing CTA, the booking calendar */}
      <section className="sec tint" id="book">
        <div className="wrap wallhead">
          <h2>Ready to <span className="hl">fill your calendar?</span></h2>
          <p className="wallsub">
            Pick a time below and book your call. We will tell you on the call
            whether your market is open.
          </p>
        </div>
        <div className="wrap">
          <div className="calwrap">
            <GhlCalendar />
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
