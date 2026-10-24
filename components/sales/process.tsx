import { Fragment } from "react";
import {
  BadgeCheck, CalendarCheck, Check, CircleDollarSign, Clock, CreditCard, LineChart,
  Lock, Megaphone, PhoneCall, Plus, Rocket, ShieldCheck, Target, User, Wrench, X, Handshake, Shield,
} from "lucide-react";

import { CASE_STUDIES } from "@/lib/case-studies";

/* ============================================================================
   How the whole thing works, written so nobody walks into the call with a
   wrong idea about the model. Shared by /connect (cold traffic) and /lander
   (already booked). Every pricing line matches lib/offer.ts: ad spend at
   cost plus $125 to $175 per booked appointment, no monthly management fee,
   the appointment quality guarantee, and automatic credits for no-shows.
   Styles in app/sales.css, except the comparison table (app/lander/lander.css).
   ============================================================================ */

/* ── Start to finish ───────────────────────────────────────────────────────── */
const TIMELINE = [
  {
    Icon: Handshake,
    who: "You + Jacob",
    when: "About 20 minutes",
    t: "Strategy call",
    pts: [
      "Confirm your market is still open",
      "Review your ticket size, close rate and capacity",
      "An honest look at your first month",
    ],
  },
  {
    Icon: Wrench,
    who: "Us",
    when: "Setup",
    t: "We build your campaign",
    pts: [
      "Proven floor coating ads, with your local footage",
      "A landing page that pre-qualifies homeowners",
      "You pick the times you can run estimates",
    ],
  },
  {
    Icon: Rocket,
    who: "Us",
    when: "Launch",
    t: "Ads go live",
    pts: [
      "Run in our Meta ad account, built for you and owned by you",
      "No logins or ad manager for you",
      "Phil's first appointments landed week one",
    ],
  },
  {
    Icon: PhoneCall,
    who: "Us",
    when: "Every lead",
    t: "We call, qualify and book",
    pts: [
      "Every lead texted and called within one minute",
      "Qualified on area, project and budget",
      "Reminders, confirmations and reschedules handled",
    ],
  },
  {
    Icon: CalendarCheck,
    who: "You",
    when: "The estimate",
    t: "You show up and close",
    pts: [
      "Lands on your calendar with name, address and phone",
      "You know what they want coated before you arrive",
      "You run the estimate and close it",
    ],
  },
  {
    Icon: LineChart,
    who: "Us",
    when: "Every week",
    t: "We keep making it better",
    pts: [
      "Campaign tracked daily",
      "Weak ads replaced every 2 to 3 days",
      "Your feedback shapes who we book next",
    ],
  },
];

export function ProcessTimeline() {
  return (
    <ol className="tl">
      {TIMELINE.map((s, i) => {
        const Icon = s.Icon;
        return (
          <li className={`tlstep${s.who === "You" ? " you" : ""}`} key={s.t}>
            <div className="tlhd">
              <span className="tlicon"><Icon aria-hidden /></span>
              <span className="tlnum">Step {i + 1}</span>
              <span className="tlwho">{s.who}</span>
            </div>
            <p className="tlwhen">{s.when}</p>
            <h3 className="tlt">{s.t}</h3>
            <ul className="tlpts">
              {s.pts.map((p) => (
                <li key={p}><span className="tlck" aria-hidden><Check /></span>{p}</li>
              ))}
            </ul>
          </li>
        );
      })}
    </ol>
  );
}

/* ── The model in plain English ────────────────────────────────────────────── */
const MODEL = [
  {
    Icon: CircleDollarSign,
    t: "How you pay",
    d: "You fund your ad spend upfront at cost, with no markup and a spend report every week. On top of that you pay $125 to $175 per booked appointment, set per client, invoiced separately and billed when the estimate is booked. No setup fee, no retainer, and no monthly management fee.",
  },
  {
    Icon: BadgeCheck,
    t: "What counts as an appointment",
    d: "A homeowner in your service area, qualified on intent (their project goal, the look and material they want, and a real timeline), who agreed to a specific estimate time on your calendar. Not a form fill. Not a phone number.",
  },
  {
    Icon: ShieldCheck,
    t: "Appointment quality guarantee",
    d: "After every estimate you grade the appointment in the Appointly app. Grade it a C and tell us what was wrong, like an unqualified homeowner or a service you don't offer, and you don't pay for it. No-shows and C grades are credited automatically to your next appointment.",
  },
  {
    Icon: CalendarCheck,
    t: "Where appointments show up",
    d: "Straight onto your calendar, around the jobs you already have, with the homeowner's details and what they want coated. You see it the moment it's set, and we text and call to confirm before you go.",
  },
  {
    Icon: Megaphone,
    t: "Who runs the ads",
    d: "We do, in our Meta ad account and Business Manager, so you never create an account, hand over logins, or touch a campaign. You own everything we build for you: the campaigns, creative, audiences and every homeowner record. If you leave, it's still yours.",
  },
  {
    Icon: Lock,
    t: "Exclusivity and commitment",
    d: "One floor coating contractor per market, written into your service agreement, so we never book the same homeowner for the company down the road. No long term contract.",
  },
];

export function ModelCards() {
  return (
    <div className="model">
      {MODEL.map((m) => {
        const Icon = m.Icon;
        return (
          <div className="mcard" key={m.t}>
            <span className="micon"><Icon aria-hidden /></span>
            <h3 className="mt">{m.t}</h3>
            <p className="md">{m.d}</p>
          </div>
        );
      })}
    </div>
  );
}

/* The same answers as click-to-open questions, for /connect. */
export function ModelFaq() {
  return (
    <div className="faqlist">
      {MODEL.map((m) => (
        <details className="faqitem" key={m.t}>
          <summary>
            {m.t}
            <span className="fqi" aria-hidden><Plus className="h-4 w-4" /></span>
          </summary>
          <div className="faqa">{m.d}</div>
        </details>
      ))}
    </div>
  );
}

/* ── What results to expect ────────────────────────────────────────────────── */
const FIT = [
  "You serve a market with homeowners who can pay for a quality floor.",
  "You or your team can run and close in-home estimates.",
  "You have room on the calendar for more estimates.",
];

export function ResultsToExpect() {
  return (
    <div className="expect">
      <div className="exnums">
        {CASE_STUDIES.map((c) => (
          <div className="exnum" key={c.slug}>
            <b>{c.glance.lead.value}</b>
            <span className="exl">{c.glance.lead.label}</span>
            <span className="exwho">{c.owner} · {c.shortName}, {c.marketShort}</span>
          </div>
        ))}
      </div>
      <div className="exrow">
        <div className="exnote">
          <p className="ext">The honest version</p>
          <p>
            Across all our clients, 97% of booked appointments show and contractors
            close <strong>60%</strong> of them on average. Your number depends on your
            market, your price and your sales process. We put prequalified buyers in front of you.
            Closing is still your job.
          </p>
          <p>
            Volume is something we set together. You tell us how many jobs you
            want each month and how many estimates you can run, and we build the
            campaign toward that. A premium operator like Garage Force wants fewer,
            higher value appointments. Others want every slot full.
          </p>
        </div>
        <div className="exfit">
          <p className="ext">This works best if</p>
          <ul>
            {FIT.map((f) => (
              <li key={f}><span className="exck" aria-hidden><Check /></span>{f}</li>
            ))}
          </ul>
          <p className="exfoot">
            Then the only thing that changes is how many estimates are on your calendar.
          </p>
        </div>
      </div>
    </div>
  );
}

/* ── Misconceptions (used on /lander, before the call) ─────────────────────── */
const MYTHS = [
  { m: "“So you sell leads.”", f: "We don't sell leads. Our fee is for a booked estimate with a qualified homeowner, not a name and a phone number." },
  { m: "“I'll pay every month whether it works or not.”", f: "There's no setup fee, no retainer, and no monthly management fee. You fund your ads at cost and pay per booked estimate, and no-shows and C grades are credited automatically to your next appointment." },
  { m: "“My homeowners get shared with the guy down the road.”", f: "One floor coating contractor per market, in writing. Every estimate we book is yours alone." },
  { m: "“I'll get locked into a long contract.”", f: "No long term contract." },
  { m: "“I'll have to manage ads and chase people.”", f: "We run the ads and Jacob calls every lead within one minute. You own everything we build, and you show up and run the estimate." },
  { m: "“Every appointment is a guaranteed sale.”", f: "Nobody can honestly promise that. Grade an appointment a C after the estimate and you don't pay for it. Closing is your part, and our clients close 60% on average." },
];

export function Misconceptions() {
  return (
    <div className="myths">
      {MYTHS.map((x) => (
        <div className="myth" key={x.m}>
          <p className="mythm"><X aria-hidden /> {x.m}</p>
          <p className="mythf"><Check aria-hidden /> {x.f}</p>
        </div>
      ))}
    </div>
  );
}

/* ── Comparison: DIY vs agency vs shared leads vs us ───────────────────────── */
const COMPARE_COLS = ["DIY", "Marketing Agency", "Shared Leads", "Appointly"];
const COMPARE_ROWS = [
  { label: "Outcome", Icon: Target, kind: "text", out: true, vals: ["All on you. Hard to keep up while you work.", "Promises and meetings. Slow to show results.", "Cold leads sold to many. You do the chasing.", "Qualified appointments booked on your calendar."] },
  { label: "Who runs it", Icon: User, kind: "text", out: false, vals: ["You", "You manage them", "You chase leads", "We run everything"] },
  { label: "Risk on bad appointments", Icon: Shield, kind: "text", out: false, vals: ["On you", "On you", "On you", "Grade it a C and you don't pay"] },
  { label: "What you pay for", Icon: CreditCard, kind: "text", out: false, vals: ["Ad spend and your time", "Monthly fees plus ad spend", "Leads that flake", "Ad spend at cost plus a fee per booked appointment"] },
  { label: "Works while you're on the job", Icon: Clock, kind: "bin", out: false, vals: [false, false, false, true] },
  { label: "Exclusive to you", Icon: Lock, kind: "bin", out: false, vals: [true, true, false, true] },
  { label: "Bad appointments not billed", Icon: LineChart, kind: "bin", out: false, vals: [false, false, false, true] },
] as const;

export function CompareTable() {
  return (
    <>
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
    </>
  );
}

/* Real numbers for the dark proof bar under each hero. */
export const PROOF_STATS = [
  { v: "97%", l: "Show rate on booked appointments, across all our clients." },
  { v: "60%", l: "Average client close rate on the estimates we book." },
  { v: "1", l: "Floor coating contractor per market, in writing." },
];

export const PROOF_FACES = [
  { src: "/images/proof/mark-afab.webp", alt: "Mark T." },
  { src: "/images/case-studies/phil-adikes.webp", alt: "Phil A." },
  { src: "/images/case-studies/eric-hoke.webp", alt: "Eric H." },
  { src: "/images/proof/andre.webp", alt: "Andre S." },
  { src: "/images/proof/carlos-team.webp", alt: "Carlos V." },
];
