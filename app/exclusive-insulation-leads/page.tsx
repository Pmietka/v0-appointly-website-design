import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Crown, ShieldCheck, SplitSquareVertical, Users } from "lucide-react";

import { Footer } from "@/components/footer";
import { Navbar } from "@/components/navbar";

const bookingUrl = "https://client.getappointly.co/strategy-calendar";

const comparisons = [
  {
    icon: SplitSquareVertical,
    title: "Shared appointment marketplaces",
    description:
      "Shared systems push multiple contractors into the same homeowner conversation, which drives down margins and raises response pressure before the appointment is even set.",
  },
  {
    icon: Crown,
    title: "Exclusive appointment delivery",
    description:
      "Appointly Solutions is built around protecting appointment ownership so each booked opportunity has more room to turn into a meaningful sales conversation.",
  },
  {
    icon: ShieldCheck,
    title: "Qualification before handoff",
    description:
      "Exclusivity is only valuable when the appointment is also relevant. We focus on homeowner fit, project relevance, and real purchase intent before booking.",
  },
  {
    icon: Users,
    title: "Less chaos for your sales team",
    description:
      "When your team is not competing with several contractors at once, follow up feels cleaner and close rate potential improves.",
  },
];

export const metadata: Metadata = {
  title: "Exclusive Insulation Appointments | Pay for Performance | Appointly Solutions",
  description:
    "Appointly Solutions delivers exclusive booked appointments for insulation contractors on a pay-for-performance model — no shared competition, no retainers.",
  keywords: [
    "exclusive insulation appointments",
    "insulation contractor appointments",
    "pay for performance insulation",
    "Appointly Solutions",
  ],
  alternates: {
    canonical: "https://getappointly.co/exclusive-insulation-leads",
  },
  openGraph: {
    title: "Exclusive Insulation Appointments | Pay for Performance | Appointly Solutions",
    description:
      "See why exclusive booked appointments on a pay-for-performance model outperform shared lead systems for insulation contractors.",
    url: "https://getappointly.co/exclusive-insulation-leads",
    siteName: "Appointly Solutions",
    type: "website",
  },
};

export default function ExclusiveInsulationLeadsPage() {
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
                Exclusive Appointments
              </p>
              <h1 className="font-display text-5xl md:text-6xl font-bold tracking-tight leading-[1.05] text-balance">
                Exclusive Insulation Appointments Without the{" "}
                <span className="gradient-text">Shared Lead Scramble</span>
              </h1>
              <p className="mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg">
                Insulation contractors do not just want more volume. They want better
                conditions to close. Appointly Solutions gives insulation contractors a
                pay-for-performance model centered on exclusive booked appointments,
                better qualification, and less margin-killing competition.
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
                  href="/insulation-contractor-leads"
                  className="inline-flex items-center justify-center rounded-full border border-gray-300 bg-white px-8 py-4 text-sm font-semibold text-gray-700 hover:bg-gray-50 transition-all"
                >
                  See Core Insulation Page
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section className="section-divider py-24 md:py-32">
          <div className="mx-auto max-w-6xl px-6">
            <div className="mb-12 max-w-2xl">
              <p className="text-xs font-semibold tracking-[0.25em] uppercase text-muted-foreground mb-4">
                Shared Versus Exclusive
              </p>
              <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground">
                Why exclusivity matters to close rate and margin.
              </h2>
            </div>

            <div className="grid gap-5 md:grid-cols-2">
              {comparisons.map((item) => (
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
          <div className="mx-auto grid max-w-6xl gap-6 px-6 lg:grid-cols-2">
            <article className="glass-card rounded-3xl p-8 md:p-10">
              <p className="text-xs font-semibold tracking-[0.25em] uppercase text-muted-foreground">
                Where Appointly Solutions Fits
              </p>
              <h2 className="mt-4 font-display text-3xl font-bold text-foreground">
                Best for insulation contractors who value quality over noise.
              </h2>
              <p className="mt-5 text-sm leading-7 text-muted-foreground md:text-base">
                Appointly Solutions works best for insulation teams that want fewer wasted
                conversations, cleaner follow up, and a pay-for-performance system that
                aligns appointment cost with actual opportunity quality. When we do well,
                you do well.
              </p>
              <p className="mt-4 text-sm leading-7 text-muted-foreground md:text-base">
                To see how exclusive appointments fit into the bigger delivery system, visit{" "}
                <Link href="/how-it-works" className="text-primary transition-opacity hover:opacity-80">
                  How It Works
                </Link>
                . If you are comparing performance models, continue to{" "}
                <Link href="/pay-per-lead-insulation" className="text-primary transition-opacity hover:opacity-80">
                  Pay for Performance Insulation
                </Link>
                .
              </p>
            </article>

            <article className="rounded-3xl border border-primary/20 bg-primary/10 p-8 shadow-[0_0_70px_rgba(125,135,247,0.1)] md:p-10">
              <p className="text-xs font-semibold tracking-[0.25em] uppercase text-slate-600">
                Ready To Talk
              </p>
              <h2 className="mt-4 font-display text-3xl font-bold text-foreground">
                Explore whether exclusive appointment delivery fits your market.
              </h2>
              <p className="mt-4 text-sm leading-7 text-slate-700 md:text-base">
                A strategy call with Appointly Solutions will show you where exclusive
                insulation appointments make sense, how qualification works, and what to
                expect from the pay-for-performance process.
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
