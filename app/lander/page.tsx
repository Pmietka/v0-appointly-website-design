import type { Metadata, Viewport } from "next";
import { Fragment } from "react";
import {
  Star, Plus, CalendarCheck, Check, X, ImageIcon,
  Target, User, Shield, CreditCard, Clock, Lock, LineChart,
} from "lucide-react";

import { TestimonialWall } from "./testimonial-wall";
import "../home.css";
import "./lander.css";

/* Per-lead booking details are injected by the funnel at send time. Swap these
   placeholders for the real scheduled time and the homeowner's add-to-calendar
   / manage-booking link (or template tokens like {{CALL_TIME}}). */
const CALL_TIME = "your scheduled time";
const CALENDAR_URL = "https://client.getappointly.co/strategy-calendar";

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

/* ── PROCESS STEPS ───────────────────────────────────────────────────────────
   What we actually do to put booked jobs on a contractor's calendar. Shown to
   leads who already booked a call, so it's reassurance, not a pitch to book.
   ─────────────────────────────────────────────────────────────────────────── */
const PROCESS = [
  {
    n: 1,
    title: "We front the ad spend",
    body: "We run proven creatives with our own money, customized to your local market. Zero ad spend risk on you.",
  },
  {
    n: 2,
    title: "We call within 60 seconds",
    body: "The moment a homeowner responds, our team is on the phone, before they forget they ever clicked.",
  },
  {
    n: 3,
    title: "We qualify and book",
    body: "We screen on service area, scope, and budget, warm them up, and book the appointment straight onto your calendar.",
  },
  {
    n: 4,
    title: "We optimize with your data",
    body: "Closed a job? Wasted trip? We feed it back, so you get more of who buys and fewer who don't.",
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
    video: true,
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

/* Inline featured testimonial — proof parked next to the claim it backs up. */
function FeaturedQuote({ t }: { t: Testimonial }) {
  return (
    <figure className="fquote">
      <Stars />
      <blockquote className="fq">&ldquo;{t.quote}&rdquo;</blockquote>
      <figcaption className="fattr">
        {t.photo ? (
          <img className="favatar" src={t.photo} alt="" width={42} height={42} loading="lazy" />
        ) : (
          <span className="favatar" aria-hidden>{initials(t.name)}</span>
        )}
        <span className="fwho">
          <strong>{t.name}</strong> &middot; {t.who} &middot; {t.where}
        </span>
      </figcaption>
    </figure>
  );
}

export default function LanderPage() {
  // Strongest testimonials pulled out to sit beside specific claims.
  const tAndre = TESTIMONIALS[1]; // showed up and closed
  const tBrian = TESTIMONIALS[6]; // no more shared leads
  const tNate = TESTIMONIALS[11]; // they don't book tire-kickers

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
            <div className="pbnum"><span className="pbv">30+</span><span className="pbl">Contractors booked</span></div>
            <div className="pbnum"><span className="pbv">1,200+</span><span className="pbl">Appointments booked</span></div>
            <div className="pbnum"><span className="pbv">18</span><span className="pbl">States &amp; provinces</span></div>
            <div className="pbnum"><span className="pbv">8 / mo</span><span className="pbl">Avg jobs, month two</span></div>
          </div>
          <div className="pbfaces" aria-hidden>
            <img className="pbface" src="/images/proof/mark-afab.webp" alt="" width={54} height={54} loading="lazy" />
            <img className="pbface" src="/images/proof/andre.webp" alt="" width={54} height={54} loading="lazy" />
            <img className="pbface" src="/images/proof/carlos-team.webp" alt="" width={54} height={54} loading="lazy" />
            <span className="pbmore">+27</span>
          </div>
          <p className="pbcap">Real floor coating contractors, real booked estimates.</p>
        </div>
      </section>

      {/* 4 · Who you're actually talking to */}
      <section className="sec" id="founders">
        <div className="wrap">
          <p className="eyebrow">First, who you&apos;re actually talking to</p>
          <h2>
            Two brothers from Chicago, <span className="hl">not a faceless agency.</span>
          </h2>
          <p className="sub">
            We built Appointly out of frustration with agencies that charge big
            retainers and deliver nothing. So we tied most of your spend to booked
            estimates you can actually show up to and close.
          </p>
          {/*
            FOUNDER PHOTOS — drop real headshots at /images/team/patrick.webp and
            /images/team/jacob.webp, then swap the initials span for an <img
            className="fphoto" ... />. Real faces beat stock photos every time.
          */}
          <div className="founders">
            <article className="founder">
              <span className="fphoto" aria-hidden>P</span>
              <div>
                <div className="fname">Patrick Mietka</div>
                <div className="frole">Co-founder</div>
                <p className="fbio">
                  Runs the campaigns and the numbers. The person making sure the ad
                  spend we front turns into estimates on your calendar.
                </p>
              </div>
            </article>
            <article className="founder">
              <span className="fphoto" aria-hidden>J</span>
              <div>
                <div className="fname">Jacob Mietka</div>
                <div className="frole">Co-founder</div>
                <p className="fbio">
                  Leads the speed-to-lead and booking side. He&apos;ll likely be the
                  one you talk to about your market and your numbers.
                </p>
              </div>
            </article>
          </div>
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
            You don&apos;t lift a finger on marketing or follow-up. This is
            everything that happens between a homeowner seeing our ad and you
            showing up to close.
          </p>
          <div className="grid g4">
            {PROCESS.map((s) => (
              <div className="step" key={s.n}>
                <div className="sn">{s.n}</div>
                <div className="st">{s.title}</div>
                <div className="sd">{s.body}</div>
              </div>
            ))}
          </div>

          {/* Proof in context: a real booked calendar beats any claim. */}
          <div className="shotrow">
            <figure className="shotfig">
              {/* Replace with <div className="shot"><img src="/images/proof/booked-calendar.png" alt="A week of booked floor coating estimates" /></div> */}
              <div className="shot ph">
                <ImageIcon className="shicon" aria-hidden />
                <span className="shlabel">Screenshot: a real booked calendar</span>
              </div>
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
            <FeaturedQuote t={tNate} />
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

          <div className="cmpquote"><FeaturedQuote t={tBrian} /></div>
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

      {/* 9 · FAQ — the questions that usually eat call time */}
      <section className="sec tint" id="faq">
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

      {/* 10 · What happens on our call — the closer */}
      <section className="sec" id="call">
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

      {/* Persistent show-up nudge — plugs the biggest leak on a post-booking page.
          CALL_TIME and CALENDAR_URL are placeholders; inject the real per-lead
          values (booked time + add-to-calendar link) at send time. */}
      <div className="nudge">
        <div className="nudge-in">
          <span className="nleft">
            <span className="ndot" aria-hidden />
            <span><span className="nstrong">Your call is booked.</span> <span className="nmuted">{CALL_TIME} — we&apos;re holding your market.</span></span>
          </span>
          <a className="nbtn" href={CALENDAR_URL} target="_blank" rel="noopener noreferrer">
            <CalendarCheck className="h-4 w-4" /> Add to calendar
          </a>
        </div>
      </div>
    </div>
  );
}
