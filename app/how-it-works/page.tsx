import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Breadcrumbs } from "@/components/breadcrumbs";
import { Footer } from "@/components/footer";
import { Navbar } from "@/components/navbar";
import { servicePages } from "@/lib/seo-resources";

const bookingUrl = "https://client.getappointly.co/strategy-calendar";

export const metadata: Metadata = {
  title: "How It Works | Booked Floor Coating Estimates | Appointly",
  description:
    "How Appointly fills a floor coating contractor's calendar: Meta ads in your service area, a call to every lead in minutes, and estimates booked for you.",
  keywords: [
    "how appointment setting works",
    "booked estimates for contractors",
    "floor coating appointment generation",
  ],
  alternates: {
    canonical: "https://getappointly.co/how-it-works",
  },
  openGraph: {
    title: "How It Works | Booked Floor Coating Estimates | Appointly",
    description:
      "See the full Appointly process, from Meta ad campaigns and speed-to-lead to booked estimates on your calendar.",
    url: "https://getappointly.co/how-it-works",
    siteName: "Appointly Solutions",
    type: "website",
  },
};

const steps = [
  {
    title: "We run Meta ads in your service area",
    description:
      "Localized Facebook and Instagram ads put your garage floor and concrete coating work in front of homeowners in the towns you cover. You never touch the ad account.",
  },
  {
    title: "We call every lead within minutes",
    description:
      "The moment a homeowner submits the form, they get a branded text and a phone call from our team. Speed to lead is where most coating jobs are won or lost.",
  },
  {
    title: "We qualify and book the estimate",
    description:
      "We confirm the homeowner owns the property, wants floor coating work, and picks a time that fits your crew. The appointment lands on your calendar with the details.",
  },
  {
    title: "You show up and close",
    description:
      "You run the estimate, quote the job, and do the work. We keep the calendar full and only ever book for one contractor per market.",
  },
];

export default function HowItWorksPage() {
  return (
    <>
      <Navbar />
      <main className="overflow-hidden">
        <section className="relative pb-12 pt-32 md:pb-16 md:pt-44">
          <div className="absolute inset-0 -z-10">
            <div className="absolute right-0 top-0 h-[720px] w-[720px] rounded-full bg-primary/[0.08] blur-[140px]" />
            <div className="absolute inset-0 dot-grid opacity-35" />
          </div>
          <div className="mx-auto max-w-6xl px-6">
            <Breadcrumbs items={[{ name: "How It Works", href: "/how-it-works" }]} className="mb-8" />
            <div className="max-w-3xl">
              <p className="mb-6 text-xs font-semibold uppercase tracking-[0.25em] text-muted-foreground">
                The Appointly Model
              </p>
              <h1 className="font-display text-5xl font-bold leading-[1.05] tracking-tight text-balance md:text-6xl">
                How we book floor coating estimates{" "}
                <span className="gradient-text">onto your calendar</span>
              </h1>
              <p className="mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg">
                Four steps, all handled by us. The deck below walks through the
                system in detail, and the short version is right here.
              </p>
            </div>

            <ol className="mt-12 grid gap-5 md:grid-cols-2">
              {steps.map((step, index) => (
                <li key={step.title} className="glass-card rounded-3xl p-6">
                  <p className="text-xs font-semibold uppercase tracking-[0.25em] text-muted-foreground">
                    Step {index + 1}
                  </p>
                  <h2 className="mt-3 font-display text-xl font-semibold text-foreground">
                    {step.title}
                  </h2>
                  <p className="mt-3 text-sm leading-7 text-muted-foreground">{step.description}</p>
                </li>
              ))}
            </ol>

            <div className="mt-10 flex flex-wrap gap-4">
              <a
                href={bookingUrl}
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-8 py-4 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90"
              >
                Book a Strategy Call
                <ArrowRight className="h-4 w-4" />
              </a>
              <Link
                href={servicePages.pricing}
                className="inline-flex items-center justify-center rounded-xl border border-gray-300 bg-white px-8 py-4 text-sm font-semibold text-gray-700 transition-all hover:bg-gray-50"
              >
                See Pricing
              </Link>
            </div>
          </div>
        </section>

        <section className="section-divider">
          <h2 className="sr-only">Appointly Solutions pitch deck</h2>
          <iframe
            src="/deck"
            title="Appointly Solutions pitch deck"
            allowFullScreen
            className="w-full border-0 bg-white"
            style={{ height: "calc(100vh - 77px)" }}
          />
        </section>
      </main>
      <Footer />
    </>
  );
}
