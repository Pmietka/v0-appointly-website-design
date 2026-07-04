import type { Metadata, Viewport } from "next";

import ApplyClient from "./apply-client";
import "../home.css";
import "../lander/lander.css";
import "./apply.css";

export const viewport: Viewport = {
  themeColor: "#fafafa",
};

// Paid landing page for cold traffic, so keep it out of the index (same as
// /lander). Follow is left on so link equity still flows to /privacy etc.
export const metadata: Metadata = {
  title: "Appointly Solutions | Apply to work with us",
  description:
    "We generate, qualify, and book exclusive floor coating estimates straight onto your calendar. You only pay when a qualified homeowner shows. Apply to work with us.",
  robots: { index: false, follow: true },
};

export default function ApplyPage() {
  return <ApplyClient />;
}
