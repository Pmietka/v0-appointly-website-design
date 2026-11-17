import { HomeLanding } from "@/components/home/home-landing";
import type { HeroCopy } from "@/components/home/home-hero";
import { HOME_VIEWPORT, VARIANT_METADATA } from "@/components/home/home-metadata";

/* Meta ad landing page for the "ways floor coating companies get jobs" tier
   list ad (Facebook ads ranked 10/10). The homepage with an ad matched hero.
   noindex, canonical to /, not in the sitemap or nav. */
export const viewport = HOME_VIEWPORT;
export const metadata = VARIANT_METADATA;

const HERO: HeroCopy = {
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
  return <HomeLanding hero={HERO} survey />;
}
