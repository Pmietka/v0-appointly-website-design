import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  CalendarCheck2,
  CreditCard,
  MapPin,
  Megaphone,
  SearchCheck,
  Smartphone,
} from "lucide-react";

import { Footer } from "@/components/footer";
import { Navbar } from "@/components/navbar";
import { ProofSection } from "@/components/proof-section";
import { SeoResourceLinks } from "@/components/seo-resource-links";
import { getCommercialResources } from "@/lib/seo-resources";

const bookingUrl = "https://client.getappointly.co/strategy-calendar";

const steps = [
  {
    icon: MapPin,
    title: "Google profile and market setup",
    description:
      "We tighten up your Google Business Profile and service area positioning so local homeowners can find you with more confidence.",
  },
  {
    icon: Megaphone,
    title: "Meta ad campaigns built for your trade",
    description:
      "We run campaigns aimed at homeowners in your target towns who are actively looking for your service.",
  },
  {
    icon: SearchCheck,
    title: "Prospect qualification and calendar booking",
    description:
      "Every prospect is screened for homeowner status, project fit, and service area — then booked directly onto your calendar.",
  },
  {
    icon: Smartphone,
    title: "Review follow-up system",
    description:
      "We include a review system your crew can use after completed jobs so your Google profile gets stronger over time.",
  },
  {
    icon: CreditCard,
    title: "Pay per booked appointment delivered",
    description:
      "The model stays tied to actual booked appointment delivery — not a fixed monthly retainer that keeps running either way.",
  },
];

const processFaq = [
  {
    question: "Do I need to manage campaigns myself?",
    answer:
      "No. We handle the setup, ads, qualification flow, and review process. Your team focuses on showing up to estimates, doing the work, and closing jobs.",
  },
  {
    question: "What does a booked appointment include?",
    answer:
      "A booked appointment is a verified homeowner in your service area with a real project — screened for fit and scheduled directly on your calendar before we hand them off.",
  },
  {
    question: "What if an appointment does not meet the criteria?",
    answer:
      "You do not pay for it. If the appointment misses the agreed standards, it does not count.",
  },
];

export const metadata: Metadata = {
  title: "How It Works | Appointly Solutions Appointment Booking Process",
  description:
    "Learn how Appointly Solutions runs Meta ads, qualifies prospects, and books estimate appointments directly on your calendar on a pay-for-performance basis.",
  keywords: [
    "how appointment booking works",
    "contractor appointment process",
    "pay for performance contractor marketing",
  ],
  alternates: {
    canonical: "https://getappointly.co/how-it-works",
  },
  openGraph: {
    title: "How It Works | Appointly Solutions Appointment Booking Process",
    description:
      "See the full Appointly Solutions process from targeted campaigns to booked estimate appointments for home service contractors.",
    url: "https://getappointly.co/how-it-works",
    siteName: "Appointly Solutions",
    type: "website",
  },
};

export default function HowItWorksPage() {
  return (
    <>
      <Navbar />
      <main className="overflow-hidden">
        <section className="relative pb-20 pt-32 md:pb-28 md:pt-44">
          <div className="absolute inset-0 -z-10">
            <div className="absolute right-0 top-10 h-[720px] w-[720px] rounded-full bg-primary/[0.10] blur-[150px]" />
            <div className="absolute inset-0 dot-grid opacity-35" />
          </div>

          <div className="mx-auto max-w-6xl px-6">
            <div className="max-w-3xl">
              <p className="mb-6 text-xs font-semibold uppercase tracking-[0.25em] text-muted-foreground">
                Process Overview
              </p>
              <h1 className="font-display text-5xl font-bold leading-[1.05] tracking-tight text-balance md:text-6xl">
                How <span className="gradient-text">Appointly Solutions</span> works
              </h1>
              <p className="mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg">
                The process is built to help home service contractors get more qualified
                estimate appointments without spending their day inside ad accounts.
              </p>
              <div className="mt-10 flex flex-wrap gap-4">
                <a
                  href={bookingUrl}
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-primary px-8 py-4 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90"
                >
                  Book a free strategy call
                  <ArrowRight className="h-4 w-4" />
                </a>
                <Link
                  href="/faq"
                  className="inline-flex items-center justify-center rounded-full border border-gray-300 bg-white px-8 py-4 text-sm font-semibold text-gray-700 transition-all hover:bg-gray-50"
                >
                  Read the FAQ
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section className="section-divider py-24 md:py-32">
          <div className="mx-auto max-w-6xl px-6">
            <div className="mb-12 max-w-2xl">
              <p className="mb-4 text-xs font-semibold uppercase tracking-[0.25em] text-muted-foreground">
                Step By Step
              </p>
              <h2 className="font-display text-3xl font-bold text-foreground md:text-4xl">
                The system behind each booked estimate appointment.
              </h2>
            </div>

            <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              {steps.map((step, index) => (
                <article
                  key={step.title}
                  className="glass-card glass-card-hover rounded-3xl p-6"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-primary/20 bg-primary/10">
                      <step.icon className="h-5 w-5 text-primary" />
                    </div>
                    <span className="font-display text-3xl font-bold text-slate-200">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <h3 className="mt-6 font-display text-xl font-semibold text-foreground">
                    {step.title}
                  </h3>
                  <p className="mt-3 text-sm leading-7 text-muted-foreground">
                    {step.description}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section-divider py-24 md:py-32">
          <div className="mx-auto grid max-w-6xl gap-6 px-6 lg:grid-cols-[1.2fr_0.8fr]">
            <article className="glass-card rounded-3xl p-8 md:p-10">
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-muted-foreground">
                What You Get
              </p>
              <h2 className="mt-4 font-display text-3xl font-bold text-foreground">
                Every appointment arrives on your calendar ready for a real estimate conversation.
              </h2>
              <p className="mt-5 text-sm leading-7 text-muted-foreground md:text-base">
                A typical booked appointment includes a verified homeowner, confirmed
                service area fit, and enough project context for your team to move straight
                into the estimate conversation instead of starting from scratch.
              </p>
              <p className="mt-4 text-sm leading-7 text-muted-foreground md:text-base">
                If you want more background on why the system was built this way, the{" "}
                <Link href="/about" className="text-primary transition-colors hover:opacity-80">
                  About page
                </Link>{" "}
                shares the operating principles behind it. For the featured niche overview, see{" "}
                <Link
                  href="/floor-coating-contractor-marketing"
                  className="text-primary transition-colors hover:opacity-80"
                >
                  Floor Coating Contractor Marketing
                </Link>
                .
              </p>
            </article>

            <article className="rounded-3xl border border-primary/20 bg-primary/10 p-8 shadow-[0_0_70px_rgba(125,135,247,0.10)] md:p-10">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-primary/20 bg-white/60">
                <CalendarCheck2 className="h-5 w-5 text-slate-950" />
              </div>
              <p className="mt-6 text-xs font-semibold uppercase tracking-[0.25em] text-slate-600">
                The Model
              </p>
              <h2 className="mt-4 font-display text-3xl font-bold text-slate-950">
                Pay for booked appointments, not monthly retainers.
              </h2>
              <p className="mt-4 text-sm leading-7 text-slate-700 md:text-base">
                You pay per appointment delivered. No retainer, no guesswork. When
                we do well, you do well — that is the whole model.
              </p>
            </article>
          </div>
        </section>

        <section className="section-divider relative py-24 md:py-32">
          <div className="absolute inset-0 -z-10">
            <div className="absolute bottom-0 left-1/4 h-[520px] w-[520px] rounded-full bg-primary/[0.08] blur-[120px]" />
          </div>

          <div className="mx-auto max-w-6xl px-6">
            <div className="mb-12 max-w-2xl">
              <p className="mb-4 text-xs font-semibold uppercase tracking-[0.25em] text-muted-foreground">
                Common Questions
              </p>
              <h2 className="font-display text-3xl font-bold text-foreground md:text-4xl">
                Quick answers about the process.
              </h2>
            </div>

            <div className="grid gap-5 md:grid-cols-3">
              {processFaq.map((item) => (
                <article key={item.question} className="glass-card rounded-2xl p-6">
                  <h3 className="font-display text-xl font-semibold text-foreground">
                    {item.question}
                  </h3>
                  <p className="mt-3 text-sm leading-7 text-muted-foreground">
                    {item.answer}
                  </p>
                </article>
              ))}
            </div>

            <p className="mt-8 text-sm leading-7 text-muted-foreground">
              Return to the{" "}
              <Link href="/" className="text-primary transition-colors hover:opacity-80">
                homepage
              </Link>{" "}
              for a full overview, or visit the{" "}
              <Link href="/faq" className="text-primary transition-colors hover:opacity-80">
                FAQ
              </Link>{" "}
              for detailed answers about appointment qualification, exclusivity, and how to get started.
            </p>
          </div>
        </section>

        <ProofSection />
        <SeoResourceLinks
          title="Follow the process into the right next page."
          description="These pages expand the core process into the commercial angles contractors usually compare before booking a call."
          resources={getCommercialResources("floor-coating-contractor-marketing")}
        />
      </main>
      <Footer />
    </>
  );
}
