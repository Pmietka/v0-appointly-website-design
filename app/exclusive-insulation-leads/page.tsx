import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Crown, ShieldCheck, SplitSquareVertical, Users } from "lucide-react";

import { Footer } from "@/components/footer";
import { Navbar } from "@/components/navbar";

const bookingUrl = "https://client.getappointly.co";

const comparisons = [
  {
    icon: SplitSquareVertical,
    title: "Shared lead marketplaces",
    description:
      "Shared lead systems push multiple contractors into the same homeowner conversation, which drives down margins and raises response pressure.",
  },
  {
    icon: Crown,
    title: "Exclusive lead delivery",
    description:
      "Appointly Solutions is built around protecting lead ownership so the opportunity has more room to turn into a meaningful sales conversation.",
  },
  {
    icon: ShieldCheck,
    title: "Qualification before handoff",
    description:
      "Exclusive is only valuable when the lead is also relevant. We focus on homeowner fit, project relevance, and real purchase intent.",
  },
  {
    icon: Users,
    title: "Less chaos for your sales team",
    description:
      "When your team is not competing with several contractors at once, follow up feels cleaner and close rate potential improves.",
  },
];

export const metadata: Metadata = {
  title: "Exclusive Insulation Leads | No Shared Contractor Leads",
  description:
    "Learn how Appointly Solutions delivers exclusive insulation leads so contractors can avoid shared lead competition and focus on qualified booked opportunities.",
  keywords: [
    "exclusive insulation leads",
    "shared contractor leads",
    "exclusive contractor leads",
    "Appointly Solutions",
  ],
  alternates: {
    canonical: "https://getappointly.co/exclusive-insulation-leads",
  },
  openGraph: {
    title: "Exclusive Insulation Leads | No Shared Contractor Leads",
    description:
      "See why exclusive insulation leads outperform shared lead systems for many contractors.",
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
            <div className="absolute top-0 right-0 h-[700px] w-[700px] rounded-full bg-[#7d87f7]/[0.06] blur-[145px]" />
            <div className="absolute inset-0 dot-grid opacity-35" />
          </div>

          <div className="mx-auto max-w-6xl px-6">
            <div className="max-w-3xl">
              <p className="text-xs font-semibold tracking-[0.25em] uppercase text-muted-foreground mb-6">
                High Intent Page
              </p>
              <h1 className="font-display text-5xl md:text-6xl font-bold tracking-tight leading-[1.05] text-balance">
                Exclusive Insulation Leads Without the{" "}
                <span className="gradient-text">Shared Lead Scramble</span>
              </h1>
              <p className="mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg">
                Contractors do not just want more leads. They want better conditions to
                close. Appointly Solutions gives insulation contractors a model centered
                on exclusive opportunities, better qualification, and less margin-killing
                competition.
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
                  href="/insulation-contractor-leads"
                  className="inline-flex items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] px-8 py-4 text-sm font-semibold text-foreground hover:bg-white/[0.08] hover:border-white/[0.15] transition-all"
                >
                  See Core Lead Page
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
                Best for contractors who value quality over noise.
              </h2>
              <p className="mt-5 text-sm leading-7 text-muted-foreground md:text-base">
                Appointly Solutions works best for teams that want fewer wasted
                conversations, cleaner follow up, and a system that aligns lead cost
                with actual opportunity quality.
              </p>
              <p className="mt-4 text-sm leading-7 text-muted-foreground md:text-base">
                To see how exclusive leads fit into the bigger delivery system, visit{" "}
                <Link href="/how-it-works" className="text-primary hover:text-[#a5abff] transition-colors">
                  How It Works
                </Link>
                . If you are comparing pricing models, continue to{" "}
                <Link href="/pay-per-lead-insulation" className="text-primary hover:text-[#a5abff] transition-colors">
                  Pay Per Lead Insulation
                </Link>
                .
              </p>
            </article>

            <article className="rounded-3xl border border-[#7d87f7]/20 bg-[#7d87f7]/[0.08] p-8 shadow-[0_0_70px_rgba(125,135,247,0.1)] md:p-10">
              <p className="text-xs font-semibold tracking-[0.25em] uppercase text-[#d7dbff]">
                Ready To Talk
              </p>
              <h2 className="mt-4 font-display text-3xl font-bold text-foreground">
                Explore whether exclusive lead delivery fits your market.
              </h2>
              <p className="mt-4 text-sm leading-7 text-[#e6e9ff]/80 md:text-base">
                A strategy call with Appointly Solutions will show you where exclusive
                insulation leads make sense, how qualification works, and what to expect
                from the process.
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
