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
    title: "Speed to lead",
    description:
      "We contact every floor coating lead the moment it comes in, before the homeowner can call three other contractors and start shopping around.",
  },
  {
    icon: MessageSquareReply,
    title: "Persistent follow up",
    description:
      "Many good opportunities are not ready on the first touch. We keep following up so more of them turn into a booked estimate on your calendar.",
  },
  {
    icon: CalendarCheck2,
    title: "Booked estimate focus",
    description:
      "We do not hand you raw leads. We book the homeowner into a real time on your calendar, so the next step is you showing up to quote the floor.",
  },
  {
    icon: TimerReset,
    title: "Clean handoff",
    description:
      "Once the estimate is set, you just show up, run the quote, do the coating, and collect the cash. We handle everything up to the appointment.",
  },
];

export const metadata: Metadata = {
  title: "Appointment Setting for Floor Coating Contractors",
  description:
    "Appointly Solutions fills your calendar with booked floor coating estimates using Meta ads, instant speed to lead, and persistent follow up so you just show up and quote.",
  keywords: [
    "appointment setting for contractors",
    "floor coating appointment setting",
    "booked estimates for floor coating contractors",
    "speed to lead",
    "Appointly Solutions",
  ],
  alternates: {
    canonical: "https://getappointly.co/appointment-setting-for-contractors",
  },
  openGraph: {
    title: "Appointment Setting for Floor Coating Contractors",
    description:
      "Learn how Appointly Solutions contacts every floor coating lead instantly and books the estimate onto your calendar so you just show up and quote.",
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
                Booked Estimate Page
              </p>
              <h1 className="font-display text-5xl font-bold leading-[1.05] tracking-tight text-balance md:text-6xl">
                Booked Estimates Are the <span className="gradient-text">Result</span>{" "}
                of the Appointly Model
              </h1>
              <p className="mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg">
                We do the complete job of filling your calendar. We run the Meta ads,
                contact every floor coating lead the moment it lands, and book the
                homeowner into a time that works for you - so you walk into real
                estimates, not cold inquiries you have to chase.
              </p>
              <div className="mt-10 flex flex-wrap gap-4">
                <a
                  href={bookingUrl}
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-8 py-4 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90"
                >
                  Book a Strategy Call
                  <ArrowRight className="h-4 w-4" />
                </a>
                <Link
                  href="/how-it-works"
                  className="inline-flex items-center justify-center rounded-xl border border-gray-300 bg-white px-8 py-4 text-sm font-semibold text-gray-700 transition-all hover:bg-gray-50"
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
                More leads alone do not fill your calendar. Booked estimates do.
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
                How Appointly Solutions Books the Estimate
              </p>
              <h2 className="mt-4 font-display text-3xl font-bold text-foreground">
                Built to move homeowners from ad click to your calendar.
              </h2>
              <p className="mt-5 text-sm leading-7 text-muted-foreground md:text-base">
                Appointly Solutions combines Meta ads, instant speed to lead, and
                persistent follow up so booked estimates do not depend on your team
                catching every inquiry the moment it comes in.
              </p>
              <p className="mt-4 text-sm leading-7 text-muted-foreground md:text-base">
                To see the floor coating estimates we deliver, visit{" "}
                <Link href="/insulation-contractor-leads" className="text-primary transition-opacity hover:opacity-80">
                  Floor Coating Appointments
                </Link>
                . To understand the business model behind it, continue to{" "}
                <Link href="/pay-per-lead-insulation" className="text-primary transition-opacity hover:opacity-80">
                  The Appointly Model
                </Link>
                .
              </p>
            </article>

            <article className="rounded-3xl border border-primary/20 bg-primary/10 p-8 shadow-[0_0_70px_rgba(125,135,247,0.1)] md:p-10">
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-slate-600">
                Book More Estimates
              </p>
              <h2 className="mt-4 font-display text-3xl font-bold text-foreground">
                Talk through what is keeping your calendar from filling up.
              </h2>
              <p className="mt-4 text-sm leading-7 text-slate-700 md:text-base">
                A strategy call with Appointly Solutions can help identify whether your
                main bottleneck is ad volume, speed to lead, follow up, or the booking
                handoff itself - and how the Appointly Model fixes it.
              </p>
              <a
                href={bookingUrl}
                className="mt-8 inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-8 py-4 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90"
              >
                Book a Strategy Call
                <ArrowRight className="h-4 w-4" />
              </a>
            </article>
          </div>
        </section>

        <ProofSection />
        <SeoResourceLinks
          title="Pages that support the booked-estimate story."
          description="These related pages connect appointment setting with booked floor coating estimates, Meta ad traffic, and the Appointly Model."
          resources={getCommercialResources("appointment-setting-for-contractors")}
        />
      </main>
      <Footer />
    </>
  );
}
