import type { Metadata, Viewport } from "next";

import { BookedCallContent } from "./booked-call-content";
import { BookedCallPixel } from "./booked-call-pixel";
import "../home.css";
import "../lander/lander.css";
import "../sales.css";
import "./booked-call.css";

export const viewport: Viewport = {
  themeColor: "#fafafa",
};

export const metadata: Metadata = {
  title: "Appointly Solutions | Watch this before our call",
  description:
    "Your call is booked. Watch the short video, see what we decide on the call and how you pay, and hear from the contractors we book for.",
  robots: { index: false, follow: true },
  alternates: {
    canonical: "https://getappointly.co/booked-call",
  },
  openGraph: {
    title: "Appointly Solutions | Watch this before our call",
    description:
      "Your call is booked. Watch the short video and hear from the contractors we book for.",
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

/* The short post booking page (booked-call-content.tsx), plus the pixel:
   it fires Meta PageView + the custom "B2BCallBooked" event on load, since a
   lead reaches this page only after booking a call. */
export default function BookedCallPage() {
  return <BookedCallContent pixel={<BookedCallPixel />} />;
}
