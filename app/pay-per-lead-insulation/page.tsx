import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, CircleDollarSign, Clock3, LineChart, ShieldCheck } from "lucide-react";

import { Footer } from "@/components/footer";
import { Navbar } from "@/components/navbar";

const bookingUrl = "https://client.getappointly.co/strategy-calendar";

const reasons = [
  {
    icon: CircleDollarSign,
    title: "Spend tied to booked appointments",
    description:
      "On top of a retainer that covers our labor, you pay a per-appointment fee for each booked floor coating estimate that lands on your calendar. Your spend tracks real appointments, not guesswork.",
  },
  {
    icon: ShieldCheck,
    title: "Clear accountability",
    description:
      "Because the per-appointment fee maps to confirmed estimates on your calendar, expectations around what you get for your spend are easy to define and track.",
  },
  {
    icon: Clock3,
    title: "You focus on closing",
    description:
      "We handle the Meta ads, the speed to lead, and the booking. Your crew spends its time running estimates and coating floors instead of marketing.",
  },
  {
    icon: LineChart,
    title: "Easier planning",
    description:
      "When you know the retainer and the per-appointment fee, forecasting growth and planning crew capacity becomes far more practical.",
  },
];

export const metadata: Metadata = {
  title: "The Appointly Model | Retainer Plus Per-Appointment Pricing",
  description:
    "The Appointly Model pairs a retainer that covers our labor with a per-appointment fee for each booked floor coating estimate on your calendar. See how the pricing works.",
  keywords: [
    "the appointly model",
    "floor coating appointment pricing",
    "retainer plus per appointment",
    "booked floor coating estimates",
    "Appointly Solutions",
  ],
  alternates: {
    canonical: "https://getappointly.co/pay-per-lead-insulation",
  },
  openGraph: {
    title: "The Appointly Model | Retainer Plus Per-Appointment Pricing",
    description:
      "Learn how the Appointly Model combines a retainer with a per-appointment fee to fill floor coating contractors' calendars with booked estimates.",
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
                The Appointly Model
              </p>
              <h1 className="font-display text-5xl md:text-6xl font-bold tracking-tight leading-[1.05] text-balance">
                The Appointly Model: Pricing Built Around Booked{" "}
                <span className="gradient-text">Appointments</span>
              </h1>
              <p className="mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg">
                The Appointly Model has two parts. A retainer covers our labor and effort
                running your Meta ads and speed-to-lead booking, and a per-appointment fee
                applies to each booked floor coating estimate that lands on your calendar.
                This page explains exactly how that structure works.
              </p>
              <div className="mt-10 flex flex-wrap gap-4">
                <a
                  href={bookingUrl}
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-8 py-4 text-sm font-semibold text-primary-foreground hover:opacity-90 transition-opacity"
                >
                  Book a Strategy Call
                  <ArrowRight className="h-4 w-4" />
                </a>
                <Link
                  href="/insulation-marketing-agency"
                  className="inline-flex items-center justify-center rounded-xl border border-gray-300 bg-white px-8 py-4 text-sm font-semibold text-gray-700 hover:bg-gray-50 transition-all"
                >
                  Agency Alternative
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
                A pricing structure that stays tied to booked appointments.
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
                How The Appointly Model Works
              </p>
              <h2 className="mt-4 font-display text-3xl font-bold text-foreground">
                A retainer for our labor, plus a fee per booked estimate.
              </h2>
              <p className="mt-5 text-sm leading-7 text-muted-foreground md:text-base">
                The retainer covers the labor and effort we put into running your Meta
                ads, hitting every lead instantly, and booking it. The per-appointment
                fee applies to each floor coating estimate we place on your calendar. It
                is not about chasing the lowest cost. It is a system where what you pay
                maps directly to appointments that show up.
              </p>
              <p className="mt-4 text-sm leading-7 text-muted-foreground md:text-base">
                For the broader process, visit{" "}
                <Link href="/how-it-works" className="text-primary transition-opacity hover:opacity-80">
                  How It Works
                </Link>
                . If your main concern is exclusivity, continue to{" "}
                <Link href="/exclusive-insulation-leads" className="text-primary transition-opacity hover:opacity-80">
                  Exclusive Appointments
                </Link>
                .
              </p>
            </article>

            <article className="rounded-3xl border border-primary/20 bg-primary/10 p-8 shadow-[0_0_70px_rgba(125,135,247,0.1)] md:p-10">
              <p className="text-xs font-semibold tracking-[0.25em] uppercase text-slate-600">
                Is It A Fit
              </p>
              <h2 className="mt-4 font-display text-3xl font-bold text-foreground">
                Best for floor coating contractors who want measured growth.
              </h2>
              <p className="mt-4 text-sm leading-7 text-slate-700 md:text-base">
                A strategy call can help you decide whether the Appointly Model, with its
                retainer plus per-appointment fee, makes sense for your sales process,
                market, and growth targets.
              </p>
              <a
                href={bookingUrl}
                className="mt-8 inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-8 py-4 text-sm font-semibold text-primary-foreground hover:opacity-90 transition-opacity"
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
