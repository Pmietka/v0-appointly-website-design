import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  CalendarCheck2,
  CircleDollarSign,
  CreditCard,
  Megaphone,
  ShieldCheck,
  Zap,
} from "lucide-react";

import { Footer } from "@/components/footer";
import { Navbar } from "@/components/navbar";
import { ProofSection } from "@/components/proof-section";
import { SeoResourceLinks } from "@/components/seo-resource-links";
import { getCommercialResources } from "@/lib/seo-resources";

const bookingUrl = "https://client.getappointly.co/strategy-calendar";

const steps = [
  {
    icon: Megaphone,
    title: "We generate the lead",
    description:
      "We run Meta ads in your service area aimed at homeowners who actually want floor coating, epoxy, or concrete coating work done.",
  },
  {
    icon: Zap,
    title: "Speed to lead",
    description:
      "We contact every lead immediately, before they can shop other contractors. The first one to reach them is usually the one who books the job.",
  },
  {
    icon: CalendarCheck2,
    title: "We book the appointment",
    description:
      "We set the estimate into a time that works for you, on the spot or as soon as we reach them, and drop it straight onto your calendar.",
  },
  {
    icon: ShieldCheck,
    title: "Exclusive to your market",
    description:
      "We only work with one contractor per service area, so the appointments we book are never shared with a competitor.",
  },
  {
    icon: CreditCard,
    title: "Retainer plus per-appointment fee",
    description:
      "A retainer covers our labor and effort. On top of that, you pay a per-appointment fee for each booked estimate that lands on your calendar.",
  },
];

const processFaq = [
  {
    question: "Do I need to manage campaigns myself?",
    answer:
      "No. We handle the ads, the speed-to-lead outreach, and the booking. Your team focuses on running estimates and closing work.",
  },
  {
    question: "What lands on my calendar?",
    answer:
      "A booked estimate with a verified homeowner in your service area who wants floor coating work and agreed to a time that works for you.",
  },
  {
    question: "How does the pricing work?",
    answer:
      "You pay a retainer that covers our labor, plus a per-appointment fee for each booked estimate we put on your calendar.",
  },
];

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
                The process is built to fill floor coating contractors' calendars with
                booked estimates without them spending their day inside ad accounts.
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
                  className="inline-flex items-center justify-center rounded-xl border border-gray-300 bg-white px-8 py-4 text-sm font-semibold text-gray-700 transition-all hover:bg-gray-50"
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
          <div className="mx-auto max-w-6xl px-6">
            <div className="mb-12 max-w-2xl">
              <p className="mb-4 text-xs font-semibold uppercase tracking-[0.25em] text-muted-foreground">
                The Full Pitch
              </p>
              <h2 className="font-display text-3xl font-bold text-foreground md:text-4xl">
                Walk through the Appointly Solutions deck.
              </h2>
              <p className="mt-5 text-sm leading-7 text-muted-foreground md:text-base">
                The same seven-slide pitch we share on strategy calls. Use the arrows or
                the bottom navigation to step through it, or open it{" "}
                <a
                  href="/deck"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary transition-colors hover:opacity-80"
                >
                  full screen in its own tab
                </a>
                .
              </p>
            </div>

            <div className="glass-card overflow-hidden rounded-3xl p-2 shadow-[0_0_70px_rgba(125,135,247,0.10)]">
              <iframe
                src="/deck"
                title="Appointly Solutions pitch deck"
                loading="lazy"
                allowFullScreen
                className="h-[620px] w-full rounded-2xl border-0 bg-white md:h-[760px]"
              />
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
                A booked estimate, ready for you to show up and close.
              </h2>
              <p className="mt-5 text-sm leading-7 text-muted-foreground md:text-base">
                Each appointment is a verified homeowner in your service area who wants
                floor coating work and has agreed to a time that fits your calendar, so
                your team walks into a real estimate instead of starting from scratch.
              </p>
              <p className="mt-4 text-sm leading-7 text-muted-foreground md:text-base">
                If you want more background on why the system was built this way, the{" "}
                <Link href="/about" className="text-primary transition-colors hover:opacity-80">
                  About page
                </Link>{" "}
                shares the operating principles behind it. For the main service page, see{" "}
                <Link
                  href="/insulation-contractor-leads"
                  className="text-primary transition-colors hover:opacity-80"
                >
                  Floor Coating Appointments
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
                A retainer, plus a fee per booked appointment.
              </h2>
              <p className="mt-4 text-sm leading-7 text-slate-700 md:text-base">
                The retainer covers our labor and effort running the system. On top of
                that, you pay a per-appointment fee for each booked estimate that lands
                on your calendar, so the spend stays tied to real opportunities.
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
