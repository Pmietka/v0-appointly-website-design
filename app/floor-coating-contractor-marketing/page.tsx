import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  BadgeCheck,
  CalendarCheck2,
  ShieldCheck,
  Star,
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
    icon: ShieldCheck,
    title: "One floor coating contractor per market",
    description:
      "We work with one floor coating contractor per service area, which means your appointments are never shared with a competing epoxy or garage coating company in your market.",
  },
  {
    icon: CalendarCheck2,
    title: "Appointments booked directly on your calendar",
    description:
      "We handle the ads, follow-up, and scheduling so that confirmed estimate appointments land directly on your calendar. You show up, do the coating, collect the check.",
  },
  {
    icon: BadgeCheck,
    title: "Homeowners pre-qualified for project fit and budget",
    description:
      "Before an appointment reaches your calendar, we have confirmed homeowner status, service area, and project scope so you are not wasting time on the wrong conversations.",
  },
  {
    icon: Star,
    title: "Pay for performance — only when we deliver booked estimates",
    description:
      "Our model is built around results. When we do well, you do well. You are not paying a monthly retainer for activity that may or may not produce real floor coating estimates.",
  },
];

export const metadata: Metadata = {
  title: "Floor Coating Contractor Marketing | Booked Appointments via Meta Ads",
  description:
    "Appointly Solutions fills floor coating contractor calendars with booked estimate appointments using Meta ads, homeowner follow-up, and a pay-for-performance model.",
  keywords: [
    "floor coating contractor marketing",
    "floor coating appointments",
    "epoxy floor coating leads",
    "garage floor coating marketing",
    "floor coating Meta ads",
    "Appointly Solutions",
  ],
  alternates: {
    canonical: "https://getappointly.co/floor-coating-contractor-marketing",
  },
  openGraph: {
    title: "Floor Coating Contractor Marketing | Booked Appointments via Meta Ads",
    description:
      "See how Appointly Solutions helps floor coating contractors fill their estimate calendars with pre-qualified homeowner appointments using a pay-for-performance model.",
    url: "https://getappointly.co/floor-coating-contractor-marketing",
    siteName: "Appointly Solutions",
    type: "website",
  },
};

export default function FloorCoatingContractorMarketingPage() {
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
                For Floor Coating Contractors
              </p>
              <h1 className="font-display text-5xl font-bold leading-[1.05] tracking-tight text-balance md:text-6xl">
                Fill your floor coating estimate calendar with{" "}
                <span className="gradient-text">booked appointments</span>
              </h1>
              <p className="mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg">
                We run Meta ads, follow up with homeowner prospects, and book appointments
                straight onto your calendar. You show up, do the coating, collect the check.
                Floor coatings is our featured niche.
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
                The Appointment Model
              </p>
              <h2 className="font-display text-3xl font-bold text-foreground md:text-4xl">
                Stop chasing inquiries. Start showing up to booked estimates.
              </h2>
              <p className="mt-4 leading-relaxed text-muted-foreground">
                Most floor coating contractors spend too much time following up on
                cold web forms and wasted inquiries. Our system is built differently —
                we do the follow-up, we do the qualification, and we put confirmed
                appointments on your calendar so you can focus on the work.
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
                Why Floor Coating Contractors Choose This Model
              </p>
              <h2 className="mt-4 font-display text-3xl font-bold text-foreground">
                Why floor coating contractors choose the appointment model over chasing leads themselves.
              </h2>
              <p className="mt-5 text-sm leading-7 text-muted-foreground md:text-base">
                Chasing cold form fills is exhausting and unpredictable. The appointment
                model means a homeowner has already confirmed interest, fit, and availability
                before your name ever appears on the calendar. That changes the entire tone
                of the sales conversation.
              </p>
              <p className="mt-4 text-sm leading-7 text-muted-foreground md:text-base">
                An epoxy and garage coating contractor we work with closed on the first two
                appointments we ever sent him. He maintains roughly a 60% close rate on the
                appointments we send and we keep his calendar consistently filled. The
                appointment model removes the guesswork from pipeline building.
              </p>
              <p className="mt-4 text-sm leading-7 text-muted-foreground md:text-base">
                Explore the specific appointment pages:{" "}
                <Link href="/epoxy-floor-coating-appointments" className="text-primary transition-colors hover:opacity-80">
                  Epoxy Floor Coating Appointments
                </Link>{" "}
                and{" "}
                <Link href="/garage-floor-coating-appointments" className="text-primary transition-colors hover:opacity-80">
                  Garage Floor Coating Appointments
                </Link>
                .
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
                See what a full floor coating estimate calendar could look like for your market.
              </h2>
              <p className="mt-4 text-sm leading-7 text-slate-700 md:text-base">
                Book a strategy call and we will look at your service area, coating specialties,
                and how many booked estimate appointments would actually make sense for your crew size.
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
          description="These links reinforce the floor coating hub with supporting pages around appointment types, exclusivity, and the agency alternative."
          resources={getCommercialResources("floor-coating-contractor-marketing")}
        />
      </main>
      <Footer />
    </>
  );
}
