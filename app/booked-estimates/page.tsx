import { HomeLanding } from "@/components/home/home-landing";
import type { HeroCopy } from "@/components/home/home-hero";
import { HOME_VIEWPORT, VARIANT_METADATA } from "@/components/home/home-metadata";

/* Meta ad landing page for the "stop paying for cheap leads" ad (booked in
   person estimates, pay per qualified appointment). The homepage with an ad
   matched hero. noindex, canonical to /, not in the sitemap or nav. */
export const viewport = HOME_VIEWPORT;
export const metadata = VARIANT_METADATA;

// The strategy calendar books 30 minute slots, so the CTA names no length.
const HERO: HeroCopy = {
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
  return (
    <HomeLanding
      hero={HERO}
      closingSub="Tell us how many jobs you want on your calendar each month. We handle the rest, from the ads to the booked appointment."
    />
  );
}
