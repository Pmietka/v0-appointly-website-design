import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, BadgeAlert, Briefcase, RefreshCw, ShieldCheck } from "lucide-react";

import { Footer } from "@/components/footer";
import { Navbar } from "@/components/navbar";
import { ProofSection } from "@/components/proof-section";
import { SeoResourceLinks } from "@/components/seo-resource-links";
import { getCommercialResources } from "@/lib/seo-resources";

const bookingUrl = "https://client.getappointly.co/strategy-calendar";

const agencyProblems = [
  {
    icon: BadgeAlert,
    title: "Retainers before results",
    description:
      "Many agency models ask contractors to commit significant monthly spend before qualified opportunities ever show up.",
  },
  {
    icon: RefreshCw,
    title: "Unclear attribution",
    description:
      "It can be hard to tell whether growth is coming from marketing, your own referrals, or delayed follow up cleanup.",
  },
  {
    icon: Briefcase,
    title: "High overhead communication",
    description:
      "Too many meetings and reports can distract from the actual question: are qualified homeowners reaching the calendar?",
  },
  {
    icon: ShieldCheck,
    title: "A more accountable alternative",
    description:
      "Appointly Solutions reframes the conversation around lead delivery quality, speed, and booking potential.",
  },
];

export const metadata: Metadata = {
  title: "Insulation Marketing Agency Alternative | Pay Per Lead",
  description:
    "Compare traditional insulation marketing agency models with the Appointly Solutions pay per lead approach for contractors who want clearer accountability.",
  keywords: [
    "insulation marketing agency",
    "insulation marketing agency alternative",
    "pay per lead contractor marketing",
    "Appointly Solutions",
  ],
  alternates: {
    canonical: "https://getappointly.co/insulation-marketing-agency",
  },
  openGraph: {
    title: "Insulation Marketing Agency Alternative | Pay Per Lead",
    description:
      "See why some contractors prefer a pay per lead model over a traditional insulation marketing agency retainer.",
    url: "https://getappointly.co/insulation-marketing-agency",
    siteName: "Appointly Solutions",
    type: "website",
  },
};

export default function InsulationMarketingAgencyPage() {
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
              <p className="mb-6 text-xs font-semibold uppercase tracking-[0.25em] text-muted-foreground">
                Comparison Page
              </p>
              <h1 className="font-display text-5xl font-bold leading-[1.05] tracking-tight text-balance md:text-6xl">
                An Insulation Marketing Agency Alternative Built Around{" "}
                <span className="gradient-text">Qualified Lead Flow</span>
              </h1>
              <p className="mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg">
                If you are searching for an insulation marketing agency, you may really
                be searching for a better business model. Appointly Solutions offers a
                pay per lead approach designed to reduce risk and keep attention on the
                opportunities that matter.
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
                  href="/pay-per-lead-insulation"
                  className="inline-flex items-center justify-center rounded-full border border-gray-300 bg-white px-8 py-4 text-sm font-semibold text-gray-700 transition-all hover:bg-gray-50"
                >
                  See Pricing Model
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section className="section-divider py-24 md:py-32">
          <div className="mx-auto max-w-6xl px-6">
            <div className="mb-12 max-w-2xl">
              <p className="mb-4 text-xs font-semibold uppercase tracking-[0.25em] text-muted-foreground">
                Why Contractors Look For Alternatives
              </p>
              <h2 className="font-display text-3xl font-bold text-foreground md:text-4xl">
                The usual agency model can feel misaligned.
              </h2>
            </div>

            <div className="grid gap-5 md:grid-cols-2">
              {agencyProblems.map((problem) => (
                <article key={problem.title} className="glass-card glass-card-hover rounded-3xl p-6">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-primary/20 bg-primary/10">
                    <problem.icon className="h-5 w-5 text-primary" />
                  </div>
                  <h3 className="mt-5 font-display text-xl font-semibold text-foreground">
                    {problem.title}
                  </h3>
                  <p className="mt-3 text-sm leading-7 text-muted-foreground">
                    {problem.description}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section-divider py-24 md:py-32">
          <div className="mx-auto grid max-w-6xl gap-6 px-6 lg:grid-cols-2">
            <article className="glass-card rounded-3xl p-8 md:p-10">
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-muted-foreground">
                How Appointly Solutions Differs
              </p>
              <h2 className="mt-4 font-display text-3xl font-bold text-foreground">
                Built for contractors who want clarity around growth.
              </h2>
              <p className="mt-5 text-sm leading-7 text-muted-foreground md:text-base">
                Appointly Solutions focuses on the operational side of lead generation:
                targeting, fast response, qualification, and booked opportunity flow.
                That is why many insulation contractors see it less as an agency and
                more as a performance-oriented growth system.
              </p>
              <p className="mt-4 text-sm leading-7 text-muted-foreground md:text-base">
                For a broader commercial overview, see{" "}
                <Link href="/insulation-contractor-leads" className="text-primary transition-opacity hover:opacity-80">
                  Insulation Contractor Leads
                </Link>
                . If booked estimates are your main focus, continue to{" "}
                <Link href="/appointment-setting-for-contractors" className="text-primary transition-opacity hover:opacity-80">
                  Appointment Setting for Contractors
                </Link>
                .
              </p>
            </article>

            <article className="rounded-3xl border border-primary/20 bg-primary/10 p-8 shadow-[0_0_70px_rgba(125,135,247,0.1)] md:p-10">
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-slate-600">
                Compare It Live
              </p>
              <h2 className="mt-4 font-display text-3xl font-bold text-foreground">
                Let's look at your current setup and the gaps in it.
              </h2>
              <p className="mt-4 text-sm leading-7 text-slate-700 md:text-base">
                A strategy call with Appointly Solutions can help you compare your
                current agency or in-house marketing approach against a pay per lead
                system designed for insulation contractors.
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
          title="Resources for contractors comparing agencies and performance models."
          description="These pages and articles add more depth around retainer fatigue, alternative pricing, and faster lead flow."
          resources={getCommercialResources("insulation-marketing-agency")}
        />
      </main>
      <Footer />
    </>
  );
}
