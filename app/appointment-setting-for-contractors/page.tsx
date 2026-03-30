import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, CalendarCheck2, MessageSquareReply, PhoneCall, TimerReset } from "lucide-react";

import { Footer } from "@/components/footer";
import { Navbar } from "@/components/navbar";

const bookingUrl = "https://client.getappointly.co";

const pillars = [
  {
    icon: PhoneCall,
    title: "Fast initial contact",
    description:
      "Speed matters because homeowners who request information often move on quickly when no one responds.",
  },
  {
    icon: MessageSquareReply,
    title: "Persistent follow up",
    description:
      "Many good opportunities are not ready on the first touch. Consistent follow up increases the odds of booking the estimate.",
  },
  {
    icon: CalendarCheck2,
    title: "Booked estimate focus",
    description:
      "Appointment setting is about converting raw interest into a real time on the calendar, not just logging a contact form entry.",
  },
  {
    icon: TimerReset,
    title: "Cleaner sales handoff",
    description:
      "When the homeowner is qualified and the estimate is scheduled, your team can move straight into the sales conversation.",
  },
];

export const metadata: Metadata = {
  title: "Appointment Setting for Insulation Contractors",
  description:
    "See how Appointly Solutions helps with appointment setting for insulation contractors through fast follow up, qualification, and booked estimate workflows.",
  keywords: [
    "appointment setting for contractors",
    "insulation appointment setting",
    "booked estimates for insulation contractors",
    "Appointly Solutions",
  ],
  alternates: {
    canonical: "https://getappointly.co/appointment-setting-for-contractors",
  },
  openGraph: {
    title: "Appointment Setting for Insulation Contractors",
    description:
      "Learn how Appointly Solutions helps insulation contractors turn leads into booked estimate appointments.",
    url: "https://getappointly.co/appointment-setting-for-contractors",
    siteName: "Appointly Solutions",
    type: "website",
  },
};

export default function AppointmentSettingForContractorsPage() {
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
                Booked Estimate Page
              </p>
              <h1 className="font-display text-5xl md:text-6xl font-bold tracking-tight leading-[1.05] text-balance">
                Booked Estimates Are the{" "}
                <span className="gradient-text">Result</span>{" "}
                of the PPL System
              </h1>
              <p className="mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg">
                When we deliver a qualified insulation lead, you're already halfway to
                a booked estimate. We screen every homeowner for intent, budget, and
                service area fit before they ever reach you — so your team walks into
                real conversations, not cold inquiries.
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
                  See The Process
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section className="section-divider py-24 md:py-32">
          <div className="mx-auto max-w-6xl px-6">
            <div className="mb-12 max-w-2xl">
              <p className="text-xs font-semibold tracking-[0.25em] uppercase text-muted-foreground mb-4">
                Why Appointment Setting Matters
              </p>
              <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground">
                More leads alone do not guarantee more revenue.
              </h2>
            </div>

            <div className="grid gap-5 md:grid-cols-2">
              {pillars.map((pillar) => (
                <article key={pillar.title} className="glass-card glass-card-hover rounded-3xl p-6">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-primary/20 bg-primary/10">
                    <pillar.icon className="h-5 w-5 text-primary" />
                  </div>
                  <h3 className="mt-5 font-display text-xl font-semibold text-foreground">
                    {pillar.title}
                  </h3>
                  <p className="mt-3 text-sm leading-7 text-muted-foreground">
                    {pillar.description}
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
                How Appointly Solutions Supports Booking
              </p>
              <h2 className="mt-4 font-display text-3xl font-bold text-foreground">
                Built to move prospects from interest to calendar.
              </h2>
              <p className="mt-5 text-sm leading-7 text-muted-foreground md:text-base">
                Appointly Solutions combines quick response, qualification logic, and
                continued follow up so booked estimate opportunities do not depend on
                your team catching every inquiry in real time.
              </p>
              <p className="mt-4 text-sm leading-7 text-muted-foreground md:text-base">
                To understand the upstream lead source, see{" "}
                <Link href="/insulation-contractor-leads" className="text-primary hover:text-[#a5abff] transition-colors">
                  Insulation Contractor Leads
                </Link>
                . To compare the business model behind it, continue to{" "}
                <Link href="/pay-per-lead-insulation" className="text-primary hover:text-[#a5abff] transition-colors">
                  Pay Per Lead Insulation
                </Link>
                .
              </p>
            </article>

            <article className="rounded-3xl border border-[#7d87f7]/20 bg-[#7d87f7]/[0.08] p-8 shadow-[0_0_70px_rgba(125,135,247,0.1)] md:p-10">
              <p className="text-xs font-semibold tracking-[0.25em] uppercase text-[#d7dbff]">
                Book More Estimates
              </p>
              <h2 className="mt-4 font-display text-3xl font-bold text-foreground">
                Talk through where leads are stalling in your current process.
              </h2>
              <p className="mt-4 text-sm leading-7 text-[#e6e9ff]/80 md:text-base">
                A strategy call with Appointly Solutions can help identify whether your
                main bottleneck is lead volume, speed to lead, qualification, or
                appointment setting itself.
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
