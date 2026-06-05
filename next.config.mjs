/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: true,
  },
  async rewrites() {
    return [
      // Serve the self-contained pitch deck (public/deck/index.html) at the
      // clean URL /deck in both dev and production.
      { source: "/deck", destination: "/deck/index.html" },
    ]
  },
  async redirects() {
    return [
      // /deck-scroll was promoted to the homepage. Permanent 301 so existing
      // cold-outreach links pointing at /deck-scroll keep working.
      { source: "/deck-scroll", destination: "/", statusCode: 301 },
    ]
  },
}

export default nextConfig
