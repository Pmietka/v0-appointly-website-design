type Resource = {
  href: string;
  title: string;
  description: string;
};

export const homepageResources: Resource[] = [
  {
    href: "/floor-coating-contractor-marketing",
    title: "Floor Coating Contractor Marketing",
    description:
      "See how the appointment model is built for the featured niche — epoxy and garage floor coating contractors.",
  },
  {
    href: "/insulation-contractor-leads",
    title: "Insulation Contractor Appointments",
    description:
      "Explore the insulation niche — a seasonal secondary service with the same pay-for-performance appointment model.",
  },
  {
    href: "/appointment-setting-for-contractors",
    title: "How Appointment Setting Works",
    description:
      "Understand the full workflow from prospect qualification to a booked estimate on your calendar.",
  },
];

export const commercialResources: Record<string, Resource[]> = {
  "insulation-contractor-leads": [
    {
      href: "/exclusive-insulation-leads",
      title: "Exclusive Insulation Appointments",
      description:
        "Understand how one-contractor-per-market positioning supports close rate and appointment quality.",
    },
    {
      href: "/pay-per-lead-insulation",
      title: "Pay-For-Performance Model",
      description:
        "Compare the performance model against retainer-style marketing and how the risk shifts.",
    },
    {
      href: "/blog/pay-per-lead-insulation-contractor-leads",
      title: "Performance Model Benchmarks for Contractors",
      description:
        "Read supporting blog content about appointment models, ROI, and contractor expectations.",
    },
  ],
  "exclusive-insulation-leads": [
    {
      href: "/insulation-contractor-leads",
      title: "Insulation Contractor Appointments",
      description:
        "See how exclusivity fits into the broader Appointly appointment delivery model.",
    },
    {
      href: "/appointment-setting-for-contractors",
      title: "Booked Estimate Workflows",
      description:
        "Connect appointment ownership with response speed and booking execution.",
    },
    {
      href: "/blog/exclusive-insulation-leads-no-monthly-fee",
      title: "Why Contractors Prefer Exclusive Appointments",
      description:
        "Read a blog breakdown of exclusivity, ownership, and why shared prospects create noise.",
    },
  ],
  "pay-per-lead-insulation": [
    {
      href: "/insulation-marketing-agency",
      title: "Agency Alternative",
      description:
        "Compare pay-for-performance economics against the traditional monthly retainer model.",
    },
    {
      href: "/blog/how-much-should-insulation-contractors-pay-per-lead",
      title: "What to Expect from a Pay-For-Performance Model",
      description:
        "Use supporting context to evaluate whether your current acquisition approach is working.",
    },
    {
      href: "/blog/contractor-lead-generation-no-retainer",
      title: "Appointment Booking Without a Retainer",
      description:
        "See how contractors think about avoiding fixed monthly spend during slower periods.",
    },
  ],
  "insulation-marketing-agency": [
    {
      href: "/pay-per-lead-insulation",
      title: "Pay-For-Performance Model",
      description:
        "Jump to the performance model page if you are comparing appointment-based alternatives.",
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
        "See how faster channels and performance models fit contractors who need appointment flow now.",
    },
  ],
  "appointment-setting-for-contractors": [
    {
      href: "/floor-coating-contractor-marketing",
      title: "Featured Niche: Floor Coatings",
      description:
        "See the appointment model applied to the featured niche — epoxy and garage floor coating contractors.",
    },
    {
      href: "/blog/get-insulation-jobs-without-word-of-mouth",
      title: "Replacing Referral Gaps",
      description:
        "Read how contractors can create more dependable estimate opportunities beyond referrals.",
    },
    {
      href: "/blog/facebook-ads-for-insulation-contractors",
      title: "Meta Ads for Contractors",
      description:
        "See one of the traffic channels that feeds the booked-appointment process.",
    },
  ],
  "spray-foam-contractor-leads": [
    {
      href: "/blog/spray-foam-lead-generation-pay-per-lead",
      title: "Spray Foam Appointment Benchmarks",
      description:
        "Read seasonality and demand guidance specific to spray foam contractors.",
    },
    {
      href: "/blog/get-more-spray-foam-jobs-fast",
      title: "How To Get Spray Foam Jobs Fast",
      description:
        "See supporting content for contractors who need appointment volume quickly, not eventually.",
    },
    {
      href: "/pay-per-lead-insulation",
      title: "Pay-For-Performance Pricing Model",
      description:
        "Compare spray foam economics against the broader Appointly pay-for-performance model.",
    },
  ],
  "floor-coating-contractor-marketing": [
    {
      href: "/epoxy-floor-coating-appointments",
      title: "Epoxy Floor Coating Appointments",
      description:
        "See how the appointment model is built specifically for epoxy floor coating contractors and homeowner targeting.",
    },
    {
      href: "/garage-floor-coating-appointments",
      title: "Garage Floor Coating Appointments",
      description:
        "Explore garage-specific homeowner targeting and how consistent appointment volume keeps crews productive.",
    },
    {
      href: "/exclusive-floor-coating-appointments",
      title: "Exclusive Floor Coating Territory",
      description:
        "Understand why working with one contractor per market produces stronger close rates and cleaner conversations.",
    },
    {
      href: "/floor-coating-marketing-agency",
      title: "Performance vs Retainer Model",
      description:
        "Compare the pay-for-performance model against traditional retainer agencies for floor coating marketing.",
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

  if (
    normalized.includes("floor-coating") ||
    normalized.includes("epoxy") ||
    normalized.includes("garage-floor")
  ) {
    return commercialResources["floor-coating-contractor-marketing"];
  }

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
        title: "Small Market Appointment Generation",
        description:
          "Explore where local SEO and review velocity matter most in smaller service areas.",
      },
      {
        href: "/floor-coating-contractor-marketing",
        title: "Floor Coating Contractor Marketing",
        description:
          "See how profile optimization feeds appointment volume in the featured niche.",
      },
    ];
  }

  if (normalized.includes("agency") || normalized.includes("retainer")) {
    return commercialResources["insulation-marketing-agency"];
  }

  if (
    normalized.includes("pay-per-lead") ||
    normalized.includes("cost") ||
    normalized.includes("performance")
  ) {
    return commercialResources["pay-per-lead-insulation"];
  }

  return commercialResources["insulation-contractor-leads"];
}
