import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  CircleDollarSign,
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
    title: "Local ad campaigns",
    description:
      "We run campaigns aimed at homeowners in your target towns who are likely to need attic insulation, removal, or spray foam work.",
  },
  {
    icon: SearchCheck,
    title: "Lead qualification",
    description:
      "Every lead is checked for homeowner status, project fit, and service area before it reaches your team.",
  },
  {
    icon: Smartphone,
    title: "Review follow-up",
    description:
      "We include a review system your crew can use after completed jobs so your Google profile gets stronger over time.",
  },
  {
    icon: CreditCard,
    title: "Pay per qualified lead",
    description:
      "The model stays tied to approved lead delivery instead of a fixed monthly retainer that keeps running either way.",
  },
];

const processFaq = [
  {
    question: "Do I need to manage campaigns myself?",
    answer:
      "No. We handle the setup, ads, qualification flow, and review process. Your team focuses on answering the phone, running estimates, and closing work.",
  },
  {
    question: "What does a qualified lead include?",
    answer:
      "A qualified lead is a verified homeowner in your service area with a real insulation project and an indicated budget.",
  },
  {
    question: "What if a lead does not meet the criteria?",
    answer:
      "You do not pay for it. If the lead misses the agreed standards, it does not count.",
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
                The process is built to help insulation contractors get more qualified
                estimate opportunities without spending their day inside ad accounts.
              </p>
              <div className="mt-10 flex flex-wrap gap-4">
                <a
                  href={bookingUrl}
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-8 py-4 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90"
                >
                  Book a Strategy Call
                  <ArrowRight className="h-4 w-4" />
                </a>
                <Link
                  href="/faq"
                  className="inline-flex items-center justify-center rounded-xl border border-slate-200 bg-white px-8 py-4 text-sm font-semibold text-foreground transition-all hover:bg-slate-50"
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
                The system behind each booked estimate opportunity.
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
                The lead should feel ready for a real estimate conversation.
              </h2>
              <p className="mt-5 text-sm leading-7 text-muted-foreground md:text-base">
                A typical lead includes verified contact details, service area fit, and
                enough job context for your team to move into the estimate conversation
                instead of starting from scratch.
              </p>
              <p className="mt-4 text-sm leading-7 text-muted-foreground md:text-base">
                If you want more background on why the system was built this way, the{" "}
                <Link href="/about" className="text-primary transition-colors hover:opacity-80">
                  About page
                </Link>{" "}
                shares the operating principles behind it. For the direct offer, see{" "}
                <Link
                  href="/insulation-contractor-leads"
                  className="text-primary transition-colors hover:opacity-80"
                >
                  Insulation Contractor Leads
                </Link>
                .
              </p>
            </article>

            <article className="rounded-3xl border border-primary/20 bg-primary/10 p-8 shadow-[0_0_70px_rgba(125,135,247,0.10)] md:p-10">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-primary/20 bg-white/60">
                <CircleDollarSign className="h-5 w-5 text-slate-950" />
              </div>
              <p className="mt-6 text-xs font-semibold uppercase tracking-[0.25em] text-slate-600">
                What It Costs
              </p>
              <h2 className="mt-4 font-display text-3xl font-bold text-slate-950">
                Cost per lead, tied to performance.
              </h2>
              <p className="mt-4 text-sm leading-7 text-slate-700 md:text-base">
                The conversation stays focused on lead quality, response speed, and booked
                estimates instead of a big monthly fee that keeps running either way.
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
