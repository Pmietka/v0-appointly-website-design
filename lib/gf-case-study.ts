/**
 * Garage Force of the Inland Northwest video case study: Eric and Shani's
 * interview clips on Mux, the chapter copy around them, and the stat bar.
 * Rendered on /case-studies and /case-studies/garage-force-inland-northwest.
 * See lib/video-case-study.ts for the rules the chapter copy follows.
 *
 * Eric answers every question but the last, which is Shani's, so her chapter
 * carries its own `cite`. Chapter ids are prefixed with "gf-" so they stay
 * unique on /case-studies, where this story runs below Phil's and Mark's.
 */

import { GF_INTERVIEW_TRANSCRIPT } from "@/lib/gf-interview-transcript";
import type { Chapter, CountStat, MuxClip, VideoCaseStudy } from "@/lib/video-case-study";

const CLIPS = {
  before: {
    playbackId: "o00WB7Ll01ctovvNglSGVzuD702g9r8aTR4i25MwOjsOvc",
    posterTime: 28,
    length: "0:42",
    title: "Eric H.: trade shows, postcards and price shoppers",
  },
  notHundredLeads: {
    playbackId: "ADLt022yqBBpmsqll2ZuGxJRGy0034f3W5IWNWVRlP00RM",
    posterTime: 22,
    length: "0:30",
    title: "Eric H.: we don't want 100 leads a week",
  },
  whoCloses: {
    playbackId: "JIKDOR3y9aXNXejI3rjh77RbugdKC2SN3gKalLE028ss",
    posterTime: 37,
    length: "0:57",
    title: "Eric H.: the homeowners who close",
  },
  handsOn: {
    playbackId: "XlXfbv700NEeSlapbwFtGt2tux7lATtwHSX02qaMtO8bY",
    posterTime: 24.5,
    length: "0:35",
    title: "Eric H.: not an eight to five business",
  },
  worthIt: {
    playbackId: "K4rb5QpAwlu12mLY84iNBPM1kLYbw6TtG8sDWvkFQwA",
    posterTime: 11.8,
    length: "0:26",
    title: "Eric H.: absolutely worth the spend",
  },
  homeowners: {
    playbackId: "HjAenI5rgzR1GRYH002uAyEnF5nAxq026xhoPrmblyx6A",
    posterTime: 16,
    length: "0:28",
    title: "Shani H.: what homeowners say about the call",
  },
  dreamCustomer: {
    playbackId: "1ktwSD3xle02HMsv00Gk00wh003Z01Kla02LyxVvuRfk9El94",
    posterTime: 14,
    length: "0:23",
    title: "Eric H.: they hugged us, then bought us dinner",
  },
} satisfies Record<string, MuxClip>;

const CAL = {
  week1: { src: "/images/case-studies/gf-cal-week1.webp", width: 1314, height: 476, label: "Week 1" },
  week2: { src: "/images/case-studies/gf-cal-week2.webp", width: 1310, height: 426, label: "Week 2" },
  week3: { src: "/images/case-studies/gf-cal-week3.webp", width: 1301, height: 391, label: "Week 3" },
  week4: { src: "/images/case-studies/gf-cal-week4.webp", width: 1313, height: 736, label: "Week 4" },
};

const CHAPTERS: Chapter[] = [
  {
    id: "gf-before",
    phase: "before",
    nav: "Before Appointly",
    headline: "Before Appointly, it was trade shows, postcards and price shoppers",
    clip: CLIPS.before,
    quote: "We were getting smaller jobs in less than desirable areas.",
    caption:
      "Before us, Eric and Shani's work came from expensive trade shows and mailers that brought in very price conscious homeowners, and they spent hours driving out to bids that weren't qualified. Now every homeowner is prequalified before they go.",
    image: {
      kind: "then-now",
      label:
        "Then: trade shows and mailers that brought price conscious homeowners and smaller jobs. Now: appointments from Appointly, prequalified by phone before Eric and Shani drive out.",
      then: {
        source: "Trade shows and mailers",
        text: "Very, very price conscious. Smaller jobs in less than desirable areas.",
        style: "bubble",
        meta: ["Hit or miss", "Hours on unqualified bids"],
      },
      now: {
        source: "An appointment from Appointly",
        text: "Prequalified by phone before Eric and Shani drive out.",
        style: "note",
        meta: ["Qualified by phone", "Worth the drive"],
      },
      caption: "Built from Eric's own description in this clip.",
    },
  },
  {
    id: "gf-not-100-leads",
    nav: "Not 100 leads",
    headline: "They didn't want 100 leads a week",
    clip: CLIPS.notHundredLeads,
    quote: "We don't want 50, 100 leads every week. That's going to overwhelm us.",
    caption:
      "Other companies call them every day offering 50 or 100 cheaper leads. Eric and Shani are on every job site themselves, so they want appointments worth the trip, from someone who runs their side the way they run a mom and pop business.",
    image: {
      kind: "funnel",
      label:
        "A funnel: 50 to 100 cheaper leads a week at the top, a mom and pop schedule they would overwhelm in the middle, and qualified Appointly appointments at the bottom.",
      tiers: [
        { title: "50 to 100 leads a week", text: "Cheaper per lead, and not quality leads" },
        { title: "A mom and pop schedule", text: "Every wasted bid costs the owners their time" },
        { title: "Appointly appointments", text: "Qualified, and worth the drive" },
      ],
      caption: "The trade-off, the way Eric puts it in this clip.",
    },
  },
  {
    id: "gf-who-closes",
    nav: "Who closes",
    headline: "Homeowners who pay for quality, and a lifetime warranty",
    clip: CLIPS.whoCloses,
    quote:
      "They're willing to spend that money to have things like a lifetime warranty and have us on a job site.",
    caption:
      "Garage Force sells a premium system at a premium price. The homeowners who close understand the product, value quality, and want the owners on the job, not a crew rushing to get it done as fast as they can.",
    image: {
      kind: "checklist",
      title: "The homeowners who close",
      items: [
        "Understand a little about the product",
        "Willing to pay more for a lifetime warranty",
        "Want the owners on the job site",
        "Value quality over the cheapest price",
      ],
      caption: "The homeowners Eric describes in this clip.",
    },
  },
  {
    id: "gf-hands-on",
    nav: "Hands on",
    headline: "Not an eight to five company, and neither are they",
    clip: CLIPS.handsOn,
    quote: "You're kind of like us, and you're not a business that has eight to five hours.",
    caption:
      "We talk with Eric and Shani one on one, in the morning, at night and on weekends. When an appointment turns out not to be a fit, we credit it back, and as the qualifying gets sharper there are fewer to credit.",
    image: {
      kind: "person",
      src: "/images/team/jacob.jpg",
      width: 737,
      height: 581,
      alt: "Jacob Mietka, co-founder of Appointly Solutions.",
      name: "Jacob Mietka",
      role: "Co-founder, Appointly",
      caption: "On the phone with every homeowner before Eric and Shani meet them.",
    },
  },
  {
    id: "gf-homeowners",
    nav: "What homeowners say",
    headline: "Homeowners like the call before the bid",
    clip: CLIPS.homeowners,
    quote: "The people that you talk to appreciate what you've said and what you've done.",
    cite: "Shani H., in the clip",
    caption:
      "Shani's worry going in was handing their leads to a third party. At their bids they ask homeowners how the call with us went, and the feedback has been very positive.",
    image: {
      kind: "calendar-pair",
      shots: [CAL.week1, CAL.week4],
      caption: "Week 1 and week 4 of Eric and Shani's estimate calendar. Every blue block is a homeowner we talked to first.",
    },
  },
  {
    id: "gf-dream-customer",
    nav: "The jobs they want",
    headline: "They hugged us, then they bought us dinner",
    clip: CLIPS.dreamCustomer,
    quote: "Not only did they hug us when we left, they bought us dinner.",
    caption:
      "Very nice people, not really price conscious, and a job they were proud of. Eric says those are the jobs you want, and that's how Garage Force sets itself apart.",
    image: {
      kind: "photo",
      src: "/images/case-studies/garage-force-rig.webp",
      width: 960,
      height: 720,
      alt: "The Garage Force of the Inland Northwest rig parked at a job.",
      caption: "Eric and Shani meet every homeowner and are on every job themselves.",
    },
  },
];

const STATS: CountStat[] = [
  { prefix: "", to: 50, suffix: "%", label: "Close rate" },
  { prefix: "$", to: 5000, suffix: "", label: "Average job size" },
  { prefix: "~$", to: 2000, suffix: "", label: "Monthly ad spend" },
  { prefix: "", to: 100, suffix: "%", label: "Homeowners qualified by phone before the bid" },
];

export const GF_STORY: VideoCaseStudy = {
  slug: "garage-force-inland-northwest",
  seo: {
    title: "Garage Force of the Inland Northwest Case Study | Eric and Shani on Video | Appointly",
    description:
      "Watch Eric and Shani from Garage Force of the Inland Northwest in Spokane, WA explain what changed when Appointly started qualifying and booking their estimates: a 50% close rate on a premium $5,000 polyurea system.",
  },
  ownerFirst: "Eric",
  cite: "Eric H., in the clip",
  hero: {
    lead: "Looking for quality leads?",
    highlight: "Absolutely worth the spend.",
    sub: "Eric and Shani run Garage Force of the Inland Northwest in Spokane, selling a premium polyurea system at a premium price. Here's what changed when we started qualifying and booking their estimates, told by Eric and Shani themselves.",
    clip: { ...CLIPS.worthIt } satisfies MuxClip,
    label: "Watch Eric, 26 sec",
    description:
      "Eric H. of Garage Force of the Inland Northwest on whether qualified appointments are worth the spend for a premium coating company.",
  },
  stats: STATS,
  statsNote:
    "Roughly $500 a week in ad spend. Close rate is calculated on the appointments that have taken place so far, with the remainder still in progress.",
  chapters: CHAPTERS,
  calendar: {
    id: "gf-calendar-proof",
    title: "Four weeks of Eric and Shani's estimate calendar",
    legend:
      "Every blue block is a homeowner we qualified by phone and booked. Struck through events are cancellations and are not counted. Homeowner names shortened to first name and last initial. Tap any week to open it full size.",
    shots: [CAL.week1, CAL.week2, CAL.week3, CAL.week4],
  },
  interview: {
    url: "https://player.mux.com/JwQvRxlkzfY3WIyyNoSG1BcnhD01c1EUd6BUZadrJyKU",
    length: "10:20",
    transcript: GF_INTERVIEW_TRANSCRIPT,
    names: { Eric: "Eric H.", Shani: "Shani H." },
  },
  ctaQuote: "If you're looking for quality pre-qualified leads, then it's absolutely worth the spend.",
  uploadDate: "2026-10-09",
};
