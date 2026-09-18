/**
 * Client case studies. Single source of truth for /case-studies and for every
 * proof block on the homepage that quotes these numbers, so the two pages can
 * never drift apart.
 *
 * Every figure here comes from the September 2026 client case study document.
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
  owner: string;
  /** How the owner is referred to in running copy. */
  ownerFirst: string;
  market: string;
  marketShort: string;
  /** Two or three words for the corner of a compact card. */
  marketTag: string;
  state: string;
  period: string;
  periodShort: string;
  logo: { src: string; width: number; height: number; dark?: boolean };
  /** One line that frames the whole study. */
  headline: string;
  /** Eyebrow shown over the results grid. */
  resultsLabel: string;
  /** Optional callout shown right under the header. */
  callout?: string;
  context: string[];
  stats: Stat[];
  statsNote: string;
  /** Trailing note under the stats, e.g. lifetime totals. */
  sinceNote?: string;
  why: { title: string; body: string[] };
  /** Direct quote from the owner, if we have one. */
  quote?: { text: string; attribution: string; stat?: string };
  /** Reported feedback when there is no verbatim quote. Never shown in quotation marks. */
  noticed?: { title: string; body: string[] };
  owner_photo?: { src: string; width: number; height: number; caption: string };
  media?: { src: string; width: number; height: number; caption: string; title: string; body: string[] };
  calendar: {
    title: string;
    range: string;
    legend: string;
    shots: CalendarShot[];
  };
  /** Numbers used on the homepage cards and the at-a-glance table. */
  glance: {
    appointments: string;
    closeRate: string;
    closedJobs: string;
    revenue?: string;
    /** The one number to lead with on a compact card. */
    lead: { value: string; label: string };
  };
};

export const CASE_STUDIES: CaseStudy[] = [
  {
    slug: "clean-floor-coatings",
    order: 1,
    company: "Clean Floor Coatings",
    shortName: "Clean Floor Coatings",
    owner: "Phil Adikes",
    ownerFirst: "Phil",
    market: "Myrtle Beach metro, South Carolina",
    marketShort: "Myrtle Beach, SC",
    marketTag: "Myrtle Beach, SC",
    state: "SC",
    period: "September 1 to 17, 2026",
    periodShort: "Sep 1 to 17, 2026",
    logo: { src: "/images/clients/clean-floor-coatings.png", width: 800, height: 366 },
    headline: "13 closed jobs in the first 17 days, in one of the most crowded coating markets in the Southeast.",
    resultsLabel: "Results, September 1 to 17, 2026",
    callout:
      "Everything on this page happened in the first 17 days of the campaign. We launched Phil's ads on September 1, 2026.",
    context: [
      "Phil Adikes owns Clean Floor Coatings, along with PaverSpa, in the Myrtle Beach metro area of South Carolina. The Myrtle Beach coating space is extremely competitive, with both local operators and national franchises advertising heavily to the same homeowners.",
      "It is also our most recent launch, which is why we lead with it. Every number below is from the first 17 days, so it reflects exactly what a fresh campaign looks like in a crowded market.",
    ],
    stats: [
      { value: "$1,500", label: "Ad spend" },
      { value: "27", label: "Appointments booked" },
      { value: "19", label: "Appointments shown so far" },
      { value: "13", label: "Closed jobs so far", hero: true },
      { value: "~70%", label: "Close rate on shown appointments" },
      { value: "8", label: "Appointments still upcoming" },
    ],
    statsNote:
      "Close rate is calculated on the 19 appointments that have taken place. Eight more are scheduled and not yet reflected in the closed job count.",
    why: {
      title: "Why it worked",
      body: [
        "Phil is in one of the more crowded coating markets in the Southeast, and two things set him apart. First, he and his team run a very good sales process. Second, he uses very good materials at a price that makes sense for homeowners.",
        "Our job was to put the right homeowners in front of that process. The 70% close rate is the combination of qualified appointments on our end and a strong estimate on his.",
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
      caption: "Phil Adikes, owner of Clean Floor Coatings",
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
      title: "Phil's estimate calendar",
      range: "August 30 to September 19, 2026",
      legend: "Every blue event is an appointment booked by Appointly. Struck through events are cancellations.",
      shots: [
        { src: "/images/case-studies/cfc-cal-week1.webp", width: 1447, height: 414, label: "Week of August 30 to September 5" },
        { src: "/images/case-studies/cfc-cal-week2.webp", width: 1410, height: 486, label: "Week of September 6 to 12" },
        { src: "/images/case-studies/cfc-cal-week3.webp", width: 1445, height: 548, label: "Week of September 13 to 19" },
      ],
    },
    glance: {
      appointments: "27",
      closeRate: "~70%",
      closedJobs: "13 so far, 8 upcoming",
      lead: { value: "~70%", label: "close rate in the first 17 days" },
    },
  },
  {
    slug: "afab-services",
    order: 2,
    company: "AFAB Services",
    shortName: "AFAB Services",
    owner: "Mark Tardiff",
    ownerFirst: "Mark",
    market: "Port St. Lucie metro, Florida",
    marketShort: "Port St. Lucie, FL",
    marketTag: "Port St. Lucie, FL",
    state: "FL",
    period: "June 2026",
    periodShort: "June 2026",
    logo: { src: "/images/clients/afab-services.png", width: 364, height: 222, dark: true },
    headline: "$35,000 in closed floor coating revenue in one month, in one of the fastest growing markets in the country.",
    resultsLabel: "Results, June 2026",
    context: [
      "Mark Tardiff owns AFAB Services in Port St. Lucie, Florida, and serves the metro area around it. He is our most consistent client. Port St. Lucie is one of the fastest growing markets in the country and, like most of Florida, one of the most competitive for floor coating. It has been a great market for him and for us.",
      "When we started, Mark was running a busy home improvement company that never slows down. He had a profitable floor coating business sitting right there and no time to actually sell it. Since we began booking his calendar, he has shifted to doing mostly floor coating, because that is where he makes the most money and because the appointments keep coming.",
    ],
    stats: [
      { value: "20", label: "Appointments booked" },
      { value: "~50%", label: "Close rate" },
      { value: "10", label: "Closed jobs", hero: true },
      { value: "$3,500", label: "Average job size" },
      { value: "$35,000", label: "Closed revenue", hero: true },
    ],
    statsNote:
      "June is Mark's strongest month to date. Closed jobs reflect Mark's approximately 50% close rate on the appointments we book. Revenue is closed jobs multiplied by his average job size.",
    sinceNote:
      "Since mid May 2026: 75 appointments booked, 36 closed jobs, and roughly $126,000 in closed revenue from Appointly appointments, at a pace of about 19 appointments a month.",
    why: {
      title: "What Mark says",
      body: [
        "Now we send Mark homeowners who are mostly ready to go. He shows up, gives the estimate, chats, sends the proposal. The jobs pile in.",
        "The consistent feedback from Mark is the same thing Phil noticed: it is much easier to close a homeowner who has already been vetted and educated. That only happens because of our process. Before anything is booked, every homeowner gets a phone call and an in depth conversation about their floor coating needs, the options available, and what they want to spend. By the time Mark arrives, the homeowner knows what they want and is ready to talk numbers.",
      ],
    },
    quote: {
      text: "You've already paved the ground. I just go in and sweep it up.",
      attribution: "Mark Tardiff, AFAB Services, Port St. Lucie, FL",
      stat: "$6k job, closed on the 2nd appointment",
    },
    owner_photo: {
      src: "/images/proof/mark-afab.webp",
      width: 1080,
      height: 1350,
      caption: "Mark Tardiff, owner of AFAB Services",
    },
    calendar: {
      title: "Mark's estimate calendar",
      range: "June 2026",
      legend: "Every blue event is an appointment booked by Appointly. Twenty appointments in the month.",
      shots: [
        { src: "/images/case-studies/afab-cal-june.webp", width: 1444, height: 708, label: "June 2026" },
      ],
    },
    glance: {
      appointments: "20",
      closeRate: "~50%",
      closedJobs: "10",
      revenue: "$35,000",
      lead: { value: "$35k", label: "closed revenue in one month" },
    },
  },
  {
    slug: "garage-force-inland-northwest",
    order: 3,
    company: "Garage Force of the Inland Northwest",
    shortName: "Garage Force",
    owner: "Eric and Shani Hoke",
    ownerFirst: "Eric",
    market: "Spokane and Coeur d'Alene, Inland Northwest",
    marketShort: "Spokane and Coeur d'Alene",
    marketTag: "Inland Northwest",
    state: "WA and ID",
    period: "August 17 to September 12, 2026",
    periodShort: "Aug 17 to Sep 12, 2026",
    logo: { src: "/images/clients/garage-force.png", width: 1000, height: 181 },
    headline: "$50,000 in closed revenue from 18 appointments, selling a premium polyurea system at a premium price.",
    resultsLabel: "Results, August 17 to September 12, 2026",
    context: [
      "Eric and Shani own Garage Force of the Inland Northwest, a Garage Force franchise covering Spokane, eastern Washington, and northern Idaho, including Coeur d'Alene. They offer a more premium product than any of their local competitors, and than most of our clients: a full polyurea system, priced accordingly, and sold by the owners themselves, who meet every homeowner in person.",
      "That changes how we book for them. A premium price means we only send the highest quality appointments: the homeowners most likely to close and able to pay for the product. The result is fewer total appointments than a volume client would see, but a close rate that stays high and a lot of revenue per appointment. For a company selling a premium product, this is the model that protects the estimator's time.",
    ],
    stats: [
      { value: "~$2,000", label: "Ad spend" },
      { value: "18", label: "Appointments booked" },
      { value: "~55%", label: "Close rate" },
      { value: "10", label: "Closed jobs so far", hero: true },
      { value: "$5,000", label: "Average job size" },
      { value: "$50,000", label: "Closed revenue", hero: true },
    ],
    statsNote:
      "Four weeks of appointments at roughly $500 a week in ad spend. Ten of the 18 appointments have closed so far, with the remainder still in progress. Revenue is closed jobs multiplied by the average job size.",
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
      caption: "Eric Hoke, owner of Garage Force of the Inland Northwest",
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
      title: "Eric's estimate calendar",
      range: "August 16 to September 12, 2026",
      legend: "Every blue event is an appointment booked by Appointly. Struck through events are cancellations and are not counted.",
      shots: [
        { src: "/images/case-studies/gf-cal-week1.webp", width: 1314, height: 476, label: "Week of August 16 to 22" },
        { src: "/images/case-studies/gf-cal-week2.webp", width: 1310, height: 426, label: "Week of August 23 to 29" },
        { src: "/images/case-studies/gf-cal-week3.webp", width: 1301, height: 391, label: "Week of August 30 to September 5" },
        { src: "/images/case-studies/gf-cal-week4.webp", width: 1313, height: 736, label: "Week of September 6 to 12" },
      ],
    },
    glance: {
      appointments: "18",
      closeRate: "~55%",
      closedJobs: "10 so far",
      revenue: "$50,000",
      lead: { value: "$50k", label: "closed revenue in four weeks" },
    },
  },
];

/** Straight sums across the three snapshots, for the page hero. */
export const CASE_STUDY_TOTALS = {
  markets: 3,
  appointments: 65,
  closedJobs: 33,
  closeRateRange: "50 to 70%",
  closedRevenue: "$85k+",
} as const;

export function getCaseStudy(slug: string) {
  return CASE_STUDIES.find((c) => c.slug === slug);
}
