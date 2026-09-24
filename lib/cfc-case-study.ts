/**
 * Clean Floor Coatings flagship case study on /case-studies.
 *
 * Every chapter is built around one of Phil's interview clips on Mux. The
 * headline, pull quote and caption for a chapter only ever say what Phil says
 * in that clip, so the video is always the proof and the text is the caption.
 * Pull quotes are verbatim from the clip transcripts.
 *
 * The rest of the site (homepage cards, the at a glance numbers) still reads
 * the Clean Floor Coatings entry in lib/case-studies.ts.
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
  | { kind: "calendar-pair"; caption: string }
  | { kind: "then-now"; caption: string }
  | { kind: "funnel"; caption: string };

export type Chapter = {
  id: string;
  /** Seconds into the full interview where this part of the story starts. */
  fullAt: number;
  nav: string;
  headline: string;
  clip: MuxClip;
  quote: string;
  caption: string;
  image: ChapterImage;
};

export const muxPoster = (playbackId: string, time: number, width = 1280) =>
  `https://image.mux.com/${playbackId}/thumbnail.webp?time=${time}&width=${width}`;

export const formatTime = (s: number) => `${Math.floor(s / 60)}:${String(Math.floor(s % 60)).padStart(2, "0")}`;

const CLIPS = {
  leadIsntALead: {
    playbackId: "01m01jbccDjUAOJdKHM0102kMNrvYB1xp7HPrbwrs8i003y8",
    posterTime: 31,
    length: "0:39",
    title: "Phil A.: a lead isn't a lead",
  },
  businessGrowth: {
    playbackId: "deFz11g901e45Ugq1I1uhCZ800w00KXKBXvTeZILPEY4pc",
    posterTime: 13.5,
    length: "0:59",
    title: "Phil A.: booked five days a week",
  },
  appointmentQuality: {
    playbackId: "FG00ufX00pWBA2YRMyMZVGzPI178XQ3NEgkeZ8k4QUQ00w",
    posterTime: 8.5,
    length: "1:04",
    title: "Phil A.: before and after",
  },
  screening: {
    playbackId: "IIGeNBzzNDvVBtuPbWKotOGRZpO31D02DSXnj6ZvFVIE",
    posterTime: 28.5,
    length: "0:38",
    title: "Phil A.: the appointments we don't book",
  },
  otherAgencies: {
    playbackId: "kRS0067lEV1rZS5p3uTLXsgQzHZU6yDKqrRxoxNNPkB8",
    posterTime: 58.5,
    length: "1:05",
    title: "Phil A.: why other agencies don't work",
  },
  standBehindIt: {
    playbackId: "IGPPJAy5wrjhk5yyRXOsFpARWVeFOMhCud5AB5CcEZ8",
    posterTime: 23.5,
    length: "0:52",
    title: "Phil A.: we stand behind it",
  },
} satisfies Record<string, MuxClip>;

/* ── The full interview (the hero) ───────────────────────────────────────────
   Jacob's call with Phil, cut to 14:54. The recording has no caption track on
   Mux, so captions come from public/captions/phil-interview.vtt, generated
   from the same audio. The poster is a frame from the "booked five days" clip,
   which reads better than the video call layout. Chapter times are seconds
   into this cut. */
export const HERO_VIDEO = {
  clip: {
    playbackId: "Af5b1ibLi55oW4BiBlrGghZl7ZM6vKjHreBwiEroLuM",
    posterTime: 0,
    length: "14:54",
    title: "Phil A., Clean Floor Coatings: full interview",
  } satisfies MuxClip,
  poster: muxPoster(CLIPS.businessGrowth.playbackId, 43.5, 1600),
  captions: "/captions/phil-interview.vtt",
  label: "Watch Phil, 15 min",
  chapters: [
    { title: "37 shown appointments", start: 0 },
    { title: "The first week", start: 31 },
    { title: "What changed", start: 81 },
    { title: "Buyers, not leads", start: 195 },
    { title: "Before: leads vs. appointments", start: 317 },
    { title: "Screening", start: 430 },
    { title: "Conveying integrity", start: 538 },
    { title: "We stand behind it", start: 581 },
    { title: "Why Phil stays", start: 693 },
    { title: "I don't even look at the creative", start: 842 },
  ],
};

const CAL = {
  week1: { src: "/images/case-studies/cfc-cal-week1.webp", width: 1447, height: 414, label: "Week 1" },
  week2: { src: "/images/case-studies/cfc-cal-week2.webp", width: 1410, height: 486, label: "Week 2" },
  week3: { src: "/images/case-studies/cfc-cal-week3.webp", width: 1445, height: 548, label: "Week 3" },
};

export const CFC_CALENDAR = [CAL.week1, CAL.week2, CAL.week3];

export const CHAPTERS: Chapter[] = [
  {
    id: "before",
    fullAt: 331,
    nav: "Before",
    headline: "Leads that wouldn't give a phone number",
    clip: CLIPS.appointmentQuality,
    quote:
      "They would text me a square footage and say, I got 440 square feet, what's your lowest price?",
    caption:
      "Phil's old leads were Facebook forms and price shoppers. Now every appointment arrives with two paragraphs on the homeowner, and the objection he expected about a young company with few reviews never comes up.",
    image: {
      kind: "then-now",
      caption: "Built from Phil's own description in this clip.",
    },
  },
  {
    id: "what-changed",
    fullAt: 81,
    nav: "What changed",
    headline: "A full calendar changed the business model",
    clip: CLIPS.businessGrowth,
    quote: "I'm now booked up for five days for the next three weeks in a row.",
    caption:
      "A full calendar changed how Phil runs the company. He staffs crews for the whole week and buys inventory ahead, and one appointment often turns into two or three jobs in the same neighborhood.",
    image: {
      kind: "calendar-pair",
      caption: "Week 1 and week 3 of Phil's estimate calendar. Every blue block is a homeowner we qualified by phone.",
    },
  },
  {
    id: "buyers-not-leads",
    fullAt: 195,
    nav: "Buyers not leads",
    headline: "He isn't buying leads. He's buying buyers.",
    clip: CLIPS.leadIsntALead,
    quote:
      "A lead isn't a lead. This is somebody that's at the bottom of the funnel ready to make a buying decision.",
    caption:
      "Google and Facebook leads are raw material Phil has to work. Our appointments are ready to close: some homeowners get a quote on Thursday and pay for the finished floor on Monday.",
    image: {
      kind: "funnel",
      caption: "The funnel, the way Phil draws it in this clip.",
    },
  },
  {
    id: "screening",
    fullAt: 430,
    nav: "Screening",
    headline: "The appointments we don't book",
    clip: CLIPS.screening,
    quote:
      "The day that you screened that, you saved me 2.5 hours and 100 miles on my car.",
    caption:
      "Homeowners waiting on a check, jobs that are too small, and anyone capping the price before we've seen the floor get screened out on the phone, before they reach Phil's calendar.",
    image: {
      kind: "photo",
      src: "/images/case-studies/cfc-landing-page.webp",
      width: 600,
      height: 800,
      alt: "The Clean Floor Coatings landing page Appointly built: a three step form asking what the homeowner wants coated before they can submit their details.",
      caption: "Screening starts before the call: every ad lands on this three step page we built for Phil.",
    },
  },
  {
    id: "stand-behind-it",
    fullAt: 613,
    nav: "We stand behind it",
    headline: "When an appointment misses, we don't charge for it",
    clip: CLIPS.standBehindIt,
    quote: "The first thing you said to me was, well, I won't charge you for that.",
    caption:
      "A homeowner still needed concrete work on her driveway, so there was nothing to coat for two months. Phil flagged it, and we didn't charge him for the appointment.",
    image: {
      kind: "photo",
      ...CAL.week2,
      alt: "Week 2 of Phil's estimate calendar, with eight appointments booked by Appointly.",
      caption: "Every appointment on this calendar is one we stand behind.",
    },
  },
  {
    id: "why-phil-stays",
    fullAt: 705,
    nav: "Why Phil stays",
    headline: "Built for 52 weeks a year, not one good month",
    clip: CLIPS.otherAgencies,
    quote: "I know that your interests and my interests are 100% aligned here.",
    caption:
      "Other agencies signed Phil up, then handed him off to be churned. We talk almost every day about one goal: taking Phil from one truck to three.",
    image: {
      kind: "photo",
      src: "/images/team/jacob.jpg",
      width: 737,
      height: 581,
      alt: "Jacob Mietka, co-founder of Appointly Solutions.",
      caption: "Jacob, co-founder of Appointly. Phil's homeowners greet him with “Jacob told me you'd be like this.”",
    },
  },
];

/** Stat bar under the hero. `to` is what the number counts up to. */
export const CFC_STATS = [
  { prefix: "~", to: 70, suffix: "%", label: "Close rate on shown appointments" },
  { prefix: "", to: 37, suffix: "", label: "Shown appointments in month one" },
  { prefix: "", to: 5, suffix: " days", label: "A week, booked" },
  { prefix: "~$", to: 2600, suffix: "", label: "Monthly ad spend" },
];

export const CFC_STATS_NOTE =
  "Close rate counts immediate closes only, on appointments that have already taken place. Homeowners who sign later are not included, and Phil says one appointment often turns into two or three jobs in the same neighborhood.";
