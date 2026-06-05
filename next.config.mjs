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
      // Responsive, vertically scrollable version of the deck for mobile.
      { source: "/deck-scroll", destination: "/deck-scroll/index.html" },
    ]
  },
}

export default nextConfig
