import type { Metadata, Viewport } from "next";
import { Star } from "lucide-react";

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

/* ── TESTIMONIAL WALL DATA ───────────────────────────────────────────────────
   `photo` cards use a real, approved client image from /public/images/proof.
   `text` cards are quote-only and render an initials avatar. Add or reorder
   freely — the masonry wall packs whatever you give it. Keep quotes real and
   approved before publishing.
   ─────────────────────────────────────────────────────────────────────────── */
type Testimonial = {
  name: string;
  who: string;
  where: string;
  stat?: string;
  quote: string;
  photo?: string;
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
  {
    name: "Eddie M.",
    who: "Precision Epoxy",
    where: "Nashville, TN",
    stat: "Booked solid within two weeks",
    quote:
      "I told them how many jobs I wanted and they just delivered. I didn't have to manage anything.",
  },
  {
    name: "Greg S.",
    who: "Northline Coatings",
    where: "Minneapolis, MN",
    quote:
      "Paying per appointment instead of per lead changed everything. I only pay when someone's actually on my schedule.",
  },
  {
    name: "Luis F.",
    who: "Apex Garage Floors",
    where: "San Antonio, TX",
    quote:
      "First month I was nervous. Second month I had to tell them to slow down because I couldn't keep up.",
  },
  {
    name: "Dom R.",
    who: "Lakeside Coatings",
    where: "Grand Rapids, MI",
    stat: "$11k week from booked appointments",
    quote:
      "Best week I've ever had and I didn't run a single ad or make a single cold call myself.",
  },
  {
    name: "Chris B.",
    who: "Granite State Epoxy",
    where: "Manchester, NH",
    quote:
      "The homeowners are warmed up and expecting me. My close rate went up just because the appointments are better.",
  },
  {
    name: "Marcus T.",
    who: "Rivertown Surfaces",
    where: "Cincinnati, OH",
    quote:
      "I've worked with two agencies before. This is the first time someone actually put jobs on my calendar instead of excuses.",
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

export default function LanderPage() {
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

      {/* VSL hero */}
      <section className="sec vslhero" id="top">
        <div className="orb a" />
        <div className="wrap">
          <p className="eyebrow">Your call is booked</p>
          <h1>
            Watch this before we talk.{" "}
            <span className="hl">It&apos;ll be worth 2 minutes.</span>
          </h1>
          <p className="lead">
            Here&apos;s exactly how we put booked jobs on your calendar, plus what
            other contractors had to say after we did it for them.
          </p>

          {/*
            VSL EMBED SLOT — drop your video here.
            Replace the .vslplaceholder block below with one of:
              <iframe src="https://www.youtube.com/embed/VIDEO_ID" title="VSL"
                allow="autoplay; fullscreen; picture-in-picture" allowFullScreen />
              <iframe src="https://fast.wistia.net/embed/iframe/HASH" title="VSL" allowFullScreen />
              <video src="/videos/vsl.mp4" poster="/images/vsl-poster.jpg" controls />
            The .vslframe keeps a clean responsive 16:9 box around whatever you add.
          */}
          <div className="vslframe">
            <div className="vslplaceholder" role="button" tabIndex={0} aria-label="Play the video">
              <span className="play" aria-hidden />
              <span className="vlabel">Your VSL goes here</span>
            </div>
          </div>

          <p className="vslnote">See you on the call. In the meantime, here&apos;s how it works.</p>
        </div>
      </section>

      {/* How our process works */}
      <section className="sec" id="process">
        <div className="wrap">
          <p className="eyebrow">How our process works</p>
          <h2>
            From our ad to a job <span className="hl">on your calendar.</span>
          </h2>
          <p className="sub">
            You don&apos;t lift a finger on marketing or follow-up. Here&apos;s
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
        </div>
      </section>

      {/* Testimonial wall — you get bombarded as you scroll */}
      <section className="sec tint" id="proof">
        <div className="wrap wallhead">
          <h2>
            Don&apos;t take our word for it. <span className="hl">Take theirs.</span>
          </h2>
          <p className="wallsub">
            Real contractors, real booked jobs. This is what happens when you stop
            chasing leads and start showing up to appointments.
          </p>
          <div className="wallstats">
            <div className="ws"><span className="wsv">8 jobs</span><span className="wsl">Avg / mo, month two</span></div>
            <div className="ws"><span className="wsv">60 sec</span><span className="wsl">Speed to lead</span></div>
            <div className="ws"><span className="wsv">$0</span><span className="wsl">Ad spend risk</span></div>
          </div>
        </div>

        <div className="wrap">
          <div className="wall">
            {TESTIMONIALS.map((t, i) => (
              <figure className="tcard" key={i}>
                {t.photo && (
                  <img
                    className="tphoto"
                    src={t.photo}
                    alt={`${t.name} of ${t.who}`}
                    width={1080}
                    height={1350}
                    loading="lazy"
                  />
                )}
                <Stars />
                <blockquote className="tquote">&ldquo;{t.quote}&rdquo;</blockquote>
                {t.stat && <figcaption className="tstat">{t.stat}</figcaption>}
                <div className="tmeta">
                  {t.photo ? (
                    <img className="tavatar" src={t.photo} alt="" width={44} height={44} loading="lazy" />
                  ) : (
                    <span className="tavatar" aria-hidden>{initials(t.name)}</span>
                  )}
                  <div>
                    <div className="tname">{t.name}</div>
                    <div className="twho">{t.who} &middot; {t.where}</div>
                  </div>
                </div>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* Closing reassurance — no booking CTA, the call is already set */}
      <section className="sec ctaband">
        <div className="wrap">
          <h2>That&apos;s the whole model.</h2>
          <p className="sub">
            On our call we&apos;ll map it to your market, your close rate, and the
            number of jobs you want each month. Talk soon.
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
