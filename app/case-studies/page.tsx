import type { Metadata, Viewport } from "next";
import Image from "next/image";
import Link from "next/link";
import { Check, ChevronRight, ChevronDown, PhoneCall, PhoneOff, Play, Quote } from "lucide-react";

import { SiteNav, BOOKING_URL, PHONE_DISPLAY, PHONE_HREF } from "@/components/site-nav";
import { DscrollFooter } from "@/components/dscroll-footer";
import { ClientLogos, TestimonialWall } from "@/components/proof";
import { CASE_STUDIES, type CaseStudy } from "@/lib/case-studies";
import {
  CFC_CALENDAR,
  CFC_STATS,
  CFC_STATS_NOTE,
  CHAPTERS,
  HERO_VIDEO,
  formatTime,
  muxPoster,
  type Chapter,
} from "@/lib/cfc-case-study";
import { FEATURED_TESTIMONIALS, QUOTE_TESTIMONIALS } from "@/lib/testimonials";
import { INTERVIEW_TRANSCRIPT } from "@/lib/cfc-interview-transcript";
import { ChapterNav, Gallery, LocalVideo, MuxVideo, SeekButton, StatBar } from "./cfc-interactive";
import "../home.css";
import "./case-studies.css";

const PAGE_URL = "https://getappointly.co/case-studies";
const TITLE = "Floor Coating Case Studies | Clean Floor Coatings on Video | Appointly";
const DESCRIPTION =
  "Watch Phil from Clean Floor Coatings explain how Appointly took him from two or three floors a week to booked five days a week in Myrtle Beach, with a ~70% close rate on shown appointments. Plus AFAB Services and Garage Force.";

const CALENDAR_ID = "calendar-proof";
const NAMES_NOTE = "Homeowner names shortened to first name and last initial.";

export const viewport: Viewport = {
  themeColor: "#0f0f10",
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

const pad = (n: number) => String(n).padStart(2, "0");

/* ── Chapter visuals ─────────────────────────────────────────────────────────
   The supporting image for each chapter. Screenshots and photos are real;
   the two diagrams are drawn from Phil's own words in that chapter's clip and
   say so in their caption. */
function ThenNow() {
  return (
    <div className="thennow" role="img" aria-label="Then: a Facebook lead with no phone number asking for the lowest price on 440 square feet. Now: a two paragraph booking note on a qualified homeowner.">
      <div className="tn then">
        <span className="tnl">Then</span>
        <p className="tnsrc">Facebook lead form</p>
        <p className="bubble">I got 440 square feet, what&apos;s your lowest price? Can you beat this other guy?</p>
        <p className="tnmeta"><PhoneOff aria-hidden /> No phone number given</p>
      </div>
      <div className="tn now">
        <span className="tnl">Now</span>
        <p className="tnsrc">Booking note from Appointly</p>
        <p className="note">
          Talked to this homeowner. He just moved into his house and has a lot of
          stuff to move out first. Some damage, and the spalling will need repair.
        </p>
        <p className="tnmeta"><Check aria-hidden /> Qualified by phone <Check aria-hidden /> Ready to buy</p>
      </div>
    </div>
  );
}

function Funnel() {
  return (
    <div className="funnel" role="img" aria-label="A funnel: Google and Facebook leads at the top are raw material, superfluous calls in the middle, and Appointly appointments at the bottom are ready to make a buying decision.">
      <div className="ftier t1">
        <b>Google and Facebook leads</b>
        <span>Raw material you still have to convert into dollars</span>
      </div>
      <div className="ftier t2">
        <b>Superfluous calls</b>
        <span>Price shoppers, extra trips, extra work</span>
      </div>
      <div className="ftier t3">
        <b>Appointly appointments</b>
        <span>Bottom of the funnel, ready to buy</span>
      </div>
    </div>
  );
}

function CalendarPair() {
  const [w1, , w3] = CFC_CALENDAR;
  return (
    <div className="calpair">
      {[w1, w3].map((s) => (
        <div className="cpshot" key={s.src}>
          <span className="cplabel">{s.label}</span>
          <Image
            src={s.src}
            alt={`Phil's estimate calendar, ${s.label.toLowerCase()}. Every blue block is an appointment booked by Appointly. ${NAMES_NOTE}`}
            width={s.width}
            height={s.height}
            sizes="(max-width: 900px) 92vw, 420px"
            loading="lazy"
          />
        </div>
      ))}
    </div>
  );
}

function ChapterVisual({ c }: { c: Chapter }) {
  const img = c.image;
  let body: React.ReactNode;
  if (img.kind === "then-now") body = <ThenNow />;
  else if (img.kind === "funnel") body = <Funnel />;
  else if (img.kind === "calendar-pair") body = <CalendarPair />;
  else {
    body = (
      <div
        className={`chphoto${img.crop ? " crop" : ""}${img.height > img.width ? " tall" : ""}`}
        style={img.crop ? { aspectRatio: img.crop.aspect } : undefined}
      >
        <Image
          src={img.src}
          alt={img.alt}
          width={img.width}
          height={img.height}
          sizes="(max-width: 900px) 92vw, 420px"
          loading="lazy"
          style={img.crop ? { objectPosition: img.crop.position } : undefined}
        />
      </div>
    );
  }
  return (
    <figure className="chfig">
      {body}
      <figcaption>{img.caption}</figcaption>
    </figure>
  );
}

function ChapterBlock({ c, i }: { c: Chapter; i: number }) {
  return (
    <article className={`chapter${i % 2 === 1 ? " flip" : ""}`} id={c.id} aria-labelledby={`${c.id}-h`}>
      <div className="chmedia">
        <MuxVideo clip={c.clip} label={`Watch, ${c.clip.length || "clip"}`} tag={`${pad(i + 1)} · ${c.nav}`} />
      </div>
      <div className="chbody">
        <p className="chnum">Chapter {pad(i + 1)} · {c.nav}</p>
        <h2 className="chhl" id={`${c.id}-h`}>{c.headline}</h2>
        <blockquote className="chq">
          <Quote aria-hidden />
          <p>{c.quote}</p>
          <cite>Phil A., in the clip</cite>
        </blockquote>
        <ChapterVisual c={c} />
        <p className="chcap">{c.caption}</p>
        <SeekButton t={c.fullAt} className="chfull">
          <Play aria-hidden /> Hear it in the full interview at {formatTime(c.fullAt)}
        </SeekButton>
      </div>
    </article>
  );
}

/* ── Supporting case studies: AFAB and Garage Force ─────────────────────────── */
const SUPPORT_MEDIA: Record<string, React.ReactNode> = {
  "afab-services": (
    <LocalVideo src="/videos/mark-afab.mp4" poster="/images/proof/mark-afab.webp" title="Watch Mark" />
  ),
};

function SupportCard({ c }: { c: CaseStudy }) {
  const media = SUPPORT_MEDIA[c.slug] ?? (c.media && (
    <figure className="scphoto">
      <Image src={c.media.src} alt={c.media.caption} width={c.media.width} height={c.media.height} sizes="(max-width: 900px) 92vw, 520px" loading="lazy" />
    </figure>
  ));
  return (
    <article className="scard" id={c.slug} aria-labelledby={`${c.slug}-h`}>
      <div className="scmedia">{media}</div>
      <div className="scbody">
        <div className="schead">
          <Image
            className={`sclogo${c.logo.dark ? " dark" : ""}`}
            src={c.logo.src}
            alt={`${c.company} logo`}
            width={c.logo.width}
            height={c.logo.height}
            sizes="160px"
            loading="lazy"
          />
          <span className="scmkt">{c.marketShort}</span>
        </div>
        <h3 id={`${c.slug}-h`}>{c.company}</h3>
        <div className="sclead">
          <b>{c.glance.lead.value}</b>
          <span>{c.glance.lead.label}</span>
        </div>
        <div className="scstats">
          {c.glance.cardStats.map((s) => (
            <div key={s.label}><b>{s.value}</b><span>{s.label}</span></div>
          ))}
        </div>
        <p className="sccap">
          {c.quote ? <>&ldquo;{c.quote.text}&rdquo; <span>{c.owner}</span></> : c.headline}
        </p>
        <div className="sccal">
          <p className="sccal-t">{c.calendar.title}</p>
          <Gallery
            variant="strip"
            shots={c.calendar.shots.map((s) => ({
              ...s,
              alt: `${c.ownerFirst}'s estimate calendar, ${s.label.toLowerCase()}. Every blue event is an appointment booked by Appointly. ${NAMES_NOTE}`,
            }))}
          />
        </div>
      </div>
    </article>
  );
}

const isoDuration = (len: string) => {
  const [m, s] = len.split(":").map(Number);
  return `PT${m}M${s}S`;
};

export default function CaseStudiesPage() {
  const cfc = CASE_STUDIES[0];
  const supporting = CASE_STUDIES.filter((c) => c.slug !== cfc.slug);
  const navItems = [...CHAPTERS.map((c) => ({ id: c.id, nav: c.nav })), { id: CALENDAR_ID, nav: "Calendar proof" }];

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
      video: [
        {
          "@type": "VideoObject",
          name: HERO_VIDEO.clip.title,
          description: DESCRIPTION,
          thumbnailUrl: HERO_VIDEO.poster,
          uploadDate: "2026-09-24",
          duration: isoDuration(HERO_VIDEO.clip.length),
          embedUrl: `https://player.mux.com/${HERO_VIDEO.clip.playbackId}`,
          contentUrl: `https://stream.mux.com/${HERO_VIDEO.clip.playbackId}.m3u8`,
          url: `${PAGE_URL}#top`,
          transcript: INTERVIEW_TRANSCRIPT.map((t) => `${t.speaker}: ${t.text}`).join("\n"),
        },
        ...CHAPTERS.map((c) => ({
        "@type": "VideoObject",
        name: c.clip.title,
        description: c.quote,
        thumbnailUrl: muxPoster(c.clip.playbackId, c.clip.posterTime),
        uploadDate: "2026-09-24",
        duration: isoDuration(c.clip.length),
        embedUrl: `https://player.mux.com/${c.clip.playbackId}`,
        contentUrl: `https://stream.mux.com/${c.clip.playbackId}.m3u8`,
        url: `${PAGE_URL}#${c.id}`,
        })),
      ],
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

      {/* 1 · Hero: the interview, with the headline beside it */}
      <section className="cfhero" id="top">
        <div className="orb a" />
        <div className="wrap wide">
          <nav className="crumb" aria-label="Breadcrumb">
            <Link href="/">Home</Link>
            <ChevronRight aria-hidden />
            <span aria-current="page">Case Studies</span>
          </nav>
          <div className="cfhero-grid" id={cfc.slug}>
            <div className="cfhero-copy">
              <p className="cfeye">Case study · {cfc.company}</p>
              <h1>
                From two or three floors a week to <span className="hl">booked five days a week.</span>
              </h1>
              <p className="cfsub">
                Phil runs Clean Floor Coatings in Myrtle Beach, one of the most
                crowded coating markets in the Southeast. Here&apos;s what changed
                when we started booking his calendar, told by Phil himself.
              </p>
              <dl className="cfmeta">
                <div><dt>Owner</dt><dd>{cfc.owner}</dd></div>
                <div><dt>Market</dt><dd>{cfc.marketShort}</dd></div>
                <div><dt>Product</dt><dd>{cfc.product}</dd></div>
              </dl>
            </div>
            <div className="cfhero-video" id="watch">
              <MuxVideo
                variant="hero"
                clip={HERO_VIDEO.clip}
                label={HERO_VIDEO.label}
                chapters={HERO_VIDEO.chapters}
                poster={HERO_VIDEO.poster}
                captions={HERO_VIDEO.captions}
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* 2 · Stat bar */}
      <section className="cfstats" aria-label="Clean Floor Coatings results">
        <div className="wrap wide">
          <StatBar stats={CFC_STATS} />
          <p className="statnote">{CFC_STATS_NOTE}</p>
        </div>
      </section>

      {/* 3 + 4 · Sticky chapter nav beside the chapter blocks */}
      <div className="story">
        <div className="wrap wide story-grid">
          <ChapterNav items={navItems} />
          <div className="chapters">
            {CHAPTERS.map((c, i) => (
              <ChapterBlock c={c} i={i} key={c.id} />
            ))}

            {/* 5 · Calendar proof */}
            <section className="calproof" id={CALENDAR_ID} aria-labelledby="calproof-h">
              <p className="chnum">Chapter {pad(CHAPTERS.length + 1)} · Calendar proof</p>
              <h2 className="chhl" id="calproof-h">Three weeks of Phil&apos;s estimate calendar</h2>
              <p className="legend">
                <span className="pip" aria-hidden />
                Every blue block is a homeowner we qualified by phone and booked.
                Struck through events are cancellations. {NAMES_NOTE} Tap any week to open it full size.
              </p>
              <Gallery
                shots={CFC_CALENDAR.map((s) => ({
                  ...s,
                  alt: `Phil's estimate calendar, ${s.label.toLowerCase()}. Every blue event is an appointment booked by Appointly. ${NAMES_NOTE}`,
                }))}
              />
            </section>

            {/* 6 · Transcript */}
            <details className="transcript">
              <summary>
                <span>
                  <b>Read the full transcript</b>
                  <small>Jacob and Phil, all {HERO_VIDEO.clip.length}. Tap a timestamp to play from there.</small>
                </span>
                <ChevronDown aria-hidden />
              </summary>
              <div className="trbody">
                {INTERVIEW_TRANSCRIPT.map((t) => (
                  <div className={`turn ${t.speaker.toLowerCase()}`} key={t.t}>
                    <div className="turnhd">
                      <b>{t.speaker === "Phil" ? "Phil A." : "Jacob, Appointly"}</b>
                      <SeekButton t={t.t} className="tstamp">{formatTime(t.t)}</SeekButton>
                    </div>
                    <p>{t.text}</p>
                  </div>
                ))}
              </div>
            </details>
          </div>
        </div>
      </div>

      {/* 7 · Supporting case studies */}
      <section className="sec tint" id="more-case-studies">
        <div className="wrap">
          <p className="eyebrow">More case studies</p>
          <h2>
            Two more markets. <span className="hl">Same process.</span>
          </h2>
          <p className="sub">
            A fast growing Florida market and a premium polyurea system in the
            Inland Northwest. Every homeowner is called and qualified before the
            appointment is booked, and the close rates follow from that.
          </p>
          <div className="scards">
            {supporting.map((c) => (
              <SupportCard c={c} key={c.slug} />
            ))}
          </div>
          <div className="glancenote">
            <span className="gicon"><PhoneCall aria-hidden /></span>
            <p>
              <strong>Phil, Mark and Eric have each agreed to take a call about
              their experience.</strong> Ask on your strategy call and Jacob will
              share their contact details.
            </p>
          </div>
        </div>
      </section>

      {/* Testimonial wall */}
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
          <p className="ctaq">&ldquo;Buy yourself 30 days and give it a try.&rdquo; <span>Phil A.</span></p>
          <h2>Want Phil&apos;s calendar in your market?</h2>
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
