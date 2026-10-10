import Image from "next/image";
import {
  Star, Plus, CalendarCheck, Check, Target, PhoneCall, Filter, Handshake, MapPin, Ruler,
  CalendarClock, Megaphone,
} from "lucide-react";

import { LazyVidalytics } from "@/components/LazyVidalytics";
import { PHONE_DISPLAY, PHONE_HREF } from "@/components/site-nav";
import { FounderCards, PhoneTeam } from "@/components/sales/founders";
import { ProofSection } from "@/components/sales/proof-section";
import {
  CompareTable, Misconceptions, ModelCards, PROOF_FACES, PROOF_STATS, ProcessTimeline, ResultsToExpect,
} from "@/components/sales/process";

/* ============================================================================
   The page a lead lands on after booking a call. Shared by /lander and
   /booked-call (which adds the Meta Schedule pixel), so the two never drift.

   Its job is everything to know before the call: what to do beforehand, what
   we'll cover, how the model works and what it costs, what we are not, who
   they'll talk to, and the proof. The goal is a call where the decision can
   be made on the spot.
   ============================================================================ */

// The hero VSL (shared Vidalytics embed pPhKygFs09UtbTBO) and its poster thumbnail.
const VSL_EMBED_ID = "pPhKygFs09UtbTBO";
const VSL_POSTER =
  "https://fast.vidalytics.com/video/FeX1NGyU/7ly5Jas9bcV1jSMM/img/thumbnail/Vsl2.0-Cover-6a33347b2ca87.jpg";

const ON_PAGE = [
  { href: "#before", label: "Before the call" },
  { href: "#agenda", label: "What we'll cover" },
  { href: "#process", label: "How it works" },
  { href: "#model", label: "How you pay" },
  { href: "#myths", label: "What we're not" },
  { href: "#proof", label: "Proof" },
  { href: "#faq", label: "FAQ" },
];

/* ── BEFORE THE CALL ───────────────────────────────────────────────────────── */
const BRING = [
  "How many jobs you want a month",
  "Your average job size",
  "Your rough close rate",
  "Your best neighborhoods",
  "How many estimates you can run a week",
];

/* ── HOW IT WORKS ────────────────────────────────────────────────────────────
   Five simple, icon-led steps. Big graphic, a few words each, no paragraphs.
   ─────────────────────────────────────────────────────────────────────────── */
const FLOW = [
  { n: 1, Icon: Megaphone, label: "We run the ads", sub: "Built for your market" },
  { n: 2, Icon: PhoneCall, label: "We call in 60 seconds", sub: "Before they cool off" },
  { n: 3, Icon: Filter, label: "We screen out the junk", sub: "Only book what you would book" },
  { n: 4, Icon: CalendarCheck, label: "We book your calendar", sub: "Confirmed times only" },
  { n: 5, Icon: Handshake, label: "You show up and close", sub: "We've done the rest" },
];

/* ── WHAT QUALIFIES ──────────────────────────────────────────────────────────
   The bar every appointment has to clear, as a scannable checklist. If it
   doesn't clear all four, we don't book it.
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

/* ── FAQ: the questions that eat call time ─────────────────────────────────── */
const FAQ = [
  {
    q: "How does the pricing work?",
    a: "One flat fee for each booked estimate that lands on your calendar. Nothing for leads that never book, and no monthly management fee. The exact per-appointment price depends on your market and job size, and we'll give it to you on the call.",
  },
  {
    q: "What counts as a booked appointment?",
    a: "A verified homeowner in your service area who wants floor coating work and has agreed to an estimate time that fits your calendar. Not a raw lead or a form fill. An actual booked estimate.",
  },
  {
    q: "What happens if a homeowner no-shows?",
    a: "You get credited. If a confirmed homeowner doesn't show up, or the appointment turns out not to meet the qualification bar we agreed on, it doesn't count against you. If the job turns out too small to be worth your time, that one is on us too.",
  },
  {
    q: "What if an appointment doesn't close?",
    a: "Not every estimate closes, and that's normal. Across our case studies, contractors close roughly 50 to 70% of what we book. We feed your close and no-show data back into targeting so the homeowners we book keep getting more qualified over time.",
  },
  {
    q: "How many appointments will I get?",
    a: "You tell us how many jobs you want each month and how many estimates you can run, and we build the campaign toward that number. Some contractors want every slot full. Premium operators like Garage Force want fewer, higher value appointments. We'll map it on the call.",
  },
  {
    q: "How fast will I see appointments?",
    a: "Once setup is done the ads go live and our team starts calling right away. Phil's first appointments landed the same week his ads went live. We'll give you a realistic expectation for your market on the call.",
  },
  {
    q: "Who owns the ad account?",
    a: "We do. We run the campaigns from our own Meta ad account and Business Manager, so you never create an account, hand over logins, or manage a campaign. Your brand, your calendar and your customers stay yours.",
  },
  {
    q: "What do I need to do?",
    a: "Give us the times you can run estimates, show up on time, and tell us how each estimate went. That feedback is what makes the next appointments better.",
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

type Quote = { name: string; who?: string; where?: string; stat?: string; quote: string; photo?: string };

// How-it-works featured quote.
const Q_DAVE: Quote = {
  name: "Dave",
  quote: "The appointments were already warmed up. I just showed up and closed.",
  photo: "/images/proof/dave.webp",
};

// Quote paired with the phone-call transcript in the appointment-quality row.
const Q_ANDRE: Quote = {
  name: "Andre",
  who: "D&V maintenance",
  where: "Chicago suburbs",
  stat: "No more tire kickers",
  quote: "By the time I show up, they already know they want it. I'm just there to give the number.",
  photo: "/images/proof/andre.webp",
};

function Stars() {
  return (
    <div className="stars" role="img" aria-label="5 out of 5 stars">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star key={i} className="ci" aria-hidden />
      ))}
    </div>
  );
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

/* Inline featured testimonial: proof parked next to the claim it backs up. */
function FeaturedQuote({ t }: { t: Quote }) {
  return (
    <figure className="fquote">
      <span className="fqmark" aria-hidden>&ldquo;</span>
      <Stars />
      <blockquote className="fq">{t.quote}</blockquote>
      <figcaption className="fattr">
        {t.photo && <Image className="favatar" src={t.photo} alt="" width={56} height={56} sizes="56px" loading="lazy" />}
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
   neutral. Two colours only, no chat bubbles.
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

export function LanderContent({ pixel }: { pixel?: React.ReactNode }) {
  return (
    <div className="dscroll">
      {pixel}

      {/* Minimal header. No booking prompt, this lead already booked a call */}
      <nav className="snav" aria-label="Primary">
        <div className="snav-in">
          <a href="/" className="snav-logo" aria-label="Appointly Solutions home">
            <Image src="/images/appointly-logo-lockup.png" alt="Appointly Solutions" width={129} height={45} priority />
          </a>
        </div>
      </nav>

      {/* 1 · Hero: affirm the decision, point at the video */}
      <section className="sec vslhero" id="top">
        <div className="orb a" />
        <div className="wrap">
          <p className="eyebrow">Your call is booked</p>
          <h1>
            Everything to know{" "}
            <span className="hl">before we talk.</span>
          </h1>
          <p className="lead">
            Watch the short video first. Then skim this page: how it works, how
            you pay, what we&apos;ll ask you, and what other contractors say. You&apos;ll
            walk into the call with no surprises, ready to make a decision.
          </p>

          {/* VSL: Vidalytics Smart Player (manages its own poster + 16:9 box) */}
          <div className="vslvid">
            <LazyVidalytics embedId={VSL_EMBED_ID} poster={VSL_POSTER} />
          </div>

          <p className="vslnote">Prefer to read? Everything in the video is on this page too. Just scroll.</p>
          <nav className="onpage" aria-label="On this page">
            {ON_PAGE.map((l) => (
              <a key={l.href} href={l.href}>{l.label}</a>
            ))}
          </nav>
        </div>
      </section>

      {/* 2 · Proof bar: instant legitimacy for people who scrolled past the video */}
      <section className="sec proofbar" id="proof-bar">
        <div className="wrap">
          <div className="pbnums">
            {PROOF_STATS.map((s) => (
              <div className="pbnum" key={s.l}>
                <span className="pbv">{s.v}</span>
                <span className="pbl">{s.l}</span>
              </div>
            ))}
          </div>
          <div className="pbfaces" aria-hidden>
            {PROOF_FACES.map((f) => (
              <Image className="pbface" key={f.src} src={f.src} alt="" width={54} height={54} sizes="54px" loading="lazy" />
            ))}
          </div>
          <p className="pbcap">Real floor coating contractors, real booked estimates.</p>
        </div>
      </section>

      {/* 3 · Before the call */}
      <section className="sec tint" id="before">
        <div className="wrap">
          <p className="eyebrow">Before the call</p>
          <h2>
            Three things to do <span className="hl">before we talk.</span>
          </h2>
          <p className="sub">
            Do these and we can skip the basics, spend the call on your market,
            and you&apos;ll have everything you need to make a decision by the end of it.
          </p>
          <ol className="prep3">
            <li className="prepcard">
              <span className="prepn">1</span>
              <p className="prept">Watch the video</p>
              <p className="prepd">
                It&apos;s short and it answers most of the questions people ask on
                the call. Then skim the rest of this page, especially{" "}
                <a href="#model">how you pay</a> and <a href="#myths">what we&apos;re not</a>.
              </p>
            </li>
            <li className="prepcard">
              <span className="prepn">2</span>
              <p className="prept">Have your numbers handy</p>
              <ul className="prepl">
                {BRING.map((b) => (
                  <li key={b}><span className="exck" aria-hidden><Check /></span>{b}</li>
                ))}
              </ul>
            </li>
            <li className="prepcard">
              <span className="prepn">3</span>
              <p className="prept">Bring whoever decides</p>
              <p className="prepd">
                If a partner or spouse signs off on business decisions, bring them
                on the call. It&apos;s easier when everyone hears it once, and it
                means you can decide on the call instead of playing telephone after.
              </p>
            </li>
          </ol>
          <p className="prepnote">
            Need a different time? Call us at <a href={PHONE_HREF}>{PHONE_DISPLAY}</a>.
          </p>
        </div>
      </section>

      {/* 4 · What happens on our call */}
      <section className="sec" id="agenda">
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
            <li><span className="ac" aria-hidden /><span className="at"><strong>Your market.</strong> We check whether your area is open. We only take one floor coating contractor per market.</span></li>
            <li><span className="ac" aria-hidden /><span className="at"><strong>Your numbers.</strong> Your target jobs per month, your average job, your best neighborhoods, and your close rate.</span></li>
            <li><span className="ac" aria-hidden /><span className="at"><strong>The plan.</strong> Exactly how we&apos;d fill your calendar, how many estimates to expect, and your per-appointment price.</span></li>
            <li><span className="ac" aria-hidden /><span className="at"><strong>Your decision.</strong> If it&apos;s a fit, you can start right there and we kick off setup. If it&apos;s not, we&apos;ll tell you straight.</span></li>
          </ul>
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

          <FeaturedQuote t={Q_DAVE} />
        </div>
      </section>

      {/* 6 · What a qualified appointment means */}
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
            <FeaturedQuote t={Q_ANDRE} />
          </div>
        </div>
      </section>

      {/* 7 · The model: how you pay, what happens after yes, what to expect */}
      <section className="sec tint" id="model">
        <div className="wrap">
          <p className="eyebrow">How you pay</p>
          <h2>
            The model, <span className="hl">in plain English.</span>
          </h2>
          <p className="sub">
            One flat fee per booked estimate. Here&apos;s everything that comes
            with it, so nothing on the call is a surprise.
          </p>
          <ModelCards />

          <div className="subhd" id="next">
            <p className="eyebrow">If we&apos;re a fit</p>
            <h3>What happens after you say yes.</h3>
          </div>
          <ProcessTimeline />

          <div className="subhd" id="results">
            <p className="eyebrow">Results</p>
            <h3>What results to expect.</h3>
          </div>
          <ResultsToExpect />
        </div>
      </section>

      {/* 8 · Misconceptions */}
      <section className="sec" id="myths">
        <div className="wrap">
          <p className="eyebrow">Clearing a few things up</p>
          <h2>
            What we&apos;re <span className="hl">not.</span>
          </h2>
          <p className="sub">
            Most contractors have been burned by a lead company or an agency
            before. Here&apos;s where we&apos;re different, in one place.
          </p>
          <Misconceptions />
        </div>
      </section>

      {/* 9 · Who you're actually talking to */}
      <section className="sec tint" id="founders">
        <div className="wrap">
          <p className="eyebrow">Who you&apos;re actually talking to</p>
          <h2>
            Two hungry entrepreneurial brothers <span className="hl">from Chicago.</span>
          </h2>
          <p className="sub">
            We&apos;re both finance majors with years of experience growing
            businesses, and the exact people you want treating your business like
            their own. Jacob runs your call.
          </p>
          <FounderCards />
          <PhoneTeam />
        </div>
      </section>

      {/* 10 · The wall of proof */}
      <ProofSection
        eyebrow="Proof"
        title={<>Still want proof? <span className="hl">We&apos;ve got more than you&apos;ll watch.</span></>}
        sub="Our clients on camera, in their own words, and on their own calendars. Brand new clients and some of our very first. Watch as many as you want before the call."
      />

      {/* 11 · Why us over a lead company */}
      <section className="sec tint cmpsec" id="why-us">
        <div className="wrap">
          <p className="cmpeyebrow">What makes us different</p>
          <h2>Not DIY. Not an agency. <span className="hl">A partner.</span></h2>
          <p className="cmpsub">
            We run the campaigns, qualify every homeowner, and book appointments
            straight onto your calendar. You just show up and close.
          </p>
          <CompareTable />
        </div>
      </section>

      {/* 12 · FAQ: the questions that usually eat call time */}
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

      {/* 13 · See you on the call */}
      <section className="sec tint" id="see-you">
        <div className="wrap wallhead">
          <p className="eyebrow">That&apos;s everything</p>
          <h2>See you <span className="hl">on the call.</span></h2>
          <p className="wallsub">
            Bring your numbers and whoever decides, and we&apos;ll tell you
            straight whether we can fill your calendar.
          </p>
          <p className="prep">
            Questions before then? Call us at <a href={PHONE_HREF}>{PHONE_DISPLAY}</a>.
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
