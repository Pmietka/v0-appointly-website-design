import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  CalendarCheck2,
  CircleDollarSign,
  MessageSquareReply,
  SearchCheck,
  Send,
  Target,
} from "lucide-react";

import { Footer } from "@/components/footer";
import { Navbar } from "@/components/navbar";

const bookingUrl = "https://client.getappointly.co/strategy-calendar";

const steps = [
  {
    icon: Target,
    title: "We Run Targeted Campaigns",
    description:
      "Appointly Solutions launches localized campaigns aimed at homeowners already searching for insulation help, so the traffic has clear service intent from the start.",
  },
  {
    icon: Send,
    title: "Leads Come In, We Respond Instantly",
    description:
      "As soon as an inquiry arrives, the response process starts quickly. That keeps momentum high while competitors are still waiting to call back.",
  },
  {
    icon: SearchCheck,
    title: "We Pre Qualify Every Lead",
    description:
      "We verify the service area, project fit, and readiness so your team is not wasting time on low quality inquiries.",
  },
  {
    icon: CalendarCheck2,
    title: "Qualified Leads Land on Your Calendar",
    description:
      "When the opportunity fits, the lead is moved toward a booked estimate so your team can focus on selling the job instead of chasing the job.",
  },
  {
    icon: MessageSquareReply,
    title: "We Follow Up Until They Book or Disqualify",
    description:
      "Some homeowners need extra touches before they commit. We keep the follow up running until the lead books, goes cold, or no longer qualifies.",
  },
];

const processFaq = [
  {
    question: "Do I need to manage campaigns myself?",
    answer:
      "No. Appointly Solutions handles the campaign setup, follow up sequence, and qualification flow so your team can stay focused on field work and closing estimates.",
  },
  {
    question: "What does a qualified lead usually include?",
    answer:
      "A strong lead typically includes the homeowner name, phone number, location, service need, and enough context to know the job fits your target profile.",
  },
  {
    question: "Can I see how the system connects back to the homepage offer?",
    answer:
      "Yes. The homepage explains the promise at a high level, while this page breaks down the operational steps that make the offer work.",
  },
];

export const metadata: Metadata = {
  title: "How It Works | Appointly Solutions Lead Generation Process",
  description:
    "Learn how Appointly Solutions generates, qualifies, follows up with, and books insulation leads on a cost per lead model.",
  keywords: [
    "how insulation leads work",
    "lead generation process",
    "cost per lead model",
  ],
  alternates: {
    canonical: "https://getappointly.co/how-it-works",
  },
  openGraph: {
    title: "How It Works | Appointly Solutions Lead Generation Process",
    description:
      "See the full Appointly Solutions process from targeted campaigns to booked estimates for insulation contractors.",
    url: "https://getappointly.co/how-it-works",
    siteName: "Appointly Solutions",
    type: "website",
  },
};

export default function HowItWorksPage() {
  return (
    <>
      <Navbar />
      <main className="overflow-hidden">
        <section className="relative pt-32 pb-20 md:pt-44 md:pb-28">
          <div className="absolute inset-0 -z-10">
            <div className="absolute top-10 right-0 h-[720px] w-[720px] rounded-full bg-[#7d87f7]/[0.06] blur-[150px]" />
            <div className="absolute inset-0 dot-grid opacity-35" />
          </div>

          <div className="mx-auto max-w-6xl px-6">
            <div className="max-w-3xl">
              <p className="text-xs font-semibold tracking-[0.25em] uppercase text-muted-foreground mb-6">
                Process Overview
              </p>
              <h1 className="font-display text-5xl md:text-6xl font-bold tracking-tight leading-[1.05] text-balance">
                How <span className="gradient-text">Appointly Solutions</span> Works
              </h1>
              <p className="mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg">
                Our system is built to turn homeowner interest into qualified,
                scheduled estimate opportunities. Appointly Solutions manages the
                moving parts so insulation contractors can spend less time chasing
                leads and more time closing jobs.
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
                  href="/faq"
                  className="inline-flex items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] px-8 py-4 text-sm font-semibold text-foreground hover:bg-white/[0.08] hover:border-white/[0.15] transition-all"
                >
                  Read the FAQ
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section className="section-divider py-24 md:py-32">
          <div className="mx-auto max-w-6xl px-6">
            <div className="mb-12 max-w-2xl">
              <p className="text-xs font-semibold tracking-[0.25em] uppercase text-muted-foreground mb-4">
                Step By Step
              </p>
              <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground">
                The system behind every booked opportunity.
              </h2>
            </div>

            <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              {steps.map((step, index) => (
                <article
                  key={step.title}
                  className="glass-card glass-card-hover rounded-3xl p-6"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-primary/20 bg-primary/10">
                      <step.icon className="h-5 w-5 text-primary" />
                    </div>
                    <span className="font-display text-3xl font-bold text-white/[0.08]">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <h3 className="mt-6 font-display text-xl font-semibold text-foreground">
                    {step.title}
                  </h3>
                  <p className="mt-3 text-sm leading-7 text-muted-foreground">
                    {step.description}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section-divider py-24 md:py-32">
          <div className="mx-auto grid max-w-6xl gap-6 px-6 lg:grid-cols-[1.2fr_0.8fr]">
            <article className="glass-card rounded-3xl p-8 md:p-10">
              <p className="text-xs font-semibold tracking-[0.25em] uppercase text-muted-foreground">
                What You Get
              </p>
              <h2 className="mt-4 font-display text-3xl font-bold text-foreground">
                A qualified lead should feel ready for a real sales conversation.
              </h2>
              <p className="mt-5 text-sm leading-7 text-muted-foreground md:text-base">
                A typical Appointly Solutions lead includes verified contact details,
                clear insulation intent, service area alignment, and enough project
                context for your team to move directly into the estimate conversation.
              </p>
              <p className="mt-4 text-sm leading-7 text-muted-foreground md:text-base">
                If you want more background on why we built the system this way, the{" "}
                <Link href="/about" className="text-primary hover:text-[#a5abff] transition-colors">
                  About page
                </Link>{" "}
                shares the operating principles behind the model. For the direct offer,
                see{" "}
                <Link
                  href="/insulation-contractor-leads"
                  className="text-primary hover:text-[#a5abff] transition-colors"
                >
                  Insulation Contractor Leads
                </Link>
                .
              </p>
            </article>

            <article className="rounded-3xl border border-[#7d87f7]/20 bg-[#7d87f7]/[0.08] p-8 shadow-[0_0_70px_rgba(125,135,247,0.1)] md:p-10">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/20 bg-white/10">
                <CircleDollarSign className="h-5 w-5 text-white" />
              </div>
              <p className="mt-6 text-xs font-semibold tracking-[0.25em] uppercase text-[#d7dbff]">
                What It Costs
              </p>
              <h2 className="mt-4 font-display text-3xl font-bold text-foreground">
                Cost per lead, aligned with performance.
              </h2>
              <p className="mt-4 text-sm leading-7 text-[#e6e9ff]/80 md:text-base">
                Appointly Solutions is structured around pay per qualified lead. That
                keeps the conversation focused on lead quality, speed, and booked
                outcomes instead of large retainers detached from production.
              </p>
            </article>
          </div>
        </section>

        <section className="section-divider relative py-24 md:py-32">
          <div className="absolute inset-0 -z-10">
            <div className="absolute bottom-0 left-1/4 h-[520px] w-[520px] rounded-full bg-[#7d87f7]/[0.05] blur-[120px]" />
          </div>

          <div className="mx-auto max-w-6xl px-6">
            <div className="mb-12 max-w-2xl">
              <p className="text-xs font-semibold tracking-[0.25em] uppercase text-muted-foreground mb-4">
                Common Questions
              </p>
              <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground">
                Quick answers about the process.
              </h2>
            </div>

            <div className="grid gap-5 md:grid-cols-3">
              {processFaq.map((item) => (
                <article key={item.question} className="glass-card rounded-2xl p-6">
                  <h3 className="font-display text-xl font-semibold text-foreground">
                    {item.question}
                  </h3>
                  <p className="mt-3 text-sm leading-7 text-muted-foreground">
                    {item.answer}
                  </p>
                </article>
              ))}
            </div>

            <p className="mt-8 text-sm leading-7 text-muted-foreground">
              You can also return to the{" "}
              <Link href="/" className="text-primary hover:text-[#a5abff] transition-colors">
                homepage
              </Link>{" "}
              for the big picture overview or visit the{" "}
              <Link href="/faq" className="text-primary hover:text-[#a5abff] transition-colors">
                FAQ
              </Link>{" "}
              for more detailed answers, or head to{" "}
              <Link
                href="/appointment-setting-for-contractors"
                className="text-primary hover:text-[#a5abff] transition-colors"
              >
                Appointment Setting for Contractors
              </Link>{" "}
              if booked estimates are your main concern.
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
