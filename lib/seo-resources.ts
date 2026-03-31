type Resource = {
  href: string;
  title: string;
  description: string;
};

export const homepageResources: Resource[] = [
  {
    href: "/insulation-contractor-leads",
    title: "Insulation Contractor Leads",
    description:
      "Start with the core commercial page for qualified, exclusive insulation lead generation.",
  },
  {
    href: "/spray-foam-contractor-leads",
    title: "Spray Foam Contractor Leads",
    description:
      "See the offer framed for spray foam specialists who need narrower, higher-intent demand.",
  },
  {
    href: "/insulation-contractor-leads-small-markets",
    title: "Leads for Small Markets",
    description:
      "Explore how the model fits contractors serving smaller metros and regional service areas.",
  },
];

export const commercialResources: Record<string, Resource[]> = {
  "insulation-contractor-leads": [
    {
      href: "/exclusive-insulation-leads",
      title: "Exclusive Insulation Leads",
      description:
        "Understand how one-contractor-per-market positioning supports margin and close rate.",
    },
    {
      href: "/pay-per-lead-insulation",
      title: "Pay Per Lead Insulation",
      description:
        "Compare the pricing model against retainer-style marketing and agency risk.",
    },
    {
      href: "/blog/pay-per-lead-insulation-contractor-leads",
      title: "Cost Benchmarks for Pay Per Lead",
      description:
        "Read supporting blog content about cost structure, ROI, and contractor expectations.",
    },
  ],
  "exclusive-insulation-leads": [
    {
      href: "/insulation-contractor-leads",
      title: "Core Lead Generation Offer",
      description:
        "See how exclusivity fits into the broader Appointly lead delivery model.",
    },
    {
      href: "/appointment-setting-for-contractors",
      title: "Booked Estimate Workflows",
      description:
        "Connect lead ownership with response speed and appointment-setting execution.",
    },
    {
      href: "/blog/exclusive-insulation-leads-no-monthly-fee",
      title: "Why Contractors Prefer Exclusive Leads",
      description:
        "Read a blog breakdown of exclusivity, ownership, and why shared leads create noise.",
    },
  ],
  "pay-per-lead-insulation": [
    {
      href: "/insulation-marketing-agency",
      title: "Agency Alternative",
      description:
        "Compare pay-per-lead economics against the traditional monthly retainer model.",
    },
    {
      href: "/blog/how-much-should-insulation-contractors-pay-per-lead",
      title: "How Much Should Leads Cost?",
      description:
        "Use supporting benchmarks to evaluate whether your acquisition costs are realistic.",
    },
    {
      href: "/blog/contractor-lead-generation-no-retainer",
      title: "Lead Generation Without a Retainer",
      description:
        "See how contractors think about avoiding fixed monthly spend during slower periods.",
    },
  ],
  "insulation-marketing-agency": [
    {
      href: "/pay-per-lead-insulation",
      title: "Pay Per Lead Insulation",
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
        "See how faster channels and performance models fit contractors who need lead flow now.",
    },
  ],
  "appointment-setting-for-contractors": [
    {
      href: "/insulation-contractor-leads",
      title: "Upstream Lead Flow",
      description:
        "Understand the lead quality assumptions behind better appointment-setting results.",
    },
    {
      href: "/blog/get-insulation-jobs-without-word-of-mouth",
      title: "Replacing Referral Gaps",
      description:
        "Read how contractors can create more dependable estimate opportunities beyond referrals.",
    },
    {
      href: "/blog/facebook-ads-for-insulation-contractors",
      title: "Facebook Ads for Contractors",
      description:
        "See one of the traffic channels that feeds the booked-estimate process.",
    },
  ],
  "spray-foam-contractor-leads": [
    {
      href: "/blog/spray-foam-lead-generation-pay-per-lead",
      title: "Spray Foam Lead Benchmarks",
      description:
        "Read cost, seasonality, and ROI guidance specific to spray foam demand.",
    },
    {
      href: "/blog/get-more-spray-foam-jobs-fast",
      title: "How To Get Spray Foam Jobs Fast",
      description:
        "See supporting content for contractors who need demand quickly, not eventually.",
    },
    {
      href: "/pay-per-lead-insulation",
      title: "Pay Per Lead Pricing Model",
      description:
        "Compare spray foam economics against the broader Appointly pricing model.",
    },
  ],
  "insulation-contractor-leads-small-markets": [
    {
      href: "/blog/google-my-business-optimization-insulation-contractors",
      title: "GBP Strategy for Smaller Markets",
      description:
        "Use local visibility content that is especially relevant in lower-competition markets.",
    },
    {
      href: "/blog/spring-marketing-plan-insulation-contractors",
      title: "Seasonal Planning for Smaller Areas",
      description:
        "See how contractors can time campaigns when market size makes every lead count.",
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
          "See how Google Business Profile optimization and review growth fit into the full process.",
      },
      {
        href: "/insulation-contractor-leads-small-markets",
        title: "Small Market Lead Generation",
        description:
          "Explore where local SEO and review velocity matter most in smaller service areas.",
      },
      {
        href: "/insulation-contractor-leads",
        title: "Core Lead Generation Offer",
        description:
          "Return to the main commercial page for the overall Appointly offer and qualification standards.",
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
