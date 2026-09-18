/**
 * Approved client testimonials, shared by the homepage and /case-studies.
 * Only real, approved quotes belong here. Photo cards use a real client image
 * from /public/images/proof; quote-only cards render with no avatar.
 */
export type Testimonial = {
  name: string;
  who?: string;
  where?: string;
  /** Short proof line shown as a pill, e.g. "8 new jobs in month two". */
  stat?: string;
  quote: string;
  photo?: string;
  /** Square avatar crop for compact quote rows. Falls back to photo. */
  avatar?: string;
};

/* Photo-backed testimonials. These are the featured cards. */
export const FEATURED_TESTIMONIALS: Testimonial[] = [
  {
    name: "Mark T.",
    who: "AFAB Services",
    where: "Port St. Lucie, FL",
    stat: "$35k closed in one month",
    quote:
      "You've already paved the ground. I just go in and sweep it up. You guys are doing a great job.",
    photo: "/images/proof/mark-afab.webp",
  },
  {
    name: "Andre S.",
    who: "D&V maintenance",
    where: "Chicago, IL",
    stat: "8 new jobs in his second month",
    quote:
      "By the time I show up, they already know they want it. I'm just there to give the number.",
    photo: "/images/proof/andre.webp",
  },
  {
    name: "Carlos V.",
    who: "Diamond Group",
    where: "Portland, OR",
    stat: "1st appointment covered full onboarding cost",
    quote: "One job paid for everything. From there it just kept coming.",
    photo: "/images/proof/carlos-team.webp",
  },
  {
    name: "Dave",
    quote: "The appointments were already warmed up. I just showed up and closed.",
    photo: "/images/proof/dave.webp",
  },
];

/* Quote-only testimonials. Hard numbers first. */
export const QUOTE_TESTIMONIALS: Testimonial[] = [
  {
    name: "Nate",
    stat: "58% close rate",
    quote:
      "As you know, I track all my business data. After a slow first few weeks, over the last 2 months I'm at a 58% close rate from your appointments, which is about on par with my own warm leads. You just give me a lot more volume.",
  },
  {
    name: "Viktor",
    stat: "4 of first 7 closed",
    quote: "I closed 4 of my first 7 appointments.",
  },
  {
    name: "Jose",
    stat: "5 jobs with 8 days left",
    quote:
      "After closing 4 jobs the first month, I've got 2 more this month that will cross the line, and I'm already at 5 jobs with 8 days left.",
  },
  {
    name: "Max",
    quote: "My calendar is full. Hasn't been this way all year.",
  },
  {
    name: "Will",
    quote:
      "Yeah dude, I really don't have to do much. I show up, we do the estimate, and it usually goes really well. They're pretty warmed up.",
  },
  {
    name: "Sam",
    quote:
      "Besides a few people, pretty much everyone has been as good as you can get. We need to get more of them, because these are great.",
  },
  {
    name: "Kyle T.",
    quote:
      "Great. I'm closing one of them for sure, and the other one will close too, he might just take a couple weeks.",
  },
];

export const ALL_TESTIMONIALS: Testimonial[] = [...FEATURED_TESTIMONIALS, ...QUOTE_TESTIMONIALS];

/** Client logos we have permission to show. Order matters: most recent first. */
export type ClientLogo = {
  name: string;
  market: string;
  src: string;
  width: number;
  height: number;
  /** Logo file has its own dark background baked in. */
  dark?: boolean;
  href?: string;
};

export const CLIENT_LOGOS: ClientLogo[] = [
  {
    name: "Clean Floor Coatings",
    market: "Myrtle Beach, SC",
    src: "/images/clients/clean-floor-coatings.png",
    width: 800,
    height: 366,
    href: "/case-studies#clean-floor-coatings",
  },
  {
    name: "AFAB Services",
    market: "Port St. Lucie, FL",
    src: "/images/clients/afab-services.png",
    width: 364,
    height: 222,
    dark: true,
    href: "/case-studies#afab-services",
  },
  {
    name: "Garage Force of the Inland Northwest",
    market: "Spokane and Coeur d'Alene",
    src: "/images/clients/garage-force.png",
    width: 1000,
    height: 181,
    href: "/case-studies#garage-force-inland-northwest",
  },
];
