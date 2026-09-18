import type { Metadata, Viewport } from "next";
import Image from "next/image";
import Link from "next/link";
import { ChevronRight, FileText, BarChart3, CalendarCheck, PhoneCall } from "lucide-react";

import { SiteNav, BOOKING_URL, PHONE_DISPLAY, PHONE_HREF } from "@/components/site-nav";
import { DscrollFooter } from "@/components/dscroll-footer";
import { ClientLogos, FeaturedQuote, TestimonialWall } from "@/components/proof";
import { CASE_STUDIES, CASE_STUDY_TOTALS, type CaseStudy } from "@/lib/case-studies";
import { FEATURED_TESTIMONIALS, QUOTE_TESTIMONIALS } from "@/lib/testimonials";
import "../home.css";
import "./case-studies.css";

const PAGE_URL = "https://getappointly.co/case-studies";
const TITLE = "Floor Coating Case Studies | Real Close Rates | Appointly";
const DESCRIPTION =
  "Three floor coating companies, three markets, one process. See the appointments Appointly booked, the close rates, the closed revenue, and the actual calendars behind the numbers.";

export const viewport: Viewport = {
  themeColor: "#fafafa",
};

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: PAGE_URL,
    siteName: "Appointly Solutions",
    type: "website",
    images: [
      {
        url: "https://getappointly.co/images/og-home.png",
        width: 1200,
        height: 630,
        alt: "Appointly Solutions client case studies",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
    images: ["https://getappointly.co/images/og-home.png"],
  },
};

const TOTALS = [
  { v: String(CASE_STUDY_TOTALS.markets), l: "markets, three price points" },
  { v: String(CASE_STUDY_TOTALS.appointments), l: "appointments booked across the three snapshots" },
  { v: String(CASE_STUDY_TOTALS.closedJobs), l: "closed jobs so far, with more still in progress" },
  { v: CASE_STUDY_TOTALS.closeRateRange, l: "close rates on the appointments we book" },
];

function MediaFigure({ c }: { c: CaseStudy }) {
  if (!c.media) return null;
  const isPhone = c.media.width < c.media.height;
  return (
    <figure className={`csfig${isPhone ? " phone" : ""}`}>
      <div className="frame">
        <Image
          src={c.media.src}
          alt={c.media.caption}
          width={c.media.width}
          height={c.media.height}
          sizes={isPhone ? "340px" : "(max-width: 820px) 92vw, 440px"}
          loading="lazy"
        />
      </div>
      <figcaption>{c.media.caption}</figcaption>
    </figure>
  );
}

function OwnerFigure({ c, shape = "portrait" }: { c: CaseStudy; shape?: "portrait" | "square" }) {
  if (!c.owner_photo) return null;
  return (
    <figure className={`csfig ${shape}`}>
      <div className="frame">
        <Image
          src={c.owner_photo.src}
          alt={c.owner_photo.caption}
          width={c.owner_photo.width}
          height={c.owner_photo.height}
          sizes="(max-width: 820px) 92vw, 440px"
          loading="lazy"
        />
      </div>
      <figcaption>{c.owner_photo.caption}</figcaption>
    </figure>
  );
}

function CaseStudySection({ c, index }: { c: CaseStudy; index: number }) {
  const gridCols = c.stats.length === 6 ? "six" : c.stats.length === 5 ? "five" : "";
  // The media figure pairs with the "noticed" block when there is one, and
  // otherwise sits next to "why it worked".
  const whyFigure = Boolean(c.media && !c.noticed);
  // Low-res owner photos render as a square so they never get upscaled into
  // a tall crop.
  const ownerShape = c.owner_photo && c.owner_photo.width < 400 ? "square" : "portrait";

  return (
    <section className={`sec csx${index % 2 === 1 ? " tint" : ""}`} id={c.slug}>
      <div className="wrap">
        <header className="cshd">
          <div>
            <p className="cseye">Case study {c.order} of {CASE_STUDIES.length}</p>
            <h2>{c.company}</h2>
            <dl className="csmeta">
              <div><dt>Owner</dt><dd>{c.owner}</dd></div>
              <div><dt>Market</dt><dd>{c.market}</dd></div>
              <div><dt>Company</dt><dd>{c.company}</dd></div>
              <div><dt>Period</dt><dd>{c.period}</dd></div>
            </dl>
          </div>
          <div className={`cshd-logo${c.logo.dark ? " dark" : ""}`}>
            <Image
              src={c.logo.src}
              alt={`${c.company} logo`}
              width={c.logo.width}
              height={c.logo.height}
              sizes="220px"
              loading={index === 0 ? "eager" : "lazy"}
            />
          </div>
        </header>

        <p className="cshl">{c.headline}</p>
        {c.callout && <div className="callout">{c.callout}</div>}

        {/* Context, with the owner next to it */}
        <div className="csgrid">
          <div className="cstext">
            <h3>Context</h3>
            {c.context.map((p) => (
              <p key={p.slice(0, 40)}>{p}</p>
            ))}
          </div>
          <OwnerFigure c={c} shape={ownerShape} />
        </div>

        {/* Results */}
        <div className="results">
          <h3 className="rlabel">{c.resultsLabel}</h3>
          <div className={`rgrid ${gridCols}`.trim()}>
            {c.stats.map((s) => (
              <div className={`rtile${s.hero ? " hero" : ""}`} key={s.label}>
                <div className="rv">{s.value}</div>
                <div className="rl">{s.label}</div>
              </div>
            ))}
          </div>
          <p className="rnote">{c.statsNote}</p>
          {c.sinceNote && <p className="rsince">{c.sinceNote}</p>}
        </div>

        {/* Verbatim quote from the owner */}
        {c.quote && (
          <FeaturedQuote
            t={{
              name: c.owner,
              who: c.company,
              where: c.marketShort,
              quote: c.quote.text,
              stat: c.quote.stat,
              avatar: c.owner_photo?.src,
            }}
            align="left"
          />
        )}

        {/* Why it worked, with the media figure when nothing else claims it */}
        <div className={`csgrid${whyFigure ? "" : " single"}`}>
          <div className="cstext">
            <h3>{c.why.title}</h3>
            {c.why.body.map((p) => (
              <p key={p.slice(0, 40)}>{p}</p>
            ))}
          </div>
          {whyFigure && <MediaFigure c={c} />}
        </div>

        {/* Reported feedback, with the media it relates to */}
        {c.noticed && (
          <div className="csgrid">
            <div className="cstext">
              <h3>{c.noticed.title}</h3>
              {c.noticed.body.map((p) => (
                <p key={p.slice(0, 40)}>{p}</p>
              ))}
              {c.media && (
                <>
                  <h3 className="mt">{c.media.title}</h3>
                  {c.media.body.map((p) => (
                    <p key={p.slice(0, 40)}>{p}</p>
                  ))}
                </>
              )}
            </div>
            <MediaFigure c={c} />
          </div>
        )}

        {/* Proof: the calendar */}
        <div className="csproof">
          <div className="proofhd">
            <p className="eyebrow">Proof</p>
            <h3>{c.calendar.title}, {c.calendar.range}</h3>
            <p className="legend"><span className="pip" aria-hidden />{c.calendar.legend}</p>
          </div>
          <div className="calshots">
            {c.calendar.shots.map((s) => (
              <figure className="calshot" key={s.src}>
                <div className="frame">
                  <Image
                    src={s.src}
                    alt={`${c.ownerFirst}'s estimate calendar, ${s.label.toLowerCase()}. Every blue event is an appointment booked by Appointly.`}
                    width={s.width}
                    height={s.height}
                    sizes="(max-width: 1080px) 94vw, 1000px"
                    loading="lazy"
                  />
                </div>
                <figcaption>{s.label}</figcaption>
              </figure>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default function CaseStudiesPage() {
  const schema = [
    {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      "@id": `${PAGE_URL}#page`,
      url: PAGE_URL,
      name: TITLE,
      description: DESCRIPTION,
      isPartOf: { "@id": "https://getappointly.co/#website" },
      about: { "@id": "https://getappointly.co/#service" },
      mainEntity: {
        "@type": "ItemList",
        itemListElement: CASE_STUDIES.map((c) => ({
          "@type": "ListItem",
          position: c.order,
          url: `${PAGE_URL}#${c.slug}`,
          name: `${c.company} case study`,
          description: c.headline,
        })),
      },
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://getappointly.co/" },
        { "@type": "ListItem", position: 2, name: "Case Studies", item: PAGE_URL },
      ],
    },
  ];

  return (
    <div className="dscroll csp">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <SiteNav />

      {/* Hero */}
      <section className="sec hero cshero" id="top">
        <div className="orb a" />
        <div className="wrap">
          <nav className="crumb" aria-label="Breadcrumb">
            <Link href="/">Home</Link>
            <ChevronRight aria-hidden />
            <span aria-current="page">Case Studies</span>
          </nav>
          <p className="eyebrow">Client case studies</p>
          <h1>
            Qualified appointments. <span className="hl">Real close rates.</span>
          </h1>
          <p className="lead">
            Three floor coating companies. Three markets. Three price points. One process.
          </p>
          <p className="sub">
            Every appointment we book is qualified over the phone before it reaches
            the calendar. So the number we lead with is not leads or clicks. It is
            the close rate on the appointments we book, and the calendars that
            prove it.
          </p>

          <div className="totals">
            {TOTALS.map((t) => (
              <div className="total" key={t.l}>
                <div className="tv">{t.v}</div>
                <div className="tl">{t.l}</div>
              </div>
            ))}
          </div>

          <div className="jump">
            <span className="lbl">Jump to</span>
            {CASE_STUDIES.map((c) => (
              <a className="chip" href={`#${c.slug}`} key={c.slug}>
                <span className="chipn" aria-hidden>{c.order}</span>
                {c.shortName}
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Logos */}
      <section className="logoband">
        <div className="wrap">
          <ClientLogos title="The companies in these case studies" showMore={false} />
        </div>
      </section>

      {/* How we work */}
      <section className="sec tint" id="how-we-work">
        <div className="wrap">
          <p className="eyebrow">How we work</p>
          <h2>
            Every appointment is qualified over the phone{" "}
            <span className="hl">before it reaches your calendar.</span>
          </h2>
          <div className="hww">
            <div>
              <p>
                Appointly Solutions specializes in one thing: booking extremely
                qualified estimate appointments for floor coating companies. Before
                anyone lands on a client&apos;s calendar, a member of our team speaks
                with the homeowner over the phone. We confirm the project, the
                timeline, the budget, and the service area.
              </p>
              <p>
                If an appointment is on your calendar, it is because we believe,
                based on that conversation, that the homeowner is ready to move
                forward with your exact service. <strong>That is why the number we
                lead with is not leads or clicks. It is the close rate on the
                appointments we book.</strong>
              </p>
              <p>
                All three case studies are one month snapshots. We chose three
                campaigns that are comparable to what a $2,000 trial period with us
                would look like, so you can see what that budget produces in a
                competitive market, in a fast growing market, and for a premium
                product.
              </p>
            </div>
            <div className="readnote">
              <h3>How to read these numbers</h3>
              <p>
                Each case study shows a one month snapshot: the appointments we
                booked, how many the client met with, and how many turned into sold
                jobs.
              </p>
              <p>
                The appointments that have not closed yet are not lost. Many
                homeowners simply have a longer timeline, and a good share of them
                come back and close in the following weeks or months. The close
                rates shown here are immediate closes only.
              </p>
            </div>
          </div>

          <div className="structure">
            <div className="struct">
              <span className="sicon"><FileText aria-hidden /></span>
              <div>
                <h3>Context</h3>
                <p>Who the client is, what market they are in, and what makes their situation comparable to yours.</p>
              </div>
            </div>
            <div className="struct">
              <span className="sicon"><BarChart3 aria-hidden /></span>
              <div>
                <h3>Results</h3>
                <p>Appointments booked, close rate, sold jobs, and revenue from a one month snapshot.</p>
              </div>
            </div>
            <div className="struct">
              <span className="sicon"><CalendarCheck aria-hidden /></span>
              <div>
                <h3>Proof</h3>
                <p>The client&apos;s actual calendar for that month, showing every appointment we booked.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* The three case studies */}
      {CASE_STUDIES.map((c, i) => (
        <CaseStudySection c={c} index={i} key={c.slug} />
      ))}

      {/* At a glance */}
      <section className="sec tint" id="at-a-glance">
        <div className="wrap">
          <p className="eyebrow">At a glance</p>
          <h2>
            Three markets, <span className="hl">one process.</span>
          </h2>
          <p className="sub">
            Three different companies, three different markets, and three different
            price points. The constant is the process: every homeowner is called,
            qualified, and educated before the appointment is booked, and the close
            rates follow from that.
          </p>

          <div className="glance">
            <table>
              <thead>
                <tr>
                  <th scope="col">Client</th>
                  <th scope="col">Market</th>
                  <th scope="col">Snapshot</th>
                  <th scope="col">Appointments</th>
                  <th scope="col">Close rate</th>
                  <th scope="col">Closed jobs</th>
                </tr>
              </thead>
              <tbody>
                {CASE_STUDIES.map((c) => (
                  <tr key={c.slug}>
                    <td className="client" data-label="Client">
                      <Image
                        className={`glogo${c.logo.dark ? " dark" : ""}`}
                        src={c.logo.src}
                        alt=""
                        aria-hidden
                        width={c.logo.width}
                        height={c.logo.height}
                        sizes="110px"
                        loading="lazy"
                      />
                      <a href={`#${c.slug}`}>{c.shortName}</a>
                    </td>
                    <td data-label="Market">{c.marketShort}</td>
                    <td data-label="Snapshot">{c.periodShort}</td>
                    <td className="num" data-label="Appointments">{c.glance.appointments}</td>
                    <td className="rate" data-label="Close rate">{c.glance.closeRate}</td>
                    <td className="num" data-label="Closed jobs">{c.glance.closedJobs}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="glancenote">
            <span className="gicon"><PhoneCall aria-hidden /></span>
            <p>
              <strong>Each of these owners has agreed to take a call about their
              experience.</strong> Ask on your strategy call and Jacob will share
              their contact details once you let him know you would like to speak
              with them.
            </p>
          </div>
        </div>
      </section>

      {/* More clients */}
      <section className="sec" id="more-clients">
        <div className="wrap">
          <p className="eyebrow">More from the calendar</p>
          <h2>
            What other clients <span className="hl">tell us.</span>
          </h2>
          <p className="sub">
            Straight from the contractors we book for, in their words.
          </p>
          <TestimonialWall
            items={[...FEATURED_TESTIMONIALS.slice(1), ...QUOTE_TESTIMONIALS]}
          />
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="sec tint ctaband">
        <div className="wrap">
          <h2>Want numbers like these on your calendar?</h2>
          <p className="sub">
            Book a quick call. We&apos;ll look at your market, your capacity, and
            your average ticket, and tell you honestly what a first month would
            look like.
          </p>
          <a className="btn" href={BOOKING_URL} target="_blank" rel="noopener noreferrer">
            Book a Call <span className="arr">&rarr;</span>
          </a>
          <p className="ctacall">
            Or call us now at <a href={PHONE_HREF}>{PHONE_DISPLAY}</a>
          </p>
          <ClientLogos title={null} showMore={false} />
        </div>
      </section>

      <DscrollFooter />
    </div>
  );
}
