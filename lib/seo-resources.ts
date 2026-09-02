type Resource = {
  href: string;
  title: string;
  description: string;
};

// Canonical service page paths. Keep these in one place so every internal
// link, breadcrumb, and sitemap entry agrees on the URL.
export const servicePages = {
  floorCoatingLeads: "/floor-coating-leads",
  epoxyFlooringLeads: "/epoxy-flooring-leads",
  exclusive: "/exclusive-floor-coating-leads",
  pricing: "/pricing",
  agencyAlternative: "/floor-coating-marketing-agency-alternative",
  appointmentSetting: "/appointment-setting-for-contractors",
  smallMarkets: "/floor-coating-leads-small-markets",
} as const;

const blog = (slug: string) => `/blog/${slug}`;

export const homepageResources: Resource[] = [
  {
    href: servicePages.floorCoatingLeads,
    title: "Floor Coating Leads, Booked as Estimates",
    description:
      "Start with the core page on booked floor coating estimates and how the Appointly Model fills your calendar.",
  },
  {
    href: servicePages.epoxyFlooringLeads,
    title: "Epoxy Flooring Leads",
    description:
      "See the service framed for epoxy, polyaspartic, and concrete coating specialists who want booked estimates, not raw leads.",
  },
  {
    href: servicePages.smallMarkets,
    title: "Appointments for Small Markets",
    description:
      "Explore how the model fits contractors serving smaller metros and regional service areas.",
  },
];

export const commercialResources: Record<string, Resource[]> = {
  "floor-coating-leads": [
    {
      href: servicePages.exclusive,
      title: "Exclusive Floor Coating Leads",
      description:
        "Understand how one-contractor-per-market positioning supports margin and close rate.",
    },
    {
      href: servicePages.pricing,
      title: "Pricing",
      description:
        "See how paying per booked appointment compares to monthly-fee agencies.",
    },
    {
      href: blog("what-is-a-booked-floor-coating-estimate-worth"),
      title: "What a Booked Estimate Is Worth",
      description:
        "Run the numbers on job value, close rate, and what you can afford to invest per booked estimate.",
    },
    {
      href: blog("floor-coating-pricing-and-margins"),
      title: "Floor Coating Pricing and Margins",
      description:
        "Day-rate math and gross margin examples for a two-person coating crew.",
    },
    {
      href: blog("speed-to-lead-wins-floor-coating-jobs"),
      title: "Why Speed to Lead Wins the Job",
      description:
        "What slow follow-up costs coating contractors and how instant contact wins the jobs you paid for.",
    },
    {
      href: blog("garage-floor-coating-leads-cost-and-sources"),
      title: "Garage Floor Coating Leads: Cost and Sources",
      description:
        "Compare shared lead marketplaces, your own ads, and booked appointments on real cost per job.",
    },
  ],
  "exclusive-floor-coating-leads": [
    {
      href: servicePages.floorCoatingLeads,
      title: "Floor Coating Leads",
      description:
        "See how exclusivity fits into the broader Appointly booked-estimate model.",
    },
    {
      href: servicePages.appointmentSetting,
      title: "Appointment Setting for Contractors",
      description:
        "Connect market exclusivity with speed-to-lead and appointment-setting execution.",
    },
    {
      href: blog("exclusive-floor-coating-estimates"),
      title: "Why Contractors Want Exclusivity",
      description:
        "Read a breakdown of exclusivity, ownership, and why shared leads create noise.",
    },
    {
      href: blog("garage-floor-coating-leads-cost-and-sources"),
      title: "Shared Leads vs Booked Estimates",
      description:
        "What garage floor coating leads cost from marketplaces and why shared leads close so rarely.",
    },
  ],
  pricing: [
    {
      href: servicePages.agencyAlternative,
      title: "Agency Alternative",
      description:
        "Compare the Appointly Model against the traditional monthly-fee agency.",
    },
    {
      href: blog("what-is-a-booked-floor-coating-estimate-worth"),
      title: "What Should an Appointment Cost?",
      description:
        "Use supporting benchmarks to evaluate whether your appointment costs are realistic.",
    },
    {
      href: blog("floor-coating-pricing-and-margins"),
      title: "Floor Coating Pricing and Margins",
      description:
        "See what a garage floor job is worth and the margin that funds appointment generation.",
    },
    {
      href: blog("done-for-you-floor-coating-lead-generation"),
      title: "Done-For-You Lead Generation",
      description:
        "See how contractors think about tying marketing spend to appointments that actually book.",
    },
  ],
  "floor-coating-marketing-agency-alternative": [
    {
      href: servicePages.pricing,
      title: "Pricing",
      description:
        "Jump to the pricing page if you are comparing performance-based alternatives.",
    },
    {
      href: blog("why-floor-coating-contractors-leave-marketing-agencies"),
      title: "Why Contractors Are Leaving Agencies",
      description:
        "Read the supporting article behind the agency-alternative angle on this page.",
    },
    {
      href: blog("get-floor-coating-jobs-without-waiting-months"),
      title: "More Jobs Without Waiting Months",
      description:
        "See how faster channels and a results-based model fit contractors who need booked estimates now.",
    },
    {
      href: blog("floor-coating-marketing-booked-estimates"),
      title: "Marketing That Books Estimates",
      description:
        "How to measure floor coating marketing on booked estimates instead of activity.",
    },
  ],
  "appointment-setting-for-contractors": [
    {
      href: servicePages.floorCoatingLeads,
      title: "Upstream Lead Flow",
      description:
        "Understand the Meta ad lead flow behind better appointment-setting results.",
    },
    {
      href: blog("speed-to-lead-wins-floor-coating-jobs"),
      title: "Speed to Lead Wins the Job",
      description:
        "Why the first coating contractor to call back gets the estimate, with the numbers behind it.",
    },
    {
      href: blog("how-to-close-more-floor-coating-estimates"),
      title: "Close More Floor Coating Estimates",
      description:
        "A repeatable in-garage sales process for the appointments we book for you.",
    },
    {
      href: blog("meta-ads-for-floor-coating-contractors"),
      title: "Meta Ads for Coating Contractors",
      description:
        "See the traffic channel that feeds the booked-estimate process.",
    },
  ],
  "epoxy-flooring-leads": [
    {
      href: blog("epoxy-floor-coating-lead-generation"),
      title: "Epoxy Floor Coating Lead Generation",
      description:
        "Read cost, seasonality, and ROI guidance specific to epoxy and concrete coating work.",
    },
    {
      href: blog("polyaspartic-vs-epoxy-garage-floors"),
      title: "Polyaspartic vs Epoxy",
      description:
        "What to quote, when to recommend each system, and how to sell the premium option.",
    },
    {
      href: blog("get-more-epoxy-floor-coating-jobs-fast"),
      title: "How To Get Epoxy Jobs Fast",
      description:
        "See supporting content for contractors who need booked estimates quickly, not eventually.",
    },
    {
      href: servicePages.pricing,
      title: "Pricing",
      description:
        "Compare coating job economics against the Appointly pricing model.",
    },
  ],
  "floor-coating-leads-small-markets": [
    {
      href: blog("google-reviews-floor-coating-contractors"),
      title: "Reviews and Your Google Profile",
      description:
        "Use local trust signals that matter most in lower-competition markets.",
    },
    {
      href: blog("best-time-of-year-for-floor-coating-jobs"),
      title: "Seasonality in Floor Coating",
      description:
        "Plan crew capacity around the demand curve when market size makes every appointment count.",
    },
    {
      href: blog("how-many-floor-coating-jobs-can-one-crew-do"),
      title: "Crew Capacity Math",
      description:
        "How many garage floors one crew can install per month, and how many estimates that takes.",
    },
    {
      href: servicePages.exclusive,
      title: "Exclusive Market Positioning",
      description:
        "Understand why exclusivity is especially important when market size is limited.",
    },
  ],
};

export function getCommercialResources(key: string) {
  return commercialResources[key] ?? [];
}

// Maps a blog post cluster (frontmatter `cluster:`) to the commercial pages
// that best match the reader's next step.
const clusterResources: Record<string, Resource[]> = {
  economics: [
    {
      href: servicePages.pricing,
      title: "Pricing",
      description:
        "See how pay-per-appointment pricing works and what a booked estimate costs.",
    },
    {
      href: servicePages.floorCoatingLeads,
      title: "Floor Coating Leads, Booked for You",
      description:
        "The core service page: Meta ads, instant speed to lead, and estimates booked onto your calendar.",
    },
    {
      href: servicePages.exclusive,
      title: "Exclusive Floor Coating Leads",
      description:
        "One contractor per market, so every estimate we book is yours alone.",
    },
  ],
  "marketing-channels": [
    {
      href: servicePages.agencyAlternative,
      title: "Agency Alternative",
      description:
        "Compare monthly-fee agencies with a model where spend is tied to booked estimates.",
    },
    {
      href: servicePages.floorCoatingLeads,
      title: "Floor Coating Leads, Booked for You",
      description:
        "See how Meta ads and instant follow-up turn into booked estimates on your calendar.",
    },
    {
      href: servicePages.pricing,
      title: "Pricing",
      description:
        "What the per-appointment fee covers and what you pay per booked estimate.",
    },
  ],
  sales: [
    {
      href: servicePages.appointmentSetting,
      title: "Appointment Setting for Contractors",
      description:
        "How we contact every lead instantly and book the estimate so you just show up and quote.",
    },
    {
      href: servicePages.floorCoatingLeads,
      title: "Floor Coating Leads, Booked for You",
      description:
        "Fill the calendar first, then use these closing techniques on every estimate.",
    },
    {
      href: servicePages.exclusive,
      title: "Exclusive Floor Coating Leads",
      description:
        "Close rates go up when the homeowner is not comparing three other quotes from the same lead.",
    },
  ],
  operations: [
    {
      href: servicePages.smallMarkets,
      title: "Booked Estimates for Small Markets",
      description:
        "How the model fits contractors in smaller metros and regional service areas.",
    },
    {
      href: servicePages.epoxyFlooringLeads,
      title: "Epoxy Flooring Leads",
      description:
        "Booked estimates for epoxy, polyaspartic, and concrete coating specialists.",
    },
    {
      href: "/how-it-works",
      title: "How The System Works",
      description:
        "See how Meta ads, speed to lead, and booked estimates fit into the full process.",
    },
  ],
};

export function getBlogCommercialResources(cluster: string): Resource[] {
  return clusterResources[cluster] ?? clusterResources.economics;
}
