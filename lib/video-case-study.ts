/**
 * Shared shape for the video case studies (Clean Floor Coatings, AFAB
 * Services, Garage Force of the Inland Northwest). Each one renders as a full story on /case-studies and on its own
 * page at /case-studies/<slug>.
 *
 * Every chapter is built around one of the owner's interview clips on Mux.
 * The headline, pull quote and caption for a chapter only ever say what the
 * owner says in that clip, so the video is always the proof and the text is
 * the caption. Pull quotes are verbatim from the clip transcripts.
 *
 * The rest of the site (homepage cards, the at a glance numbers) still reads
 * lib/case-studies.ts.
 */

export type MuxClip = {
  playbackId: string;
  /** Seconds into the clip for the poster frame. */
  posterTime: number;
  /** Display length, e.g. "0:39". */
  length: string;
  /** Title Mux Data reports for this video. */
  title: string;
};

/** One side of a then / now card. */
export type ThenNowSide = {
  source: string;
  text: string;
  /** "bubble" reads as a message from a homeowner, "note" as a note from us. */
  style: "bubble" | "note";
  /** Small status line(s) under the text. */
  meta: string[];
  /** Icon on the "then" side's status lines. Defaults to a cross. */
  icon?: "phone-off";
};

export type ChapterImage =
  | {
      kind: "photo";
      src: string;
      width: number;
      height: number;
      alt: string;
      caption: string;
      /** Crop the photo to a focal point instead of showing it whole. */
      crop?: { aspect: string; position: string };
    }
  | {
      kind: "person";
      src: string;
      width: number;
      height: number;
      alt: string;
      name: string;
      role: string;
      caption: string;
    }
  /** Two calendar screenshots stacked, e.g. week 1 above week 3. */
  | { kind: "calendar-pair"; shots: CalendarImage[]; caption: string }
  | { kind: "then-now"; label: string; then: ThenNowSide; now: ThenNowSide; caption: string }
  | { kind: "funnel"; label: string; tiers: [FunnelTier, FunnelTier, FunnelTier]; caption: string }
  | { kind: "checklist"; title: string; items: string[]; caption: string };

export type FunnelTier = { title: string; text: string };

export type Chapter = {
  id: string;
  /** "before": the owner's situation before Appointly. Gets a bold "Before
      Appointly" tag; every other chapter is tagged "With Appointly". */
  phase?: "before";
  nav: string;
  headline: string;
  clip: MuxClip;
  quote: string;
  /** Who says the quote, when it isn't the story's usual `cite` (a co-owner). */
  cite?: string;
  caption: string;
  image: ChapterImage;
};

/** Stat bar entry. `to` is what the number counts up to. */
export type CountStat = { prefix: string; to: number; suffix: string; label: string };

export type CalendarImage = { src: string; width: number; height: number; label: string };

export type TranscriptTurn = { t: number; speaker: string; text: string };

export type VideoCaseStudy = {
  /** Matches the entry in lib/case-studies.ts. */
  slug: string;
  /** Title and description for the company's own page. */
  seo: { title: string; description: string };
  /** Owner's first name as used in running copy and the transcript. */
  ownerFirst: string;
  /** How the owner's lines are attributed, e.g. "Phil A., in the clip". */
  cite: string;
  hero: {
    /** Headline before the highlighted part. */
    lead: string;
    /** Highlighted end of the headline. */
    highlight: string;
    sub: string;
    clip: MuxClip;
    /** Button label on the hero poster, e.g. "Watch Phil, 59 sec". */
    label: string;
    /** One line for the hero video's structured data description. */
    description: string;
  };
  stats: CountStat[];
  statsNote: string;
  chapters: Chapter[];
  calendar: {
    id: string;
    title: string;
    legend: string;
    shots: CalendarImage[];
  };
  interview: {
    /** Hosted Mux player for the full interview. */
    url: string;
    length: string;
    transcript: TranscriptTurn[];
    /** Display name per transcript speaker, when there is more than one owner.
        Without it, every non-Jacob turn is labelled with the case study's owner. */
    names?: Record<string, string>;
  };
  /** Pull quote above the booking CTA on the company's own page. */
  ctaQuote: string;
  /** YYYY-MM-DD the clips went up, for VideoObject structured data. */
  uploadDate: string;
};

export const muxPoster = (playbackId: string, time: number, width = 1280) =>
  `https://image.mux.com/${playbackId}/thumbnail.webp?time=${time}&width=${width}`;

export const formatTime = (s: number) => `${Math.floor(s / 60)}:${String(Math.floor(s % 60)).padStart(2, "0")}`;
