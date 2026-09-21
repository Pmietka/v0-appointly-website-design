import type { Metadata, Viewport } from "next";

import ApplyClient from "./apply-client";
import "../home.css";
import "../lander/lander.css";
// Same stylesheet as /connect. Imported from there rather than copied so the
// two pages can never drift apart visually.
import "../connect/apply.css";

export const viewport: Viewport = {
  themeColor: "#fafafa",
};

// Paid landing page for cold traffic, so keep it out of the index (same as
// /lander). Follow is left on so link equity still flows to /privacy etc.
export const metadata: Metadata = {
  title: "Appointly Solutions | Apply to work with us",
  description:
    "We book floor coating estimates onto your calendar. We run the ads and you pay only when a qualified homeowner is booked. Apply to work with us.",
  robots: { index: false, follow: true },
  alternates: {
    canonical: "https://getappointly.co/connect-now",
  },
};

export default function ConnectNowPage() {
  return <ApplyClient />;
}
