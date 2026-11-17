import type { Metadata } from "next";

import { CONNECT_METADATA, CONNECT_VIEWPORT, ConnectLanding } from "@/app/connect/connect-landing";
import type { ConnectHero } from "@/app/connect/apply-client";

/* Meta ad landing page for the "stop paying for cheap leads" ad (booked in
   person estimates, pay per qualified appointment). The /connect page (survey
   funnel, tracking, every section) with an ad matched hero. noindex, follow;
   canonical to the homepage; not in the sitemap or nav. */
export const viewport = CONNECT_VIEWPORT;
export const metadata: Metadata = {
  ...CONNECT_METADATA,
  robots: { index: false, follow: true },
  alternates: { canonical: "https://getappointly.co/" },
};

// The strategy calendar books 30 minute slots, so the CTA names no length.
const HERO: ConnectHero = {
  eyebrow: "For floor coating owners tired of cheap leads",
  headline: (
    <>
      Stop paying for cheap leads. We book floor coating estimates.{" "}
      <span className="hl">You just show up.</span>
    </>
  ),
  subheadline:
    "We find the jobs you actually want, call every homeowner within minutes, and book only serious buyers onto your calendar. You pay per qualified estimate appointment, never per lead, and if one isn't a real fit you don't pay for it. No retainer.",
  ctaText: "Book My Call",
  note: "Already paying an agency? We'll show you what they're missing.",
};

export default function BookedEstimatesPage() {
  // The ad promises the call is with Patrick, so step 1 of "How it works"
  // does not name Jacob here.
  return <ConnectLanding hero={HERO} firstStepWho="You + us" />;
}
