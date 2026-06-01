import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Footer } from "@/components/footer";
import { Navbar } from "@/components/navbar";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const bookingUrl = "https://client.getappointly.co/strategy-calendar";

const faqItems = [
  {
    question: "How does the pricing work?",
    answer:
      "Two parts. A retainer covers our labor and effort running the system. On top of that, you pay a per-appointment fee for each booked estimate that lands on your calendar.",
  },
  {
    question: "What counts as a booked appointment?",
    answer:
      "A verified homeowner in your service area who wants floor coating work and has agreed to an estimate time that fits your calendar. Not a raw lead or a form fill - an actual booked estimate.",
  },
  {
    question: "What does the retainer cover?",
    answer:
      "Everything we do to fill your calendar: building and running your Meta ads, contacting every lead instantly with speed-to-lead outreach, and booking the estimates onto your calendar.",
  },
  {
    question: "Are my appointments exclusive?",
    answer:
      "Yes. We only work with one contractor per market. The estimates we book are never shared with a local competitor.",
  },
  {
    question: "What markets do you work in?",
    answer:
      "We focus on small-to-mid-sized markets in the US and Canada where home service contractors have room to grow. Right now our main focus is floor coating and epoxy contractors.",
  },
  {
    question: "How fast do appointments come in?",
    answer:
      "Most contractors see their first booked estimates within 24 to 48 hours of campaign launch.",
  },
  {
    question: "What if I want to pause or stop?",
    answer:
      "You can cancel anytime. There is no long-term contract. We just ask for a short notice period so campaigns can be wound down cleanly.",
  },
  {
    question: "Do I need to run my own ads or chase leads?",
    answer:
      "No. We run the Meta ads, handle the speed-to-lead outreach, and book the appointments. Your team just shows up, runs the estimate, and closes the work.",
  },
  {
    question: "How do I get started?",
    answer:
      "Book a strategy call. We review your market, service area, and goals, then tell you whether Appointly is a fit for your business.",
  },
];

export const metadata: Metadata = {
  title: "FAQ | The Appointly Model for Booked Estimates",
  description:
    "Answers to common questions about Appointly Solutions: how the retainer plus per-appointment pricing works, exclusivity, speed to lead, and getting started.",
  keywords: [
    "appointment generation FAQ",
    "booked estimates FAQ",
    "exclusive appointments questions",
  ],
  alternates: {
    canonical: "https://getappointly.co/faq",
  },
  openGraph: {
    title: "FAQ | The Appointly Model for Booked Estimates",
    description:
      "Explore common questions about Appointly Solutions and how we fill your calendar with booked estimates.",
    url: "https://getappointly.co/faq",
    siteName: "Appointly Solutions",
    type: "website",
  },
};

export default function FaqPage() {
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqItems.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };

  return (
    <>
      <Navbar />
      <main className="overflow-hidden">
        <section className="relative pb-20 pt-32 md:pb-28 md:pt-44">
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
          />

          <div className="absolute inset-0 -z-10">
            <div className="absolute right-10 top-0 h-[700px] w-[700px] rounded-full bg-primary/[0.10] blur-[145px]" />
            <div className="absolute inset-0 dot-grid opacity-35" />
          </div>

          <div className="mx-auto max-w-6xl px-6">
            <div className="max-w-3xl">
              <p className="mb-6 text-xs font-semibold uppercase tracking-[0.25em] text-muted-foreground">
                Frequently Asked Questions
              </p>
              <h1 className="font-display text-5xl font-bold leading-[1.05] tracking-tight text-balance md:text-6xl">
                FAQ for <span className="gradient-text">Appointly Solutions</span>
              </h1>
              <p className="mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg">
                This page answers the questions contractors usually ask about how the
                Appointly Model works - pricing, exclusivity, speed to lead, service
                areas, and getting started.
              </p>
            </div>
          </div>
        </section>

        <section className="section-divider py-24 md:py-32">
          <div className="mx-auto grid max-w-6xl gap-8 px-6 lg:grid-cols-[1.2fr_0.8fr]">
            <div className="glass-card rounded-3xl p-4 md:p-6">
              <Accordion type="single" collapsible className="w-full">
                {faqItems.map((item, index) => (
                  <AccordionItem
                    key={item.question}
                    value={`item-${index}`}
                    className="border-white/[0.07] px-4"
                  >
                    <AccordionTrigger className="py-6 text-left font-display text-lg text-foreground hover:no-underline">
                      {item.question}
                    </AccordionTrigger>
                    <AccordionContent className="pb-6 text-sm leading-7 text-muted-foreground">
                      {item.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>

            <aside className="space-y-6">
              <article className="glass-card rounded-3xl p-8">
                <p className="text-xs font-semibold uppercase tracking-[0.25em] text-muted-foreground">
                  Keep Reading
                </p>
                <h2 className="mt-4 font-display text-2xl font-bold text-foreground">
                  Want more context before you book?
                </h2>
                <p className="mt-4 text-sm leading-7 text-muted-foreground">
                  The{" "}
                  <Link href="/how-it-works" className="text-primary transition-colors hover:opacity-80">
                    How It Works
                  </Link>{" "}
                  page breaks down the delivery process, and the{" "}
                  <Link href="/about" className="text-primary transition-colors hover:opacity-80">
                    About page
                  </Link>{" "}
                  explains why Appointly Solutions is built around the Appointly Model.
                  For the main service page, visit{" "}
                  <Link
                    href="/insulation-contractor-leads"
                    className="text-primary transition-colors hover:opacity-80"
                  >
                    Floor Coating Appointments
                  </Link>
                  .
                </p>
              </article>

              <article className="rounded-3xl border border-primary/20 bg-primary/10 p-8 shadow-[0_0_70px_rgba(125,135,247,0.10)]">
                <p className="text-xs font-semibold uppercase tracking-[0.25em] text-slate-600">
                  Next Step
                </p>
                <h2 className="mt-4 font-display text-2xl font-bold text-slate-950">
                  Get direct answers for your market.
                </h2>
                <p className="mt-4 text-sm leading-7 text-slate-700">
                  Book a strategy call and we will walk through your area, your current
                  lead flow, and whether Appointly makes sense for your team.
                </p>
                <a
                  href={bookingUrl}
                  className="mt-8 inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90"
                >
                  Book a Strategy Call
                  <ArrowRight className="h-4 w-4" />
                </a>
              </article>
            </aside>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
