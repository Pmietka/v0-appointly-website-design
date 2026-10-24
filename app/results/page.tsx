import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Breadcrumbs } from "@/components/breadcrumbs";
import { Footer } from "@/components/footer";
import { Navbar } from "@/components/navbar";
import { ResultCaseStudyCard } from "@/components/result-case-study";
import { CASE_STUDIES } from "@/lib/case-studies";
import { AGGREGATE_RESULTS, RESULT_CASE_STUDIES, isPublishable } from "@/lib/results";
import { OFFER } from "@/lib/offer";
import { pageMetadata } from "@/lib/seo";

// Per client numbers, exactly as published on each case study page.
const CLIENT_ROWS = [
  {
    slug: "clean-floor-coatings",
    client: "Clean Floor Coatings",
    market: "Myrtle Beach, SC",
    product: "Epoxy and polyaspartic",
    closeRate: "About 70% of shown appointments",
    volume: "37 shown appointments in month one, 26 closed",
    ticket: "Not published",
    adSpend: "About $2,600 a month",
  },
  {
    slug: "afab-services",
    client: "AFAB Services",
    market: "Port St. Lucie, FL",
    product: "Floor coating",
    closeRate: "57%",
    volume: "18 jobs in the first month, $35k+ closed in his best month",
    ticket: "$3,500",
    adSpend: "Not published",
  },
  {
    slug: "garage-force-inland-northwest",
    client: "Garage Force of the Inland Northwest",
    market: "Spokane, WA",
    product: "Full polyurea system",
    closeRate: "50%",
    volume: "Fewer, higher ticket appointments by design",
    ticket: "$5,000",
    adSpend: "About $2,000 a month",
  },
];

const bookingUrl = "https://client.getappointly.co/strategy-calendar";

export const metadata: Metadata = pageMetadata({
  title: "Client Results | Appointly Solutions",
  description:
    "Across all Appointly Solutions clients, 97% of booked appointments show and clients close 60% on average. Over 100 jobs closed at about $3,500 average ticket, over $350,000 in client revenue.",
  path: "/results",
  ogTitle: "Appointly Solutions Client Results: Over 100 Jobs Closed",
  keywords: [
    "Appointly Solutions results",
    "floor coating lead generation results",
    "booked estimates case studies",
  ],
});

export default function ResultsPage() {
  const studies = RESULT_CASE_STUDIES.filter(isPublishable);
  const caseStudies = [...CASE_STUDIES].sort((a, b) => a.order - b.order);

  return (
    <>
      <Navbar />
      <main className="overflow-hidden">
        <section className="relative pb-20 pt-32 md:pb-28 md:pt-44">
          <div className="absolute inset-0 -z-10">
            <div className="absolute right-0 top-0 h-[700px] w-[700px] rounded-full bg-primary/[0.06] blur-[145px]" />
            <div className="absolute inset-0 dot-grid opacity-35" />
          </div>

          <div className="mx-auto max-w-6xl px-6">
            <Breadcrumbs items={[{ name: "Results", href: "/results" }]} className="mb-8" />
            <div className="max-w-3xl">
              <p className="mb-6 text-xs font-semibold uppercase tracking-[0.25em] text-muted-foreground">
                Client Results
              </p>
              <h1 className="font-display text-5xl font-bold leading-[1.05] tracking-tight text-balance md:text-6xl">
                Appointly Solutions <span className="gradient-text">Results</span>
              </h1>
              <p className="mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg">
                {OFFER.results} Appointly Solutions has helped floor coating
                contractors close over 100 jobs, at an average ticket of about
                $3,500, for over $350,000 in client revenue. Every one of those jobs
                started as an estimate we booked onto the contractor&apos;s calendar.
              </p>
            </div>
          </div>
        </section>

        <section className="section-divider py-24 md:py-32">
          <div className="mx-auto max-w-6xl px-6">
            <div className="mb-12 max-w-2xl">
              <p className="mb-4 text-xs font-semibold uppercase tracking-[0.25em] text-muted-foreground">
                By the Numbers
              </p>
              <h2 className="font-display text-3xl font-bold text-foreground md:text-4xl">
                What Appointly Solutions clients have closed so far.
              </h2>
            </div>

            <div className="grid gap-5 md:grid-cols-3">
              {AGGREGATE_RESULTS.map((stat) => (
                <article key={stat.label} className="glass-card rounded-3xl p-6">
                  <p className="font-display text-4xl font-bold text-foreground">{stat.value}</p>
                  <p className="mt-3 text-sm leading-7 text-muted-foreground">{stat.label}</p>
                </article>
              ))}
            </div>

            <div className="glass-card mt-6 rounded-3xl p-6 md:p-8">
              <h3 className="font-display text-xl font-semibold text-foreground">How these numbers are measured</h3>
              <ul className="mt-4 list-disc space-y-2 pl-5 text-sm leading-7 text-muted-foreground">
                <li>Show rate and close rate are averages across all Appointly Solutions clients, not just the ones in our case studies.</li>
                <li>Show rate is the share of booked appointments where the homeowner was there for the estimate. Every no show is credited automatically to the client&apos;s next appointment.</li>
                <li>Close rate is the client&apos;s close rate: the share of appointments the contractor sold. We qualify and book the homeowner; the contractor runs the estimate.</li>
                <li>Homeowners are qualified on intent before booking: their project goal, the look and material they want, and a real timeline.</li>
              </ul>
            </div>

            <div className="mt-12 max-w-2xl">
              <h2 className="font-display text-3xl font-bold text-foreground md:text-4xl">
                Results by client.
              </h2>
              <p className="mt-4 leading-relaxed text-muted-foreground">
                The clients in our published case studies, with the numbers each one
                shared. Each case study has the owner on video, their real estimate
                calendar, and the full interview transcript.
              </p>
            </div>
            <div className="mt-8 overflow-x-auto rounded-3xl border border-gray-200 bg-white">
              <table className="w-full min-w-[820px] text-left text-sm">
                <caption className="sr-only">Appointly Solutions results by client</caption>
                <thead>
                  <tr className="border-b border-gray-200 text-slate-500">
                    <th scope="col" className="p-4 font-semibold">Client</th>
                    <th scope="col" className="p-4 font-semibold">Market</th>
                    <th scope="col" className="p-4 font-semibold">Product</th>
                    <th scope="col" className="p-4 font-semibold">Client close rate</th>
                    <th scope="col" className="p-4 font-semibold">Volume</th>
                    <th scope="col" className="p-4 font-semibold">Average job</th>
                    <th scope="col" className="p-4 font-semibold">Ad spend (client funded)</th>
                  </tr>
                </thead>
                <tbody>
                  {CLIENT_ROWS.map((r) => (
                    <tr key={r.slug} className="border-b border-gray-100 last:border-0 text-slate-700">
                      <th scope="row" className="p-4 font-semibold text-slate-950">
                        <Link href={`/case-studies/${r.slug}`} className="hover:text-primary">{r.client}</Link>
                      </th>
                      <td className="p-4">{r.market}</td>
                      <td className="p-4">{r.product}</td>
                      <td className="p-4">{r.closeRate}</td>
                      <td className="p-4">{r.volume}</td>
                      <td className="p-4">{r.ticket}</td>
                      <td className="p-4">{r.adSpend}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        <section className="section-divider py-24 md:py-32">
          <div className="mx-auto max-w-6xl px-6">
            <div className="mb-12 max-w-2xl">
              <p className="mb-4 text-xs font-semibold uppercase tracking-[0.25em] text-muted-foreground">
                Case Studies
              </p>
              <h2 className="font-display text-3xl font-bold text-foreground md:text-4xl">
                Hear it from the contractors.
              </h2>
              <p className="mt-4 leading-relaxed text-muted-foreground">
                Each case study has the owner on video, their real estimate
                calendar, and the full interview transcript.
              </p>
            </div>

            <div className="grid gap-5 md:grid-cols-3">
              {caseStudies.map((c) => (
                <article key={c.slug} className="glass-card glass-card-hover rounded-3xl p-6">
                  <p className="text-xs font-semibold uppercase tracking-[0.25em] text-muted-foreground">
                    {c.marketShort}
                  </p>
                  <h3 className="mt-4 font-display text-xl font-semibold text-foreground">
                    {c.company}
                  </h3>
                  <p className="mt-3 text-sm leading-7 text-muted-foreground">{c.headline}</p>
                  <Link
                    href={`/case-studies/${c.slug}`}
                    className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-primary transition-opacity hover:opacity-80"
                  >
                    Read the {c.shortName} case study
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </article>
              ))}
            </div>

            {studies.length > 0 && (
              <div className="mt-6 grid gap-6 lg:grid-cols-2">
                {studies.map((study) => (
                  <ResultCaseStudyCard key={`${study.company}-${study.city}`} study={study} />
                ))}
              </div>
            )}
          </div>
        </section>

        <section className="section-divider py-24 md:py-32">
          <div className="mx-auto max-w-5xl px-6">
            <div className="rounded-[32px] border border-primary/20 bg-primary/10 p-8 text-center shadow-[0_0_80px_rgba(125,135,247,0.12)] md:p-12">
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-slate-600">
                Your Market
              </p>
              <h2 className="mt-4 font-display text-3xl font-bold text-foreground md:text-4xl">
                See if your city is open.
              </h2>
              <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-slate-700 md:text-base">
                Appointly Solutions works with one floor coating contractor per market.
                Book a strategy call to check your market, or read the{" "}
                <Link
                  href="/pricing"
                  className="text-slate-950 underline decoration-slate-400/70 underline-offset-4 transition-colors hover:text-slate-700"
                >
                  pricing
                </Link>{" "}
                and{" "}
                <Link
                  href="/faq"
                  className="text-slate-950 underline decoration-slate-400/70 underline-offset-4 transition-colors hover:text-slate-700"
                >
                  FAQ
                </Link>{" "}
                first.
              </p>
              <a
                href={bookingUrl}
                className="mt-8 inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-8 py-4 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90"
              >
                Book a Strategy Call
                <ArrowRight className="h-4 w-4" />
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
