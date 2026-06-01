type Resource = {
  href: string;
  title: string;
  description: string;
};

export const homepageResources: Resource[] = [
  {
    href: "/insulation-contractor-leads",
    title: "Floor Coating Appointments",
    description:
      "Start with the core page on booked floor coating estimates and how the Appointly Model fills your calendar.",
  },
  {
    href: "/spray-foam-contractor-leads",
    title: "Epoxy & Concrete Coating Appointments",
    description:
      "See the service framed for epoxy and concrete coating specialists who want booked estimates, not raw leads.",
  },
  {
    href: "/insulation-contractor-leads-small-markets",
    title: "Appointments for Small Markets",
    description:
      "Explore how the model fits contractors serving smaller metros and regional service areas.",
  },
];

export const commercialResources: Record<string, Resource[]> = {
  "insulation-contractor-leads": [
    {
      href: "/exclusive-insulation-leads",
      title: "Exclusive Appointments",
      description:
        "Understand how one-contractor-per-market positioning supports margin and close rate.",
    },
    {
      href: "/pay-per-lead-insulation",
      title: "The Appointly Model",
      description:
        "See how the retainer plus per-appointment fee works compared to retainer-only agencies.",
    },
    {
      href: "/blog/pay-per-lead-insulation-contractor-leads",
      title: "What Booked Estimates Are Worth",
      description:
        "Read supporting blog content on appointment economics, ROI, and what to expect.",
    },
  ],
  "exclusive-insulation-leads": [
    {
      href: "/insulation-contractor-leads",
      title: "Core Appointments Page",
      description:
        "See how exclusivity fits into the broader Appointly booked-estimate model.",
    },
    {
      href: "/appointment-setting-for-contractors",
      title: "Booked Estimate Workflows",
      description:
        "Connect market exclusivity with speed-to-lead and appointment-setting execution.",
    },
    {
      href: "/blog/exclusive-insulation-leads-no-monthly-fee",
      title: "Why Contractors Want Exclusivity",
      description:
        "Read a breakdown of exclusivity, ownership, and why shared leads create noise.",
    },
  ],
  "pay-per-lead-insulation": [
    {
      href: "/insulation-marketing-agency",
      title: "Agency Alternative",
      description:
        "Compare the Appointly Model against the traditional monthly retainer-only agency.",
    },
    {
      href: "/blog/how-much-should-insulation-contractors-pay-per-lead",
      title: "What Should an Appointment Cost?",
      description:
        "Use supporting benchmarks to evaluate whether your appointment costs are realistic.",
    },
    {
      href: "/blog/contractor-lead-generation-no-retainer",
      title: "Budgeting for Booked Estimates",
      description:
        "See how contractors think about tying marketing spend to appointments that actually book.",
    },
  ],
  "insulation-marketing-agency": [
    {
      href: "/pay-per-lead-insulation",
      title: "The Appointly Model",
      description:
        "Jump to the pricing page if you are comparing performance-based alternatives.",
    },
    {
      href: "/blog/why-insulation-contractors-ditching-seo-agencies",
      title: "Why Contractors Are Leaving Agencies",
      description:
        "Read the supporting article behind the agency-alternative angle on this page.",
    },
    {
      href: "/blog/get-more-insulation-jobs-without-seo-retainer",
      title: "More Jobs Without an SEO Retainer",
      description:
        "See how faster channels and a results-based model fit contractors who need booked estimates now.",
    },
  ],
  "appointment-setting-for-contractors": [
    {
      href: "/insulation-contractor-leads",
      title: "Upstream Lead Flow",
      description:
        "Understand the Meta ad lead flow behind better appointment-setting results.",
    },
    {
      href: "/blog/get-insulation-jobs-without-word-of-mouth",
      title: "Replacing Referral Gaps",
      description:
        "Read how contractors can create more dependable booked estimates beyond referrals.",
    },
    {
      href: "/blog/facebook-ads-for-insulation-contractors",
      title: "Meta Ads for Contractors",
      description:
        "See the traffic channel that feeds the booked-estimate process.",
    },
  ],
  "spray-foam-contractor-leads": [
    {
      href: "/blog/spray-foam-lead-generation-pay-per-lead",
      title: "Epoxy & Concrete Coating Demand",
      description:
        "Read cost, seasonality, and ROI guidance specific to epoxy and concrete coating work.",
    },
    {
      href: "/blog/get-more-spray-foam-jobs-fast",
      title: "How To Get Coating Jobs Fast",
      description:
        "See supporting content for contractors who need booked estimates quickly, not eventually.",
    },
    {
      href: "/pay-per-lead-insulation",
      title: "The Appointly Model",
      description:
        "Compare coating job economics against the Appointly pricing model.",
    },
  ],
  "insulation-contractor-leads-small-markets": [
    {
      href: "/blog/google-my-business-optimization-insulation-contractors",
      title: "Local Visibility for Smaller Markets",
      description:
        "Use local visibility content that is especially relevant in lower-competition markets.",
    },
    {
      href: "/blog/spring-marketing-plan-insulation-contractors",
      title: "Seasonal Planning for Smaller Areas",
      description:
        "See how contractors can time campaigns when market size makes every appointment count.",
    },
    {
      href: "/exclusive-insulation-leads",
      title: "Exclusive Market Positioning",
      description:
        "Understand why exclusivity is especially important when market size is limited.",
    },
  ],
};

export function getCommercialResources(key: string) {
  return commercialResources[key] ?? [];
}

export function getBlogCommercialResources(slug: string): Resource[] {
  const normalized = slug.toLowerCase();

  if (normalized.includes("spray-foam")) {
    return commercialResources["spray-foam-contractor-leads"];
  }

  if (normalized.includes("google-my-business") || normalized.includes("nfc-review-cards")) {
    return [
      {
        href: "/how-it-works",
        title: "How The System Works",
        description:
          "See how Meta ads, speed-to-lead, and booked estimates fit into the full process.",
      },
      {
        href: "/insulation-contractor-leads-small-markets",
        title: "Small Market Appointments",
        description:
          "Explore where local visibility and review velocity matter most in smaller service areas.",
      },
      {
        href: "/insulation-contractor-leads",
        title: "Core Appointments Page",
        description:
          "Return to the main page for the overall Appointly Model and how we fill your calendar.",
      },
    ];
  }

  if (normalized.includes("agency") || normalized.includes("retainer")) {
    return commercialResources["insulation-marketing-agency"];
  }

  if (normalized.includes("pay-per-lead") || normalized.includes("cost")) {
    return commercialResources["pay-per-lead-insulation"];
  }

  return commercialResources["insulation-contractor-leads"];
}
