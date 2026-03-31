import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  CircleDollarSign,
  MapPin,
  Megaphone,
  SearchCheck,
  Smartphone,
  CreditCard,
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
    title: "GMB Optimization",
    description:
      "We claim and optimize your Google Business Profile so you rank in the local 3-pack. More visibility means more inbound calls from homeowners already searching for insulation help.",
  },
  {
    icon: Megaphone,
    title: "Facebook Lead Gen Ads",
    description:
      "We build and run hyper-local Facebook ad campaigns targeting homeowners in your service area. We handle creative, targeting, budget, and optimization - you don't touch it.",
  },
  {
    icon: SearchCheck,
    title: "Lead Qualification",
    description:
      "Every lead is screened before it reaches you. We verify homeowner status, confirm the project is in your service area, scope the job, and check for budget. No tire-kickers.",
  },
  {
    icon: Smartphone,
    title: "NFC Review Card System",
    description:
      "We ship you physical NFC cards to hand to satisfied customers. One tap sends a Google review request directly to their phone, continuously building your GMB ranking.",
  },
  {
    icon: CreditCard,
    title: "You Pay Only When We Deliver",
    description:
      "Once a qualified lead is delivered, you're charged. If we don't deliver a lead that meets every qualification criterion, you don't pay. No monthly retainer. No long-term contract.",
  },
];

const processFaq = [
  {
    question: "Do I need to manage campaigns myself?",
    answer:
      "No. Appointly Solutions handles everything - GMB optimization, Facebook ad creative and targeting, lead qualification, and the NFC review card system. You receive the leads.",
  },
  {
    question: "What does a qualified lead include?",
    answer:
      "A qualified lead is a verified homeowner in your service area with a real insulation project and an indicated budget. All four criteria must be met before you're charged.",
  },
  {
    question: "What if a lead doesn't meet the criteria?",
    answer:
      "You don't pay for it. Every lead is screened before delivery. If it doesn't qualify, it doesn't count.",
  },
];

export const metadata: Metadata = {
  title: "How It Works | Appointly Solutions Lead Generation Process",
  description:
    "Learn how Appointly Solutions generates, qualifies, follows up with, and books insulation leads on a cost per lead model.",
  keywords: [
    "how insulation leads work",
    "lead generation process",
    "cost per lead model",
  ],
  alternates: {
    canonical: "https://getappointly.co/how-it-works",
  },
  openGraph: {
    title: "How It Works | Appointly Solutions Lead Generation Process",
    description:
      "See the full Appointly Solutions process from targeted campaigns to booked estimates for insulation contractors.",
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
        <section className="relative pt-32 pb-20 md:pt-44 md:pb-28">
          <div className="absolute inset-0 -z-10">
            <div className="absolute top-10 right-0 h-[720px] w-[720px] rounded-full bg-[#7d87f7]/[0.06] blur-[150px]" />
            <div className="absolute inset-0 dot-grid opacity-35" />
          </div>

          <div className="mx-auto max-w-6xl px-6">
            <div className="max-w-3xl">
              <p className="mb-6 text-xs font-semibold uppercase tracking-[0.25em] text-muted-foreground">
                Process Overview
              </p>
              <h1 className="font-display text-5xl font-bold leading-[1.05] tracking-tight text-balance md:text-6xl">
                How <span className="gradient-text">Appointly Solutions</span> Works
              </h1>
              <p className="mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg">
                Our pay-per-lead system is built on four pillars: GMB visibility, Facebook
                lead generation, strict qualification, and a review growth engine. You only
                pay when we deliver a lead that meets every criterion.
              </p>
              <div className="mt-10 flex flex-wrap gap-4">
                <a
                  href={bookingUrl}
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-8 py-4 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90"
                  style={{
                    boxShadow:
                      "0 0 40px rgb(125 135 247 / 0.35), 0 4px 20px rgb(125 135 247 / 0.15)",
                  }}
                >
                  Book a Strategy Call
                  <ArrowRight className="h-4 w-4" />
                </a>
                <Link
                  href="/faq"
                  className="inline-flex items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] px-8 py-4 text-sm font-semibold text-foreground transition-all hover:border-white/[0.15] hover:bg-white/[0.08]"
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
                The system behind every booked opportunity.
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
                    <span className="font-display text-3xl font-bold text-white/[0.08]">
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
                A qualified lead should feel ready for a real sales conversation.
              </h2>
              <p className="mt-5 text-sm leading-7 text-muted-foreground md:text-base">
                A typical Appointly Solutions lead includes verified contact details,
                clear insulation intent, service area alignment, and enough project
                context for your team to move directly into the estimate conversation.
              </p>
              <p className="mt-4 text-sm leading-7 text-muted-foreground md:text-base">
                If you want more background on why we built the system this way, the{" "}
                <Link href="/about" className="text-primary transition-colors hover:text-[#a5abff]">
                  About page
                </Link>{" "}
                shares the operating principles behind the model. For the direct offer,
                see{" "}
                <Link
                  href="/insulation-contractor-leads"
                  className="text-primary transition-colors hover:text-[#a5abff]"
                >
                  Insulation Contractor Leads
                </Link>
                .
              </p>
            </article>

            <article className="rounded-3xl border border-[#7d87f7]/20 bg-[#7d87f7]/[0.08] p-8 shadow-[0_0_70px_rgba(125,135,247,0.1)] md:p-10">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/20 bg-white/10">
                <CircleDollarSign className="h-5 w-5 text-white" />
              </div>
              <p className="mt-6 text-xs font-semibold uppercase tracking-[0.25em] text-[#d7dbff]">
                What It Costs
              </p>
              <h2 className="mt-4 font-display text-3xl font-bold text-foreground">
                Cost per lead, aligned with performance.
              </h2>
              <p className="mt-4 text-sm leading-7 text-[#e6e9ff]/80 md:text-base">
                Appointly Solutions is structured around pay per qualified lead. That
                keeps the conversation focused on lead quality, speed, and booked
                outcomes instead of large retainers detached from production.
              </p>
            </article>
          </div>
        </section>

        <section className="section-divider relative py-24 md:py-32">
          <div className="absolute inset-0 -z-10">
            <div className="absolute bottom-0 left-1/4 h-[520px] w-[520px] rounded-full bg-[#7d87f7]/[0.05] blur-[120px]" />
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
              <Link href="/" className="text-primary transition-colors hover:text-[#a5abff]">
                homepage
              </Link>{" "}
              for a full overview, or visit the{" "}
              <Link href="/faq" className="text-primary transition-colors hover:text-[#a5abff]">
                FAQ
              </Link>{" "}
              for detailed answers about lead qualification, exclusivity, and how to get started.
            </p>
          </div>
        </section>

        <ProofSection />
        <SeoResourceLinks
          title="Follow the process into the right next page."
          description="These pages expand the core process into the commercial angles contractors usually compare before booking a call."
          resources={getCommercialResources("insulation-contractor-leads")}
        />
      </main>
      <Footer />
    </>
  );
}
