import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  BadgeCheck,
  CalendarCheck2,
  Lock,
  ShieldCheck,
  Target,
} from "lucide-react";

import { Footer } from "@/components/footer";
import { Navbar } from "@/components/navbar";
import { ProofSection } from "@/components/proof-section";
import { SeoResourceLinks } from "@/components/seo-resource-links";
import { getCommercialResources } from "@/lib/seo-resources";

const bookingUrl = "https://client.getappointly.co/strategy-calendar";

const highlights = [
  {
    icon: Lock,
    title: "Exclusively yours — never shared",
    description:
      "Every floor coating appointment we book goes to one contractor: you. Your appointments are not auctioned, split, or resold to anyone else in your market.",
  },
  {
    icon: ShieldCheck,
    title: "Market lock — one contractor per service area",
    description:
      "Once we take on a floor coating contractor in your area, that market is closed. No competitor gets the same homeowner introductions you are receiving.",
  },
  {
    icon: BadgeCheck,
    title: "Pre-qualified homeowners ready for estimates",
    description:
      "We confirm homeowner status, service area, and project scope before any appointment reaches your calendar. You show up to conversations that are already qualified.",
  },
  {
    icon: CalendarCheck2,
    title: "Cancel anytime — no long-term lock-in",
    description:
      "You keep your market exclusivity for as long as you are active. If you ever need to pause, you can do so without penalty. We keep you because of results, not contracts.",
  },
];

export const metadata: Metadata = {
  title: "Exclusive Floor Coating Appointments | One Contractor Per Market",
  description:
    "Appointly Solutions delivers exclusive floor coating appointments to one contractor per market. Your booked estimates are never shared with a competitor.",
  keywords: [
    "exclusive floor coating appointments",
    "exclusive floor coating leads",
    "floor coating exclusive territory",
    "one contractor per market floor coating",
    "exclusive epoxy floor appointments",
    "Appointly Solutions",
  ],
  alternates: {
    canonical: "https://getappointly.co/exclusive-floor-coating-appointments",
  },
  openGraph: {
    title: "Exclusive Floor Coating Appointments | One Contractor Per Market",
    description:
      "See how Appointly Solutions locks floor coating appointments to one contractor per market — never shared, always pre-qualified, pay for performance.",
    url: "https://getappointly.co/exclusive-floor-coating-appointments",
    siteName: "Appointly Solutions",
    type: "website",
  },
};

export default function ExclusiveFloorCoatingAppointmentsPage() {
  return (
    <>
      <Navbar />
      <main className="overflow-hidden">
        <section className="relative pb-20 pt-32 md:pb-28 md:pt-44">
          <div className="absolute inset-0 -z-10">
            <div className="absolute right-0 top-0 h-[720px] w-[720px] rounded-full bg-primary/[0.10] blur-[140px]" />
            <div className="absolute inset-0 dot-grid opacity-35" />
          </div>

          <div className="mx-auto max-w-6xl px-6">
            <div className="max-w-3xl">
              <p className="mb-6 text-xs font-semibold uppercase tracking-[0.25em] text-muted-foreground">
                Exclusive Floor Coating Territory
              </p>
              <h1 className="font-display text-5xl font-bold leading-[1.05] tracking-tight text-balance md:text-6xl">
                Your floor coating appointments are{" "}
                <span className="gradient-text">never shared with a competitor</span>
              </h1>
              <p className="mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg">
                Every booked floor coating estimate appointment we generate belongs to you
                and only you. We work with one contractor per market, which means your
                homeowner conversations are not being sent to someone else the moment after.
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
          <div className="mx-auto max-w-6xl px-6">
            <div className="mb-12 max-w-2xl">
              <p className="mb-4 text-xs font-semibold uppercase tracking-[0.25em] text-muted-foreground">
                What Exclusive Really Means
              </p>
              <h2 className="font-display text-3xl font-bold text-foreground md:text-4xl">
                Shared appointments create a race. Exclusive appointments create a business.
              </h2>
              <p className="mt-4 leading-relaxed text-muted-foreground">
                When the same homeowner inquiry goes to three floor coating contractors
                simultaneously, the only winner is whoever answers first — and often it
                is a race to the lowest price. Exclusive appointments remove that dynamic
                entirely. You are the only contractor the homeowner is expecting to hear from.
              </p>
            </div>

            <div className="grid gap-5 md:grid-cols-2">
              {highlights.map((item) => (
                <article key={item.title} className="glass-card glass-card-hover rounded-3xl p-6">
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

        <section className="section-divider py-24 md:py-32">
          <div className="mx-auto grid max-w-6xl gap-6 px-6 lg:grid-cols-[1.1fr_0.9fr]">
            <article className="glass-card rounded-3xl p-8 md:p-10">
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-muted-foreground">
                Why Exclusivity Changes the Math
              </p>
              <h2 className="mt-4 font-display text-3xl font-bold text-foreground">
                The same homeowner is worth more when they are only talking to you.
              </h2>
              <p className="mt-5 text-sm leading-7 text-muted-foreground md:text-base">
                Exclusivity does more than protect your territory. It directly supports your
                close rate. When a homeowner has one contractor coming out for an estimate,
                the conversation happens on different terms — you are not competing on price
                before you have even knocked on the door.
              </p>
              <p className="mt-4 text-sm leading-7 text-muted-foreground md:text-base">
                An epoxy and garage coating contractor we work with maintains roughly a 60%
                close rate on the appointments we send and we keep his calendar consistently
                filled. Exclusivity is a core part of why those numbers hold.
              </p>
              <p className="mt-4 text-sm leading-7 text-muted-foreground md:text-base">
                For a broader look at the full system, visit the{" "}
                <Link href="/floor-coating-contractor-marketing" className="text-primary transition-colors hover:opacity-80">
                  Floor Coating Contractor Marketing
                </Link>{" "}
                hub page.
              </p>
            </article>

            <article className="rounded-3xl border border-primary/20 bg-primary/10 p-8 shadow-[0_0_70px_rgba(125,135,247,0.10)] md:p-10">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-primary/20 bg-white/60">
                <Target className="h-5 w-5 text-slate-950" />
              </div>
              <p className="mt-6 text-xs font-semibold uppercase tracking-[0.25em] text-slate-600">
                Check Availability
              </p>
              <h2 className="mt-4 font-display text-3xl font-bold text-slate-950">
                Find out if your floor coating market is still available.
              </h2>
              <p className="mt-4 text-sm leading-7 text-slate-700 md:text-base">
                Markets fill up. Book a strategy call to see if your service area is still
                open and what exclusive floor coating appointment volume would look like
                for your operation.
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
          title="Keep exploring the highest-intent pages."
          description="These links reinforce the exclusivity page with supporting pages across the floor coating appointment system."
          resources={getCommercialResources("floor-coating-contractor-marketing")}
        />
      </main>
      <Footer />
    </>
  );
}
