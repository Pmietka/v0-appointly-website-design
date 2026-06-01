import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Building2, Map, MapPinned, ShieldCheck } from "lucide-react";

import { Footer } from "@/components/footer";
import { Navbar } from "@/components/navbar";
import { ProofSection } from "@/components/proof-section";
import { SeoResourceLinks } from "@/components/seo-resource-links";
import { getCommercialResources } from "@/lib/seo-resources";

const bookingUrl = "https://client.getappointly.co/strategy-calendar";

const marketPoints = [
  {
    icon: MapPinned,
    title: "Built for tighter service areas",
    description:
      "Smaller markets need cleaner targeting and less wasted ad spend, so we focus the Meta campaigns and only book floor coating estimates that fit your area.",
  },
  {
    icon: ShieldCheck,
    title: "Exclusivity matters more",
    description:
      "In a 50K-300K population market, a shared estimate can create more pricing pressure than it would in a major metro. We keep your booked appointments yours.",
  },
  {
    icon: Building2,
    title: "Crew planning is more sensitive",
    description:
      "Coating crews in smaller metros feel slower months faster, so a steady flow of booked estimates onto the calendar matters more than chasing raw volume.",
  },
  {
    icon: Map,
    title: "Local visibility supports it",
    description:
      "A solid Google profile and reviews help you close the estimates we book, but the engine is Meta ads and instant speed to lead - not waiting on local search.",
  },
];

export const metadata: Metadata = {
  title: "Booked Estimates for Small Markets | Appointly Solutions",
  description:
    "See how Appointly Solutions books exclusive floor coating estimates for contractors in smaller metros using Meta ads, instant speed to lead, and the Appointly Model.",
  keywords: [
    "floor coating appointments small markets",
    "small market coating estimates",
    "local floor coating lead generation",
    "exclusive coating appointments",
  ],
  alternates: {
    canonical: "https://getappointly.co/insulation-contractor-leads-small-markets",
  },
  openGraph: {
    title: "Booked Estimates for Small Markets | Appointly Solutions",
    description:
      "Explore how Appointly Solutions books floor coating estimates for contractors serving smaller metros and regional service areas.",
    url: "https://getappointly.co/insulation-contractor-leads-small-markets",
    siteName: "Appointly Solutions",
    type: "website",
  },
};

export default function SmallMarketInsulationLeadsPage() {
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
                Service Area Page
              </p>
              <h1 className="font-display text-5xl font-bold leading-[1.05] tracking-tight text-balance md:text-6xl">
                Booked Estimates for{" "}
                <span className="gradient-text">Small Markets</span>
              </h1>
              <p className="mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg">
                Appointly Solutions is a strong fit for floor coating contractors serving
                small-to-mid-sized markets where local visibility matters, shared estimates
                create friction fast, and every booked appointment can materially affect the
                schedule.
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
                  href="/exclusive-insulation-leads"
                  className="inline-flex items-center justify-center rounded-xl border border-gray-300 bg-white px-8 py-4 text-sm font-semibold text-gray-700 transition-all hover:bg-gray-50"
                >
                  Exclusive Appointments
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section className="section-divider py-24 md:py-32">
          <div className="mx-auto max-w-6xl px-6">
            <div className="mb-12 max-w-2xl">
              <p className="mb-4 text-xs font-semibold uppercase tracking-[0.25em] text-muted-foreground">
                Why Smaller Markets Need a Different Approach
              </p>
              <h2 className="font-display text-3xl font-bold text-foreground md:text-4xl">
                The local economics change when your coating service area is tighter.
              </h2>
            </div>

            <div className="grid gap-5 md:grid-cols-2">
              {marketPoints.map((point) => (
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
                Where Appointly Fits Best
              </p>
              <h2 className="mt-4 font-display text-3xl font-bold text-foreground">
                Better for contractors who need quality over volume.
              </h2>
              <p className="mt-5 text-sm leading-7 text-muted-foreground md:text-base">
                In smaller metros and regional service areas, Appointly Solutions works
                best when the contractor wants exclusive booked estimates, instant speed
                to lead, and a clean handoff that keeps crews focused on real coating jobs
                instead of chasing noisy inquiries.
              </p>
              <p className="mt-4 text-sm leading-7 text-muted-foreground md:text-base">
                If your main concern is ownership, visit{" "}
                <Link href="/exclusive-insulation-leads" className="text-primary transition-opacity hover:opacity-80">
                  Exclusive Appointments
                </Link>
                . If your team also does epoxy and concrete work, continue to{" "}
                <Link href="/spray-foam-contractor-leads" className="text-primary transition-opacity hover:opacity-80">
                  Epoxy & Concrete Coatings
                </Link>
                .
              </p>
            </article>

            <article className="rounded-3xl border border-primary/20 bg-primary/10 p-8 shadow-[0_0_70px_rgba(125,135,247,0.1)] md:p-10">
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-slate-600">
                Market Review
              </p>
              <h2 className="mt-4 font-display text-3xl font-bold text-foreground">
                Find out if your service area is the right fit for exclusivity.
              </h2>
              <p className="mt-4 text-sm leading-7 text-slate-700 md:text-base">
                A strategy call with Appointly Solutions can help you look at population
                size, service radius, current competition, and whether the Appointly Model
                makes sense for booking coating estimates in your market.
              </p>
              <a
                href={bookingUrl}
                className="mt-8 inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-8 py-4 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90"
              >
                Book a Strategy Call
                <ArrowRight className="h-4 w-4" />
              </a>
            </article>
          </div>
        </section>

        <ProofSection />
        <SeoResourceLinks
          title="Related pages for contractors serving smaller service areas."
          description="These resources support local market positioning with more detail on exclusivity, booked estimates, and seasonal planning."
          resources={getCommercialResources("insulation-contractor-leads-small-markets")}
        />
      </main>
      <Footer />
    </>
  );
}
