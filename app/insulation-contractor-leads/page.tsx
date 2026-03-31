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
      "Your leads are not sold to another insulation company in the same market, which gives your team a cleaner shot at booking the estimate.",
  },
  {
    icon: BadgeCheck,
    title: "Homeowner and job fit checked",
    description:
      "We screen for homeowner status, service area, and project fit before the lead reaches your team so you are not wasting time on junk calls.",
  },
  {
    icon: PhoneCall,
    title: "Fast handoff while you stay on the job",
    description:
      "The system is built so you can respond quickly without spending your day buried in ad accounts or chasing every inquiry by hand.",
  },
  {
    icon: CalendarCheck2,
    title: "Built around estimate appointments",
    description:
      "The target is not random web form volume. It is real homeowner conversations that can turn into insulation estimates and booked jobs.",
  },
];

export const metadata: Metadata = {
  title: "Insulation Contractor Leads | Exclusive Pay Per Lead Growth",
  description:
    "Get exclusive insulation contractor leads from Appointly Solutions with fast follow up, qualification, and a pay per lead model built for booked estimates.",
  keywords: [
    "insulation contractor leads",
    "exclusive insulation leads",
    "pay per lead insulation",
    "Appointly Solutions",
  ],
  alternates: {
    canonical: "https://getappointly.co/insulation-contractor-leads",
  },
  openGraph: {
    title: "Insulation Contractor Leads | Exclusive Pay Per Lead Growth",
    description:
      "See how Appointly Solutions helps insulation contractors buy qualified leads with less risk and more booked estimate potential.",
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
                For Insulation Contractors
              </p>
              <h1 className="font-display text-5xl font-bold leading-[1.05] tracking-tight text-balance md:text-6xl">
                Insulation leads that turn into{" "}
                <span className="gradient-text">estimate appointments</span>
              </h1>
              <p className="mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg">
                If you want more attic, crawlspace, and whole-home insulation jobs,
                you need better homeowner conversations in the right service area, not
                just more random form fills. That is what this page is about.
              </p>
              <div className="mt-10 flex flex-wrap gap-4">
                <a
                  href={bookingUrl}
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-primary px-8 py-4 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90"
                >
                  Book a Strategy Call
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
                What You Actually Need
              </p>
              <h2 className="font-display text-3xl font-bold text-foreground md:text-4xl">
                You do not need more traffic. You need qualified estimates in your service area.
              </h2>
              <p className="mt-4 leading-relaxed text-muted-foreground">
                Good leads should make sense for the kind of work you want to run,
                the towns you cover, and the crews you have available. That is the
                difference between a busy phone and a healthier schedule.
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
                Better lead quality gives your team a better shot at closing work.
              </h2>
              <p className="mt-5 text-sm leading-7 text-muted-foreground md:text-base">
                The right homeowner, the right service area, quick follow-up, and a
                clear insulation need all matter. When those pieces line up, the lead
                is much more likely to become a real estimate instead of a dead-end call.
              </p>
              <p className="mt-4 text-sm leading-7 text-muted-foreground md:text-base">
                If exclusivity is your top concern, visit{" "}
                <Link href="/exclusive-insulation-leads" className="text-primary transition-colors hover:opacity-80">
                  Exclusive Insulation Leads
                </Link>{" "}
                for a direct breakdown. If pricing model matters most, continue to{" "}
                <Link href="/pay-per-lead-insulation" className="text-primary transition-colors hover:opacity-80">
                  Pay Per Lead Insulation
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
                See what qualified lead flow could look like in your market.
              </h2>
              <p className="mt-4 text-sm leading-7 text-slate-700 md:text-base">
                Book a strategy call and we will look at your service area, job types,
                and how many estimate opportunities would actually make sense for your team.
              </p>
              <a
                href={bookingUrl}
                className="mt-8 inline-flex items-center justify-center gap-2 rounded-full bg-primary px-8 py-4 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90"
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
          description="These links reinforce the main service page with supporting pages around exclusivity, pricing, and contractor buying behavior."
          resources={getCommercialResources("insulation-contractor-leads")}
        />
      </main>
      <Footer />
    </>
  );
}
