/* ============================================================================
   Building blocks for a video case study (hero, stat bar, chapters, calendar
   proof, transcript), shared by /case-studies, where every video story runs
   in full one after another, and by each company's own page at
   /case-studies/<slug>. Styles live in case-studies.css.
   ============================================================================ */

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, Check, ChevronDown, ChevronRight, PhoneOff, Quote, X } from "lucide-react";

import { BOOKING_URL, PHONE_DISPLAY, PHONE_HREF } from "@/components/site-nav";
import { ClientLogos } from "@/components/proof";
import type { CaseStudy } from "@/lib/case-studies";
import { getVideoStory } from "@/lib/video-case-studies";
import { formatTime, muxPoster, type Chapter, type VideoCaseStudy } from "@/lib/video-case-study";
import { ChapterNav, Gallery, MuxVideo, StatBar } from "./cfc-interactive";

export const CASE_STUDIES_URL = "https://getappointly.co/case-studies";
export const NAMES_NOTE = "Homeowner names shortened to first name and last initial.";

const pad = (n: number) => String(n).padStart(2, "0");

export const storyPath = (slug: string) => `/case-studies/${slug}`;

/* ── Chapter visuals ─────────────────────────────────────────────────────────
   The supporting image for each chapter. Screenshots and photos are real;
   the diagrams are drawn from the owner's own words in that chapter's clip
   and say so in their caption. */
function ThenNow({ img }: { img: Extract<Chapter["image"], { kind: "then-now" }> }) {
  return (
    <div className="thennow" role="img" aria-label={img.label}>
      {(["then", "now"] as const).map((side) => {
        const s = img[side];
        const Icon = side === "now" ? Check : s.icon === "phone-off" ? PhoneOff : X;
        return (
          <div className={`tn ${side}`} key={side}>
            <span className="tnl">{side === "then" ? "Then" : "Now"}</span>
            <p className="tnsrc">{s.source}</p>
            <p className={s.style}>{s.text}</p>
            <p className="tnmeta">
              {s.meta.map((m) => (
                <span key={m}><Icon aria-hidden /> {m}</span>
              ))}
            </p>
          </div>
        );
      })}
    </div>
  );
}

function Funnel({ img }: { img: Extract<Chapter["image"], { kind: "funnel" }> }) {
  return (
    <div className="funnel" role="img" aria-label={img.label}>
      {img.tiers.map((t, i) => (
        <div className={`ftier t${i + 1}`} key={t.title}>
          <b>{t.title}</b>
          <span>{t.text}</span>
        </div>
      ))}
    </div>
  );
}

function Checklist({ img }: { img: Extract<Chapter["image"], { kind: "checklist" }> }) {
  return (
    <div className="checklist">
      <p className="cltitle">{img.title}</p>
      <ul>
        {img.items.map((it) => (
          <li key={it}>
            <span className="clcheck" aria-hidden><Check /></span>
            {it}
          </li>
        ))}
      </ul>
    </div>
  );
}

function CalendarPair({ img, ownerFirst }: { img: Extract<Chapter["image"], { kind: "calendar-pair" }>; ownerFirst: string }) {
  return (
    <div className="calpair">
      {img.shots.map((s) => (
        <div className="cpshot" key={s.src}>
          <span className="cplabel">{s.label}</span>
          <Image
            src={s.src}
            alt={`${ownerFirst}'s estimate calendar, ${s.label.toLowerCase()}. Every blue block is an appointment booked by Appointly. ${NAMES_NOTE}`}
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

function ChapterVisual({ c, ownerFirst }: { c: Chapter; ownerFirst: string }) {
  const img = c.image;
  let body: React.ReactNode;
  if (img.kind === "then-now") body = <ThenNow img={img} />;
  else if (img.kind === "funnel") body = <Funnel img={img} />;
  else if (img.kind === "checklist") body = <Checklist img={img} />;
  else if (img.kind === "calendar-pair") body = <CalendarPair img={img} ownerFirst={ownerFirst} />;
  else if (img.kind === "person") {
    body = (
      <div className="person">
        <Image src={img.src} alt={img.alt} width={img.width} height={img.height} sizes="96px" loading="lazy" />
        <div>
          <b>{img.name}</b>
          <span>{img.role}</span>
        </div>
      </div>
    );
  } else {
    body = (
      <div
        className={`chphoto${img.crop ? " crop" : ""}${!img.crop && img.height > img.width ? " tall" : ""}`}
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

type Level = "h2" | "h3";

function ChapterBlock({ c, i, cite, ownerFirst, level, compact = false }: { c: Chapter; i: number; cite: string; ownerFirst: string; level: Level; compact?: boolean }) {
  const H = level;
  return (
    <article className={`chapter${i % 2 === 1 ? " flip" : ""}${compact ? " compact" : ""}`} id={c.id} aria-labelledby={`${c.id}-h`}>
      <div className="chmedia">
        <MuxVideo clip={c.clip} label={`Watch, ${c.clip.length || "clip"}`} tag={`${pad(i + 1)} · ${c.nav}`} />
      </div>
      <div className="chbody">
        <p className="chnum">
          <span className={`chphase${c.phase === "before" ? " before" : ""}`}>
            {c.phase === "before" ? "Before Appointly" : "With Appointly"}
          </span>
          Chapter {pad(i + 1)}
        </p>
        <H className="chhl" id={`${c.id}-h`}>{c.headline}</H>
        <blockquote className="chq">
          <Quote aria-hidden />
          <p>{c.quote}</p>
          <cite>{cite}</cite>
        </blockquote>
        {!compact && <p className="chcap">{c.caption}</p>}
      </div>
      {!compact && (
        <div className="chproof">
          <ChapterVisual c={c} ownerFirst={ownerFirst} />
        </div>
      )}
    </article>
  );
}

/* ── 1 · Hero: the owner's best clip, with the headline beside it ─────────── */
export function StoryHero({
  story,
  cs,
  heading = "h2",
  eyebrow,
  crumbs,
  sectionId,
  pageLink = false,
  priority = false,
  compact = false,
}: {
  story: VideoCaseStudy;
  cs: CaseStudy;
  heading?: "h1" | "h2";
  eyebrow: string;
  /** Breadcrumb trail; the last item is the current page. */
  crumbs?: { label: string; href?: string }[];
  sectionId?: string;
  /** Link through to the company's own page (used on /case-studies). */
  pageLink?: boolean;
  priority?: boolean;
  /** Headline and video only (used where the story is embedded, e.g. /connect). */
  compact?: boolean;
}) {
  const H = heading;
  return (
    <section className="cfhero" id={sectionId}>
      <div className="orb a" />
      <div className="wrap wide">
        {crumbs && (
          <nav className="crumb" aria-label="Breadcrumb">
            {crumbs.map((c, i) => (
              <span className="crumbi" key={c.label}>
                {i > 0 && <ChevronRight aria-hidden />}
                {c.href ? <Link href={c.href}>{c.label}</Link> : <span aria-current="page">{c.label}</span>}
              </span>
            ))}
          </nav>
        )}
        <div className="cfhero-grid" id={story.slug}>
          <div className="cfhero-copy">
            <p className="cfeye">{eyebrow}</p>
            <H className="cfh">
              {story.hero.lead} <span className="hl">{story.hero.highlight}</span>
            </H>
            {!compact && (
              <>
                <p className="cfsub">{story.hero.sub}</p>
                <dl className="cfmeta">
                  <div><dt>Owner</dt><dd>{cs.owner}</dd></div>
                  <div><dt>Market</dt><dd>{cs.marketShort}</dd></div>
                  <div><dt>Product</dt><dd>{cs.product}</dd></div>
                </dl>
              </>
            )}
            {pageLink && (
              <Link className="cfpage" href={storyPath(story.slug)}>
                Open {story.ownerFirst}&apos;s case study on its own page <ArrowRight aria-hidden />
              </Link>
            )}
          </div>
          <div className="cfhero-video">
            <MuxVideo variant="hero" clip={story.hero.clip} label={story.hero.label} priority={priority} />
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── 2 · Stat bar ─────────────────────────────────────────────────────────── */
export function StoryStats({ story, cs, compact = false }: { story: VideoCaseStudy; cs: CaseStudy; compact?: boolean }) {
  return (
    <section className="cfstats" aria-label={`${cs.company} results`}>
      <div className="wrap wide">
        <StatBar stats={story.stats} />
        {!compact && <p className="statnote">{story.statsNote}</p>}
      </div>
    </section>
  );
}

/* ── 3 to 6 · Sticky chapter nav, chapters, calendar proof, transcript ────── */
export function StoryChapters({
  story,
  cs,
  level = "h2",
  compact = false,
}: {
  story: VideoCaseStudy;
  cs: CaseStudy;
  /** Heading level for chapter headlines: one below the story's hero heading. */
  level?: Level;
  /** Clip, headline and quote only: no captions, diagrams, legend or transcript. */
  compact?: boolean;
}) {
  const { chapters, calendar, interview } = story;
  const H = level;
  const navItems = [...chapters.map((c) => ({ id: c.id, nav: c.nav })), { id: calendar.id, nav: "Calendar proof" }];
  const calHeading = `${calendar.id}-h`;

  return (
    <div className="story">
      <div className="wrap wide story-grid">
        <ChapterNav items={navItems} />
        <div className="chapters">
          {chapters.map((c, i) => (
            <ChapterBlock c={c} i={i} cite={c.cite ?? story.cite} ownerFirst={story.ownerFirst} level={level} compact={compact} key={c.id} />
          ))}

          <section className="calproof" id={calendar.id} aria-labelledby={calHeading}>
            <p className="chnum">Chapter {pad(chapters.length + 1)} · Calendar proof</p>
            <H className="chhl" id={calHeading}>{calendar.title}</H>
            {!compact && (
              <p className="legend">
                <span className="pip" aria-hidden />
                {calendar.legend}
              </p>
            )}
            <Gallery
              variant={calendar.shots.length > 1 ? "grid" : "single"}
              shots={calendar.shots.map((s) => ({
                ...s,
                alt: `${story.ownerFirst}'s estimate calendar, ${s.label.toLowerCase()}. Every blue event is an appointment booked by Appointly. ${NAMES_NOTE}`,
              }))}
            />
          </section>

          {/* The transcript, plus the only link to the full interview */}
          {!compact && <details className="transcript">
            <summary>
              <span>
                <b>Read the full interview transcript</b>
                <small>
                  {interview.names ? `Jacob, ${Object.keys(interview.names).join(" and ")}` : `Jacob and ${story.ownerFirst}`},{" "}
                  {interview.length}, word for word
                </small>
              </span>
              <ChevronDown aria-hidden />
            </summary>
            <div className="trbody">
              {interview.transcript.map((t) => (
                <div className={`turn ${t.speaker === "Jacob" ? "jacob" : "owner"}`} key={t.t}>
                  <div className="turnhd">
                    <b>{t.speaker === "Jacob" ? "Jacob, Appointly" : (interview.names?.[t.speaker] ?? cs.owner)}</b>
                    <span className="tstamp">{formatTime(t.t)}</span>
                  </div>
                  <p>{t.text}</p>
                </div>
              ))}
            </div>
          </details>}
          <a className="fulllink" href={interview.url} target="_blank" rel="noopener noreferrer">
            Watch the full {interview.length} interview <ArrowUpRight aria-hidden />
          </a>
        </div>
      </div>
    </div>
  );
}

/* ── Compact card for a case study: video or photo, numbers, calendar strip ── */
export function SupportCard({ c }: { c: CaseStudy }) {
  const story = getVideoStory(c.slug);
  const media = story ? (
    <MuxVideo variant="card" clip={story.hero.clip} label={`Watch ${story.ownerFirst}`} />
  ) : (
    c.media && (
      <figure className="scphoto">
        <Image src={c.media.src} alt={c.media.caption} width={c.media.width} height={c.media.height} sizes="(max-width: 900px) 92vw, 520px" loading="lazy" />
      </figure>
    )
  );
  return (
    <article className="scard" id={story ? undefined : c.slug} aria-labelledby={`${c.slug}-card-h`}>
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
        <h3 id={`${c.slug}-card-h`}>{c.company}</h3>
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
        {story ? (
          <Link className="sclink" href={storyPath(c.slug)}>
            Watch {story.ownerFirst}&apos;s full case study <ArrowRight aria-hidden />
          </Link>
        ) : (
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
        )}
      </div>
    </article>
  );
}

/* ── Booking CTA, led by one line from the owner ───────────────────────────── */
export function CtaBand({ quote, cite, ownerFirst }: { quote: string; cite: string; ownerFirst: string }) {
  return (
    <section className="sec tint ctaband">
      <div className="wrap">
        <p className="ctaq">&ldquo;{quote}&rdquo; <span>{cite}</span></p>
        <h2>Want {ownerFirst}&apos;s calendar in your market?</h2>
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
  );
}

/* ── Structured data ───────────────────────────────────────────────────────── */
const isoDuration = (len: string) => {
  const [m, s] = len.split(":").map(Number);
  return `PT${m}M${s}S`;
};

/** VideoObjects for a story's hero clip and every chapter clip, anchored on `pageUrl`. */
export function storyVideoSchema(story: VideoCaseStudy, pageUrl: string) {
  const video = (clip: VideoCaseStudy["hero"]["clip"], description: string, anchor: string) => ({
    "@type": "VideoObject",
    name: clip.title,
    description,
    thumbnailUrl: muxPoster(clip.playbackId, clip.posterTime),
    uploadDate: story.uploadDate,
    duration: isoDuration(clip.length),
    embedUrl: `https://player.mux.com/${clip.playbackId}`,
    contentUrl: `https://stream.mux.com/${clip.playbackId}.m3u8`,
    url: `${pageUrl}#${anchor}`,
  });
  return [
    video(story.hero.clip, story.hero.description, story.slug),
    ...story.chapters.map((c) => video(c.clip, c.quote, c.id)),
  ];
}
