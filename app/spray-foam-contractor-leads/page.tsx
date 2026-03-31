import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Flame, ShieldCheck, TimerReset, Waves } from "lucide-react";

import { Footer } from "@/components/footer";
import { Navbar } from "@/components/navbar";
import { ProofSection } from "@/components/proof-section";
import { SeoResourceLinks } from "@/components/seo-resource-links";
import { getCommercialResources } from "@/lib/seo-resources";

const bookingUrl = "https://client.getappointly.co/strategy-calendar";

const sprayFoamPoints = [
  {
    icon: Flame,
    title: "Built for specialized jobs",
    description:
      "Spray foam leads need tighter qualification because the homeowner is usually searching for a specific fix, not general insulation education.",
  },
  {
    icon: Waves,
    title: "Useful in seasonal swings",
    description:
      "Spray foam demand can spike around weather changes and moisture issues, so flexible lead volume matters more than flat retainers.",
  },
  {
    icon: ShieldCheck,
    title: "Exclusive market protection",
    description:
      "Smaller pools of qualified contractors make exclusivity more valuable when each local opportunity carries more margin.",
  },
  {
    icon: TimerReset,
    title: "Faster response window",
    description:
      "Homeowners looking for crawlspace encapsulation or spray foam repairs often move quickly, so fast follow up supports close rate.",
  },
];

export const metadata: Metadata = {
  title: "Spray Foam Contractor Leads | Pay Per Lead Growth",
  description:
    "Appointly Solutions helps spray foam contractors generate exclusive, qualified homeowner leads with a pay per lead model built for niche insulation demand.",
  keywords: [
    "spray foam contractor leads",
    "spray foam lead generation",
    "pay per lead spray foam",
    "exclusive spray foam leads",
  ],
  alternates: {
    canonical: "https://getappointly.co/spray-foam-contractor-leads",
  },
  openGraph: {
    title: "Spray Foam Contractor Leads | Pay Per Lead Growth",
    description:
      "See how Appointly Solutions helps spray foam contractors capture qualified demand without relying on retainers.",
    url: "https://getappointly.co/spray-foam-contractor-leads",
    siteName: "Appointly Solutions",
    type: "website",
  },
};

export default function SprayFoamContractorLeadsPage() {
  return (
    <>
      <Navbar />
      <main className="overflow-hidden">
        <section className="relative pt-32 pb-20 md:pt-44 md:pb-28">
          <div className="absolute inset-0 -z-10">
            <div className="absolute top-0 right-0 h-[720px] w-[720px] rounded-full bg-primary/[0.06] blur-[145px]" />
            <div className="absolute inset-0 dot-grid opacity-35" />
          </div>

          <div className="mx-auto max-w-6xl px-6">
            <div className="max-w-3xl">
              <p className="mb-6 text-xs font-semibold uppercase tracking-[0.25em] text-muted-foreground">
                Spray Foam Leads
              </p>
              <h1 className="font-display text-5xl font-bold leading-[1.05] tracking-tight text-balance md:text-6xl">
                Spray Foam Contractor Leads Built for{" "}
                <span className="gradient-text">Specialized Demand</span>
              </h1>
              <p className="mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg">
                Spray foam contractors usually need narrower targeting, better homeowner
                qualification, and more flexible lead pacing than broad insulation
                campaigns provide. Appointly Solutions is built to support that kind of
                specialized market demand.
              </p>
              <div className="mt-10 flex flex-wrap gap-4">
                <a
                  href={bookingUrl}
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-primary px-8 py-4 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90"
                >
                  Book a Strategy Call
                  <ArrowRight className="h-4 w-4" />
                </a>
                <Link
                  href="/insulation-contractor-leads"
                  className="inline-flex items-center justify-center rounded-full border border-gray-300 bg-white px-8 py-4 text-sm font-semibold text-gray-700 transition-all hover:bg-gray-50"
                >
                  See Main Lead Page
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section className="section-divider py-24 md:py-32">
          <div className="mx-auto max-w-6xl px-6">
            <div className="mb-12 max-w-2xl">
              <p className="mb-4 text-xs font-semibold uppercase tracking-[0.25em] text-muted-foreground">
                Why This Market Behaves Differently
              </p>
              <h2 className="font-display text-3xl font-bold text-foreground md:text-4xl">
                Spray foam lead generation is usually narrower and more seasonal.
              </h2>
            </div>

            <div className="grid gap-5 md:grid-cols-2">
              {sprayFoamPoints.map((point) => (
                <article key={point.title} className="glass-card glass-card-hover rounded-3xl p-6">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-primary/20 bg-primary/10">
                    <point.icon className="h-5 w-5 text-primary" />
                  </div>
                  <h3 className="mt-5 font-display text-xl font-semibold text-foreground">
                    {point.title}
                  </h3>
                  <p className="mt-3 text-sm leading-7 text-muted-foreground">
                    {point.description}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section-divider py-24 md:py-32">
          <div className="mx-auto grid max-w-6xl gap-6 px-6 lg:grid-cols-[1.1fr_0.9fr]">
            <article className="glass-card rounded-3xl p-8 md:p-10">
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-muted-foreground">
                Where Appointly Fits
              </p>
              <h2 className="mt-4 font-display text-3xl font-bold text-foreground">
                Better for contractors who need qualified jobs, not broad traffic.
              </h2>
              <p className="mt-5 text-sm leading-7 text-muted-foreground md:text-base">
                Appointly Solutions supports spray foam contractors with pay-per-lead
                positioning, faster response expectations, and exclusivity that protects
                a narrower local market. That makes it easier to compare lead cost against
                real job value instead of against vague traffic metrics.
              </p>
              <p className="mt-4 text-sm leading-7 text-muted-foreground md:text-base">
                For the broader offer, return to{" "}
                <Link href="/insulation-contractor-leads" className="text-primary transition-opacity hover:opacity-80">
                  Insulation Contractor Leads
                </Link>
                . If pricing is the main question, continue to{" "}
                <Link href="/pay-per-lead-insulation" className="text-primary transition-opacity hover:opacity-80">
                  Pay Per Lead Insulation
                </Link>
                .
              </p>
            </article>

            <article className="rounded-3xl border border-primary/20 bg-primary/10 p-8 shadow-[0_0_70px_rgba(125,135,247,0.1)] md:p-10">
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-slate-600">
                Spray Foam Strategy
              </p>
              <h2 className="mt-4 font-display text-3xl font-bold text-foreground">
                Review seasonality, close rate, and market fit before you scale.
              </h2>
              <p className="mt-4 text-sm leading-7 text-slate-700 md:text-base">
                A strategy call with Appointly Solutions can help you compare your
                average spray foam job value, service area, and demand timing against a
                pay-per-lead model that flexes with your market.
              </p>
              <a
                href={bookingUrl}
                className="mt-8 inline-flex items-center justify-center gap-2 rounded-full bg-primary px-8 py-4 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90"
              >
                Book a Strategy Call
                <ArrowRight className="h-4 w-4" />
              </a>
            </article>
          </div>
        </section>

        <ProofSection />
        <SeoResourceLinks
          title="Resources supporting spray foam lead generation."
          description="These pages and articles strengthen the spray foam topic cluster with more detail on benchmarks, seasonality, and pricing."
          resources={getCommercialResources("spray-foam-contractor-leads")}
        />
      </main>
      <Footer />
    </>
  );
}
