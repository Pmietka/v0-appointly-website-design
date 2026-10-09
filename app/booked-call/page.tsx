import type { Metadata, Viewport } from "next";

import { LanderContent } from "@/app/lander/lander-content";
import { BookedCallPixel } from "./booked-call-pixel";
import "../home.css";
import "../lander/lander.css";
import "../sales.css";

export const viewport: Viewport = {
  themeColor: "#fafafa",
};

export const metadata: Metadata = {
  title: "Appointly Solutions | Watch this before our call",
  description:
    "Your call is booked. Watch the short video, see exactly how our process works, and hear it straight from the contractors we book jobs for.",
  robots: { index: false, follow: true },
  alternates: {
    canonical: "https://getappointly.co/booked-call",
  },
  openGraph: {
    title: "Appointly Solutions | Watch this before our call",
    description:
      "Your call is booked. See how our process works and hear it from the contractors we book jobs for.",
    url: "https://getappointly.co/booked-call",
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
};

/* Same content as /lander (app/lander/lander-content.tsx), plus the pixel:
   it fires Meta PageView + the "Schedule" conversion event on load, since a
   lead reaches this page only after booking a call. */
export default function BookedCallPage() {
  return <LanderContent pixel={<BookedCallPixel />} />;
}
