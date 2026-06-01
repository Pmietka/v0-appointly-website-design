import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  BadgeCheck,
  CalendarCheck2,
  ShieldCheck,
  Target,
  Zap,
} from "lucide-react";

import { Footer } from "@/components/footer";
import { Navbar } from "@/components/navbar";
import { ProofSection } from "@/components/proof-section";
import { SeoResourceLinks } from "@/components/seo-resource-links";
import { getCommercialResources } from "@/lib/seo-resources";

const bookingUrl = "https://client.getappointly.co/strategy-calendar";

const highlights = [
  {
    icon: ShieldCheck,
    title: "Exclusive territory — one epoxy contractor per market",
    description:
      "Your epoxy floor coating appointments are never sent to a competing contractor in the same area. When we commit to your market, it belongs to you.",
  },
  {
    icon: BadgeCheck,
    title: "Homeowners pre-qualified before they reach your calendar",
    description:
      "We confirm homeowner status, service area, and project scope before booking. You arrive to homeowners who are ready for an epoxy floor coating estimate, not just browsing.",
  },
  {
    icon: Zap,
    title: "Fast follow-up while the interest is hot",
    description:
      "Speed matters in home services. Our system follows up with homeowner inquiries quickly so that by the time an appointment lands on your calendar, the prospect is warm and expecting your call.",
  },
  {
    icon: CalendarCheck2,
    title: "Pay for performance — only for booked appointments",
    description:
      "You are not paying a flat monthly fee for ad spend or management hours. Our model ties your cost directly to booked epoxy floor coating estimate appointments.",
  },
];

export const metadata: Metadata = {
  title: "Epoxy Floor Coating Appointments | Booked Estimates via Meta Ads",
  description:
    "Get booked epoxy floor coating estimate appointments from Appointly Solutions. We run Meta ads, qualify homeowners, and schedule appointments straight onto your calendar.",
  keywords: [
    "epoxy floor coating appointments",
    "epoxy floor coating leads",
    "epoxy floor contractor marketing",
    "booked epoxy floor estimates",
    "Meta ads epoxy flooring",
    "Appointly Solutions",
  ],
  alternates: {
    canonical: "https://getappointly.co/epoxy-floor-coating-appointments",
  },
  openGraph: {
    title: "Epoxy Floor Coating Appointments | Booked Estimates via Meta Ads",
    description:
      "See how Appointly Solutions books epoxy floor coating contractors with pre-qualified homeowner estimate appointments using a pay-for-performance model.",
    url: "https://getappointly.co/epoxy-floor-coating-appointments",
    siteName: "Appointly Solutions",
    type: "website",
  },
};

export default function EpoxyFloorCoatingAppointmentsPage() {
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
                Epoxy Floor Coating Contractors
              </p>
              <h1 className="font-display text-5xl font-bold leading-[1.05] tracking-tight text-balance md:text-6xl">
                Get booked epoxy floor coating estimates{" "}
                <span className="gradient-text">without chasing every inquiry</span>
              </h1>
              <p className="mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg">
                We run Meta ads targeting homeowners who want epoxy floor installations,
                follow up with every inquiry, qualify each prospect, and book confirmed
                estimate appointments straight onto your calendar. You close the job.
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
                How Epoxy Appointments Work
              </p>
              <h2 className="font-display text-3xl font-bold text-foreground md:text-4xl">
                Epoxy floor coating jobs start with the right homeowner conversation.
              </h2>
              <p className="mt-4 leading-relaxed text-muted-foreground">
                Homeowners searching for epoxy flooring have a specific project in mind.
                Our system finds them on Meta, captures their interest, qualifies their
                project, and books them directly into your estimate calendar. No guesswork,
                no cold follow-up marathons.
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
                Why Epoxy Contractors Switch to Appointments
              </p>
              <h2 className="mt-4 font-display text-3xl font-bold text-foreground">
                The difference between an epoxy lead and an epoxy appointment is the close rate.
              </h2>
              <p className="mt-5 text-sm leading-7 text-muted-foreground md:text-base">
                A raw lead is a name and a phone number. An appointment is a homeowner who
                confirmed interest, verified their address is in your service area, described
                their project, and chose a time to meet with you. Those two things are not
                the same, and they do not produce the same results.
              </p>
              <p className="mt-4 text-sm leading-7 text-muted-foreground md:text-base">
                An epoxy and garage coating contractor we work with closed on the first two
                appointments we ever sent him. He maintains roughly a 60% close rate on the
                appointments we send and we keep his calendar consistently filled.
              </p>
              <p className="mt-4 text-sm leading-7 text-muted-foreground md:text-base">
                Also see{" "}
                <Link href="/exclusive-floor-coating-appointments" className="text-primary transition-colors hover:opacity-80">
                  Exclusive Floor Coating Appointments
                </Link>{" "}
                if market exclusivity is your primary concern.
              </p>
            </article>

            <article className="rounded-3xl border border-primary/20 bg-primary/10 p-8 shadow-[0_0_70px_rgba(125,135,247,0.10)] md:p-10">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-primary/20 bg-white/60">
                <Target className="h-5 w-5 text-slate-950" />
              </div>
              <p className="mt-6 text-xs font-semibold uppercase tracking-[0.25em] text-slate-600">
                Next Step
              </p>
              <h2 className="mt-4 font-display text-3xl font-bold text-slate-950">
                Find out if your epoxy market has open availability.
              </h2>
              <p className="mt-4 text-sm leading-7 text-slate-700 md:text-base">
                We only work with one epoxy floor coating contractor per market. Book a
                strategy call to see if your service area is available and what appointment
                volume would look like for your crew.
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
          description="These links reinforce the epoxy appointment page with supporting pages around the full floor coating system."
          resources={getCommercialResources("floor-coating-contractor-marketing")}
        />
      </main>
      <Footer />
    </>
  );
}
