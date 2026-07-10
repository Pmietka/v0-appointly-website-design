import type { Metadata, Viewport } from "next";
import { Fragment } from "react";
import {
  Star, Plus, CalendarCheck, Check, X,
  Target, User, Shield, CreditCard, Clock, Lock, LineChart,
  Banknote, PhoneCall, Filter, Handshake, MapPin, Ruler, CalendarClock,
  MessageCircle, Phone, Award, CalendarSync, Megaphone,
} from "lucide-react";

import Image from "next/image";

import { TestimonialWall } from "./testimonial-wall";
import { LazyVidalytics } from "@/components/LazyVidalytics";
import "../home.css";
import "./lander.css";

// The hero VSL (shared Vidalytics embed pPhKygFs09UtbTBO) and its poster thumbnail.
const VSL_EMBED_ID = "pPhKygFs09UtbTBO";
const VSL_POSTER =
  "https://fast.vidalytics.com/video/FeX1NGyU/7ly5Jas9bcV1jSMM/img/thumbnail/Vsl2.0-Cover-6a33347b2ca87.jpg";

export const viewport: Viewport = {
  themeColor: "#fafafa",
};

export const metadata: Metadata = {
  title: "Appointly Solutions | Watch this before our call",
  description:
    "Your call is booked. Watch the short video, see exactly how our process works, and hear it straight from the contractors we book jobs for.",
  robots: { index: false, follow: true },
  alternates: {
    canonical: "https://getappointly.co/lander",
  },
  openGraph: {
    title: "Appointly Solutions | Watch this before our call",
    description:
      "Your call is booked. See how our process works and hear it from the contractors we book jobs for.",
    url: "https://getappointly.co/lander",
    siteName: "Appointly Solutions",
    type: "website",
    images: [
      {
        url: "https://getappointly.co/images/og-home.png",
        width: 1200,
        height: 630,
        alt: "Appointly Solutions. More booked jobs. Less chasing leads.",
      },
    ],
  },
};

/* ── HOW IT WORKS ────────────────────────────────────────────────────────────
   Five simple, icon-led steps. Big graphic, a few words each — no paragraphs.
   ─────────────────────────────────────────────────────────────────────────── */
const FLOW = [
  { n: 1, Icon: Banknote, label: "We pay for the ads", sub: "No risk to you" },
  { n: 2, Icon: PhoneCall, label: "We call in 60 seconds", sub: "Before they cool off" },
  { n: 3, Icon: Filter, label: "We screen out the junk", sub: "Only book what you would book" },
  { n: 4, Icon: CalendarCheck, label: "We book your calendar", sub: "Confirmed times only" },
  { n: 5, Icon: Handshake, label: "You show up and close", sub: "We've done the rest" },
];

/* ── WHAT QUALIFIES ──────────────────────────────────────────────────────────
   The bar every appointment has to clear, as a scannable checklist instead of
   a paragraph. If it doesn't clear all four, we don't book it.
   ─────────────────────────────────────────────────────────────────────────── */
const QUALIFICATIONS = [
  { Icon: MapPin, label: "Homeowner is located in your service area." },
  { Icon: Target, label: "Has a real need and expressed interest in floor coating." },
  { Icon: Ruler, label: "No tire kickers.", detail: "Fits your scope: right job size and job budget." },
  { Icon: CalendarClock, label: "Agreed upon time for an estimate that fits your calendar." },
];

/* ── BOOKED CALENDAR ─────────────────────────────────────────────────────────
   A real week of booked estimates, recreated as a crisp on-brand component so
   it stays sharp and responsive. Names/times are from an actual client week.
   ─────────────────────────────────────────────────────────────────────────── */
const WEEK = [
  { dow: "MON", date: "Jun 1", appts: [] as { time: string; name: string }[] },
  { dow: "TUE", date: "2", appts: [{ time: "2pm", name: "Maryse Deslouches" }] },
  { dow: "WED", date: "3", appts: [] as { time: string; name: string }[] },
  { dow: "THU", date: "4", appts: [{ time: "3pm", name: "Justin Lucas" }] },
  { dow: "FRI", date: "5", appts: [] as { time: string; name: string }[] },
  {
    dow: "SAT",
    date: "6",
    appts: [
      { time: "10am", name: "Mike Mer" },
      { time: "1pm", name: "Chris Lencheski" },
      { time: "2:30pm", name: "Nana Joseph" },
    ],
  },
];

/* ── COMPARISON (reused from the homepage so the two pages stay consistent) ──
   Why us vs a lead company. Same rows the cold page uses; rendered as a desktop
   table and mobile stacked cards.
   ─────────────────────────────────────────────────────────────────────────── */
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

/* ── FAQ (pulled from /faq — the questions that eat call time) ─────────────── */
const FAQ = [
  {
    q: "How does the pricing work?",
    a: "Two parts. A retainer covers our labor running the system, and on top of that you pay a per-appointment fee for each booked estimate that lands on your calendar. We front the ad spend ourselves.",
  },
  {
    q: "What counts as a booked appointment?",
    a: "A verified homeowner in your service area who wants floor coating work and has agreed to an estimate time that fits your calendar. Not a raw lead or a form fill — an actual booked estimate.",
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
    q: "Is there a long-term contract?",
    a: "No long-term lock-in. You can cancel anytime; we just ask for a short notice period so campaigns can be wound down cleanly.",
  },
  {
    q: "What areas and trades do you cover?",
    a: "Small-to-mid-sized markets across the US and Canada where contractors have room to grow. Our main focus right now is floor coating and epoxy contractors.",
  },
];

/* ── TESTIMONIAL WALL DATA ───────────────────────────────────────────────────
   `photo` cards use a real, approved client image from /public/images/proof.
   `text` cards are quote-only and render an initials avatar. Add or reorder
   freely — the masonry wall packs whatever you give it. Keep quotes real and
   approved before publishing.
   ─────────────────────────────────────────────────────────────────────────── */
export type Testimonial = {
  name: string;
  who?: string;
  where?: string;
  stat?: string;
  quote: string;
  photo?: string;
  video?: boolean;    // renders as a video card (matches the Mark/Adrian clip style)
  videoSrc?: string;  // mp4 source for a real, playable video card
  poster?: string;    // poster frame for the video card
  featured?: boolean; // keep in the top media group even without a photo (e.g. photo pending)
};

const TESTIMONIALS: Testimonial[] = [
  /* ── Featured cards with media (rendered up top) ─────────────────────────── */
  {
    name: "Mark T.",
    who: "AFAB Services",
    where: "Port St. Lucie, FL",
    stat: "$6k job, closed on 2nd appointment",
    quote:
      "You've already paved the ground. I just go in and sweep it up. You guys are doing a great job.",
    photo: "/images/proof/mark-afab.webp",
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
    name: "Andre S.",
    who: "Great Lakes Elite Coatings",
    where: "Chicago, IL",
    stat: "8 new jobs in his second month",
    quote:
      "By the time I show up, they already know they want it. I'm just there to give the number.",
    photo: "/images/proof/andre.webp",
  },
  {
    name: "Dave",
    quote: "The appointments were already warmed up. I just showed up and closed.",
    photo: "/images/proof/dave.webp",
  },
  {
    // Video testimonial — clip + poster generated from the uploaded .MOV.
    // No spoken-quote text was provided, so the card shows the clip + name only.
    name: "Adrian",
    video: true,
    videoSrc: "/videos/adrian.mp4",
    poster: "/images/proof/adrian-poster.jpg",
    quote: "",
  },

  /* ── Text-only cards (below; hard numbers first) ─────────────────────────── */
  {
    name: "Nate",
    quote:
      "As you know, I track all my business data. After a slow first few weeks, over the last 2 months I'm at a 58% close rate from your appointments, which is about on par with my own warm leads. You just give me a lot more volume.",
  },
  {
    name: "Viktor",
    quote: "I closed 4 of my first 7 appointments.",
  },
  {
    name: "Jose",
    quote:
      "After closing 4 jobs the first month, I've got 2 more this month that will cross the line, and I'm already at 5 jobs with 8 days left.",
  },
  {
    // Per client: Kyle does not need a market line — first name + last initial only.
    name: "Kyle T.",
    quote:
      "Great. I'm closing one of them for sure, and the other one will close too, he might just take a couple weeks.",
  },
  {
    name: "Sam",
    quote:
      "Besides a few people, pretty much everyone has been as good as you can get. We need to get more of them, because these are great.",
  },
  {
    name: "Will",
    quote:
      "Yeah dude, I really don't have to do much. I show up, we do the estimate, and it usually goes really well. They're pretty warmed up.",
  },
  {
    name: "Max",
    quote: "My calendar is full. Hasn't been this way all year.",
  },
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

function initials(name: string) {
  return name
    .split(" ")
    .map((p) => p[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

/* A real client's booked week, rebuilt as a sharp, responsive calendar. */
function BookedCalendar() {
  const label =
    "A booked week: Tuesday 2pm Maryse Deslouches, Thursday 3pm Justin Lucas, " +
    "Saturday 10am Mike Mer, 1pm Chris Lencheski, 2:30pm Nana Joseph.";
  return (
    <div className="calshot">
      <div className="calgrid" role="img" aria-label={label}>
        {WEEK.map((d) => (
          <div className="calday" key={d.dow}>
            <div className="caldayhd">
              <span className="caldow">{d.dow}</span>
              <span className="caldate">{d.date}</span>
            </div>
            <div className="calappts">
              {d.appts.map((a, i) => (
                <div className="calappt" key={i}>
                  <span className="calpip" aria-hidden />
                  <span className="caltxt"><span className="calwhen">{a.time}</span> {a.name}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* Inline featured testimonial — proof parked next to the claim it backs up. */
function FeaturedQuote({ t }: { t: Testimonial }) {
  return (
    <figure className="fquote">
      <span className="fqmark" aria-hidden>&ldquo;</span>
      <Stars />
      <blockquote className="fq">{t.quote}</blockquote>
      <figcaption className="fattr">
        {t.photo ? (
          <Image className="favatar" src={t.photo} alt="" width={56} height={56} sizes="56px" loading="lazy" />
        ) : (
          <span className="favatar" aria-hidden>{initials(t.name)}</span>
        )}
        <span className="fwho">
          <strong>{t.name}</strong>
          {(t.who || t.where) && (
            <span className="fwsub">{[t.who, t.where].filter(Boolean).join(" · ")}</span>
          )}
        </span>
        {t.stat && <span className="fstat">{t.stat}</span>}
      </figcaption>
    </figure>
  );
}

/* ── PHONE-CALL TRANSCRIPT ───────────────────────────────────────────────────
   A recorded-call graphic, deliberately NOT a text thread: a dark call header
   with phone icon, live "connected" dot and an inline waveform, then speaker-
   labelled transcript lines. Appointly lines read brand green, homeowner lines
   neutral — two colours only, no chat bubbles.
   ─────────────────────────────────────────────────────────────────────────── */
const CALL_LINES: { who: "sarah" | "linda"; speaker: string; text: string }[] = [
  { who: "sarah", speaker: "Sarah · Appointly", text: "What's got you interested in getting the garage coated?" },
  { who: "linda", speaker: "Linda · Homeowner", text: "It's been peeling for years, we finally want it done right." },
  { who: "sarah", speaker: "Sarah · Appointly", text: "Got it. And what were you looking to have done?" },
  { who: "linda", speaker: "Linda · Homeowner", text: "The whole two car garage, something durable." },
  { who: "sarah", speaker: "Sarah · Appointly", text: "Great. We have availability at 6 on Tuesday or 5 on Wednesday. We'll bring samples and give you an exact estimate." },
  { who: "linda", speaker: "Linda · Homeowner", text: "Tuesday at 6 works for us." },
];

const CALL_CHECKS = ["Homeowner", "Real project", "In service area", "Time locked"];

// Bar heights (out of 24) for the inline call-recording waveform accent.
const CALL_WAVE = [6, 13, 19, 9, 23, 14, 8, 17, 21, 10, 15, 7, 13, 9, 18, 11];

/* Phone-team block (under the founders): a villain-vs-us contrast, grayscale.
   The stakes come first, then the proof points pay them off. */
const PHONE_LOSE = [
  "A cheap call center reading a script",
  "Mispronounces your business, sounds offshore",
  "Books anyone to hit a quota",
  "Your customer's first impression of you, wasted",
];
const PHONE_WIN = [
  "A trained closer who sounds like your company",
  "Native English speakers, no friction",
  "Presells your service so they arrive half sold",
  "Only books the homeowners actually ready to buy",
];

// Each credential reframed with a close-rate payoff line.
const PHONE_CREDS = [
  { Icon: Award, label: "Trained sales professionals", payoff: "Not a call center, your brand sounds the part" },
  { Icon: Phone, label: "1,000s of calls taken", payoff: "They know how to handle a hesitant homeowner" },
  { Icon: Megaphone, label: "We presell your services", payoff: "Prospects arrive half sold, you close easier" },
  { Icon: MessageCircle, label: "Native English speakers", payoff: "No friction, no “let me transfer you”" },
  { Icon: CalendarSync, label: "We handle reschedules", payoff: "We chase the flakes so your calendar stays full" },
];

/* Optional team-on-the-phones photo. Leave empty to collapse the slot cleanly;
   set to a real image path (e.g. "/images/team/phones.jpg") to show it. Never a
   stock photo. */
const PHONE_TEAM_PHOTO = "";

function CallTranscript() {
  return (
    <figure className="shotfig">
      <div className="callcard">
        <div className="callhd">
          <span className="callphone" aria-hidden>
            <PhoneCall />
          </span>
          <span className="callmeta">
            <span className="calltitle">Connected in 47 seconds</span>
            <span className="callstatus">
              <span className="calllive" aria-hidden /> Recorded call
            </span>
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
            <span className="callchk" key={c}>
              <Check aria-hidden /> {c}
            </span>
          ))}
        </div>
      </div>
      <figcaption>
        This is every appointment, before it ever reaches your calendar. We call
        in under a minute, qualify on the spot, and only book homeowners ready
        for a real estimate.
      </figcaption>
    </figure>
  );
}

export default function LanderPage() {
  // The three real, photo'd clients, featured beside the claims they back up.
  const tMark = TESTIMONIALS.find((t) => t.name === "Mark T.")!; // AFAB Services
  const tAndre = TESTIMONIALS.find((t) => t.name === "Andre S.")!; // Great Lakes Elite Coatings

  // How-it-works featured quote — this line is Dave's, not Andre's.
  const tDave: Testimonial = {
    name: "Dave",
    quote: "The appointments were already warmed up. I just showed up and closed.",
    photo: "/images/proof/dave.webp",
  };

  // Quote paired with the phone-call transcript in the appointment-quality row.
  const tQuality: Testimonial = {
    name: "Andre",
    who: "Great Lakes Elite Coatings",
    where: "Chicago suburbs",
    stat: "No more tire kickers",
    quote:
      "By the time I show up, they already know they want it. I'm just there to give the number.",
    photo: tAndre.photo,
  };

  return (
    <div className="dscroll">
      {/* Minimal header — no booking prompt, this lead already booked a call */}
      <nav className="snav" aria-label="Primary">
        <div className="snav-in">
          <a href="/" className="snav-logo" aria-label="Appointly Solutions home">
            <Image src="/images/appointly-logo-lockup.png" alt="Appointly Solutions" width={129} height={45} priority />
          </a>
        </div>
      </nav>

      {/* 1 · Hero — affirm the decision, point at the video */}
      <section className="sec vslhero" id="top">
        <div className="orb a" />
        <div className="wrap">
          <p className="eyebrow">Your call is booked</p>
          <h1>
            In a month, this could be{" "}
            <span className="hl">your calendar.</span>
          </h1>
          <p className="lead">
            Our secrets, revealed. See exactly how we deliver pay per appointment
            results for floor coating companies, all on this page. Then decide if
            it fits you.
          </p>

          {/* 2 · VSL — Vidalytics Smart Player (manages its own poster + 16:9 box) */}
          <div className="vslvid">
            <LazyVidalytics embedId={VSL_EMBED_ID} poster={VSL_POSTER} />
          </div>

          <p className="vslnote">Prefer to read? Everything in the video is on this page too — just scroll.</p>
        </div>
      </section>

      {/* 3 · Proof bar — instant legitimacy for people who scrolled past the video */}
      <section className="sec proofbar" id="proof-bar">
        <div className="wrap">
          {/*
            PLACEHOLDER NUMBERS — confirm the real figures before sending. These
            should be aggregate, defensible, and easy to back up on the call.
          */}
          <div className="pbnums">
            <div className="pbnum"><span className="pbv">500+</span><span className="pbl">Jobs booked in for our clients</span></div>
            <div className="pbnum"><span className="pbv">0</span><span className="pbl">Shared leads</span></div>
            <div className="pbnum"><span className="pbv">8 / mo</span><span className="pbl">Avg jobs, month two</span></div>
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

      {/* 4 · Case study — featured client story, right under the stats */}
      <section className="sec" id="case-study">
        <div className="wrap">
          <p className="eyebrow">Case study &middot; AFAB Services</p>
          <h2>They show up <span className="hl">ready to buy.</span></h2>
          <article className="casestudy">
            <div className="csvideo">
              <video
                src="/videos/mark-afab.mp4"
                poster="/images/proof/mark-afab.webp"
                controls
                playsInline
                preload="metadata"
              />
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

      {/* 5 · How your calendar gets filled */}
      <section className="sec tint" id="process">
        <div className="wrap">
          <p className="eyebrow">How it works</p>
          <h2>
            Here&apos;s exactly how your calendar <span className="hl">gets filled.</span>
          </h2>
          <p className="sub">
            You don&apos;t waste time chasing down homeowners. We book in
            homeowners looking to get their floors coated and you close the jobs.
          </p>
          <div className="flow">
            {FLOW.map((s) => {
              const Icon = s.Icon;
              return (
                <div className="flowstep" key={s.n}>
                  <span className="flownum">{s.n}</span>
                  <span className="flowicon"><Icon aria-hidden /></span>
                  <span className="flowlabel">{s.label}</span>
                  <span className="flowsub">{s.sub}</span>
                </div>
              );
            })}
          </div>

          {/* Proof in context: a real booked calendar beats any claim. */}
          <div className="shotrow">
            <figure className="shotfig">
              <BookedCalendar />
              <figcaption>A week of estimates we booked straight onto a client&apos;s calendar.</figcaption>
            </figure>
          </div>

          <FeaturedQuote t={tDave} />
        </div>
      </section>

      {/* 6 · Why us over a lead company (reuses the homepage comparison) */}
      <section className="sec tint cmpsec" id="why-us">
        <div className="wrap">
          <p className="cmpeyebrow">Compare the options</p>
          <h2>Why contractors pick us <span className="hl">over a lead company.</span></h2>
          <p className="cmpsub">
            We front the ad spend, qualify every homeowner, and book appointments
            straight onto your calendar. You just show up and close.
          </p>

          {/* Desktop: comparison table */}
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

          {/* Mobile: stacked option cards, Appointly first and highlighted */}
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
        </div>
      </section>

      {/* 7 · What a qualified appointment means */}
      <section className="sec" id="quality">
        <div className="wrap">
          <p className="eyebrow">What you&apos;re actually getting</p>
          <h2>
            What a <span className="hl">qualified appointment</span> means.
          </h2>
          <ul className="quallist">
            {QUALIFICATIONS.map((q) => {
              const Icon = q.Icon;
              return (
                <li className="qualrow" key={q.label}>
                  <span className="qualicon"><Icon aria-hidden /></span>
                  <span className="qualtext">
                    <span className="quallabel">{q.label}</span>
                    {q.detail ? <span className="qualdetail">{q.detail}</span> : null}
                  </span>
                </li>
              );
            })}
          </ul>
          <div className="qproofhead">
            <p className="eyebrow">Appointment quality</p>
            <h3>
              Our professional team only books the appointments{" "}
              <span className="hl">you&apos;d book yourself.</span>
            </h3>
          </div>
          <div className="shotrow two qrow">
            <CallTranscript />
            <FeaturedQuote t={tQuality} />
          </div>
        </div>
      </section>

      {/* 8 · Who you're actually talking to — moved directly under Appointment Quality */}
      <section className="sec tint" id="founders">
        <div className="wrap">
          <p className="eyebrow">Who you&apos;re actually talking to</p>
          <h2>
            Two hungry entrepreneurial brothers <span className="hl">from Chicago.</span>
          </h2>
          <p className="sub">
            We&apos;re both finance majors with years of experience growing
            businesses, and the exact people you want treating your business like
            their own.
          </p>
          <div className="founders">
            <article className="founder">
              <Image className="fphoto" src="/images/team/jacob.jpg" alt="Jacob Mietka, co-founder of Appointly Solutions" width={150} height={150} sizes="150px" loading="lazy" />
              <div>
                <div className="fname">Jacob Mietka</div>
                <div className="frole">Co-founder</div>
                <p className="fbio">
                  Leads the speed to lead and booking side. Sales manager.
                  He&apos;ll talk to you about your business and market.
                  Responsible for scaling 20+ home service businesses.
                </p>
              </div>
            </article>
            <article className="founder">
              <Image className="fphoto" src="/images/team/patrick.jpg" alt="Patrick Mietka, co-founder of Appointly Solutions" width={150} height={150} sizes="150px" loading="lazy" />
              <div>
                <div className="fname">Patrick Mietka</div>
                <div className="frole">Co-founder</div>
                <p className="fbio">
                  Runs the campaigns and the numbers. The person making sure the ad
                  spend we front turns into estimates on your calendar.
                </p>
              </div>
            </article>
          </div>

          {/* Part two: who's on the phone — intentionally grayscale, no green.
              Stakes first (villain vs us), then the proof points pay them off. */}
          <div className="phoneteam">
            <div className="pthead">
              <h3 className="ptheadline">
                The person on the phone can win or lose the job before you ever
                show up.
              </h3>
              <p className="ptsub">
                Most agencies hand your customers to a cheap call center and
                quietly cost you deals. We put trained closers on every call, so
                homeowners show up warmer and you close more of them.
              </p>
            </div>

            <div className={PHONE_TEAM_PHOTO ? "ptbody haspic" : "ptbody"}>
              <div className="ptcontrast">
                <div className="ptcol lose">
                  <p className="ptcolhd">What most agencies put on the phone</p>
                  <ul>
                    {PHONE_LOSE.map((t) => (
                      <li key={t}><X className="ptmark" aria-hidden /><span>{t}</span></li>
                    ))}
                  </ul>
                </div>
                <div className="ptcol win">
                  <p className="ptcolhd">What we put on the phone</p>
                  <ul>
                    {PHONE_WIN.map((t) => (
                      <li key={t}><Check className="ptmark" aria-hidden /><span>{t}</span></li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Optional team photo — beside the contrast on desktop, stacked on
                  mobile. Collapses entirely when PHONE_TEAM_PHOTO is empty. */}
              {PHONE_TEAM_PHOTO ? (
                <figure className="ptphoto">
                  <img src={PHONE_TEAM_PHOTO} alt="Our team taking homeowner calls" loading="lazy" />
                </figure>
              ) : null}
            </div>

            <ul className="ptproof">
              {PHONE_CREDS.map((c) => {
                const Icon = c.Icon;
                return (
                  <li className="ptproofitem" key={c.label}>
                    <span className="ptprooficon"><Icon aria-hidden /></span>
                    <span className="ptprooftext">
                      <span className="ptprooflabel">{c.label}</span>
                      <span className="ptproofpayoff">{c.payoff}</span>
                    </span>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </section>

      {/* 9 · The wall of proof — for the people who want to binge evidence */}
      <section className="sec" id="wall">
        <div className="wrap wallhead">
          <h2>
            Still want proof? <span className="hl">We&apos;ve got more than you&apos;ll watch.</span>
          </h2>
          <p className="wallsub">
            Real contractors, real booked jobs, from markets all over the country.
            Read as many as you want.
          </p>
        </div>

        <div className="wrap">
          <TestimonialWall items={TESTIMONIALS} />
        </div>
      </section>

      {/* 10 · FAQ — the questions that usually eat call time */}
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

      {/* 11 · What happens on our call — the closer */}
      <section className="sec tint" id="call">
        <div className="wrap wallhead">
          <p className="eyebrow">What happens on our call</p>
          <h2>A working session, <span className="hl">not a sales pitch.</span></h2>
          <p className="wallsub">
            It runs about 20 minutes, it&apos;s low pressure, and by the end
            you&apos;ll know whether we&apos;re a fit for your market. Here&apos;s the agenda.
          </p>
        </div>
        <div className="wrap">
          <ul className="agenda">
            <li><span className="ac" aria-hidden /><span className="at"><strong>Your market.</strong> We check whether your area is open — we only take one floor coating contractor per market.</span></li>
            <li><span className="ac" aria-hidden /><span className="at"><strong>Your numbers.</strong> Your target jobs per month, your best neighborhoods, and your close rate.</span></li>
            <li><span className="ac" aria-hidden /><span className="at"><strong>The plan.</strong> Exactly how we&apos;d fill your calendar and what the retainer plus per-appointment pricing looks like for you.</span></li>
            <li><span className="ac" aria-hidden /><span className="at"><strong>Your call.</strong> If it&apos;s a fit, we map out next steps. If it&apos;s not, we&apos;ll tell you straight.</span></li>
          </ul>
          <p className="prep">
            Come ready with three things: <strong>your target number of jobs a month</strong>,
            <strong> your best neighborhoods</strong>, and <strong>your rough close rate</strong>.
            That&apos;s all we need to map it to your business.
          </p>
        </div>
      </section>

      <footer>
        <div className="wrap">
          <p className="fn">Appointly Solutions</p>
          <p className="fh">More booked jobs. <span className="hl">Less chasing leads.</span></p>
          <div className="flinks">
            <a href="/about">About</a>
            <a href="/faq">FAQ</a>
            <a href="/blog">Blog</a>
            <a href="/privacy">Privacy</a>
            <a href="/terms">Terms</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
