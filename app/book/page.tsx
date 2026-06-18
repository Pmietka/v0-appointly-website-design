import type { Metadata } from "next";

import { CalendarEmbed } from "./calendar-embed";

// Utility booking page (just the calendar), so keep it out of the index but
// let link equity flow.
export const metadata: Metadata = {
  title: "Book a Call | Appointly Solutions",
  description: "Book your strategy call with Appointly Solutions.",
  robots: { index: false, follow: true },
  alternates: {
    canonical: "https://getappointly.co/book",
  },
};

export default function BookPage() {
  return (
    <main className="min-h-screen bg-[#fafafa] px-4 py-8 md:py-12">
      <div className="mx-auto max-w-3xl">
        <CalendarEmbed />
      </div>
    </main>
  );
}
