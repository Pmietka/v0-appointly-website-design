import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, CalendarCheck2, Layers, ShieldCheck, TimerReset } from "lucide-react";

import { Breadcrumbs } from "@/components/breadcrumbs";
import { FaqBlock } from "@/components/faq-block";
import { Footer } from "@/components/footer";
import { Navbar } from "@/components/navbar";
import { ProofSection } from "@/components/proof-section";
import { SeoResourceLinks } from "@/components/seo-resource-links";
import { getCommercialResources } from "@/lib/seo-resources";

const bookingUrl = "https://client.getappointly.co/strategy-calendar";

const sprayFoamPoints = [
  {
    icon: Layers,
    title: "Built for specialized jobs",
    description:
      "Epoxy and polyaspartic estimates need tighter targeting because the homeowner is usually searching for a specific finish - a garage floor, showroom, or warehouse coating - not general education.",
  },
  {
    icon: CalendarCheck2,
    title: "Steady through seasonal swings",
    description:
      "Coating demand can spike with warmer weather and new-build cycles, so we pace the Meta ads and keep booking estimates onto your calendar as interest moves.",
  },
  {
    icon: ShieldCheck,
    title: "Exclusive market protection",
    description:
      "Smaller pools of qualified coating crews make exclusivity more valuable when each local job - garage, basement, patio, or showroom floor - carries real margin.",
  },
  {
    icon: TimerReset,
    title: "Faster response window",
    description:
      "Homeowners pricing an epoxy garage floor or concrete coating move quickly, so we contact them instantly - speed to lead - before they call another crew.",
  },
];

const faqItems = [
  {
    question: "Where do your epoxy flooring leads come from?",
    answer:
      "From Meta ads we run in your service area. Homeowners respond to before-and-after garage floor creative, submit a short form, and our team calls them within minutes to qualify and book the estimate.",
  },
  {
    question: "Do you book estimates for polyaspartic and polyurea systems, not just epoxy?",
    answer:
      "Yes. Homeowners search for epoxy, but most of the jobs we book are full flake systems with a polyaspartic topcoat. The ads speak the homeowner's language and you quote the system you actually install.",
  },
  {
    question: "What does an epoxy flooring lead cost compared to a booked estimate?",
    answer:
      "Shared epoxy leads from marketplaces typically cost $40 to $100 each and are sold to several contractors. A booked estimate from Appointly is exclusive and priced per appointment, so you pay for a homeowner with a confirmed time on your calendar, not a phone number.",
  },
  {
    question: "Can you fill a calendar for a single-crew epoxy business?",
    answer:
      "Yes. Tell us how many estimates per month your crew can run and we size the campaign to that number. Many clients start at 15 to 25 booked estimates a month.",
  },
];

export const metadata: Metadata = {
  title: "Epoxy Flooring Leads for Coating Contractors | Appointly",
  description:
    "Exclusive epoxy, polyaspartic, and concrete coating leads, qualified and booked as estimates on your calendar. Built for garage floor coating specialists.",
  keywords: [
    "epoxy contractor appointments",
    "concrete coating leads",
    "polyaspartic coating estimates",
    "garage floor coating appointments",
    "exclusive coating appointments",
  ],
  alternates: {
    canonical: "https://getappointly.co/epoxy-flooring-leads",
  },
  openGraph: {
    title: "Epoxy Flooring Leads for Coating Contractors | Appointly",
    description:
      "Exclusive epoxy and concrete coating estimates booked onto your calendar through Meta ads and instant speed to lead.",
    url: "https://getappointly.co/epoxy-flooring-leads",
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
            <Breadcrumbs items={[{ name: "Epoxy Flooring Leads", href: "/epoxy-flooring-leads" }]} className="mb-8" />
            <div className="max-w-3xl">
              <p className="mb-6 text-xs font-semibold uppercase tracking-[0.25em] text-muted-foreground">
                Epoxy & Concrete Coatings
              </p>
              <h1 className="font-display text-5xl font-bold leading-[1.05] tracking-tight text-balance md:text-6xl">
                Epoxy flooring leads, booked as estimates for{" "}
                <span className="gradient-text">coating specialists</span>
              </h1>
              <p className="mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg">
                Epoxy and polyaspartic specialists need narrower targeting and faster
                response than broad home service campaigns provide. Appointly Solutions
                runs the Meta ads, contacts each homeowner instantly, and books the
                coating estimate onto your calendar - garage floors, showrooms,
                warehouses, patios, and basements.
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
                  href="/floor-coating-leads"
                  className="inline-flex items-center justify-center rounded-xl border border-gray-300 bg-white px-8 py-4 text-sm font-semibold text-gray-700 transition-all hover:bg-gray-50"
                >
                  Floor Coating Appointments
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
                Booking coating estimates is usually narrower and more seasonal.
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
                Better for coating crews who need booked estimates, not raw traffic.
              </h2>
              <p className="mt-5 text-sm leading-7 text-muted-foreground md:text-base">
                Appointly Solutions supports epoxy and concrete coating specialists with
                Meta ads, instant speed to lead, and exclusivity that protects a narrower
                local market. You compare what you pay per booked estimate against the
                value of a real coating job, not against vague traffic metrics.
              </p>
              <p className="mt-4 text-sm leading-7 text-muted-foreground md:text-base">
                For the broader service page, return to{" "}
                <Link href="/floor-coating-leads" className="text-primary transition-opacity hover:opacity-80">
                  Floor Coating Appointments
                </Link>
                . To understand how the model works, continue to{" "}
                <Link href="/pricing" className="text-primary transition-opacity hover:opacity-80">
                  The Appointly Model
                </Link>
                .
              </p>
            </article>

            <article className="rounded-3xl border border-primary/20 bg-primary/10 p-8 shadow-[0_0_70px_rgba(125,135,247,0.1)] md:p-10">
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-slate-600">
                Coating Strategy
              </p>
              <h2 className="mt-4 font-display text-3xl font-bold text-foreground">
                Review seasonality, close rate, and market fit before you scale.
              </h2>
              <p className="mt-4 text-sm leading-7 text-slate-700 md:text-base">
                A strategy call with Appointly Solutions can help you compare your
                average coating job value, service area, and demand timing against the
                Appointly Model - a retainer plus a per-appointment fee for each booked
                estimate we put on your calendar.
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

        <FaqBlock items={faqItems} />
        <ProofSection />
        <SeoResourceLinks
          title="Resources supporting epoxy and concrete coating appointments."
          description="These pages and articles strengthen the coating topic cluster with more detail on booked estimates, seasonality, and the Appointly Model."
          resources={getCommercialResources("epoxy-flooring-leads")}
        />
      </main>
      <Footer />
    </>
  );
}
