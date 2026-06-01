import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  BadgeCheck,
  CalendarCheck2,
  DollarSign,
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
    icon: DollarSign,
    title: "No monthly retainer",
    description:
      "Traditional agencies charge every month whether they deliver floor coating jobs or not. We do not. You are not paying for management hours, strategy decks, or monthly reports on impressions.",
  },
  {
    icon: CalendarCheck2,
    title: "Only pay for booked appointments",
    description:
      "Our cost is tied to booked floor coating estimate appointments that land on your calendar — not clicks, not form fills, not leads that never answer the phone.",
  },
  {
    icon: ShieldCheck,
    title: "Full system included — ads, follow-up, booking",
    description:
      "We handle the Meta ad campaigns, the follow-up with homeowner inquiries, and the calendar scheduling. You do not need to manage any of it or hire someone to run it.",
  },
  {
    icon: BadgeCheck,
    title: "Cancel anytime — no contract lock-in",
    description:
      "We do not lock floor coating contractors into long-term agreements. If we are not filling your calendar with quality estimates, you should be able to walk. That is what performance accountability looks like.",
  },
];

export const metadata: Metadata = {
  title: "Floor Coating Marketing Agency Alternative | Pay for Performance, Not Retainers",
  description:
    "Appointly Solutions is the floor coating marketing alternative to monthly retainers. We only charge for booked estimate appointments — when we do well, you do well.",
  keywords: [
    "floor coating marketing agency",
    "floor coating contractor marketing",
    "floor coating appointment booking agency",
    "pay per appointment floor coating",
    "epoxy floor coating marketing",
    "Appointly Solutions",
  ],
  alternates: {
    canonical: "https://getappointly.co/floor-coating-marketing-agency",
  },
  openGraph: {
    title: "Floor Coating Marketing Agency Alternative | Pay for Performance, Not Retainers",
    description:
      "See why floor coating contractors choose Appointly Solutions over traditional agencies — performance-based pricing, no retainer, booked appointments only.",
    url: "https://getappointly.co/floor-coating-marketing-agency",
    siteName: "Appointly Solutions",
    type: "website",
  },
};

export default function FloorCoatingMarketingAgencyPage() {
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
                Floor Coating Contractors vs Agencies
              </p>
              <h1 className="font-display text-5xl font-bold leading-[1.05] tracking-tight text-balance md:text-6xl">
                Why floor coating contractors choose{" "}
                <span className="gradient-text">performance over retainers</span>
              </h1>
              <p className="mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg">
                Most marketing agencies charge a fixed monthly fee whether they produce
                floor coating jobs or not. Appointly Solutions works differently — we only
                charge for booked estimate appointments. When we do well, you do well.
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
                The Retainer Problem
              </p>
              <h2 className="font-display text-3xl font-bold text-foreground md:text-4xl">
                Paying an agency every month for floor coating leads that never close is not a marketing problem. It is a pricing model problem.
              </h2>
              <p className="mt-4 leading-relaxed text-muted-foreground">
                Retainer agencies bill you for time and effort regardless of what lands in
                your calendar. The performance-based model exists for contractors who would
                rather pay for results than pay for activity and hope the activity works out.
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
                Performance vs Retainer — What the Difference Looks Like
              </p>
              <h2 className="mt-4 font-display text-3xl font-bold text-foreground">
                An agency charges you for the month. We charge you for the appointment.
              </h2>
              <p className="mt-5 text-sm leading-7 text-muted-foreground md:text-base">
                A traditional agency relationship for a floor coating contractor might
                include a monthly retainer for ad management, reporting, and strategy calls.
                The invoice arrives at the end of the month regardless of how many jobs
                were booked. Slow season? You still pay. Ad performance dips? You still pay.
              </p>
              <p className="mt-4 text-sm leading-7 text-muted-foreground md:text-base">
                Our model flips that logic. The cost is tied to the outcome: a confirmed
                homeowner estimate appointment on your calendar. An epoxy and garage coating
                contractor we work with maintains roughly a 60% close rate on the appointments
                we send and we keep his calendar consistently filled. That is what
                performance-tied pricing is designed to produce.
              </p>
              <p className="mt-4 text-sm leading-7 text-muted-foreground md:text-base">
                For a full breakdown of the system, visit the{" "}
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
                Compare the Model
              </p>
              <h2 className="mt-4 font-display text-3xl font-bold text-slate-950">
                See what a performance-based floor coating calendar looks like for your market.
              </h2>
              <p className="mt-4 text-sm leading-7 text-slate-700 md:text-base">
                Book a strategy call. We will walk through your service area, your coating
                specialties, and what appointment volume would actually make sense given
                your crew capacity — with no retainer required to get started.
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
          description="These links reinforce the agency-alternative angle with supporting pages across the floor coating appointment system."
          resources={getCommercialResources("floor-coating-contractor-marketing")}
        />
      </main>
      <Footer />
    </>
  );
}
