import type { Metadata, Viewport } from "next";
import { Star } from "lucide-react";

import { SiteNav, BOOKING_URL } from "@/components/site-nav";
import "../home.css";
import "./lander.css";

export const viewport: Viewport = {
  themeColor: "#fafafa",
};

export const metadata: Metadata = {
  title: "Appointly Solutions | Watch how we book contractor jobs",
  description:
    "Watch the short video, then hear it straight from the contractors. We book qualified jobs onto your calendar and cover the ad spend. You only pay when a homeowner is booked.",
  robots: { index: false, follow: true },
  alternates: {
    canonical: "https://getappointly.co/lander",
  },
  openGraph: {
    title: "Appointly Solutions | Watch how we book contractor jobs",
    description:
      "Watch the short video, then hear it straight from the contractors. We book qualified jobs onto your calendar.",
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
      <SiteNav />

      {/* VSL hero */}
      <section className="sec vslhero" id="top">
        <div className="orb a" />
        <div className="wrap">
          <h1>
            We book jobs for contractors.{" "}
            <span className="hl">You just show up.</span>
          </h1>
          <p className="lead">
            Watch the 2-minute video below, then hear it straight from the
            contractors we book for.
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

          <a className="btn" href={BOOKING_URL} target="_blank" rel="noopener noreferrer">
            Book a Call <span className="arr">&rarr;</span>
          </a>
          <p className="vslnote">No ad spend risk. You only pay per booked appointment.</p>
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

      {/* Bottom CTA */}
      <section className="sec ctaband">
        <div className="wrap">
          <h2>Ready to fill your calendar?</h2>
          <p className="sub">
            Book a quick call and we&apos;ll show you exactly how we put qualified,
            booked appointments on your calendar.
          </p>
          <a className="btn" href={BOOKING_URL} target="_blank" rel="noopener noreferrer">
            Get Started <span className="arr">&rarr;</span>
          </a>
        </div>
      </section>

      <footer>
        <div className="wrap">
          <p className="fn">Appointly Solutions</p>
          <p className="fh">More booked jobs. <span className="hl">Less chasing leads.</span></p>
          <div className="flinks">
            <a href={BOOKING_URL} target="_blank" rel="noopener noreferrer">Book a Call</a>
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
