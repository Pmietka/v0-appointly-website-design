import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, BadgeCheck, Clock3, ShieldCheck, Zap } from "lucide-react";

import { Footer } from "@/components/footer";
import { Navbar } from "@/components/navbar";

const bookingUrl = "https://client.getappointly.co/strategy-calendar";

const differentiators = [
  {
    icon: ShieldCheck,
    title: "Exclusive lead delivery",
    description:
      "Every opportunity Appointly Solutions sends is routed with exclusivity in mind, so contractors are not thrown into a race to the bottom.",
  },
  {
    icon: BadgeCheck,
    title: "Pre qualified homeowners",
    description:
      "We screen for fit, urgency, location, and project intent before the lead lands on your team.",
  },
  {
    icon: Clock3,
    title: "Fast response systems",
    description:
      "Speed matters in home services, so we respond quickly and keep follow up moving while your crew stays focused on installs.",
  },
  {
    icon: Zap,
    title: "Transparent reporting",
    description:
      "You know what came in, what was qualified, and what made it onto the calendar, with no mystery retainers or fuzzy attribution.",
  },
];

export const metadata: Metadata = {
  title: "About Appointly Solutions | Insulation Lead Generation Agency",
  description:
    "Learn why Appointly Solutions helps insulation contractors grow with exclusive, pre qualified leads, fast follow up, and a cost per lead model.",
  keywords: [
    "Appointly Solutions",
    "insulation lead generation",
    "about us",
    "contractor marketing",
  ],
  alternates: {
    canonical: "https://getappointly.co/about",
  },
  openGraph: {
    title: "About Appointly Solutions | Insulation Lead Generation Agency",
    description:
      "See the mission, approach, and values behind Appointly Solutions and how we help insulation contractors buy leads with less risk.",
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
            <div className="absolute top-0 right-0 h-[720px] w-[720px] rounded-full bg-[#7d87f7]/[0.06] blur-[140px]" />
            <div className="absolute inset-0 dot-grid opacity-40" />
          </div>

          <div className="mx-auto max-w-6xl px-6">
            <div className="max-w-3xl">
              <p className="text-xs font-semibold tracking-[0.25em] uppercase text-muted-foreground mb-6">
                About Appointly Solutions
              </p>
              <h1 className="font-display text-5xl md:text-6xl font-bold tracking-tight leading-[1.05] text-balance">
                About <span className="gradient-text">Appointly Solutions</span>
              </h1>
              <p className="mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg">
                Appointly Solutions helps insulation contractors grow with exclusive,
                pre qualified leads delivered on a cost per lead model. We built the
                company to remove the usual agency risk and replace it with a system
                that is measurable, transparent, and tied to real opportunities.
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
          <div className="mx-auto grid max-w-6xl gap-6 px-6 lg:grid-cols-2">
            <article className="glass-card rounded-3xl p-8 md:p-10">
              <p className="text-xs font-semibold tracking-[0.25em] uppercase text-muted-foreground">
                Why We Exist
              </p>
              <h2 className="mt-4 font-display text-3xl font-bold text-foreground">
                Contractors deserve a model that rewards results.
              </h2>
              <p className="mt-5 text-sm leading-7 text-muted-foreground md:text-base">
                Traditional agencies often charge large monthly retainers before any
                booked opportunity shows up. That leaves contractors carrying the
                risk, while the agency gets paid either way. Appointly Solutions was
                created for owners who want growth without gambling on vague promises.
              </p>
              <p className="mt-4 text-sm leading-7 text-muted-foreground md:text-base">
                If you want the full breakdown, our{" "}
                <Link href="/faq" className="text-primary hover:text-[#a5abff] transition-colors">
                  FAQ page
                </Link>{" "}
                covers what qualifies as a lead and how the model works in practice.
              </p>
            </article>

            <article className="glass-card rounded-3xl p-8 md:p-10">
              <p className="text-xs font-semibold tracking-[0.25em] uppercase text-muted-foreground">
                Our Approach
              </p>
              <h2 className="mt-4 font-display text-3xl font-bold text-foreground">
                Pay per lead, no retainer, lower risk.
              </h2>
              <p className="mt-5 text-sm leading-7 text-muted-foreground md:text-base">
                Appointly Solutions runs the campaigns, responds to inbound inquiries,
                screens homeowners, and pushes qualified opportunities toward your
                calendar. You are not paying for hours, reports, or guesswork. You are
                paying for qualified lead flow.
              </p>
              <p className="mt-4 text-sm leading-7 text-muted-foreground md:text-base">
                Our{" "}
                <Link href="/how-it-works" className="text-primary hover:text-[#a5abff] transition-colors">
                  How It Works
                </Link>{" "}
                page walks through each step of the process from campaign launch to
                booked estimate. You can also explore{" "}
                <Link
                  href="/insulation-contractor-leads"
                  className="text-primary hover:text-[#a5abff] transition-colors"
                >
                  Insulation Contractor Leads
                </Link>{" "}
                if you want the commercial overview first.
              </p>
            </article>
          </div>
        </section>

        <section className="section-divider relative py-24 md:py-32">
          <div className="absolute inset-0 -z-10">
            <div className="absolute left-1/4 top-0 h-[560px] w-[560px] rounded-full bg-[#7d87f7]/[0.05] blur-[120px]" />
          </div>

          <div className="mx-auto max-w-6xl px-6">
            <div className="max-w-2xl">
              <p className="text-xs font-semibold tracking-[0.25em] uppercase text-muted-foreground mb-4">
                What We Value
              </p>
              <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground">
                Built around exclusivity, speed, and trust.
              </h2>
              <p className="mt-4 text-muted-foreground leading-relaxed">
                Appointly Solutions is designed to give insulation contractors a
                reliable growth engine that feels accountable from day one.
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

        <section className="section-divider py-24 md:py-32">
          <div className="mx-auto max-w-5xl px-6">
            <div className="rounded-[32px] border border-[#7d87f7]/20 bg-[#7d87f7]/[0.08] p-8 text-center shadow-[0_0_80px_rgba(125,135,247,0.12)] md:p-12">
              <p className="text-xs font-semibold tracking-[0.25em] uppercase text-[#c8cdff]">
                Ready To Grow
              </p>
              <h2 className="mt-4 font-display text-3xl md:text-4xl font-bold text-foreground">
                See if Appointly Solutions fits your market.
              </h2>
              <p className="mt-4 mx-auto max-w-2xl text-sm leading-7 text-[#d7dbff]/80 md:text-base">
                Book a strategy call and we will map out where your leads are coming
                from, what is slipping through the cracks, and how a pay per lead
                system could support your next stage of growth. If you want to compare
                models first, visit{" "}
                <Link
                  href="/pay-per-lead-insulation"
                  className="text-white underline decoration-white/30 underline-offset-4 transition-colors hover:text-white/85"
                >
                  Pay Per Lead Insulation
                </Link>
                .
              </p>
              <a
                href={bookingUrl}
                className="mt-8 inline-flex items-center justify-center gap-2 rounded-xl bg-white px-8 py-4 text-sm font-semibold text-[#7d87f7] hover:opacity-90 transition-opacity"
              >
                Book a Strategy Call
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
