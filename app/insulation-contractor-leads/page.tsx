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

const bookingUrl = "https://client.getappointly.co/strategy-calendar";

const highlights = [
  {
    icon: ShieldCheck,
    title: "Exclusive opportunities",
    description:
      "Appointly Solutions focuses on lead delivery that protects your margin and keeps you out of crowded shared lead races.",
  },
  {
    icon: BadgeCheck,
    title: "Pre qualified homeowners",
    description:
      "Every lead is screened for service fit, project relevance, and homeowner intent before it becomes your team’s problem to solve.",
  },
  {
    icon: PhoneCall,
    title: "Fast response coverage",
    description:
      "We move quickly when an inquiry comes in so the homeowner conversation stays warm while your crew stays on the job.",
  },
  {
    icon: CalendarCheck2,
    title: "Booked estimate focus",
    description:
      "The goal is not just a name and phone number. The goal is a qualified estimate opportunity that can actually drive revenue.",
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
        <section className="relative pt-32 pb-20 md:pt-44 md:pb-28">
          <div className="absolute inset-0 -z-10">
            <div className="absolute top-0 right-0 h-[720px] w-[720px] rounded-full bg-[#7d87f7]/[0.06] blur-[140px]" />
            <div className="absolute inset-0 dot-grid opacity-35" />
          </div>

          <div className="mx-auto max-w-6xl px-6">
            <div className="max-w-3xl">
              <p className="text-xs font-semibold tracking-[0.25em] uppercase text-muted-foreground mb-6">
                Commercial Intent Page
              </p>
              <h1 className="font-display text-5xl md:text-6xl font-bold tracking-tight leading-[1.05] text-balance">
                Insulation Contractor Leads That Turn Into{" "}
                <span className="gradient-text">Real Estimate Opportunities</span>
              </h1>
              <p className="mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg">
                Appointly Solutions helps insulation contractors grow with exclusive,
                pre qualified lead flow designed around booked conversations, not
                vanity metrics. If you want insulation contractor leads without the
                usual agency guesswork, this is the page to start with.
              </p>
              <div className="mt-10 flex flex-wrap gap-4">
                <a
                  href={bookingUrl}
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-8 py-4 text-sm font-semibold text-primary-foreground hover:opacity-90 transition-opacity"
                  style={{
                    boxShadow:
                      "0 0 40px rgb(125 135 247 / 0.35), 0 4px 20px rgb(125 135 247 / 0.15)",
                  }}
                >
                  Book a Strategy Call
                  <ArrowRight className="h-4 w-4" />
                </a>
                <Link
                  href="/how-it-works"
                  className="inline-flex items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] px-8 py-4 text-sm font-semibold text-foreground hover:bg-white/[0.08] hover:border-white/[0.15] transition-all"
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
              <p className="text-xs font-semibold tracking-[0.25em] uppercase text-muted-foreground mb-4">
                What You Need
              </p>
              <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground">
                More than traffic. You need qualified homeowner demand.
              </h2>
              <p className="mt-4 text-muted-foreground leading-relaxed">
                Appointly Solutions is built for contractors who need stronger lead
                quality, quicker follow up, and a system that supports actual revenue
                conversations instead of just filling a spreadsheet.
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
              <p className="text-xs font-semibold tracking-[0.25em] uppercase text-muted-foreground">
                Why This Converts
              </p>
              <h2 className="mt-4 font-display text-3xl font-bold text-foreground">
                Lead quality improves when the system is built around intent.
              </h2>
              <p className="mt-5 text-sm leading-7 text-muted-foreground md:text-base">
                High intent insulation contractor leads come from the right market
                targeting, fast response, smart qualification, and consistent follow
                up. Appointly Solutions ties those pieces together so your pipeline has
                a better chance of reaching the calendar.
              </p>
              <p className="mt-4 text-sm leading-7 text-muted-foreground md:text-base">
                If exclusivity is your top concern, visit{" "}
                <Link href="/exclusive-insulation-leads" className="text-primary hover:text-[#a5abff] transition-colors">
                  Exclusive Insulation Leads
                </Link>{" "}
                for a direct breakdown. If pricing model matters most, continue to{" "}
                <Link href="/pay-per-lead-insulation" className="text-primary hover:text-[#a5abff] transition-colors">
                  Pay Per Lead Insulation
                </Link>
                .
              </p>
            </article>

            <article className="rounded-3xl border border-[#7d87f7]/20 bg-[#7d87f7]/[0.08] p-8 shadow-[0_0_70px_rgba(125,135,247,0.1)] md:p-10">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/20 bg-white/10">
                <Target className="h-5 w-5 text-white" />
              </div>
              <p className="mt-6 text-xs font-semibold tracking-[0.25em] uppercase text-[#d7dbff]">
                Next Step
              </p>
              <h2 className="mt-4 font-display text-3xl font-bold text-foreground">
                Find out what qualified lead flow could look like in your market.
              </h2>
              <p className="mt-4 text-sm leading-7 text-[#e6e9ff]/80 md:text-base">
                Book a strategy call with Appointly Solutions and we will review your
                service area, lead volume goals, and what type of insulation contractor
                leads make sense for your team.
              </p>
              <a
                href={bookingUrl}
                className="mt-8 inline-flex items-center justify-center gap-2 rounded-xl bg-white px-8 py-4 text-sm font-semibold text-[#7d87f7] hover:opacity-90 transition-opacity"
              >
                Book a Strategy Call
                <ArrowRight className="h-4 w-4" />
              </a>
            </article>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
