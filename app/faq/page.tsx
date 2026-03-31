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
    question: "What qualifies as a lead I get charged for?",
    answer:
      "A lead must be a verified homeowner, located in your service area, with a real insulation project and an indicated budget. If a lead doesn't meet all criteria, you don't pay for it.",
  },
  {
    question: "What's the startup fee for?",
    answer:
      "It covers your full system setup: GMB claim and optimization, Facebook ad account build, creative, and launch, plus your NFC review card kit. After that, you only pay per qualified lead delivered.",
  },
  {
    question: "Are my leads exclusive?",
    answer:
      "Yes. We only work with one insulation contractor per market. Your leads never go to a competitor.",
  },
  {
    question: "What markets do you work in?",
    answer:
      "We focus on small-to-mid-sized markets (50K–300K population) in the US and Canada where insulation contractors have strong service capacity but weak digital presence.",
  },
  {
    question: "How fast do leads come in?",
    answer:
      "Most contractors see their first leads within 24–48 hours of campaign launch.",
  },
  {
    question: "What if I want to pause or stop?",
    answer:
      "Cancel anytime. No contract. No penalty. We just ask for 7 days notice to wind down campaigns cleanly.",
  },
  {
    question: "Do I need to run my own ads?",
    answer:
      "No. We handle everything — creative, targeting, budget management, and optimization. You just receive the leads.",
  },
  {
    question: "How do I get started?",
    answer:
      "Book a free strategy call. We review your market, service area, and current lead flow, then walk you through whether Appointly Solutions is the right fit for your business.",
  },
];

export const metadata: Metadata = {
  title: "FAQ | Appointly Solutions Insulation Lead Generation",
  description:
    "Read answers to common questions about Appointly Solutions, exclusive insulation leads, qualification standards, pricing, and getting started.",
  keywords: [
    "insulation lead generation FAQ",
    "cost per lead FAQ",
    "exclusive leads questions",
  ],
  alternates: {
    canonical: "https://getappointly.co/faq",
  },
  openGraph: {
    title: "FAQ | Appointly Solutions Insulation Lead Generation",
    description:
      "Explore common questions about Appointly Solutions and how our insulation lead generation model works.",
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
        <section className="relative pt-32 pb-20 md:pt-44 md:pb-28">
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
          />

          <div className="absolute inset-0 -z-10">
            <div className="absolute top-0 right-10 h-[700px] w-[700px] rounded-full bg-[#7d87f7]/[0.06] blur-[145px]" />
            <div className="absolute inset-0 dot-grid opacity-35" />
          </div>

          <div className="mx-auto max-w-6xl px-6">
            <div className="max-w-3xl">
              <p className="text-xs font-semibold tracking-[0.25em] uppercase text-muted-foreground mb-6">
                Frequently Asked Questions
              </p>
              <h1 className="font-display text-5xl md:text-6xl font-bold tracking-tight leading-[1.05] text-balance">
                FAQ for <span className="gradient-text">Appointly Solutions</span>
              </h1>
              <p className="mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg">
                This page answers the questions insulation contractors ask most often
                about lead quality, exclusivity, pricing, service areas, and how
                Appointly Solutions gets started in a new market.
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
                <p className="text-xs font-semibold tracking-[0.25em] uppercase text-muted-foreground">
                  Keep Reading
                </p>
                <h2 className="mt-4 font-display text-2xl font-bold text-foreground">
                  Want more context before you book?
                </h2>
                <p className="mt-4 text-sm leading-7 text-muted-foreground">
                  The{" "}
                  <Link href="/how-it-works" className="text-primary hover:text-[#a5abff] transition-colors">
                    How It Works
                  </Link>{" "}
                  page breaks down the full delivery process, and the{" "}
                  <Link href="/about" className="text-primary hover:text-[#a5abff] transition-colors">
                    About page
                  </Link>{" "}
                  explains why Appointly Solutions was built around a cost per lead
                  model in the first place. For a direct offer page, visit{" "}
                  <Link
                    href="/insulation-contractor-leads"
                    className="text-primary hover:text-[#a5abff] transition-colors"
                  >
                    Insulation Contractor Leads
                  </Link>
                  .
                </p>
              </article>

              <article className="rounded-3xl border border-[#7d87f7]/20 bg-[#7d87f7]/[0.08] p-8 shadow-[0_0_70px_rgba(125,135,247,0.1)]">
                <p className="text-xs font-semibold tracking-[0.25em] uppercase text-[#d7dbff]">
                  Next Step
                </p>
                <h2 className="mt-4 font-display text-2xl font-bold text-foreground">
                  Get direct answers for your market.
                </h2>
                <p className="mt-4 text-sm leading-7 text-[#e6e9ff]/80">
                  Book a strategy call and we will walk through your area, your current
                  lead flow, and whether Appointly Solutions makes sense for your team.
                </p>
                <a
                  href={bookingUrl}
                  className="mt-8 inline-flex items-center justify-center gap-2 rounded-xl bg-white px-6 py-3 text-sm font-semibold text-[#7d87f7] hover:opacity-90 transition-opacity"
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
