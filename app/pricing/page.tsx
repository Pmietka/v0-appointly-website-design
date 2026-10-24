import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, CircleDollarSign, LineChart, ShieldCheck, Wallet } from "lucide-react";

import { Breadcrumbs } from "@/components/breadcrumbs";
import { CompareModels } from "@/components/compare-models";
import { FaqBlock } from "@/components/faq-block";
import { Footer } from "@/components/footer";
import { Navbar } from "@/components/navbar";
import { RoiCalculator } from "@/components/roi-calculator";
import { SeoResourceLinks } from "@/components/seo-resource-links";
import { coreFaqItems } from "@/lib/faq";
import { BILLING_ANSWER, FEE_RANGE, OFFER, PRICE_SCHEMA } from "@/lib/offer";
import { ROI_DEFAULTS, calcRoi, one, pct, usd } from "@/lib/roi";
import { pageMetadata } from "@/lib/seo";
import { getCommercialResources } from "@/lib/seo-resources";

const bookingUrl = "https://client.getappointly.co/strategy-calendar";

const core = (question: string) => coreFaqItems.find((item) => item.question === question)!;

const costParts = [
  {
    icon: Wallet,
    title: "1. Your ad spend, at cost",
    description: OFFER.adSpend,
  },
  {
    icon: CircleDollarSign,
    title: `2. ${FEE_RANGE} per booked appointment`,
    description: OFFER.fee,
  },
  {
    icon: ShieldCheck,
    title: "3. The appointment quality guarantee",
    description: `${OFFER.guarantee} ${OFFER.noShow}`,
  },
  {
    icon: LineChart,
    title: "4. Nothing else",
    description:
      "No setup fee, no retainer, no monthly management fee, and no long term contract. Your total cost is your ad spend plus the per appointment fees.",
  },
];

const faqItems = [
  core("How much does Appointly Solutions cost?"),
  {
    question: "Is the appointment fee the only thing I pay?",
    answer: `No. ${OFFER.total} Ad spend goes to Meta at cost, and the appointment fee is invoiced separately, so you always see both numbers.`,
  },
  {
    question: "How much ad spend do I need?",
    answer:
      "We set the daily ad budget with you based on the results you need: how many estimates your crew can run and your market. It comes out of your prefunded balance at cost with no markup, and you get a spend report every week.",
  },
  core("What happens if an appointment is bad or the homeowner does not show up?"),
  {
    question: "What counts as a billable appointment?",
    answer: `A homeowner in your service area, qualified on intent, who has confirmed an estimate time on your calendar. ${OFFER.qualification} ${BILLING_ANSWER}`,
  },
  core("What show and close rates do Appointly clients get?"),
  {
    question: "Is there a long-term contract?",
    answer:
      "No. Appointly Solutions does not lock you into a long term contract. If you stop, any unused ad balance is returned within 10 business days of termination.",
  },
];

export const metadata: Metadata = pageMetadata({
  title: "Pricing: Ad Spend at Cost plus $125 to $175 per Booked Appointment | Appointly Solutions",
  description: OFFER.summary,
  path: "/pricing",
  keywords: [
    "Appointly Solutions pricing",
    "floor coating appointment pricing",
    "pay per appointment",
    "cost per booked estimate",
  ],
});

export default function PricingPage() {
  const d = ROI_DEFAULTS;
  const ex = calcRoi(d);

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
                Appointly Solutions Pricing: Ad Spend at Cost, plus{" "}
                <span className="gradient-text">{FEE_RANGE} per Booked Appointment</span>
              </h1>
              <p className="mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg">
                You fund your ad spend upfront as a prefunded balance, drawn down at
                cost with no markup and reported weekly. On top of that, you pay{" "}
                {FEE_RANGE} per booked appointment, set per client and invoiced
                separately. There is no setup fee, no retainer, and no long term
                contract. This page explains every part of what you pay.
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

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(PRICE_SCHEMA) }}
        />

        <section className="section-divider py-24 md:py-32" id="what-you-pay">
          <div className="mx-auto max-w-6xl px-6">
            <div className="mb-12 max-w-2xl">
              <p className="text-xs font-semibold tracking-[0.25em] uppercase text-muted-foreground mb-4">
                What You Pay
              </p>
              <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground">
                Two costs: your ad spend at cost, and a fee per booked appointment.
              </h2>
            </div>

            <div className="grid gap-5 md:grid-cols-2">
              {costParts.map((part) => (
                <article key={part.title} className="glass-card rounded-3xl p-6">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-primary/20 bg-primary/10">
                    <part.icon className="h-5 w-5 text-primary" />
                  </div>
                  <h3 className="mt-5 font-display text-xl font-semibold text-foreground">
                    {part.title}
                  </h3>
                  <p className="mt-3 text-sm leading-7 text-muted-foreground">
                    {part.description}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section-divider py-24 md:py-32" id="appointment-quality-guarantee">
          <div className="mx-auto grid max-w-6xl gap-6 px-6 lg:grid-cols-2">
            <article className="rounded-3xl border border-primary/20 bg-primary/10 p-8 md:p-10">
              <p className="text-xs font-semibold tracking-[0.25em] uppercase text-slate-600">
                Appointment Quality Guarantee
              </p>
              <h2 className="mt-4 font-display text-3xl font-bold text-foreground">
                You grade every appointment after the estimate. Grade it a C and you do not pay.
              </h2>
              <p className="mt-5 text-sm leading-7 text-slate-700 md:text-base">
                {OFFER.guarantee} {OFFER.noShow}
              </p>
              <p className="mt-4 text-sm leading-7 text-slate-700 md:text-base">
                The grade happens after you have stood in the garage, not when the
                appointment is booked, so you are the one who decides whether an
                appointment was worth sitting.
              </p>
            </article>

            <article className="glass-card rounded-3xl p-8 md:p-10">
              <p className="text-xs font-semibold tracking-[0.25em] uppercase text-muted-foreground">
                How We Qualify Before Booking
              </p>
              <h2 className="mt-4 font-display text-3xl font-bold text-foreground">
                Homeowners are qualified on intent, not just on address.
              </h2>
              <p className="mt-5 text-sm leading-7 text-muted-foreground md:text-base">
                {OFFER.speed} {OFFER.caller}
              </p>
              <p className="mt-4 text-sm leading-7 text-muted-foreground md:text-base">
                {OFFER.qualification}
              </p>
              <p className="mt-4 text-sm leading-7 text-muted-foreground md:text-base">
                The result: {OFFER.results.charAt(0).toLowerCase() + OFFER.results.slice(1)} See the{" "}
                <Link href="/results" className="text-primary transition-opacity hover:opacity-80">
                  results
                </Link>{" "}
                and{" "}
                <Link href="/case-studies" className="text-primary transition-opacity hover:opacity-80">
                  case studies
                </Link>
                .
              </p>
            </article>
          </div>
        </section>

        <section className="section-divider py-24 md:py-32" id="roi-calculator">
          <div className="mx-auto max-w-6xl px-6">
            <div className="mb-10 max-w-3xl">
              <p className="text-xs font-semibold tracking-[0.25em] uppercase text-muted-foreground mb-4">
                ROI Calculator
              </p>
              <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground">
                What a sold job costs you, with ad spend included.
              </h2>
              <p className="mt-4 text-sm leading-7 text-muted-foreground md:text-base">
                Change any number to match your business. Every cost you pay us is
                in here: your ad spend and the per appointment fee.
              </p>
            </div>

            <RoiCalculator />

            <article className="glass-card mt-6 rounded-3xl p-8 md:p-10">
              <h3 className="font-display text-2xl font-semibold text-foreground">
                The assumptions and the math
              </h3>
              <p className="mt-4 text-sm leading-7 text-muted-foreground md:text-base">
                Default values: monthly ad spend {usd(d.adSpend)} and{" "}
                {d.bookedAppointments} booked appointments a month (from our Clean
                Floor Coatings case study), a fee of {usd(d.fee)} per appointment
                (the top of the {FEE_RANGE} range), a {pct(d.showRate)} show rate and
                a {pct(d.closeRate)} close rate (the averages across all Appointly
                clients), {pct(d.cGradeRate)} of appointments graded C, an average
                ticket of {usd(d.averageTicket)} (the average across our clients&apos;
                closed jobs), and a {pct(d.grossMargin)} gross margin before marketing
                (the low end of the 50 to 60% range in our{" "}
                <Link href="/blog/floor-coating-pricing-and-margins" className="text-primary transition-opacity hover:opacity-80">
                  pricing and margins guide
                </Link>
                ).
              </p>
              <ul className="mt-4 list-disc space-y-2 pl-5 text-sm leading-7 text-muted-foreground md:text-base">
                <li>Shown appointments = booked appointments × show rate.</li>
                <li>
                  Billed appointments = shown appointments × (1 minus the share graded C). No
                  shows and C grades are credited, so they cost no fee.
                </li>
                <li>Total marketing cost = monthly ad spend + billed appointments × fee.</li>
                <li>Jobs sold = billed appointments × your close rate.</li>
                <li>Cost per job sold = total marketing cost ÷ jobs sold.</li>
                <li>
                  Gross profit after all marketing costs = jobs sold × average ticket × gross
                  margin, minus total marketing cost.
                </li>
              </ul>
              <p className="mt-4 text-sm leading-7 text-muted-foreground md:text-base">
                Worked example with the defaults: {one(ex.shownAppointments)} shown
                appointments, {usd(ex.appointmentFees)} in appointment fees, a total
                marketing cost of {usd(ex.totalMarketingCost)}, {one(ex.jobsSold)} jobs
                sold, a cost per job sold of {usd(ex.costPerJobSold)}, {usd(ex.revenue)}{" "}
                in revenue, and {usd(ex.grossProfitAfterMarketing)} in gross profit after
                all marketing costs. Your numbers will differ with your market, ticket,
                and close rate.
              </p>
            </article>
          </div>
        </section>

        <section className="section-divider py-24 md:py-32" id="compare">
          <div className="mx-auto max-w-6xl px-6">
            <div className="mb-10 max-w-3xl">
              <p className="text-xs font-semibold tracking-[0.25em] uppercase text-muted-foreground mb-4">
                Compare The Models
              </p>
              <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground">
                How Appointly compares with agencies, lead sellers, and Google.
              </h2>
              <p className="mt-4 text-sm leading-7 text-muted-foreground md:text-base">
                The other columns describe how each model is typically priced. Terms
                vary by company, so confirm them with any provider you consider.
              </p>
            </div>
            <CompareModels />
          </div>
        </section>

        <section className="section-divider py-24 md:py-32" id="fit">
          <div className="mx-auto grid max-w-6xl gap-6 px-6 lg:grid-cols-2">
            <article className="glass-card rounded-3xl p-8 md:p-10">
              <p className="text-xs font-semibold tracking-[0.25em] uppercase text-muted-foreground">
                Who We Are a Fit For
              </p>
              <h2 className="mt-4 font-display text-3xl font-bold text-foreground">
                Owners with a premium product who can sell it.
              </h2>
              <p className="mt-5 text-sm leading-7 text-muted-foreground md:text-base">
                {OFFER.fit} You pay for the appointment, and you close the job, so the
                model works best for owners who are good in the garage. The
                appointment quality guarantee and qualifying on intent are what make
                each appointment worth sitting.
              </p>
            </article>
            <article className="glass-card rounded-3xl p-8 md:p-10">
              <p className="text-xs font-semibold tracking-[0.25em] uppercase text-muted-foreground">
                Who We Are Not a Fit For
              </p>
              <h2 className="mt-4 font-display text-3xl font-bold text-foreground">
                We will tell you on the call if this is not for you.
              </h2>
              <p className="mt-5 text-sm leading-7 text-muted-foreground md:text-base">
                {OFFER.notFit}
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
