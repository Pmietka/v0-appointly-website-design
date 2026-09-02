/** @type {import('next').NextConfig} */

// Old insulation-era URLs. Every page was rewritten for floor coating
// contractors, so the slugs were renamed to match. Keep these permanent
// redirects so old links, indexed URLs, and cold-outreach links keep working.
const legacyServiceRedirects = [
  ["/insulation-contractor-leads", "/floor-coating-leads"],
  ["/exclusive-insulation-leads", "/exclusive-floor-coating-leads"],
  ["/pay-per-lead-insulation", "/pricing"],
  ["/insulation-marketing-agency", "/floor-coating-marketing-agency-alternative"],
  ["/spray-foam-contractor-leads", "/epoxy-flooring-leads"],
  ["/insulation-contractor-leads-small-markets", "/floor-coating-leads-small-markets"],
]

const legacyBlogRedirects = [
  ["pay-per-lead-insulation-contractor-leads", "booked-floor-coating-estimates-vs-leads"],
  ["exclusive-insulation-leads-no-monthly-fee", "exclusive-floor-coating-estimates"],
  ["spray-foam-lead-generation-pay-per-lead", "epoxy-floor-coating-lead-generation"],
  ["get-more-insulation-jobs-without-seo-retainer", "get-floor-coating-jobs-without-waiting-months"],
  ["contractor-lead-generation-no-retainer", "done-for-you-floor-coating-lead-generation"],
  ["google-my-business-optimization-insulation-contractors", "google-reviews-floor-coating-contractors"],
  ["facebook-ads-for-insulation-contractors", "meta-ads-for-floor-coating-contractors"],
  ["insulation-contractor-marketing-guarantees-leads", "floor-coating-marketing-booked-estimates"],
  ["get-insulation-jobs-without-word-of-mouth", "floor-coating-jobs-without-word-of-mouth"],
  ["get-more-spray-foam-jobs-fast", "get-more-epoxy-floor-coating-jobs-fast"],
  ["why-insulation-contractors-ditching-seo-agencies", "why-floor-coating-contractors-leave-marketing-agencies"],
  ["nfc-review-cards-contractors-more-google-reviews", "nfc-review-cards-floor-coating-contractors"],
  ["insulation-contractor-digital-marketing-budget", "floor-coating-contractor-marketing-budget"],
  ["how-much-should-insulation-contractors-pay-per-lead", "what-is-a-booked-floor-coating-estimate-worth"],
  ["spring-marketing-plan-insulation-contractors", "spring-marketing-plan-floor-coating-contractors"],
]

const nextConfig = {
  async rewrites() {
    return [
      // Serve the self-contained pitch deck (public/deck/index.html) at the
      // clean URL /deck in both dev and production.
      { source: "/deck", destination: "/deck/index.html" },
    ]
  },
  async headers() {
    return [
      // The deck is a sales asset embedded on /how-it-works, not a page that
      // should rank on its own.
      {
        source: "/deck",
        headers: [{ key: "X-Robots-Tag", value: "noindex, follow" }],
      },
      {
        source: "/deck/:path*",
        headers: [{ key: "X-Robots-Tag", value: "noindex, follow" }],
      },
    ]
  },
  async redirects() {
    return [
      // /deck-scroll was promoted to the homepage. Permanent 301 so existing
      // cold-outreach links pointing at /deck-scroll keep working.
      { source: "/deck-scroll", destination: "/", statusCode: 301 },
      ...legacyServiceRedirects.map(([source, destination]) => ({
        source,
        destination,
        statusCode: 301,
      })),
      ...legacyBlogRedirects.map(([from, to]) => ({
        source: `/blog/${from}`,
        destination: `/blog/${to}`,
        statusCode: 301,
      })),
    ]
  },
}

export default nextConfig
