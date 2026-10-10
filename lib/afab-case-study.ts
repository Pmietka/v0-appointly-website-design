/**
 * AFAB Services video case study: Mark's interview clips on Mux, the chapter
 * copy around them, and the stat bar. Rendered on /case-studies and
 * /case-studies/afab-services. See lib/video-case-study.ts for the rules the
 * chapter copy follows.
 *
 * Chapter ids are prefixed with "mark-" so they stay unique on /case-studies,
 * where this story runs below Phil's.
 */

import { AFAB_INTERVIEW_TRANSCRIPT } from "@/lib/afab-interview-transcript";
import type { Chapter, CountStat, MuxClip, VideoCaseStudy } from "@/lib/video-case-study";

const CLIPS = {
  hook: {
    playbackId: "k2IEFCOkiSS1VVxPxxOOJ6mSFWXlPZvObBxMGK3Z9rM",
    posterTime: 5.5,
    length: "0:36",
    title: "Mark T.: you've already paved the ground",
  },
  noTireKickers: {
    playbackId: "WktIP1jyL029xbeNRXi3tf9WmCCBlVycaW55b01IDql3w",
    posterTime: 7.1,
    length: "0:28",
    title: "Mark T.: not just kicking tires",
  },
  before: {
    playbackId: "Fgeq02V006ThA00grSehKtshxw1ugUvigcK9fKJKY007G6w",
    posterTime: 6.6,
    length: "0:34",
    title: "Mark T.: 30 a week, maybe two legit",
  },
  firstClose: {
    playbackId: "8tBHrUMmVS01r8Ri1TUvw2Ifk1z3TyNCh00nqVj8oeNw4",
    posterTime: 20.1,
    length: "0:34",
    title: "Mark T.: the first close, and more work with it",
  },
  skeptics: {
    playbackId: "QCdennQ9j8DmWxMHwRgaFsRbb76fq7lQwGHLvR7Zo00U",
    posterTime: 11,
    length: "0:22",
    title: "Mark T.: take a leap of faith",
  },
  payPerLead: {
    playbackId: "IG00Hwk66cShNvc100uYyVYw01g3DfKwiLmnQFfvfdQ7wE",
    posterTime: 21.9,
    length: "0:29",
    title: "Mark T.: paying per lead",
  },
} satisfies Record<string, MuxClip>;

const CHAPTERS: Chapter[] = [
  {
    id: "mark-before",
    phase: "before",
    nav: "Before Appointly",
    headline: "Before Appointly, 30 leads a week and maybe 2 were real",
    clip: CLIPS.before,
    quote: "I would have 30 different things a week, but maybe two of them were legit.",
    caption:
      "Mark's last lead company sent volume, and he had to call every lead himself to set it up, on top of 13 to 14 hour days. Now we make the call, and all he does is say yes or no to a time.",
    image: {
      kind: "then-now",
      label:
        "Then: 30 leads a week from a lead company, maybe two of them legit, and Mark calls every one himself. Now: a time from Appointly that he says yes or no to.",
      then: {
        source: "His old lead company",
        text: "30 new leads this week.",
        style: "bubble",
        meta: ["Maybe 2 legit", "He calls each one himself"],
      },
      now: {
        source: "A booking from Appointly",
        text: "Hey, this is the time. Can you make it at this time?",
        style: "note",
        meta: ["Called and vetted by us", "He answers yes or no"],
      },
      caption: "Built from Mark's own description in this clip.",
    },
  },
  {
    id: "mark-no-tire-kickers",
    nav: "No tire kickers",
    headline: "Homeowners who can pay, not tire kickers",
    clip: CLIPS.noTireKickers,
    quote: "I like the idea that you vet the people, you make sure that they're not just kicking tires.",
    caption:
      "Every trip out costs Mark money. What he doesn't see are the two or three homeowners we talk to on the phone and decide not to put on his calendar.",
    image: {
      kind: "checklist",
      title: "Before it reaches Mark's calendar",
      items: [
        "Financially able to do the job",
        "Not just kicking tires",
        "Ready to pull the trigger on their project",
        "A time Mark can make",
      ],
      caption: "The checks Mark describes in his interview.",
    },
  },
  {
    id: "mark-first-close",
    nav: "First close",
    headline: "1 appointment, and the remodel work came with it",
    clip: CLIPS.firstClose,
    quote:
      "So with not only getting your lead for the epoxy, I'm also going to get more work out of it on the remodeling end.",
    caption:
      "Mark closed the second appointment we booked him. He also runs a remodeling business, so that homeowner had more work for him inside the house. He calls himself a one-stop shop.",
    image: {
      kind: "person",
      src: "/images/proof/mark-afab.webp",
      width: 1080,
      height: 1350,
      alt: "Mark T., owner of AFAB Services.",
      name: "Mark T.",
      role: "Owner, AFAB Services",
      caption: "Floor coating and remodeling: a one-stop shop for the homeowners we book him.",
    },
  },
  {
    id: "mark-pay-per-lead",
    nav: "Pay per lead",
    headline: "5 clicks, maybe 1 real lead. He pays for the real one.",
    clip: CLIPS.payPerLead,
    quote: "Out of those five clicks, maybe one is a solid lead for me.",
    caption:
      "Mark doesn't pay for clicks on his ads. He pays for homeowners we've vetted, who are qualified and ready to pull the trigger on their project.",
    image: {
      kind: "funnel",
      label:
        "A funnel: five clicks on a Facebook ad at the top, a phone call from Appointly in the middle, and one solid lead at the bottom, which is what Mark pays for.",
      tiers: [
        { title: "Clicks on a Facebook ad", text: "Five clicks, most of them going nowhere" },
        { title: "A call from Appointly", text: "Vetted, qualified, ready to pull the trigger" },
        { title: "One solid lead", text: "The one Mark pays for" },
      ],
      caption: "The math, the way Mark puts it in this clip.",
    },
  },
  {
    id: "mark-for-the-skeptics",
    nav: "For the skeptics",
    headline: "He jumped in, and he's happy he's swimming",
    clip: CLIPS.skeptics,
    quote: "I jumped into the deep end of the pool and I'm happy I'm swimming.",
    caption:
      "Mark had worked with lead generation companies before, and they didn't pan out. His advice to a contractor on the fence: take a leap of faith.",
    image: {
      kind: "person",
      src: "/images/team/jacob.jpg",
      width: 737,
      height: 581,
      alt: "Jacob Mietka, co-founder of Appointly Solutions.",
      name: "Jacob Mietka",
      role: "Co-founder, Appointly",
      caption: "On the phone with every homeowner before Mark meets them.",
    },
  },
];

const STATS: CountStat[] = [
  { prefix: "", to: 57, suffix: "%", label: "Close rate" },
  { prefix: "$", to: 3500, suffix: "", label: "Average job size" },
  { prefix: "$", to: 35, suffix: "k+", label: "Closed revenue in his best month" },
  { prefix: "$", to: 6, suffix: "k", label: "Job closed on his 2nd appointment" },
];

export const AFAB_STORY: VideoCaseStudy = {
  slug: "afab-services",
  seo: {
    title: "AFAB Services Case Study | Mark on Video | Appointly",
    description:
      "Watch Mark from AFAB Services in Port St. Lucie, FL explain what changed when Appointly started vetting and booking his floor coating appointments: 57% close, at a $3,500 average job.",
  },
  ownerFirst: "Mark",
  cite: "Mark T., in the clip",
  hero: {
    lead: "57% of appointments close,",
    highlight: "at a $3,500 average job.",
    sub: "Mark runs AFAB Services in Port St. Lucie, Florida, alongside a busy remodeling business, and wanted to sell more floor coating without chasing leads himself. Here's how it's going, told by Mark himself.",
    clip: { ...CLIPS.hook } satisfies MuxClip,
    label: "Watch Mark, 36 sec",
    description:
      "Mark T. of AFAB Services on what it's like when every homeowner has already been called and vetted before he shows up.",
  },
  stats: STATS,
  statsNote:
    "Close rate counts immediate closes on the appointments we book. Closed revenue is closed jobs multiplied by Mark's average job size.",
  chapters: CHAPTERS,
  calendar: {
    id: "mark-calendar-proof",
    title: "A month of Mark's estimate calendar",
    legend:
      "Every blue block is a homeowner we qualified by phone and booked. Homeowner names shortened to first name and last initial. Tap to open it full size.",
    shots: [{ src: "/images/case-studies/afab-cal-june.webp", width: 1444, height: 708, label: "One full month" }],
  },
  interview: {
    url: "https://player.mux.com/012WCAUIGpJ2H7LM5uISpGCowyxeFh4ecKi42epcBnj4",
    length: "6:06",
    transcript: AFAB_INTERVIEW_TRANSCRIPT,
  },
  ctaQuote: "Take a leap of faith.",
  uploadDate: "2026-10-08",
};
