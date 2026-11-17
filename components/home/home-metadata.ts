import type { Metadata, Viewport } from "next";

// Keep the deck-scroll theme color (viewport meta is added by Next by default).
export const HOME_VIEWPORT: Viewport = {
  themeColor: "#fafafa",
};

export const HOME_METADATA: Metadata = {
  title: "Booked Floor Coating Jobs for Contractors | Appointly Solutions",
  description:
    "Appointly Solutions is a pay per appointment Meta ads agency that books estimates for garage floor coating and concrete coating contractors.",
  alternates: {
    canonical: "https://getappointly.co/",
  },
  openGraph: {
    title: "Booked Floor Coating Jobs for Contractors | Appointly Solutions",
    description:
      "Appointly Solutions is a pay per appointment Meta ads agency that books estimates for garage floor coating and concrete coating contractors.",
    url: "https://getappointly.co/",
    siteName: "Appointly Solutions",
    type: "website",
    images: [
      {
        url: "https://getappointly.co/images/og-home.png",
        width: 1200,
        height: 630,
        alt: "Appointly Solutions. More booked jobs. Less chasing leads.",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Booked Floor Coating Jobs for Contractors | Appointly Solutions",
    description:
      "Appointly Solutions is a pay per appointment Meta ads agency that books estimates for garage floor coating and concrete coating contractors.",
    images: ["https://getappointly.co/images/og-home.png"],
  },
};
