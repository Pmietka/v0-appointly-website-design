import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, BadgeCheck, Clock3, ShieldCheck, Zap } from "lucide-react";

import { Footer } from "@/components/footer";
import { Navbar } from "@/components/navbar";
import { ProofSection } from "@/components/proof-section";
import { SeoResourceLinks } from "@/components/seo-resource-links";
import { getCommercialResources } from "@/lib/seo-resources";

const bookingUrl = "https://client.getappointly.co/strategy-calendar";

const differentiators = [
  {
    icon: ShieldCheck,
    title: "One contractor per market",
    description:
      "We only work with one contractor per service area. Your appointments are never shared with a competitor.",
  },
  {
    icon: BadgeCheck,
    title: "Qualified and booked before handoff",
    description:
      "Every prospect is screened for homeowner status, service area, and project fit — then booked directly onto your calendar before you ever hear from them.",
  },
  {
    icon: Clock3,
    title: "Full system included",
    description:
      "GMB optimization, Meta ads, follow-up, and an NFC review card system are all part of the setup — not sold as add-ons.",
  },
  {
    icon: Zap,
    title: "No retainer. No contract.",
    description:
      "You pay per booked appointment delivered. Cancel anytime with notice. No lock-in, no guesswork.",
  },
];

export const metadata: Metadata = {
  title: "About Appointly Solutions | Appointment Booking Agency for Contractors",
  description:
    "Learn why Appointly Solutions helps home service contractors grow with booked estimate appointments, fast follow-up, and a pay-for-performance model.",
  keywords: [
    "Appointly Solutions",
    "contractor appointment booking",
    "about us",
    "home service contractor marketing",
  ],
  alternates: {
    canonical: "https://getappointly.co/about",
  },
  openGraph: {
    title: "About Appointly Solutions | Appointment Booking Agency for Contractors",
    description:
      "See the mission, approach, and values behind Appointly Solutions and how we help home service contractors book more qualified estimate appointments.",
    url: "https://getappointly.co/about",
    siteName: "Appointly Solutions",
    type: "website",
  },
};

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <main className="overflow-hidden">
        <section className="relative pt-32 pb-20 md:pt-44 md:pb-28">
          <div className="absolute inset-0 -z-10">
            <div className="absolute top-0 right-0 h-[720px] w-[720px] rounded-full bg-primary/[0.06] blur-[140px]" />
            <div className="absolute inset-0 dot-grid opacity-40" />
          </div>

          <div className="mx-auto max-w-6xl px-6">
            <div className="max-w-3xl">
              <p className="mb-6 text-xs font-semibold uppercase tracking-[0.25em] text-muted-foreground">
                About Appointly Solutions
              </p>
              <h1 className="font-display text-5xl font-bold leading-[1.05] tracking-tight text-balance md:text-6xl">
                About <span className="gradient-text">Appointly Solutions</span>
              </h1>
              <p className="mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg">
                Founded by brothers Patrick and Jacob Mietka in Chicago, IL, Appointly
                Solutions was built out of frustration with agencies that charge retainers
                without delivering results. We built a pay-for-performance model because
                contractors deserve accountability — you should only pay when we actually
                deliver booked estimate appointments.
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
                  href="/how-it-works"
                  className="inline-flex items-center justify-center rounded-full border border-gray-300 bg-white px-8 py-4 text-sm font-semibold text-gray-700 transition-all hover:bg-gray-50"
                >
                  See How It Works
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section className="section-divider py-24 md:py-32">
          <div className="mx-auto grid max-w-6xl gap-6 px-6 lg:grid-cols-2">
            <article className="glass-card rounded-3xl p-8 md:p-10">
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-muted-foreground">
                Why We Exist
              </p>
              <h2 className="mt-4 font-display text-3xl font-bold text-foreground">
                Contractors deserve a model that rewards results.
              </h2>
              <p className="mt-5 text-sm leading-7 text-muted-foreground md:text-base">
                Traditional agencies charge large monthly retainers before any result
                shows up. That leaves contractors carrying all the risk while the
                agency collects regardless. Appointly Solutions was built specifically
                for owner-operators who are done paying for promises. The
                pay-for-performance model exists for one reason: you should only pay
                when we actually deliver something you can close.
              </p>
              <p className="mt-4 text-sm leading-7 text-muted-foreground md:text-base">
                If you want the full breakdown, our{" "}
                <Link href="/faq" className="text-primary transition-opacity hover:opacity-80">
                  FAQ page
                </Link>{" "}
                covers what qualifies as a booked appointment and how the model works in practice.
              </p>
            </article>

            <article className="glass-card rounded-3xl p-8 md:p-10">
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-muted-foreground">
                Our Approach
              </p>
              <h2 className="mt-4 font-display text-3xl font-bold text-foreground">
                Pay for performance, no retainer, lower risk.
              </h2>
              <p className="mt-5 text-sm leading-7 text-muted-foreground md:text-base">
                Appointly Solutions optimizes your GMB, runs Meta ads, qualifies every
                homeowner prospect, books them directly onto your calendar, and ships
                you NFC review cards to keep your Google profile growing. You pay per
                booked appointment delivered — not for hours, reports, or guesswork.
                When we do well, you do well.
              </p>
              <p className="mt-4 text-sm leading-7 text-muted-foreground md:text-base">
                Our{" "}
                <Link href="/how-it-works" className="text-primary transition-opacity hover:opacity-80">
                  How It Works
                </Link>{" "}
                page walks through each step of the process from campaign launch to
                booked estimate. You can also explore our{" "}
                <Link
                  href="/floor-coating-contractor-marketing"
                  className="text-primary transition-opacity hover:opacity-80"
                >
                  floor coating appointments
                </Link>{" "}
                page if you want to see the featured niche overview.
              </p>
            </article>
          </div>
        </section>

        <section className="section-divider relative py-24 md:py-32">
          <div className="absolute inset-0 -z-10">
            <div className="absolute left-1/4 top-0 h-[560px] w-[560px] rounded-full bg-primary/[0.06] blur-[120px]" />
          </div>

          <div className="mx-auto max-w-6xl px-6">
            <div className="max-w-2xl">
              <p className="mb-4 text-xs font-semibold uppercase tracking-[0.25em] text-muted-foreground">
                What We Value
              </p>
              <h2 className="font-display text-3xl font-bold text-foreground md:text-4xl">
                Built around exclusivity, speed, and trust.
              </h2>
              <p className="mt-4 leading-relaxed text-muted-foreground">
                Appointly Solutions is designed to give home service contractors a
                reliable appointment-booking engine that feels accountable from day one.
              </p>
            </div>

            <div className="mt-12 grid gap-5 md:grid-cols-2">
              {differentiators.map((item) => (
                <article
                  key={item.title}
                  className="glass-card glass-card-hover rounded-2xl p-6"
                >
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-primary/20 bg-primary/10">
                    <item.icon className="h-5 w-5 text-primary" />
                  </div>
                  <h3 className="mt-5 font-display text-xl font-semibold text-foreground">
                    {item.title}
                  </h3>
                  <p className="mt-3 text-sm leading-7 text-muted-foreground">
                    {item.description}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <ProofSection />
        <SeoResourceLinks
          title="Supporting pages worth visiting next."
          description="These pages reinforce the about story with commercial context, performance-model comparisons, and proof-led examples."
          resources={getCommercialResources("insulation-marketing-agency")}
        />

        <section className="section-divider py-24 md:py-32">
          <div className="mx-auto max-w-5xl px-6">
            <div className="rounded-[32px] border border-primary/20 bg-primary/10 p-8 text-center shadow-[0_0_80px_rgba(125,135,247,0.12)] md:p-12">
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-slate-600">
                Ready To Grow
              </p>
              <h2 className="mt-4 font-display text-3xl font-bold text-foreground md:text-4xl">
                See if Appointly Solutions fits your market.
              </h2>
              <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-slate-700 md:text-base">
                Book a free strategy call and we will map out where your estimate
                opportunities are coming from, what is slipping through the cracks, and
                how a pay-for-performance appointment system could support your next stage
                of growth.
              </p>
              <a
                href={bookingUrl}
                className="mt-8 inline-flex items-center justify-center gap-2 rounded-full bg-primary px-8 py-4 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90"
              >
                Book a free strategy call
                <ArrowRight className="h-4 w-4" />
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
