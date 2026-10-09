import { Fragment } from "react";
import {
  BadgeCheck, CalendarCheck, Check, CircleDollarSign, Clock, CreditCard, LineChart,
  Lock, Megaphone, PhoneCall, Rocket, ShieldCheck, Target, User, Wrench, X, Handshake, Shield,
} from "lucide-react";

import { CASE_STUDIES } from "@/lib/case-studies";

/* ============================================================================
   How the whole thing works, written so nobody walks into the call with a
   wrong idea about the model. Shared by /connect (cold traffic) and /lander
   (already booked). Every pricing line matches /pricing and lib/faq.ts: one
   flat fee per booked estimate, no monthly fee, credits for no-shows.
   Styles in app/sales.css, except the comparison table (app/lander/lander.css).
   ============================================================================ */

/* ── Start to finish ───────────────────────────────────────────────────────── */
const TIMELINE = [
  {
    Icon: Handshake,
    who: "You + Jacob",
    when: "About 20 minutes",
    t: "Strategy call",
    d: "We check that your market is still open, look at your ticket size, close rate and capacity, and tell you honestly what a first month looks like. If it fits, you can start right there.",
  },
  {
    Icon: Wrench,
    who: "Us",
    when: "Setup",
    t: "We build your campaign",
    d: "Ad creatives already proven in floor coating, customized with your local footage and market, plus a landing page that asks qualifying questions before anyone submits. You give us the times you can run estimates.",
  },
  {
    Icon: Rocket,
    who: "Us",
    when: "Launch",
    t: "Ads go live",
    d: "We run everything from our own Meta ad account. No logins to hand over and no ad manager for you to learn. Phil's first appointments were booked the same week his ads went live.",
  },
  {
    Icon: PhoneCall,
    who: "Us",
    when: "Every lead",
    t: "We call, qualify and book",
    d: "Our phone team calls every lead within about 60 seconds, qualifies them on service area, project and budget, and only books the ones you'd book yourself. Reminders, day-of confirmations and reschedules are on us.",
  },
  {
    Icon: CalendarCheck,
    who: "You",
    when: "The estimate",
    t: "You show up and close",
    d: "The appointment lands on your calendar with the homeowner's name, address, phone and what they want coated. You run the estimate, quote it, and close it.",
  },
  {
    Icon: LineChart,
    who: "Us",
    when: "Every week",
    t: "We keep making it better",
    d: "We track the campaign daily. Every 2 to 3 days the ads that aren't working get cut and replaced, the winners get scaled, and your close and no-show feedback shapes who we book next.",
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
            <p className="tld">{s.d}</p>
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
    d: "One flat fee for each booked estimate that lands on your calendar. No monthly management fee, and nothing for leads that never book. Your per-appointment price is set on the strategy call, based on your market and job size.",
  },
  {
    Icon: BadgeCheck,
    t: "What counts as an appointment",
    d: "A homeowner in your service area, with a real floor coating project that fits your scope, who agreed to a specific estimate time on your calendar. Not a form fill. Not a phone number.",
  },
  {
    Icon: ShieldCheck,
    t: "No-shows and bad fits",
    d: "If a confirmed homeowner doesn't show, or turns out not to meet the bar we agreed on, it doesn't count against you. A job too small to be worth your time is on us too.",
  },
  {
    Icon: CalendarCheck,
    t: "Where appointments show up",
    d: "Straight onto your calendar, around the jobs you already have, with the homeowner's details and what they want coated. You see it the moment it's set, and we text and call to confirm before you go.",
  },
  {
    Icon: Megaphone,
    t: "Who runs the ads",
    d: "We do, from our own Meta ad account and Business Manager. You never create an account, hand over logins, or touch a campaign. Your brand, calendar and customers stay yours.",
  },
  {
    Icon: Lock,
    t: "Exclusivity and commitment",
    d: "One floor coating contractor per market, so we never book the same homeowner for the company down the road. No long term contract. Cancel anytime with a short notice period.",
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
            Across our case studies, contractors close roughly <strong>50 to 70%</strong> of
            the estimates we book. Your number depends on your market, your price
            and your sales process. We put prequalified buyers in front of you.
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
  { m: "“So you sell leads.”", f: "We don't sell leads. You pay for a booked estimate with a qualified homeowner, never for a name and a phone number." },
  { m: "“I'll pay every month whether it works or not.”", f: "There's no monthly management fee. One flat fee per booked estimate, and no-shows don't count." },
  { m: "“My homeowners get shared with the guy down the road.”", f: "One floor coating contractor per market. Every estimate we book is yours alone." },
  { m: "“I'll get locked into a long contract.”", f: "No long term contract. You can cancel anytime with a short notice period." },
  { m: "“I'll have to manage ads and chase people.”", f: "We run the ads from our own account and call every lead. You show up and run the estimate." },
  { m: "“Every appointment is a guaranteed sale.”", f: "Nobody can honestly promise that. We stand behind the appointment meeting the bar we agree on. Closing it is your part, and our clients close roughly 50 to 70%." },
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
  { label: "Upfront risk", Icon: Shield, kind: "text", out: false, vals: ["On you", "On you", "On you", "None. Pay per appointment"] },
  { label: "What you pay for", Icon: CreditCard, kind: "text", out: false, vals: ["Your time", "Monthly fees", "Leads that flake", "Booked appointments"] },
  { label: "Works while you're on the job", Icon: Clock, kind: "bin", out: false, vals: [false, false, false, true] },
  { label: "Exclusive to you", Icon: Lock, kind: "bin", out: false, vals: [false, false, false, true] },
  { label: "You only pay for results", Icon: LineChart, kind: "bin", out: false, vals: [false, false, false, true] },
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
  { v: "50 to 70%", l: "Close rates on the estimates we book, across our case studies." },
  { v: "$0", l: "Owed until an estimate is booked on your calendar." },
  { v: "1", l: "Floor coating contractor per market. Exclusive." },
];

export const PROOF_FACES = [
  { src: "/images/proof/mark-afab.webp", alt: "Mark T." },
  { src: "/images/case-studies/phil-adikes.webp", alt: "Phil A." },
  { src: "/images/case-studies/eric-hoke.webp", alt: "Eric H." },
  { src: "/images/proof/andre.webp", alt: "Andre S." },
  { src: "/images/proof/carlos-team.webp", alt: "Carlos V." },
];
