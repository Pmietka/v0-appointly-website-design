import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, CircleDollarSign, Clock3, LineChart, ShieldCheck } from "lucide-react";

import { Footer } from "@/components/footer";
import { Navbar } from "@/components/navbar";

const bookingUrl = "https://client.getappointly.co/strategy-calendar";

const reasons = [
  {
    icon: CircleDollarSign,
    title: "Less upfront risk",
    description:
      "A pay-for-performance model keeps the conversation tied to real appointment flow rather than large retainers that can feel disconnected from results.",
  },
  {
    icon: ShieldCheck,
    title: "Clearer accountability",
    description:
      "When appointment generation is tied to qualified, booked opportunities, expectations around delivery quality become easier to define and track.",
  },
  {
    icon: Clock3,
    title: "Operational focus",
    description:
      "Your team can spend less time guessing whether marketing is working and more time focusing on speed to appointment and closing.",
  },
  {
    icon: LineChart,
    title: "Better planning",
    description:
      "Knowing what a booked appointment costs can make growth forecasting and crew planning more practical during insulation's seasonal peaks.",
  },
];

export const metadata: Metadata = {
  title: "Pay for Performance Insulation Marketing | Appointly Solutions",
  description:
    "Explore how Appointly Solutions helps insulation contractors grow with a pay-for-performance appointment model instead of large monthly retainers.",
  keywords: [
    "pay for performance insulation",
    "insulation appointment marketing",
    "performance model insulation contractor",
    "Appointly Solutions",
  ],
  alternates: {
    canonical: "https://getappointly.co/pay-per-lead-insulation",
  },
  openGraph: {
    title: "Pay for Performance Insulation Marketing | Appointly Solutions",
    description:
      "Learn why a pay-for-performance appointment model can be a stronger fit than a traditional agency retainer for insulation contractors.",
    url: "https://getappointly.co/pay-per-lead-insulation",
    siteName: "Appointly Solutions",
    type: "website",
  },
};

export default function PayPerLeadInsulationPage() {
  return (
    <>
      <Navbar />
      <main className="overflow-hidden">
        <section className="relative pt-32 pb-20 md:pt-44 md:pb-28">
          <div className="absolute inset-0 -z-10">
            <div className="absolute top-0 right-0 h-[700px] w-[700px] rounded-full bg-primary/[0.06] blur-[145px]" />
            <div className="absolute inset-0 dot-grid opacity-35" />
          </div>

          <div className="mx-auto max-w-6xl px-6">
            <div className="max-w-3xl">
              <p className="text-xs font-semibold tracking-[0.25em] uppercase text-muted-foreground mb-6">
                Performance Model
              </p>
              <h1 className="font-display text-5xl md:text-6xl font-bold tracking-tight leading-[1.05] text-balance">
                Pay for Performance Insulation Appointments for Contractors Who Want{" "}
                <span className="gradient-text">Less Guesswork</span>
              </h1>
              <p className="mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg">
                Appointly Solutions was built around a pay-for-performance structure
                because many insulation contractors are tired of paying retainers before
                they see any real booked appointments. This page explains why that model
                can be more practical for insulation seasonal growth.
              </p>
              <div className="mt-10 flex flex-wrap gap-4">
                <a
                  href={bookingUrl}
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-primary px-8 py-4 text-sm font-semibold text-primary-foreground hover:opacity-90 transition-opacity"
                >
                  Book a free strategy call
                  <ArrowRight className="h-4 w-4" />
                </a>
                <Link
                  href="/insulation-marketing-agency"
                  className="inline-flex items-center justify-center rounded-full border border-gray-300 bg-white px-8 py-4 text-sm font-semibold text-gray-700 hover:bg-gray-50 transition-all"
                >
                  Compare Agency Models
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section className="section-divider py-24 md:py-32">
          <div className="mx-auto max-w-6xl px-6">
            <div className="mb-12 max-w-2xl">
              <p className="text-xs font-semibold tracking-[0.25em] uppercase text-muted-foreground mb-4">
                Why Contractors Like It
              </p>
              <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground">
                A performance structure that stays closer to production.
              </h2>
            </div>

            <div className="grid gap-5 md:grid-cols-2">
              {reasons.map((reason) => (
                <article key={reason.title} className="glass-card glass-card-hover rounded-3xl p-6">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-primary/20 bg-primary/10">
                    <reason.icon className="h-5 w-5 text-primary" />
                  </div>
                  <h3 className="mt-5 font-display text-xl font-semibold text-foreground">
                    {reason.title}
                  </h3>
                  <p className="mt-3 text-sm leading-7 text-muted-foreground">
                    {reason.description}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section-divider py-24 md:py-32">
          <div className="mx-auto grid max-w-6xl gap-6 px-6 lg:grid-cols-2">
            <article className="glass-card rounded-3xl p-8 md:p-10">
              <p className="text-xs font-semibold tracking-[0.25em] uppercase text-muted-foreground">
                What Appointly Solutions Means By Pay for Performance
              </p>
              <h2 className="mt-4 font-display text-3xl font-bold text-foreground">
                Booked appointments are the center of the conversation.
              </h2>
              <p className="mt-5 text-sm leading-7 text-muted-foreground md:text-base">
                Appointly Solutions uses a pay-for-performance model to keep decisions
                closer to appointment quality, booking potential, and service area fit.
                You pay per booked appointment — not per click or per impression. When
                we do well, you do well.
              </p>
              <p className="mt-4 text-sm leading-7 text-muted-foreground md:text-base">
                For the broader process, visit{" "}
                <Link href="/how-it-works" className="text-primary transition-opacity hover:opacity-80">
                  How It Works
                </Link>
                . If your main concern is appointment ownership, continue to{" "}
                <Link href="/exclusive-insulation-leads" className="text-primary transition-opacity hover:opacity-80">
                  Exclusive Insulation Appointments
                </Link>
                .
              </p>
            </article>

            <article className="rounded-3xl border border-primary/20 bg-primary/10 p-8 shadow-[0_0_70px_rgba(125,135,247,0.1)] md:p-10">
              <p className="text-xs font-semibold tracking-[0.25em] uppercase text-slate-600">
                Is It A Fit
              </p>
              <h2 className="mt-4 font-display text-3xl font-bold text-foreground">
                Best for insulation contractors who want measured growth.
              </h2>
              <p className="mt-4 text-sm leading-7 text-slate-700 md:text-base">
                A strategy call can help you decide whether Appointly Solutions and a
                pay-for-performance appointment model make sense for your sales process,
                market, and seasonal growth targets.
              </p>
              <a
                href={bookingUrl}
                className="mt-8 inline-flex items-center justify-center gap-2 rounded-full bg-primary px-8 py-4 text-sm font-semibold text-primary-foreground hover:opacity-90 transition-opacity"
              >
                Book a free strategy call
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
