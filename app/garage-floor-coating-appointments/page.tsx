import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  BadgeCheck,
  CalendarCheck2,
  MapPin,
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
    icon: MapPin,
    title: "Garage-specific homeowner targeting",
    description:
      "We build Meta audiences around homeowners most likely to want garage floor coatings — not generic home improvement traffic. Every dollar spent is pointed at the right project type.",
  },
  {
    icon: ShieldCheck,
    title: "One garage coating contractor per service area",
    description:
      "We do not split appointments across multiple contractors in the same market. When we work with you, your service area is locked and your appointments are yours alone.",
  },
  {
    icon: CalendarCheck2,
    title: "Keep your calendar full through seasonal swings",
    description:
      "Garage floor coating demand shifts with the seasons. Our system is built to maintain consistent appointment volume so your crew stays productive even when inquiries slow down organically.",
  },
  {
    icon: BadgeCheck,
    title: "Pay for performance — only for appointments we deliver",
    description:
      "If we do not put booked estimates on your calendar, you do not pay for what was not delivered. Our model is tied to your results, not our effort.",
  },
];

export const metadata: Metadata = {
  title: "Garage Floor Coating Appointments | Keep Your Crew Busy Year-Round",
  description:
    "Appointly Solutions books garage floor coating contractors with pre-qualified homeowner estimate appointments. Meta ads, follow-up, and calendar booking — all handled for you.",
  keywords: [
    "garage floor coating appointments",
    "garage floor coating leads",
    "garage coating contractor marketing",
    "booked garage floor estimates",
    "garage epoxy coating appointments",
    "Appointly Solutions",
  ],
  alternates: {
    canonical: "https://getappointly.co/garage-floor-coating-appointments",
  },
  openGraph: {
    title: "Garage Floor Coating Appointments | Keep Your Crew Busy Year-Round",
    description:
      "See how Appointly Solutions helps garage floor coating contractors maintain a consistently full estimate calendar with pre-qualified homeowner appointments.",
    url: "https://getappointly.co/garage-floor-coating-appointments",
    siteName: "Appointly Solutions",
    type: "website",
  },
};

export default function GarageFloorCoatingAppointmentsPage() {
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
                Garage Floor Coating Contractors
              </p>
              <h1 className="font-display text-5xl font-bold leading-[1.05] tracking-tight text-balance md:text-6xl">
                Keep your garage floor coating crew busy with{" "}
                <span className="gradient-text">booked estimate appointments</span>
              </h1>
              <p className="mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg">
                We target homeowners looking for garage floor coatings on Meta, follow up
                with every inquiry, and book confirmed estimate appointments straight onto
                your calendar. Consistent demand, qualified homeowners, no wasted mornings.
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
                Built for Garage Coating Specialists
              </p>
              <h2 className="font-display text-3xl font-bold text-foreground md:text-4xl">
                Garage floor coating demand is real. The challenge is capturing it consistently.
              </h2>
              <p className="mt-4 leading-relaxed text-muted-foreground">
                Homeowners want garage floor coatings, but most of that demand does not
                show up on search — it gets triggered by the right ad at the right moment.
                Our Meta ad system finds those homeowners, qualifies them, and converts
                that interest into a booked appointment on your calendar.
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
                The Appointment-First Model for Garage Coatings
              </p>
              <h2 className="mt-4 font-display text-3xl font-bold text-foreground">
                A booked garage coating estimate is not the same as a random inquiry.
              </h2>
              <p className="mt-5 text-sm leading-7 text-muted-foreground md:text-base">
                When a homeowner has a confirmed appointment on your calendar, the project
                conversation is already underway. They have described their garage, confirmed
                their location is in your service area, and picked a time to meet. That
                conversation starts from a completely different place than a cold web form.
              </p>
              <p className="mt-4 text-sm leading-7 text-muted-foreground md:text-base">
                An epoxy and garage coating contractor we work with maintains roughly a 60%
                close rate on the appointments we send and we keep his calendar consistently
                filled. That level of predictability is what the appointment model is designed
                to create.
              </p>
              <p className="mt-4 text-sm leading-7 text-muted-foreground md:text-base">
                Also explore{" "}
                <Link href="/epoxy-floor-coating-appointments" className="text-primary transition-colors hover:opacity-80">
                  Epoxy Floor Coating Appointments
                </Link>{" "}
                if you specialize in both garage and interior epoxy work.
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
                See if your garage coating market has open availability.
              </h2>
              <p className="mt-4 text-sm leading-7 text-slate-700 md:text-base">
                Book a strategy call and we will look at your service area, the types of
                garage coating projects you prefer, and what a consistent appointment
                calendar would look like for your team.
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
          description="These links reinforce the garage coating appointment page with supporting pages across the full floor coating system."
          resources={getCommercialResources("floor-coating-contractor-marketing")}
        />
      </main>
      <Footer />
    </>
  );
}
