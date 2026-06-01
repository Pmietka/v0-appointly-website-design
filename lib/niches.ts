export type NicheStatus = "featured" | "secondary" | "coming-soon";

export type NichePage = {
  href: string;
  label: string;
  description: string;
};

export type Niche = {
  slug: string;
  name: string;
  status: NicheStatus;
  blogTag: string;
  pages: NichePage[];
};

export const niches: Niche[] = [
  {
    slug: "floor-coatings",
    name: "Floor Coatings",
    status: "featured",
    blogTag: "floor-coatings",
    pages: [
      {
        href: "/floor-coating-contractor-marketing",
        label: "Floor Coating Appointments",
        description: "The full appointment-booking system for epoxy and garage floor coating contractors.",
      },
      {
        href: "/epoxy-floor-coating-appointments",
        label: "Epoxy Coatings",
        description: "Booked estimate appointments for epoxy floor coating specialists.",
      },
      {
        href: "/garage-floor-coating-appointments",
        label: "Garage Floor Coatings",
        description: "Appointment generation for garage floor coating installers.",
      },
      {
        href: "/exclusive-floor-coating-appointments",
        label: "Exclusive Market",
        description: "One contractor per market — your appointments are never shared.",
      },
      {
        href: "/floor-coating-marketing-agency",
        label: "Agency Alternative",
        description: "Pay-for-performance vs traditional marketing retainers for floor coating contractors.",
      },
    ],
  },
  {
    slug: "insulation",
    name: "Insulation",
    status: "secondary",
    blogTag: "insulation",
    pages: [
      {
        href: "/insulation-contractor-leads",
        label: "Insulation Appointments",
        description: "Booked estimate appointments for insulation contractors — a secondary seasonal niche.",
      },
      {
        href: "/exclusive-insulation-leads",
        label: "Exclusive Market",
        description: "One insulation contractor per market — your appointments, not shared.",
      },
      {
        href: "/spray-foam-contractor-leads",
        label: "Spray Foam",
        description: "Appointment booking for spray foam specialty contractors.",
      },
      {
        href: "/insulation-contractor-leads-small-markets",
        label: "Small Markets",
        description: "How the appointment model fits smaller metros and regional service areas.",
      },
      {
        href: "/insulation-marketing-agency",
        label: "Agency Alternative",
        description: "Pay-for-performance vs traditional agency retainers for insulation contractors.",
      },
    ],
  },
  {
    slug: "driveway-concrete",
    name: "Driveway & Concrete",
    status: "coming-soon",
    blogTag: "driveway-concrete",
    pages: [],
  },
  {
    slug: "painting",
    name: "Painting",
    status: "coming-soon",
    blogTag: "painting",
    pages: [],
  },
];

export const visibleNiches = niches.filter((n) => n.status !== "coming-soon");
export const featuredNiche = niches.find((n) => n.status === "featured")!;
export const secondaryNiches = niches.filter((n) => n.status === "secondary");
