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
      "Smaller markets need cleaner targeting, cleaner qualification, and less wasted spend because local search volume is lower.",
  },
  {
    icon: ShieldCheck,
    title: "Exclusivity matters more",
    description:
      "In a 50K-300K population market, one shared appointment can create more pricing pressure than it would in a major metro.",
  },
  {
    icon: Building2,
    title: "Crew planning is more sensitive",
    description:
      "Local insulation contractors in smaller metros often feel slower months faster, so flexible appointment pacing is more useful than fixed retainers.",
  },
  {
    icon: Map,
    title: "GBP signals carry more weight",
    description:
      "In smaller service areas, Google Business Profile strength, reviews, and local relevance can move visibility quickly.",
  },
];

export const metadata: Metadata = {
  title: "Insulation Contractor Appointments for Small Markets | Pay for Performance | Appointly Solutions",
  description:
    "See how Appointly Solutions helps insulation contractors in smaller markets generate exclusive, booked appointments on a pay-for-performance model.",
  keywords: [
    "insulation contractor appointments small markets",
    "small market insulation appointments",
    "local insulation appointment generation",
    "exclusive contractor appointments",
  ],
  alternates: {
    canonical: "https://getappointly.co/insulation-contractor-leads-small-markets",
  },
  openGraph: {
    title: "Insulation Contractor Appointments for Small Markets | Pay for Performance | Appointly Solutions",
    description:
      "Explore how Appointly Solutions fits insulation contractors serving smaller metros and regional service areas on a pay-for-performance basis.",
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
                Insulation Contractor Appointments for{" "}
                <span className="gradient-text">Small Markets</span>
              </h1>
              <p className="mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg">
                Appointly Solutions is a strong fit for insulation contractors serving
                small-to-mid-sized markets where local visibility matters, shared
                appointments create friction fast, and every booked estimate can
                materially affect the schedule. We operate on a pay-for-performance
                basis — when we do well, you do well.
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
                  href="/exclusive-insulation-leads"
                  className="inline-flex items-center justify-center rounded-full border border-gray-300 bg-white px-8 py-4 text-sm font-semibold text-gray-700 transition-all hover:bg-gray-50"
                >
                  See Exclusive Appointments
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
                The local economics change when your service area is tighter.
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
                Better for insulation contractors who need quality over volume.
              </h2>
              <p className="mt-5 text-sm leading-7 text-muted-foreground md:text-base">
                In smaller metros and regional service areas, Appointly Solutions works
                best when the insulation contractor wants exclusive appointment delivery,
                quick follow up, and qualification standards that keep crews focused on
                real revenue opportunities instead of noisy inquiries.
              </p>
              <p className="mt-4 text-sm leading-7 text-muted-foreground md:text-base">
                If your main concern is appointment ownership, visit{" "}
                <Link href="/exclusive-insulation-leads" className="text-primary transition-opacity hover:opacity-80">
                  Exclusive Insulation Appointments
                </Link>
                . If your team also performs spray foam work, continue to{" "}
                <Link href="/spray-foam-contractor-leads" className="text-primary transition-opacity hover:opacity-80">
                  Spray Foam Contractor Appointments
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
                size, service radius, current competition, and whether a pay-for-performance
                appointment model makes sense in your insulation market.
              </p>
              <a
                href={bookingUrl}
                className="mt-8 inline-flex items-center justify-center gap-2 rounded-full bg-primary px-8 py-4 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90"
              >
                Book a free strategy call
                <ArrowRight className="h-4 w-4" />
              </a>
            </article>
          </div>
        </section>

        <ProofSection />
        <SeoResourceLinks
          title="Related pages for insulation contractors serving smaller service areas."
          description="These resources support local market positioning with more detail on exclusivity, GBP strength, and seasonal planning."
          resources={getCommercialResources("insulation-contractor-leads-small-markets")}
        />
      </main>
      <Footer />
    </>
  );
}
