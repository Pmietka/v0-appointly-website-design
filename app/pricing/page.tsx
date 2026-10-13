import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, CircleDollarSign, Clock3, LineChart, ShieldCheck } from "lucide-react";

import { Breadcrumbs } from "@/components/breadcrumbs";
import { FaqBlock } from "@/components/faq-block";
import { Footer } from "@/components/footer";
import { Navbar } from "@/components/navbar";
import { SeoResourceLinks } from "@/components/seo-resource-links";
import { pageMetadata } from "@/lib/seo";
import { getCommercialResources } from "@/lib/seo-resources";

const bookingUrl = "https://client.getappointly.co/strategy-calendar";

const reasons = [
  {
    icon: CircleDollarSign,
    title: "Billed per booked appointment",
    description:
      "You pay $125 to $199 for each booked floor coating estimate that lands on your calendar, and nothing for leads that never book. Appointments that turn out unqualified are graded in the Appointly Solutions app and cost you nothing.",
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
      "When the fee for each booked estimate is set up front, forecasting growth and planning crew capacity becomes far more practical.",
  },
];

const faqItems = [
  {
    question: "How much does Appointly Solutions cost?",
    answer:
      "$125 to $199 per booked estimate. The exact price is set per market, based on your city and the work you install, and we confirm it with you on the strategy call. There is no setup fee and no retainer.",
  },
  {
    question: "What does the per-appointment fee cover?",
    answer:
      "The work it takes to put the estimate on your calendar: building and managing the Meta campaigns, contacting every lead within minutes, following up with the ones who do not answer, and booking the appointment. There is no setup fee and no monthly management fee.",
  },
  {
    question: "What counts as a billable appointment?",
    answer:
      "A homeowner in your service area who owns the property, wants floor coating work, and confirmed a specific estimate time. Billing happens when the appointment is booked. If it turns out to be unqualified or a job you cannot bid, you grade it in the Appointly Solutions app with notes and pay nothing for it, and a no show earns a credit toward your next appointment.",
  },
  {
    question: "Is there a long-term contract?",
    answer:
      "No. Appointly Solutions does not lock you into a long term contract.",
  },
  {
    question: "How does this compare to buying floor coating leads?",
    answer:
      "Lead sellers charge per contact whether or not the homeowner answers. Appointly Solutions charges $125 to $199 per booked estimate, so the fee is tied to a confirmed appointment on your calendar rather than a phone number.",
  },
];

export const metadata: Metadata = pageMetadata({
  title: "Pricing: $125 to $199 per Booked Estimate | Appointly Solutions",
  description:
    "Appointly Solutions charges $125 to $199 per booked floor coating estimate, set per market. No setup fee, no retainer, no long term contract.",
  path: "/pricing",
  keywords: [
    "Appointly Solutions pricing",
    "floor coating appointment pricing",
    "pay per appointment",
    "cost per booked estimate",
  ],
});

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
            <Breadcrumbs items={[{ name: "Pricing", href: "/pricing" }]} className="mb-8" />
            <div className="max-w-3xl">
              <p className="text-xs font-semibold tracking-[0.25em] uppercase text-muted-foreground mb-6">
                The Appointly Model
              </p>
              <h1 className="font-display text-5xl md:text-6xl font-bold tracking-tight leading-[1.05] text-balance">
                Appointly Solutions Pricing: $125 to $199 per Booked{" "}
                <span className="gradient-text">Estimate</span>
              </h1>
              <p className="mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg">
                Appointly Solutions charges $125 to $199 for each booked floor coating
                estimate that lands on your calendar, set per market. There is no
                setup fee, no retainer, and no long term contract. This page explains
                exactly how billing works.
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
                  href="/floor-coating-marketing-agency-alternative"
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
                $125 to $199 per booked estimate, set per market.
              </h2>
              <p className="mt-5 text-sm leading-7 text-muted-foreground md:text-base">
                Your price is set per market, based on your city and the work you
                install, and we confirm it on the strategy call. The appointment fee
                covers the work of putting the estimate on your calendar: hitting every
                lead within a minute, qualifying the homeowner on service area and
                project scope, and booking the estimate into a slot that fits your
                route. You are billed when an estimate is booked. If an appointment
                turns out to be unqualified or a job you cannot bid, you grade it in
                the Appointly Solutions app with notes and pay nothing for it, and a
                no show earns a credit toward your next appointment.
              </p>
              <p className="mt-4 text-sm leading-7 text-muted-foreground md:text-base">
                For the broader process, visit{" "}
                <Link href="/how-it-works" className="text-primary transition-opacity hover:opacity-80">
                  How It Works
                </Link>
                . If your main concern is exclusivity, continue to{" "}
                <Link href="/exclusive-floor-coating-leads" className="text-primary transition-opacity hover:opacity-80">
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
                pay-per-appointment pricing, makes sense for your sales process,
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
        <FaqBlock items={faqItems} />
        <SeoResourceLinks
          title="Keep exploring the pages contractors read next."
          description="Pages and guides that go deeper on the topics covered above."
          resources={getCommercialResources("pricing")}
        />
      </main>
      <Footer />
    </>
  );
}
