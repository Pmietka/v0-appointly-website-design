import type { Metadata } from "next";

import { Navbar } from "@/components/navbar";

export const metadata: Metadata = {
  title: "How It Works | The Appointly Model for Booked Estimates",
  description:
    "Learn how Appointly Solutions fills your calendar: Meta ads, instant speed-to-lead outreach, and booked estimates, all on a retainer plus per-appointment model.",
  keywords: [
    "how appointment setting works",
    "booked estimates for contractors",
    "retainer plus per appointment",
  ],
  alternates: {
    canonical: "https://getappointly.co/how-it-works",
  },
  openGraph: {
    title: "How It Works | The Appointly Model for Booked Estimates",
    description:
      "See the full Appointly process, from Meta ad campaigns and speed-to-lead to booked estimates on your calendar.",
    url: "https://getappointly.co/how-it-works",
    siteName: "Appointly Solutions",
    type: "website",
  },
};

// The fixed navbar is ~77px tall (py-4 around an h-11 logo + 1px border).
// The deck fills the rest of the viewport so it runs full-screen below the nav.
const NAV_HEIGHT = "77px";

export default function HowItWorksPage() {
  return (
    <>
      <Navbar />
      <main
        className="overflow-hidden"
        style={{ paddingTop: NAV_HEIGHT }}
      >
        <iframe
          src="/deck"
          title="Appointly Solutions pitch deck"
          allowFullScreen
          className="w-full border-0 bg-white"
          style={{ height: `calc(100vh - ${NAV_HEIGHT})` }}
        />
      </main>
    </>
  );
}
