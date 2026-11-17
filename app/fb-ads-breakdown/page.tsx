import type { Metadata } from "next";

import { CONNECT_METADATA, CONNECT_VIEWPORT, ConnectLanding } from "@/app/connect/connect-landing";
import type { ConnectHero } from "@/app/connect/apply-client";

/* Meta ad landing page for the "ways floor coating companies get jobs" tier
   list ad (Facebook ads ranked 10/10). The /connect page (survey funnel,
   tracking, every section) with an ad matched hero. noindex, follow;
   canonical to the homepage; not in the sitemap or nav. */
export const viewport = CONNECT_VIEWPORT;
export const metadata: Metadata = {
  ...CONNECT_METADATA,
  robots: { index: false, follow: true },
  alternates: { canonical: "https://getappointly.co/" },
};

const HERO: ConnectHero = {
  eyebrow: "Ranked 10/10 for getting floor coating jobs",
  headline: (
    <>
      Facebook ads are the 10/10. We run them and book the jobs.{" "}
      <span className="hl">You just show up.</span>
    </>
  ),
  subheadline:
    "Facebook ads are how the biggest floor coating companies scale, but they're hard to do right. On a quick call we'll break down exactly how we'd run yours. When you work with us, you fund ads at cost and pay per booked appointment. No setup fee, no retainer, no long term contract.",
  ctaText: "Get My Facebook Ads Breakdown",
};

export default function FbAdsBreakdownPage() {
  return <ConnectLanding hero={HERO} />;
}
