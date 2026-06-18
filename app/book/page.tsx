import type { Metadata } from "next";

import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { CalendarEmbed } from "./calendar-embed";

// Utility booking page (just the calendar), so keep it out of the index but
// let link equity flow.
export const metadata: Metadata = {
  title: "Book a Call | Appointly Solutions",
  description:
    "Book your strategy call with Appointly Solutions. About 20 minutes, low pressure, and by the end you will know whether we are a fit for your market.",
  robots: { index: false, follow: true },
  alternates: {
    canonical: "https://getappointly.co/book",
  },
};

export default function BookPage() {
  return (
    <>
      <Navbar />
      <main className="overflow-hidden">
        <section className="relative pt-32 pb-20 md:pt-44 md:pb-28">
          <div className="absolute inset-0 -z-10">
            <div className="absolute top-0 right-0 h-[720px] w-[720px] rounded-full bg-primary/[0.06] blur-[140px]" />
            <div className="absolute inset-0 dot-grid opacity-40" />
          </div>

          <div className="mx-auto max-w-3xl px-6">
            <div className="text-center">
              <p className="mb-6 text-xs font-semibold uppercase tracking-[0.25em] text-muted-foreground">
                Book your call
              </p>
              <h1 className="font-display text-5xl font-bold leading-[1.05] tracking-tight text-balance md:text-6xl">
                Book your <span className="gradient-text">strategy call</span>
              </h1>
              <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg">
                Pick a time below. It runs about 20 minutes, it is low pressure,
                and by the end you will know whether we are a fit for your market.
              </p>
            </div>

            <div className="mt-12">
              <CalendarEmbed />
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
