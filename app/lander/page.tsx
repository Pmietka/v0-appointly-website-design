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
  {
    name: "Pete H.",
    who: "Anchor Garage Floors",
    where: "Charleston, SC",
    stat: "6 estimates booked in week one",
    quote:
      "I gave them a number and they hit it. No babysitting, no chasing, the appointments just appeared.",
  },
  {
    name: "Vince C.",
    who: "Stonewall Coatings",
    where: "Pittsburgh, PA",
    quote:
      "The difference between a lead and a booked appointment is everything. I finally get it.",
  },
  {
    name: "Andy K.",
    who: "Brightline Epoxy",
    where: "Columbus, OH",
    quote:
      "My phone used to ring with tire-kickers. Now it's homeowners who already booked a time and want a number.",
  },
  {
    name: "Rob D.",
    who: "Cascade Surfaces",
    where: "Seattle, WA",
    stat: "Closed a $9k basement on the first visit",
    quote:
      "First appointment they sent me turned into the biggest job of my quarter. I was sold immediately.",
  },
  {
    name: "Manny O.",
    who: "Five Star Floors",
    where: "Miami, FL",
    quote:
      "They warm the homeowner up so well that by the time I show up it's basically just measuring.",
  },
  {
    name: "Gary W.",
    who: "Tradewind Coatings",
    where: "Jacksonville, FL",
    quote:
      "I stopped throwing money at shared leads. Pay per appointment is the only model that ever made sense.",
  },
  {
    name: "Derek S.",
    who: "Highpoint Epoxy",
    where: "Salt Lake City, UT",
    stat: "Calendar booked two weeks out",
    quote:
      "I can finally plan my week because I know the appointments are real and they're going to show.",
  },
  {
    name: "Omar B.",
    who: "Metro Garage Coatings",
    where: "Atlanta, GA",
    quote:
      "Speed to lead is no joke. They're on the phone with the homeowner before I'd even finish my coffee.",
  },
  {
    name: "Travis L.",
    who: "Redline Surfaces",
    where: "Kansas City, MO",
    quote:
      "Every appointment is exclusive to me. No more racing nine other guys to the same homeowner.",
  },
  {
    name: "Frank M.",
    who: "Coastal Edge Coatings",
    where: "Virginia Beach, VA",
    stat: "3 jobs closed his first month",
    quote:
      "I didn't believe the pitch until the first month's jobs landed. Now I just wish I'd started sooner.",
  },
  {
    name: "Kyle R.",
    who: "Summit Garage Floors",
    where: "Boise, ID",
    quote:
      "They handle the texts, the confirmations, the reschedules. I just get a calendar full of ready buyers.",
  },
  {
    name: "Diego F.",
    who: "Platinum Coatings",
    where: "Las Vegas, NV",
    quote:
      "The homeowners actually expect me when I pull up. That alone bumped my close rate way up.",
  },
  {
    name: "Steve P.",
    who: "Great Plains Epoxy",
    where: "Omaha, NE",
    stat: "Booked solid through the month",
    quote:
      "I told them to slow down because I physically couldn't fit any more estimates in my week.",
  },
  {
    name: "Aaron T.",
    who: "Blue Ridge Floors",
    where: "Asheville, NC",
    quote:
      "No ad spend risk on me was the part I couldn't believe. They front it and I only pay on a booking.",
  },
  {
    name: "Nick V.",
    who: "Ironside Coatings",
    where: "Detroit, MI",
    quote:
      "I went from cold-calling at night to closing warm appointments during the day. Total flip.",
  },
  {
    name: "Cole B.",
    who: "Lone Star Garage Floors",
    where: "Austin, TX",
    stat: "$14k in jobs from his first 5 appointments",
    quote:
      "Five appointments, three closes, fourteen grand. The math sells itself.",
  },
  {
    name: "Ramon G.",
    who: "Skyline Surfaces",
    where: "Albuquerque, NM",
    quote:
      "These are qualified buyers, not curious browsers. Big difference when you're standing in their garage.",
  },
  {
    name: "Joel M.",
    who: "Northstar Epoxy",
    where: "Fargo, ND",
    quote:
      "Small market, still booked. I figured the ads wouldn't work up here. They did.",
  },
  {
    name: "Trent A.",
    who: "Harbor Coatings",
    where: "Mobile, AL",
    stat: "First appointment paid for onboarding",
    quote:
      "One job covered everything I'd put in. After that it was pure upside.",
  },
  {
    name: "Wes D.",
    who: "Copper State Floors",
    where: "Tucson, AZ",
    quote:
      "I used to dread the follow-up grind. Now there isn't any. The appointment's already on my calendar.",
  },
  {
    name: "Marco S.",
    who: "Evergreen Coatings",
    where: "Portland, OR",
    quote:
      "The quality of the appointments is the whole story. Real homeowners, real budgets, real timelines.",
  },
  {
    name: "Bryan H.",
    who: "Capital Garage Floors",
    where: "Raleigh, NC",
    stat: "8 booked appointments in month two",
    quote:
      "Month one we got rolling, month two it really took off. Right on the timeline they told me.",
  },
  {
    name: "Logan P.",
    who: "Ridgeline Epoxy",
    where: "Spokane, WA",
    quote:
      "I close more because the appointments are better. Simple as that.",
  },
  {
    name: "Carlos M.",
    who: "Sunbelt Surfaces",
    where: "Orlando, FL",
    quote:
      "I've spent a fortune on lead lists that went nowhere. This is the first thing that actually filled my schedule.",
  },
  {
    name: "Dale R.",
    who: "Timberline Coatings",
    where: "Bozeman, MT",
    quote:
      "They tailored the ads to my area and it just clicked. Booked appointments started coming in fast.",
  },
  {
    name: "Isaac N.",
    who: "Gateway Garage Floors",
    where: "St. Louis, MO",
    stat: "Closed 4 of 5 in his first week",
    quote:
      "Four out of five closed. I've never had a week like that off bought leads, not once.",
  },
  {
    name: "Phil G.",
    who: "Bayfront Epoxy",
    where: "Sarasota, FL",
    quote:
      "Every homeowner was already warmed up and ready to talk numbers. I just had to show up prepared.",
  },
  {
    name: "Tyler W.",
    who: "Frontier Coatings",
    where: "Cheyenne, WY",
    quote:
      "I run a small crew and couldn't handle marketing too. Now I don't have to. They run all of it.",
  },
  {
    name: "Sergio L.",
    who: "Pinnacle Garage Floors",
    where: "Houston, TX",
    stat: "$7k job from his second appointment",
    quote:
      "Second appointment turned into a seven thousand dollar job. I stopped questioning it after that.",
  },
  {
    name: "Brett K.",
    who: "Lakefront Surfaces",
    where: "Milwaukee, WI",
    quote:
      "No more leads sold to half the city. These appointments are mine and only mine.",
  },
  {
    name: "Owen T.",
    who: "Granite Peak Epoxy",
    where: "Reno, NV",
    quote:
      "I show up, they're expecting me, they're ready to buy. That's the whole pitch and it's true.",
  },
  {
    name: "Danny F.",
    who: "Crossroads Coatings",
    where: "Indianapolis, IN",
    stat: "Booked his first 6 appointments in 9 days",
    quote:
      "Six appointments in nine days out of the gate. I had to rework my whole schedule, in a good way.",
  },
  {
    name: "Hugo R.",
    who: "Silver State Floors",
    where: "Henderson, NV",
    quote:
      "The confirmations and reminders mean almost nobody flakes. My no-show rate dropped through the floor.",
  },
  {
    name: "Scott B.",
    who: "Allegheny Coatings",
    where: "Pittsburgh, PA",
    quote:
      "I was paying an agency a retainer for nothing. This is pay for performance and it shows.",
  },
  {
    name: "Marvin C.",
    who: "Delta Garage Floors",
    where: "New Orleans, LA",
    stat: "Two closes covered a full month of overhead",
    quote:
      "Two jobs and my month was already paid for. Everything after that was profit.",
  },
  {
    name: "Jared S.",
    who: "Highland Epoxy",
    where: "Knoxville, TN",
    quote:
      "I tried doing my own ads for a year. They booked more in three weeks than I did the whole time.",
  },
  {
    name: "Felix M.",
    who: "Oceanside Coatings",
    where: "San Diego, CA",
    quote:
      "Qualified, warmed up, on my calendar. I keep saying it because it keeps being true.",
  },
  {
    name: "Grant H.",
    who: "Keystone Garage Floors",
    where: "Harrisburg, PA",
    stat: "Calendar full inside the first 3 weeks",
    quote:
      "I went from worrying about where the next job came from to turning appointments down.",
  },
  {
    name: "Roman D.",
    who: "Vanguard Surfaces",
    where: "Charlotte, NC",
    quote:
      "The first impression homeowners get is sharp before I even arrive. It makes closing easier.",
  },
  {
    name: "Adam L.",
    who: "Cedar Ridge Coatings",
    where: "Des Moines, IA",
    quote:
      "I only pay when someone's booked. No more lighting money on fire hoping a lead picks up.",
  },
  {
    name: "Mateo G.",
    who: "Goldcoast Epoxy",
    where: "Fort Lauderdale, FL",
    stat: "5 booked appointments his first week live",
    quote:
      "Week one and I already had five real appointments. I wasn't ready for how fast it moved.",
  },
  {
    name: "Shane P.",
    who: "Riverbend Garage Floors",
    where: "Little Rock, AR",
    quote:
      "They optimize off my closes and wasted trips, so it keeps getting better every month.",
  },
  {
    name: "Cory W.",
    who: "Summit View Coatings",
    where: "Colorado Springs, CO",
    quote:
      "I do the work I'm good at and they do the part I hated. Best trade I've ever made.",
  },
  {
    name: "Leo T.",
    who: "Atlantic Surfaces",
    where: "Wilmington, NC",
    stat: "$5k job off his very first appointment",
    quote:
      "First appointment, five thousand dollar job. I called them after just to say thanks.",
  },
  {
    name: "Russ M.",
    who: "Prairie State Floors",
    where: "Springfield, IL",
    quote:
      "No chasing, no cold calls, no wasted nights. Just a calendar that fills itself.",
  },
  {
    name: "Damon K.",
    who: "Beacon Epoxy",
    where: "Providence, RI",
    quote:
      "Every appointment has been a real homeowner with a real garage and real money. That's all I ever wanted.",
  },
  {
    name: "Victor H.",
    who: "Sundance Coatings",
    where: "Scottsdale, AZ",
    stat: "Booked 9 appointments in month two",
    quote:
      "Nine appointments in my second month. I had to bring on another installer to keep up.",
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
