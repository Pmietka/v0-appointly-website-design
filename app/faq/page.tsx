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
    question: "What makes Appointly Solutions leads exclusive?",
    answer:
      "Appointly Solutions is built to deliver opportunities with exclusivity in mind, so your team is not paying to compete against a long list of contractors for the same homeowner conversation.",
  },
  {
    question: "How much do insulation contractor leads cost?",
    answer:
      "Pricing depends on market factors and qualification standards, but the model is structured around pay per qualified lead instead of large monthly retainers.",
  },
  {
    question: "How quickly will I start receiving leads?",
    answer:
      "Launch timelines vary by market, but once campaigns are live the goal is to start generating opportunities quickly and keep response speed high from the first inquiry onward.",
  },
  {
    question: "What counts as a qualified lead?",
    answer:
      "A qualified lead usually means the homeowner is in your target area, has a relevant insulation need, and shows enough intent for a real estimate conversation.",
  },
  {
    question: "Do I need to run my own ads?",
    answer:
      "No. Appointly Solutions handles the campaign execution, initial response flow, and qualification process so you do not need to manage ads yourself.",
  },
  {
    question: "What areas do you serve?",
    answer:
      "We work with United States insulation contractors and build the campaign strategy around each contractor’s service area and target radius.",
  },
  {
    question: "Is there a long term contract?",
    answer:
      "The offer is designed to reduce risk compared with typical agency arrangements. Specific terms are covered during the strategy call and in the service agreement.",
  },
  {
    question: "How do I get started?",
    answer:
      "The simplest next step is to book a strategy call. We review your market, service area, and growth goals, then outline whether Appointly Solutions is the right fit.",
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
                  model in the first place.
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
