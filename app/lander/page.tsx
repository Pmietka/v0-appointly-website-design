import type { Metadata, Viewport } from "next";
import { Fragment } from "react";
import {
  Star, Plus, CalendarCheck, Check, X, ImageIcon,
  Target, User, Shield, CreditCard, Clock, Lock, LineChart,
  Banknote, PhoneCall, Filter, Handshake,
} from "lucide-react";

import { TestimonialWall } from "./testimonial-wall";
import "../home.css";
import "./lander.css";

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
  who: string;
  where: string;
  stat?: string;
  quote: string;
  photo?: string;
  video?: boolean; // renders as the highlighted video testimonial at the top of the wall
};

const TESTIMONIALS: Testimonial[] = [
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
    name: "Andre S.",
    who: "Great Lakes Elite Coatings",
    where: "Chicago, IL",
    stat: "8 new jobs in his second month",
    quote: "The appointments were already warmed up. I just showed up and closed.",
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
    name: "Devin R.",
    who: "Floor Coating Co.",
    where: "Dallas Fort Worth, TX",
    quote:
      "I stopped buying leads months ago. These are actual booked appointments with people expecting me.",
  },
  {
    name: "Tony M.",
    who: "Premier Surfaces",
    where: "Grand Rapids, MI",
    stat: "Calendar full 3 weeks out",
    quote:
      "First week we booked five estimates. I didn't make a single phone call to chase anyone down.",
  },
  {
    name: "Sam K.",
    who: "Coastal Coatings",
    where: "Coastal Florida",
    quote:
      "The speed to lead is unreal. They're calling the homeowner before I even see the notification.",
  },
  {
    name: "Brian L.",
    who: "Elite Epoxy",
    where: "Portland, OR",
    quote:
      "No more flaky shared leads sold to ten other guys. Every appointment is mine and it's qualified.",
  },
  {
    name: "Jose A.",
    who: "Garage Pros",
    where: "Chicago, IL",
    stat: "ROI positive in month one",
    quote:
      "I was skeptical about paying per appointment. Then I closed the first two and did the math. It's a no brainer.",
  },
  {
    name: "Will D.",
    who: "Diamond Group",
    where: "Dallas Fort Worth, TX",
    quote:
      "They handle the reschedules and the confirmations. I just show up and the homeowner is ready to buy.",
  },
  {
    name: "Ray P.",
    who: "Summit Floor Systems",
    where: "Denver, CO",
    stat: "Closed 3 of his first 4 appointments",
    quote:
      "Every one of them already knew who I was and what I do. That's never happened with leads I bought.",
  },
  {
    name: "Hector G.",
    who: "Ironclad Coatings",
    where: "Phoenix, AZ",
    quote:
      "I used to burn whole evenings calling dead numbers. Now my calendar just fills up while I'm on the job.",
  },
  {
    name: "Nate W.",
    who: "Bluewater Surfaces",
    where: "Tampa, FL",
    quote:
      "The qualification is what sold me. They don't book tire-kickers. Every appointment is a real buyer.",
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
          <img className="favatar" src={t.photo} alt="" width={56} height={56} loading="lazy" />
        ) : (
          <span className="favatar" aria-hidden>{initials(t.name)}</span>
        )}
        <span className="fwho">
          <strong>{t.name}</strong>
          <span className="fwsub">{t.who} &middot; {t.where}</span>
        </span>
        {t.stat && <span className="fstat">{t.stat}</span>}
      </figcaption>
    </figure>
  );
}

export default function LanderPage() {
  // The three real, photo'd clients, featured beside the claims they back up.
  const tMark = TESTIMONIALS[0]; // AFAB Services
  const tAndre = TESTIMONIALS[1]; // Great Lakes Elite Coatings
  const tCarlos = TESTIMONIALS[2]; // Diamond Group

  return (
    <div className="dscroll">
      {/* Minimal header — no booking prompt, this lead already booked a call */}
      <nav className="snav" aria-label="Primary">
        <div className="snav-in">
          <a href="/" className="snav-logo" aria-label="Appointly Solutions home">
            <img src="/images/appointly-logo-lockup.png" alt="Appointly Solutions" width={129} height={45} />
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

          {/*
            2 · VSL EMBED SLOT — the video opens with Mark's cold open, and its
            THUMBNAIL/POSTER is the booked calendar (ties straight to the headline).
            When the video is ready, replace the .vslplaceholder block with e.g.:
              <video src="/videos/vsl.mp4" poster="/images/proof/booked-calendar.png" controls playsInline />
              <iframe src="https://www.youtube.com/embed/VIDEO_ID" title="VSL"
                allow="autoplay; fullscreen; picture-in-picture" allowFullScreen />
            For YouTube/Wistia, set the custom thumbnail to the calendar image so
            the still frame shows the full calendar before play.
            The .vslframe keeps a clean responsive 16:9 box around whatever you add.
          */}
          <div className="vslframe">
            <div className="vslplaceholder" role="button" tabIndex={0} aria-label="Play the video">
              <span className="play" aria-hidden />
              <span className="vlabel">Watch: in a month, this is your calendar</span>
            </div>
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
            <img className="pbface" src="/images/proof/mark-afab.webp" alt="" width={54} height={54} loading="lazy" />
            <img className="pbface" src="/images/proof/andre.webp" alt="" width={54} height={54} loading="lazy" />
            <img className="pbface" src="/images/proof/carlos-team.webp" alt="" width={54} height={54} loading="lazy" />
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

          <FeaturedQuote t={tAndre} />
        </div>
      </section>

      {/* 6 · What a qualified appointment means */}
      <section className="sec" id="quality">
        <div className="wrap">
          <p className="eyebrow">What you&apos;re actually getting</p>
          <h2>
            What a <span className="hl">qualified appointment</span> means.
          </h2>
          <p className="sub">
            We don&apos;t book junk to hit a number. A qualified appointment is a
            verified homeowner in your service area who wants the work, fits your
            scope and budget, and has agreed to an estimate time that fits your
            calendar. If it&apos;s not all of that, we don&apos;t book it.
          </p>
          <div className="shotrow two">
            <figure className="shotfig">
              {/* Replace with <div className="shot"><img src="/images/proof/text-thread.png" alt="Speed-to-lead text exchange with a homeowner" /></div> */}
              <div className="shot ph">
                <ImageIcon className="shicon" aria-hidden />
                <span className="shlabel">Screenshot: a real homeowner text exchange</span>
              </div>
              <figcaption>How we reach and qualify a homeowner within 60 seconds of them raising their hand.</figcaption>
            </figure>
            <FeaturedQuote t={tCarlos} />
          </div>
        </div>
      </section>

      {/* 7 · Why us over a lead company (reuses the homepage comparison) */}
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

      {/* 8 · The wall of proof — for the people who want to binge evidence */}
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

      {/* 9 · Who you're actually talking to */}
      <section className="sec tint" id="founders">
        <div className="wrap">
          <p className="eyebrow">Who you&apos;re actually talking to</p>
          <h2>
            Two brothers from Chicago, <span className="hl">not a faceless agency.</span>
          </h2>
          <p className="sub">
            We built Appointly out of frustration with agencies that charge big
            retainers and deliver nothing. So we tied most of your spend to booked
            estimates you can actually show up to and close.
          </p>
          <div className="founders">
            <article className="founder">
              <img className="fphoto" src="/images/team/jacob.jpg" alt="Jacob Mietka, co-founder of Appointly Solutions" width={104} height={104} loading="lazy" />
              <div>
                <div className="fname">Jacob Mietka</div>
                <div className="frole">Co-founder</div>
                <p className="fbio">
                  Leads the speed-to-lead and booking side. He&apos;ll likely be the
                  one you talk to about your market and your numbers.
                </p>
              </div>
            </article>
            <article className="founder">
              <img className="fphoto" src="/images/team/patrick.jpg" alt="Patrick Mietka, co-founder of Appointly Solutions" width={104} height={104} loading="lazy" />
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
