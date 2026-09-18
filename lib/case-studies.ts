/**
 * Client case studies. Single source of truth for /case-studies and for every
 * proof block on the homepage that quotes these numbers, so the two pages can
 * never drift apart.
 *
 * House rules for these numbers:
 *  - Ratios and percentages only. Never a raw count of appointments or closed
 *    jobs, so nothing here goes stale as the campaigns keep running.
 *  - Money figures are framed monthly (ad spend, average job size).
 *  - No campaign dates or "first N days". Everything reads as results so far.
 *  - Owners are first name plus last initial.
 * Close rates are immediate closes only; appointments that have not closed yet
 * are still in progress, not lost.
 */

export type Stat = {
  value: string;
  label: string;
  /** Highlighted (dark) tile in the results grid. */
  hero?: boolean;
};

export type CalendarShot = {
  src: string;
  width: number;
  height: number;
  label: string;
};

export type CaseStudy = {
  slug: string;
  order: number;
  company: string;
  /** Short display name for tight spaces (cards, tables). */
  shortName: string;
  /** First name plus last initial. */
  owner: string;
  /** How the owner is referred to in running copy. */
  ownerFirst: string;
  market: string;
  marketShort: string;
  /** Two or three words for the corner of a compact card. */
  marketTag: string;
  /** What the client sells, for the header meta and the comparison table. */
  product: string;
  logo: { src: string; width: number; height: number; dark?: boolean };
  /** One line that frames the whole study. */
  headline: string;
  context: string[];
  stats: Stat[];
  statsNote: string;
  /** Trailing note under the stats. */
  sinceNote?: string;
  why: { title: string; body: string[] };
  /** Direct quote from the owner, if we have one. */
  quote?: { text: string; stat?: string };
  /** Reported feedback when there is no verbatim quote. Never shown in quotation marks. */
  noticed?: { title: string; body: string[] };
  owner_photo?: { src: string; width: number; height: number; caption: string };
  media?: { src: string; width: number; height: number; caption: string; title: string; body: string[] };
  calendar: {
    title: string;
    legend: string;
    shots: CalendarShot[];
  };
  /** Numbers used on the homepage cards and the at-a-glance table. */
  glance: {
    closeRate: string;
    /** The one number to lead with on a compact card. */
    lead: { value: string; label: string };
    /** Three small figures under the lead number. */
    cardStats: { value: string; label: string }[];
  };
};

const NAMES_NOTE = "Homeowner names are shortened to first name and last initial.";

export const CASE_STUDIES: CaseStudy[] = [
  {
    slug: "clean-floor-coatings",
    order: 1,
    company: "Clean Floor Coatings",
    shortName: "Clean Floor Coatings",
    owner: "Phil A.",
    ownerFirst: "Phil",
    market: "Myrtle Beach metro, South Carolina",
    marketShort: "Myrtle Beach, SC",
    marketTag: "Myrtle Beach, SC",
    product: "Epoxy and polyaspartic coatings",
    logo: { src: "/images/clients/clean-floor-coatings.png", width: 800, height: 366 },
    headline: "About seven in ten shown appointments turn into sold jobs, in one of the most crowded coating markets in the Southeast.",
    context: [
      "Phil A. owns Clean Floor Coatings, along with PaverSpa, in the Myrtle Beach metro area of South Carolina. The Myrtle Beach coating space is extremely competitive, with both local operators and national franchises advertising heavily to the same homeowners.",
      "Phil came to us as a fresh launch in that crowded market, so his numbers show exactly what a new campaign looks like when the competition is already on every homeowner's feed.",
    ],
    stats: [
      { value: "~$2,600", label: "Monthly ad spend" },
      { value: "~70%", label: "Close rate on shown appointments", hero: true },
      { value: "Week 1", label: "First appointments booked the week the ads went live" },
      { value: "Custom", label: "Landing page built for the campaign" },
    ],
    statsNote:
      "Close rate is calculated on the appointments that have taken place so far. Appointments still on the calendar are not reflected yet.",
    why: {
      title: "Why it works",
      body: [
        "Phil is in one of the more crowded coating markets in the Southeast, and two things set him apart. First, he and his team run a very good sales process. Second, he uses very good materials at a price that makes sense for homeowners.",
        "Our job is to put the right homeowners in front of that process. The close rate is the combination of qualified appointments on our end and a strong estimate on his.",
      ],
    },
    noticed: {
      title: "What Phil has noticed",
      body: [
        "Almost every homeowner Phil speaks to is already sold on the product before he arrives, which makes the estimate much easier to close. Several homeowners have told him that the conversation they had with Jacob on the phone was excellent, and that it helped them understand which option was right for their floor before anyone came out.",
        "That is the point of our qualifying call. It is not a quick confirmation. It is a real conversation about the homeowner's floor, their timeline, and their budget, so the estimate becomes the final step rather than the first one.",
      ],
    },
    owner_photo: {
      src: "/images/case-studies/phil-adikes.webp",
      width: 639,
      height: 640,
      caption: "Phil A., owner of Clean Floor Coatings",
    },
    media: {
      src: "/images/case-studies/cfc-landing-page.webp",
      width: 600,
      height: 800,
      caption: "The landing page we built for Clean Floor Coatings",
      title: "The landing page behind the campaign",
      body: [
        "Every ad in this campaign sends homeowners to a landing page we built for Phil. Rather than a single form, it walks the homeowner through a short set of questions about their project before they submit their details.",
        "That is the first layer of qualification. By the time our team picks up the phone, we already know what surface they want coated, what condition it is in, and roughly when they want it done, which is why the calls start warm and the appointments close the way they do.",
      ],
    },
    calendar: {
      title: "Three weeks of Phil's estimate calendar",
      legend: `Every blue event is an appointment booked by Appointly. Struck through events are cancellations. ${NAMES_NOTE}`,
      shots: [
        { src: "/images/case-studies/cfc-cal-week1.webp", width: 1447, height: 414, label: "Week 1" },
        { src: "/images/case-studies/cfc-cal-week2.webp", width: 1410, height: 486, label: "Week 2" },
        { src: "/images/case-studies/cfc-cal-week3.webp", width: 1445, height: 548, label: "Week 3" },
      ],
    },
    glance: {
      closeRate: "~70%",
      lead: { value: "~70%", label: "of shown appointments close" },
      cardStats: [
        { value: "~$2.6k", label: "Monthly ad spend" },
        { value: "Week 1", label: "First appts booked" },
        { value: "Custom", label: "Landing page" },
      ],
    },
  },
  {
    slug: "afab-services",
    order: 2,
    company: "AFAB Services",
    shortName: "AFAB Services",
    owner: "Mark T.",
    ownerFirst: "Mark",
    market: "Port St. Lucie metro, Florida",
    marketShort: "Port St. Lucie, FL",
    marketTag: "Port St. Lucie, FL",
    product: "Floor coating, $3,500 average job",
    logo: { src: "/images/clients/afab-services.png", width: 364, height: 222, dark: true },
    headline: "One in two appointments closes, at a $3,500 average job, in one of the fastest growing markets in the country.",
    context: [
      "Mark T. owns AFAB Services in Port St. Lucie, Florida, and serves the metro area around it. He is our most consistent client. Port St. Lucie is one of the fastest growing markets in the country and, like most of Florida, one of the most competitive for floor coating. It has been a great market for him and for us.",
      "When we started, Mark was running a busy home improvement company that never slows down. He had a profitable floor coating business sitting right there and no time to actually sell it. Since we began booking his calendar, he has shifted to doing mostly floor coating, because that is where he makes the most money and because the appointments keep coming.",
    ],
    stats: [
      { value: "~50%", label: "Close rate", hero: true },
      { value: "$3,500", label: "Average job size" },
      { value: "$35k+", label: "Closed revenue in his best month so far", hero: true },
      { value: "Mostly", label: "Floor coating now, after years as a general home improvement company" },
    ],
    statsNote:
      "Closed revenue is closed jobs multiplied by Mark's average job size. His close rate on the appointments we book has held at roughly one in two.",
    sinceNote:
      "Mark has been with us the longest of any client in these case studies, and his close rate has held at about one in two the entire time.",
    why: {
      title: "What Mark says",
      body: [
        "Now we send Mark homeowners who are mostly ready to go. He shows up, gives the estimate, chats, sends the proposal. The jobs pile in.",
        "The consistent feedback from Mark is the same thing Phil noticed: it is much easier to close a homeowner who has already been vetted and educated. That only happens because of our process. Before anything is booked, every homeowner gets a phone call and an in depth conversation about their floor coating needs, the options available, and what they want to spend. By the time Mark arrives, the homeowner knows what they want and is ready to talk numbers.",
      ],
    },
    quote: {
      text: "You've already paved the ground. I just go in and sweep it up.",
      stat: "$6k job, closed on the 2nd appointment",
    },
    owner_photo: {
      src: "/images/proof/mark-afab.webp",
      width: 1080,
      height: 1350,
      caption: "Mark T., owner of AFAB Services",
    },
    calendar: {
      title: "A month of Mark's estimate calendar",
      legend: `Every blue event is an appointment booked by Appointly. ${NAMES_NOTE}`,
      shots: [
        { src: "/images/case-studies/afab-cal-june.webp", width: 1444, height: 708, label: "One full month" },
      ],
    },
    glance: {
      closeRate: "~50%",
      lead: { value: "1 in 2", label: "appointments close, at a $3,500 average job" },
      cardStats: [
        { value: "~50%", label: "Close rate" },
        { value: "$3,500", label: "Avg job size" },
        { value: "$35k+", label: "Best month" },
      ],
    },
  },
  {
    slug: "garage-force-inland-northwest",
    order: 3,
    company: "Garage Force of the Inland Northwest",
    shortName: "Garage Force",
    owner: "Eric and Shani H.",
    ownerFirst: "Eric",
    market: "Spokane, WA",
    marketShort: "Spokane, WA",
    marketTag: "Spokane, WA",
    product: "Full polyurea system, $5,000 average job",
    logo: { src: "/images/clients/garage-force.png", width: 1000, height: 181 },
    headline: "More than half of the appointments we book close, on a premium polyurea system sold at a premium price.",
    context: [
      "Eric and Shani own Garage Force of the Inland Northwest, a Garage Force franchise based in Spokane and covering eastern Washington and northern Idaho. They offer a more premium product than any of their local competitors, and than most of our clients: a full polyurea system, priced accordingly, and sold by the owners themselves, who meet every homeowner in person.",
      "That changes how we book for them. A premium price means we only send the highest quality appointments: the homeowners most likely to close and able to pay for the product. The result is fewer total appointments than a volume client would see, but a close rate that stays high and a lot of revenue per appointment. For a company selling a premium product, this is the model that protects the estimator's time.",
    ],
    stats: [
      { value: "~$2,000", label: "Monthly ad spend" },
      { value: "~55%", label: "Close rate", hero: true },
      { value: "$5,000", label: "Average job size" },
      { value: "Premium", label: "Full polyurea system, priced above every local competitor", hero: true },
    ],
    statsNote:
      "Roughly $500 a week in ad spend. Close rate is calculated on the appointments that have taken place so far, with the remainder still in progress.",
    why: {
      title: "Why it works for a premium product",
      body: [
        "Garage Force is not the cheapest option in the Inland Northwest and does not try to be. That makes qualification more important, not less. A homeowner who only wants the lowest price is not a fit, and sending Eric out to that estimate costs him an afternoon. So our conversation with each homeowner covers the product, the price range, and the timeline before anything is booked.",
        "The appointments that make it onto Eric and Shani's calendar are the ones where the homeowner already understands what they are buying and why it costs what it does. That is how a premium operator keeps a high close rate at a high ticket, and it is the same process we would run for you.",
      ],
    },
    owner_photo: {
      src: "/images/case-studies/eric-hoke.webp",
      width: 206,
      height: 206,
      caption: "Eric H., owner of Garage Force of the Inland Northwest",
    },
    media: {
      src: "/images/case-studies/garage-force-rig.webp",
      width: 960,
      height: 720,
      caption: "The Garage Force Inland Northwest rig on a job",
      title: "A premium rig for a premium product",
      body: [
        "Eric and Shani meet every homeowner in person and install a full polyurea system. The homeowners we book for them already know what that costs and why, so the estimate is a conversation about the floor, not a negotiation about the price.",
      ],
    },
    calendar: {
      title: "Four weeks of Eric's estimate calendar",
      legend: `Every blue event is an appointment booked by Appointly. Struck through events are cancellations and are not counted. ${NAMES_NOTE}`,
      shots: [
        { src: "/images/case-studies/gf-cal-week1.webp", width: 1314, height: 476, label: "Week 1" },
        { src: "/images/case-studies/gf-cal-week2.webp", width: 1310, height: 426, label: "Week 2" },
        { src: "/images/case-studies/gf-cal-week3.webp", width: 1301, height: 391, label: "Week 3" },
        { src: "/images/case-studies/gf-cal-week4.webp", width: 1313, height: 736, label: "Week 4" },
      ],
    },
    glance: {
      closeRate: "~55%",
      lead: { value: "~55%", label: "close rate on a premium $5,000 ticket" },
      cardStats: [
        { value: "~55%", label: "Close rate" },
        { value: "$5,000", label: "Avg job size" },
        { value: "~$2k", label: "Monthly ad spend" },
      ],
    },
  },
];

/** Page-level framing for the hero. Ratios and constants only. */
export const CASE_STUDY_TOTALS = {
  markets: 3,
  closeRateRange: "50 to 70%",
  qualified: "100%",
  perMarket: 1,
} as const;

export function getCaseStudy(slug: string) {
  return CASE_STUDIES.find((c) => c.slug === slug);
}
