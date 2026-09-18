import type { Metadata, Viewport } from "next";
import { Fragment } from "react";
import Image from "next/image";
import { Target, User, Shield, CreditCard, Clock, Lock, LineChart, CalendarCheck, Check, X } from "lucide-react";

import Link from "next/link";

import { SiteNav, BOOKING_URL, PHONE_DISPLAY, PHONE_HREF } from "@/components/site-nav";
import { DscrollFooter } from "@/components/dscroll-footer";
import {
  CaseStudyCards,
  ClientLogos,
  ClientNote,
  FeaturedQuote,
  Stars,
  TestimonialWall,
  TrustRow,
} from "@/components/proof";
import { coreFaqItems } from "@/lib/faq";
import { FEATURED_TESTIMONIALS, QUOTE_TESTIMONIALS } from "@/lib/testimonials";
import "./home.css";

// Quotes parked next to the claims they back up. Looked up by name so the
// copy lives in one place (lib/testimonials.ts).
const byName = (name: string) =>
  [...FEATURED_TESTIMONIALS, ...QUOTE_TESTIMONIALS].find((t) => t.name === name);
const QUOTE_MECHANISM = byName("Will");
const QUOTE_LEADS = byName("Nate");
const QUOTE_WHAT_YOU_GET = byName("Mark T.");
const QUOTE_PRICING = byName("Carlos V.");
const QUOTE_CTA = byName("Max");

// Comparison data drives both the desktop table and the mobile stacked cards.
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

// Keep the deck-scroll theme color (viewport meta is added by Next by default).
export const viewport: Viewport = {
  themeColor: "#fafafa",
};

/* LEAD TRADE SWAP HOOK
   Floor coating is the only trade Appointly works in and the hero headline
   noun. The value stays swappable for wording tests ("Garage Floor Jobs",
   "Epoxy Floor Jobs"); nothing else needs editing. Do not point it at a trade
   the business does not serve. */
const LEAD_TRADE = "Floor Coating Jobs";

export const metadata: Metadata = {
  title: "Booked Floor Coating Jobs for Contractors | Appointly",
  description:
    "Appointly Solutions is a pay per appointment Meta ads agency that books estimates for garage floor coating and concrete coating contractors.",
  alternates: {
    canonical: "https://getappointly.co/",
  },
  openGraph: {
    title: "Booked Floor Coating Jobs for Contractors | Appointly",
    description:
      "Appointly Solutions is a pay per appointment Meta ads agency that books estimates for garage floor coating and concrete coating contractors.",
    url: "https://getappointly.co/",
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
  twitter: {
    card: "summary_large_image",
    title: "Booked Floor Coating Jobs for Contractors | Appointly",
    description:
      "Appointly Solutions is a pay per appointment Meta ads agency that books estimates for garage floor coating and concrete coating contractors.",
    images: ["https://getappointly.co/images/og-home.png"],
  },
};

export default function HomePage() {
  const homeSchema = [
    {
      "@context": "https://schema.org",
      "@type": "Service",
      "@id": "https://getappointly.co/#service",
      serviceType: "Pay per appointment Meta ads for floor coating contractors",
      name: "Booked floor coating jobs for contractors",
      provider: { "@id": "https://getappointly.co/#organization" },
      areaServed: ["US", "CA"],
      audience: {
        "@type": "Audience",
        audienceType:
          "Garage floor coating, epoxy, polyaspartic, and concrete coating contractors",
      },
      offers: {
        "@type": "Offer",
        availability: "https://schema.org/InStock",
        url: BOOKING_URL,
      },
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "@id": "https://getappointly.co/#faq",
      mainEntity: coreFaqItems.map((item) => ({
        "@type": "Question",
        name: item.question,
        acceptedAnswer: { "@type": "Answer", text: item.answer },
      })),
    },
  ];

  return (
    <div className="dscroll">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(homeSchema) }}
      />
      <SiteNav />

      {/* Cover / hero — floor coating is the lead trade */}
      <section className="sec hero" id="top">
        <div className="orb a" />
        <div className="wrap">
          <h1>
            We book {LEAD_TRADE}.{" "}
            <span className="hl">You just show up.</span>
          </h1>
          <p className="lead">
            Pay per appointment. You pay only when a qualified homeowner is on
            your calendar.
          </p>
          <p className="sub">
            Appointly Solutions is a pay per appointment Meta ads agency that
            books estimates for garage floor coating and concrete coating
            contractors. Floor coating is the only trade we work in.
          </p>
          <a className="btn" href={BOOKING_URL} target="_blank" rel="noopener noreferrer">
            Book a Call <span className="arr">&rarr;</span>
          </a>
          <TrustRow />
          <div className="pills">
            <span className="lbl">Clients in</span>
            <span className="pill">Myrtle Beach</span>
            <span className="pill">Coastal Florida</span>
            <span className="pill">Spokane</span>
            <span className="pill">Chicago</span>
            <span className="pill">Dallas Fort Worth</span>
            <span className="pill">Portland</span>
            <span className="pill">Grand Rapids</span>
          </div>
        </div>
      </section>

      {/* Client logos. Always shown; add a client in lib/testimonials.ts. */}
      <section className="logoband" aria-label="Clients">
        <div className="wrap">
          <ClientLogos />
        </div>
      </section>

      {/* Is this for you? */}
      <section className="sec tint" id="is-this-for-you">
        <div className="wrap">
          <h2>We know how to get Floor Coating Jobs. <span className="hl">Is this for you?</span></h2>
          <div className="grid g3">
            <div className="qual"><span className="qc" /><span className="qt">Access to a market of wealthy homeowners.</span></div>
            <div className="qual"><span className="qc" /><span className="qt">Your team can run and close in home estimates.</span></div>
            <div className="qual"><span className="qc" /><span className="qt">You have room for more appointments.</span></div>
          </div>
          <p className="answer">
            Then yes. You&apos;re leaving <span className="hl">jobs on the table.</span>
          </p>
        </div>
      </section>

      {/* The model — anchored as "How It Works"; keeps the numeric proof block */}
      <section className="sec" id="how-it-works">
        <div className="orb a" />
        <div className="wrap">
          <h2>
            How we get clients <span className="hl">8 new jobs</span> a month.
          </h2>
          <p className="sub">
            We run the ads for you, because we&apos;re good at it. You
            pay only once a qualified appointment is booked onto your calendar.
          </p>
          <div className="grid g3">
            <div className="stat"><div className="sv">$0</div><div className="sl">Owed until an appointment is booked on your calendar</div></div>
            <div className="stat"><div className="sv word">Pay per appointment</div><div className="sl">We don&apos;t sell leads. We book appointments.</div></div>
            <div className="stat"><div className="sv">8 jobs</div><div className="sl">Average for our latest clients in month two</div></div>
          </div>
        </div>
      </section>

      {/* Case studies: the numbers, one card per client, linking to the full write up */}
      <section className="sec tint" id="case-studies">
        <div className="wrap">
          <p className="eyebrow">Client case studies</p>
          <h2>
            Real numbers from <span className="hl">three markets.</span>
          </h2>
          <p className="sub">
            Results so far from a competitive market, a fast growing market, and
            a premium product, framed monthly. Every appointment was qualified
            over the phone first. Close rates are immediate closes only.
          </p>
          <CaseStudyCards />
          <div className="csmore">
            <Link className="btn ghost" href="/case-studies">
              Read the full case studies <span className="arr">&rarr;</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Proof: only real, approved testimonials render. */}
      <section className="sec" id="proof">
        <div className="wrap">
          <h2>It <span className="hl">works.</span></h2>
          <p className="sub">
            Straight from the contractors we book for, in their words.
          </p>
          <div className="grid g3">
            {FEATURED_TESTIMONIALS.filter((t) => t.photo && t.who).map((t) => (
              <div className="proof" key={t.name}>
                <Image
                  className="photo"
                  src={t.photo as string}
                  alt={`${t.name} of ${t.who}, Appointly client in ${t.where}`}
                  width={1080}
                  height={1350}
                  sizes="(max-width: 768px) 90vw, 360px"
                  loading="lazy"
                />
                <div className="pin">
                  <Stars />
                  <div className="who">{t.name} &middot; {t.who}</div>
                  <div className="where">{t.where}</div>
                  {t.stat && <div className="pstat">{t.stat}</div>}
                  <div className="quote">&ldquo;{t.quote}&rdquo;</div>
                </div>
              </div>
            ))}
          </div>

          {/* The wall: every other approved quote we have */}
          <TestimonialWall
            columns={4}
            items={[...FEATURED_TESTIMONIALS.filter((t) => !t.who), ...QUOTE_TESTIMONIALS]}
          />
        </div>
      </section>

      {/* The mechanism */}
      <section className="sec tint">
        <div className="wrap">
          <h2>From ad to <span className="hl">booked appointment.</span></h2>
          <div className="grid g4">
            <div className="step"><div className="sn">1</div><div className="st">We launch proven ads</div><div className="sd">Creatives already proven to convert, customized with your local footage and market.</div></div>
            <div className="step"><div className="sn">2</div><div className="st">Experts track it daily</div><div className="sd">Our team watches dozens of metrics every day. Every 2 to 3 days, the creatives that aren&apos;t performing get cut and replaced.</div></div>
            <div className="step"><div className="sn">3</div><div className="st">Winners get scaled</div><div className="sd">We push the exact creatives and targeting that hit your appointment goals.</div></div>
            <div className="step"><div className="sn">4</div><div className="st">We improve with your data</div><div className="sd">Closed a job? Wasted trip? We feed it back. More of who converts, fewer who don&apos;t.</div></div>
          </div>
          {QUOTE_MECHANISM && <FeaturedQuote t={QUOTE_MECHANISM} />}
        </div>
      </section>

      {/* Leads vs appointments */}
      <section className="sec">
        <div className="wrap">
          <h2>Paying for leads is a <span className="hl">waste of money.</span></h2>
          <div className="cmp">
            <div className="cc bad">
              <div className="ch"><span className="ctag b">Leads</span> Paying for leads</div>
              <ul>
                <li>You&apos;re in the field with no time to call</li>
                <li>You chase them yourself</li>
                <li>Call 5 min late and they&apos;re gone</li>
                <li>30 leads, maybe 2 legit</li>
                <li>Competing with 10 other companies</li>
              </ul>
            </div>
            <div className="cc good">
              <div className="ch"><span className="ctag g">Appointly</span> Booked appointments</div>
              <ul>
                <li>We call within 60 seconds</li>
                <li>Qualified, warmed up, booked</li>
                <li>Only vetted homeowners on your calendar</li>
                <li>They&apos;re expecting you, you just show up</li>
                <li>We handle all the phone work</li>
              </ul>
            </div>
          </div>
          {QUOTE_LEADS && <FeaturedQuote t={QUOTE_LEADS} />}
        </div>
      </section>

      {/* What you get */}
      <section className="sec tint" id="what-you-get">
        <div className="orb b" />
        <div className="wrap">
          <h2>A world-class acquisition team, for the <span className="hl">price of an appointment.</span></h2>
          <ul className="vlist">
            <li><span className="vn">1</span>We call every lead within 60 seconds, before they forget they clicked the ad.</li>
            <li><span className="vn">2</span>We qualify on service area, project scope, and budget. We only book people you&apos;d book yourself.</li>
            <li><span className="vn">3</span>We warm them up so they&apos;re ready to buy the moment you walk through their garage door.</li>
            <li><span className="vn">4</span>We book at your preferred times, handle all reschedules, and confirm day of.</li>
            <li><span className="vn">5</span>Your customer&apos;s first impression of your company is world-class, before you ever arrive.</li>
          </ul>
          {QUOTE_WHAT_YOU_GET && <FeaturedQuote t={QUOTE_WHAT_YOU_GET} align="left" />}
        </div>
      </section>

      {/* Comparison */}
      <section className="sec cmpsec">
        <div className="wrap">
          <p className="cmpeyebrow">Compare the options</p>
          <h2>Not DIY. Not an agency. <span className="hl">A partner.</span></h2>
          <p className="cmpsub">
            Appointly is the partner option. We run the campaigns, qualify every
            homeowner, and book appointments straight onto your calendar. You just
            show up and close.
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

          {/*
            JOBS VS APPOINTMENTS (not finalized): an earlier draft considered "jobs" instead of
            "appointments" in the payoff for the live call dynamic. Built as "appointments" for now.
            To swap, change the one word in the <strong> below. Do not auto-resolve.
          */}
          <p className="payoff">You&apos;re not paying for effort or promises. <strong>You&apos;re paying for booked appointments.</strong></p>
          <p className="cmpcaption">Comparison based on contractor conversations and campaign results. Outcomes depend on market, pricing, and close rate.</p>
        </div>
      </section>

      {/* Pricing */}
      <section className="sec tint">
        <div className="wrap">
          <h2>Simple <span className="hl">pricing.</span></h2>
          <p className="sub">
            You pay one flat rate for every qualified appointment we book onto your
            calendar. You never pay for a raw lead, only for a
            booked homeowner who shows up ready for an estimate.
          </p>
          <div className="priceblock">
            <div className="ptag">How pricing works</div>
            <div className="pclaim">One flat rate for every booked appointment.</div>
            <ul>
              <li>You never pay for a raw lead</li>
              <li>Only booked homeowners ready for an estimate</li>
            </ul>
          </div>
          {QUOTE_PRICING && <FeaturedQuote t={QUOTE_PRICING} align="left" />}
        </div>
      </section>

      {/* Straight answers to the questions contractors ask first */}
      <section className="sec" id="faq">
        <div className="wrap">
          <h2>Straight <span className="hl">answers.</span></h2>
          <p className="sub">
            The four questions every floor coating contractor asks us before
            anything else.
          </p>
          <dl className="faqs">
            {coreFaqItems.map((item) => (
              <div className="faqi" key={item.question}>
                <dt>{item.question}</dt>
                <dd>{item.answer}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* How to get started */}
      <section className="sec">
        <div className="wrap">
          <h2>How to <span className="hl">get started.</span></h2>
          {/* PLACEHOLDER {{REP_NAME}}: default "Jacob". Change the name below if needed. */}
          <p className="actionline">
            Tell <strong>Jacob</strong> how many jobs you want on your calendar each
            month. We handle the rest, from the ads to the booked appointment.
          </p>
          <div className="grid g3">
            <div className="step"><div className="sn">1</div><div className="st">Tell us your target number of appointments per month.</div></div>
            <div className="step"><div className="sn">2</div><div className="st">We launch the ads and book your calendar.</div></div>
            <div className="step"><div className="sn">3</div><div className="st">You show up and close.</div></div>
          </div>
        </div>
      </section>

      {/* Who you're actually talking to (founders) */}
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
                  spend turns into estimates on your calendar.
                </p>
              </div>
            </article>
          </div>
          <ClientNote
            label="What homeowners told Phil"
            text="Several homeowners told Phil that the conversation they had with Jacob on the phone was excellent, and that it helped them understand which option was right for their floor before anyone came out. By the time Phil arrives, they are already sold on the product."
            who="Phil A., Clean Floor Coatings, Myrtle Beach, SC. About 7 in 10 shown appointments close."
            avatar={{ src: "/images/case-studies/phil-adikes.webp", alt: "Phil A., owner of Clean Floor Coatings" }}
          />
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="sec ctaband">
        <div className="wrap">
          {QUOTE_CTA && <FeaturedQuote t={QUOTE_CTA} />}
          <h2>Ready to fill your calendar?</h2>
          <p className="sub">
            Book a quick call and we&apos;ll show you exactly how we put qualified,
            booked appointments on your calendar.
          </p>
          <a className="btn" href={BOOKING_URL} target="_blank" rel="noopener noreferrer">
            Get Started <span className="arr">&rarr;</span>
          </a>
          <p className="ctacall">
            Or call us now at <a href={PHONE_HREF}>{PHONE_DISPLAY}</a>
          </p>
          <ClientLogos title={null} />
        </div>
      </section>

      <DscrollFooter />
    </div>
  );
}
