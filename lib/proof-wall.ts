/**
 * The wall of proof shown on /connect and /lander. Built entirely from data
 * that already lives elsewhere, so nothing here can drift from the case
 * studies:
 *  - every interview clip from the video case studies (lib/*-case-study.ts)
 *  - Adrian's video testimonial (public/videos)
 *  - every approved quote in lib/testimonials.ts
 *  - headline numbers from lib/case-studies.ts and the testimonials
 *  - real calendar screenshots from the case studies
 *
 * To add proof, add it at the source (a new case study, a new testimonial) and
 * it shows up here. Screenshots of client texts go in TEXT_SHOTS below.
 *
 * Server only: the case study files carry full interview transcripts, so the
 * pages build the tile list here and hand the client wall plain tiles.
 */
import { CASE_STUDIES } from "@/lib/case-studies";
import { FEATURED_TESTIMONIALS, QUOTE_TESTIMONIALS, type Testimonial } from "@/lib/testimonials";
import { VIDEO_STORIES } from "@/lib/video-case-studies";
import type { MuxClip } from "@/lib/video-case-study";

export type WallTile =
  | { kind: "clip"; id: string; clip: MuxClip; quote: string; name: string; /** Chapter topic, shown on the poster. */ tag: string }
  | { kind: "video"; id: string; src: string; poster: string; name: string; caption: string }
  | { kind: "message"; id: string; name: string; who?: string; stat?: string; quote: string; photo?: string }
  | { kind: "stat"; id: string; value: string; label: string; name: string }
  | { kind: "calendar"; id: string; src: string; width: number; height: number; label: string; name: string }
  | { kind: "shot"; id: string; src: string; width: number; height: number; alt: string; name: string };

export type FeaturedStory = {
  slug: string;
  company: string;
  owner: string;
  market: string;
  logo: { src: string; width: number; height: number; dark?: boolean };
  clip: MuxClip;
  label: string;
  lead: { value: string; label: string };
  stats: { value: string; label: string }[];
};

/* Screenshots of texts clients have sent us. Drop the image in
   /public/images/proof/texts and add an entry, e.g.
   { src: "/images/proof/texts/viktor.webp", width: 1080, height: 1600,
     alt: "Text from Viktor: closed 4 of my first 7 appointments", name: "Viktor" } */
const TEXT_SHOTS: { src: string; width: number; height: number; alt: string; name: string }[] = [];

const stripCite = (cite: string) => cite.replace(/, in the clip$/, "");

/** The three owners with full video case studies, lead clip first. */
export function featuredStories(): FeaturedStory[] {
  return VIDEO_STORIES.map((s) => {
    const cs = CASE_STUDIES.find((c) => c.slug === s.slug)!;
    return {
      slug: s.slug,
      company: cs.company,
      owner: cs.owner,
      market: cs.marketShort,
      logo: cs.logo,
      clip: s.hero.clip,
      label: s.hero.label,
      lead: cs.glance.lead,
      stats: cs.glance.cardStats,
    };
  });
}

/** One row per owner: their chapter clips, in story order. */
function clipGroups(): WallGroup[] {
  return VIDEO_STORIES.map((s) => {
    const cs = CASE_STUDIES.find((c) => c.slug === s.slug)!;
    return {
      id: s.slug,
      title: cs.owner,
      sub: `${cs.company} · ${cs.marketShort}`,
      tiles: s.chapters.map<WallTile>((ch) => ({
        kind: "clip",
        id: `${s.slug}-${ch.id}`,
        clip: ch.clip,
        quote: ch.quote,
        name: stripCite(ch.cite ?? s.cite),
        tag: ch.nav,
      })),
    };
  });
}

const toMessage = (t: Testimonial, i: number): WallTile => ({
  kind: "message",
  id: `msg-${i}`,
  name: t.name,
  who: [t.who, t.where].filter(Boolean).join(" · ") || undefined,
  stat: t.stat,
  quote: t.quote,
  photo: t.avatar || t.photo,
});

function statTiles(): WallTile[] {
  const cs = (slug: string) => CASE_STUDIES.find((c) => c.slug === slug)!;
  const cfc = cs("clean-floor-coatings");
  const afab = cs("afab-services");
  const gf = cs("garage-force-inland-northwest");
  return [
    { kind: "stat", id: "stat-cfc", value: cfc.glance.closeRate, label: "of shown appointments close, in one of the most crowded coating markets in the Southeast", name: `${cfc.owner} · ${cfc.shortName}` },
    { kind: "stat", id: "stat-afab", value: "$35k+", label: "closed in his best month, at a $3,500 average job", name: `${afab.owner} · ${afab.shortName}` },
    { kind: "stat", id: "stat-gf", value: gf.glance.closeRate, label: "close rate on a premium $5,000 polyurea system", name: `${gf.owner} · ${gf.shortName}` },
    { kind: "stat", id: "stat-andre", value: "8 jobs", label: "closed in his second month", name: "Andre S. · D&V maintenance" },
    { kind: "stat", id: "stat-viktor", value: "4 of 7", label: "of his first appointments closed", name: "Viktor" },
    { kind: "stat", id: "stat-nate", value: "58%", label: "close rate over two months, on par with his own warm leads", name: "Nate" },
  ];
}

function calendarTiles(): WallTile[] {
  const picks: [string, number][] = [
    ["afab-services", 0],
    ["clean-floor-coatings", 1],
    ["garage-force-inland-northwest", 3],
  ];
  return picks.map(([slug, i]) => {
    const c = CASE_STUDIES.find((x) => x.slug === slug)!;
    const shot = c.calendar.shots[i];
    return {
      kind: "calendar",
      id: `cal-${slug}`,
      src: shot.src,
      width: shot.width,
      height: shot.height,
      label: `${c.ownerFirst}'s calendar, ${shot.label.toLowerCase()}`,
      name: `${c.owner} · ${c.shortName}`,
    };
  });
}

export type WallGroup = { id: string; title: string; sub: string; tiles: WallTile[] };

export type Wall = {
  stats: WallTile[];
  /** Interview clips, one group per client. */
  videos: WallGroup[];
  messages: WallTile[];
  calendars: WallTile[];
};

/**
 * The full wall, organized by kind: the numbers first, then every clip
 * grouped by client, then what clients have told us, then their calendars.
 */
export function buildWall(): Wall {
  const adrian: WallGroup = {
    id: "adrian",
    title: "Adrian",
    sub: "One of our first clients",
    tiles: [
      {
        kind: "video",
        id: "adrian",
        src: "/videos/adrian.mp4",
        poster: "/images/proof/adrian-poster.jpg",
        name: "Adrian",
        caption: "One of our first clients",
      },
    ],
  };
  return {
    stats: statTiles(),
    videos: [...clipGroups(), adrian],
    messages: [
      ...TEXT_SHOTS.map<WallTile>((s, i) => ({ kind: "shot", id: `shot-${i}`, ...s })),
      ...[...FEATURED_TESTIMONIALS, ...QUOTE_TESTIMONIALS].map(toMessage),
    ],
    calendars: calendarTiles(),
  };
}
