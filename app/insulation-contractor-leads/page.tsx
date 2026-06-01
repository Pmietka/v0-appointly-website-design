import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  BadgeCheck,
  CalendarCheck2,
  PhoneCall,
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
    icon: ShieldCheck,
    title: "One contractor per market",
    description:
      "We work with a single floor coating contractor per market, so the appointments we book are yours alone and never shared with a competitor down the road.",
  },
  {
    icon: PhoneCall,
    title: "We hit every lead instantly",
    description:
      "Our Meta ads generate the lead, then we contact that homeowner immediately with true speed to lead, before they ever start shopping other coating contractors.",
  },
  {
    icon: CalendarCheck2,
    title: "We book the appointment for you",
    description:
      "We do not hand you a raw lead to chase. We lock in a floor coating estimate at a time that works for your crew and drop it straight onto your calendar.",
  },
  {
    icon: BadgeCheck,
    title: "You just show up and quote",
    description:
      "No buried ad accounts, no inbox chasing. You run the estimate, do the job, and collect the cash while we keep the calendar full of booked estimates.",
  },
];

export const metadata: Metadata = {
  title: "Floor Coating Appointments | Booked Estimates for Contractors",
  description:
    "Appointly Solutions books floor coating and epoxy estimates straight onto your calendar with Meta ads and instant speed to lead. You just show up and quote.",
  keywords: [
    "floor coating appointments",
    "epoxy flooring leads",
    "booked floor coating estimates",
    "garage floor coating contractors",
    "Appointly Solutions",
  ],
  alternates: {
    canonical: "https://getappointly.co/insulation-contractor-leads",
  },
  openGraph: {
    title: "Floor Coating Appointments | Booked Estimates for Contractors",
    description:
      "See how Appointly Solutions fills floor coating contractors' calendars with booked estimates using Meta ads and instant speed to lead.",
    url: "https://getappointly.co/insulation-contractor-leads",
    siteName: "Appointly Solutions",
    type: "website",
  },
};

export default function InsulationContractorLeadsPage() {
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
                Floor coating estimates booked straight onto{" "}
                <span className="gradient-text">your calendar</span>
              </h1>
              <p className="mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg">
                If you want more garage floor coating, epoxy, and concrete coating jobs,
                you need booked estimates in your service area, not raw leads to chase.
                We run the Meta ads, hit every lead instantly, and book the appointment
                for you. You just show up and quote.
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
                  href="/how-it-works"
                  className="inline-flex items-center justify-center rounded-xl border border-gray-300 bg-white px-8 py-4 text-sm font-semibold text-gray-700 transition-all hover:bg-gray-50"
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
                What You Actually Need
              </p>
              <h2 className="font-display text-3xl font-bold text-foreground md:text-4xl">
                You do not need more traffic. You need booked floor coating estimates in your service area.
              </h2>
              <p className="mt-4 leading-relaxed text-muted-foreground">
                Booked estimates should match the kind of work you want to run,
                the towns you cover, and the crews you have available. That is the
                difference between a busy phone and a calendar full of coating jobs.
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
                Why This Works Better
              </p>
              <h2 className="mt-4 font-display text-3xl font-bold text-foreground">
                A booked estimate gives your crew a better shot at closing the coating job.
              </h2>
              <p className="mt-5 text-sm leading-7 text-muted-foreground md:text-base">
                The right homeowner, the right service area, instant speed to lead, and a
                confirmed time on your calendar all matter. When those pieces line up, the
                appointment is much more likely to become a signed coating job instead of a
                dead-end call.
              </p>
              <p className="mt-4 text-sm leading-7 text-muted-foreground md:text-base">
                If exclusivity is your top concern, visit{" "}
                <Link href="/exclusive-insulation-leads" className="text-primary transition-colors hover:opacity-80">
                  Exclusive Appointments
                </Link>{" "}
                for a direct breakdown. If pricing model matters most, continue to{" "}
                <Link href="/pay-per-lead-insulation" className="text-primary transition-colors hover:opacity-80">
                  The Appointly Model
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
                See what a calendar of booked coating estimates could look like in your market.
              </h2>
              <p className="mt-4 text-sm leading-7 text-slate-700 md:text-base">
                Book a strategy call and we will look at your service area, job types,
                and how many booked floor coating estimates would actually make sense for your crew.
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
          title="Keep exploring the highest-intent pages."
          description="These links reinforce the main service page with supporting pages around exclusive appointments, the Appointly Model, and how floor coating contractors fill their calendars."
          resources={getCommercialResources("insulation-contractor-leads")}
        />
      </main>
      <Footer />
    </>
  );
}
