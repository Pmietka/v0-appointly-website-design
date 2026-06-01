import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, CalendarCheck2, MessageSquareReply, PhoneCall, TimerReset } from "lucide-react";

import { Footer } from "@/components/footer";
import { Navbar } from "@/components/navbar";
import { ProofSection } from "@/components/proof-section";
import { SeoResourceLinks } from "@/components/seo-resource-links";
import { getCommercialResources } from "@/lib/seo-resources";

const bookingUrl = "https://client.getappointly.co/strategy-calendar";

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
      "Appointment setting is about converting real interest into a confirmed time on the calendar, not just logging a contact form entry.",
  },
  {
    icon: TimerReset,
    title: "Cleaner sales handoff",
    description:
      "When the homeowner is qualified and the estimate is scheduled, your team can move straight into the sales conversation.",
  },
];

export const metadata: Metadata = {
  title: "Appointment Setting for Home Service Contractors | Appointly Solutions",
  description:
    "See how Appointly Solutions handles appointment setting for home service contractors — fast follow-up, prospect qualification, and booked estimates on a pay-for-performance basis.",
  keywords: [
    "appointment setting for contractors",
    "home service contractor appointments",
    "booked estimates for contractors",
    "Appointly Solutions",
  ],
  alternates: {
    canonical: "https://getappointly.co/appointment-setting-for-contractors",
  },
  openGraph: {
    title: "Appointment Setting for Home Service Contractors | Appointly Solutions",
    description:
      "Learn how Appointly Solutions helps home service contractors turn qualified prospects into booked estimate appointments.",
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
            <div className="absolute top-0 right-0 h-[700px] w-[700px] rounded-full bg-primary/[0.06] blur-[145px]" />
            <div className="absolute inset-0 dot-grid opacity-35" />
          </div>

          <div className="mx-auto max-w-6xl px-6">
            <div className="max-w-3xl">
              <p className="mb-6 text-xs font-semibold uppercase tracking-[0.25em] text-muted-foreground">
                Booked Estimate Workflow
              </p>
              <h1 className="font-display text-5xl font-bold leading-[1.05] tracking-tight text-balance md:text-6xl">
                Booked Estimates Are{" "}
                <span className="gradient-text">Already Qualified</span> When They Reach You
              </h1>
              <p className="mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg">
                When we deliver a booked appointment, you are already halfway to a
                closed job. We screen every homeowner for intent, project fit, and
                service area — then schedule them directly on your calendar so your
                team walks into real conversations, not cold inquiries.
              </p>
              <div className="mt-10 flex flex-wrap gap-4">
                <a
                  href={bookingUrl}
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-primary px-8 py-4 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90"
                >
                  Book a free strategy call
                  <ArrowRight className="h-4 w-4" />
                </a>
                <Link
                  href="/how-it-works"
                  className="inline-flex items-center justify-center rounded-full border border-gray-300 bg-white px-8 py-4 text-sm font-semibold text-gray-700 transition-all hover:bg-gray-50"
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
              <p className="mb-4 text-xs font-semibold uppercase tracking-[0.25em] text-muted-foreground">
                Why Appointment Setting Matters
              </p>
              <h2 className="font-display text-3xl font-bold text-foreground md:text-4xl">
                More prospects alone do not guarantee more revenue.
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
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-muted-foreground">
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
                To see the featured niche in action, visit{" "}
                <Link href="/floor-coating-contractor-marketing" className="text-primary transition-opacity hover:opacity-80">
                  Floor Coating Contractor Marketing
                </Link>
                . To compare the business model behind it, continue to{" "}
                <Link href="/pay-per-lead-insulation" className="text-primary transition-opacity hover:opacity-80">
                  Pay-For-Performance Model
                </Link>
                .
              </p>
            </article>

            <article className="rounded-3xl border border-primary/20 bg-primary/10 p-8 shadow-[0_0_70px_rgba(125,135,247,0.1)] md:p-10">
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-slate-600">
                Book More Estimates
              </p>
              <h2 className="mt-4 font-display text-3xl font-bold text-foreground">
                Talk through where prospects are stalling in your current process.
              </h2>
              <p className="mt-4 text-sm leading-7 text-slate-700 md:text-base">
                A strategy call with Appointly Solutions can help identify whether your
                main bottleneck is prospect volume, speed to contact, qualification, or
                appointment setting itself.
              </p>
              <a
                href={bookingUrl}
                className="mt-8 inline-flex items-center justify-center gap-2 rounded-full bg-primary px-8 py-4 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90"
              >
                Book a free strategy call
                <ArrowRight className="h-4 w-4" />
              </a>
            </article>
          </div>
        </section>

        <ProofSection />
        <SeoResourceLinks
          title="Pages that support the booked-estimate story."
          description="These related pages connect appointment setting with appointment quality, traffic sources, and contractor acquisition strategy."
          resources={getCommercialResources("appointment-setting-for-contractors")}
        />
      </main>
      <Footer />
    </>
  );
}
