import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  CalendarDays,
  Clock3,
  Database,
  Quote,
  RefreshCw,
} from "lucide-react";

import { Breadcrumbs } from "@/components/breadcrumbs";
import { FaqBlock, type FaqItem } from "@/components/faq-block";
import { Footer } from "@/components/footer";
import { Navbar } from "@/components/navbar";
import { SeoResourceLinks } from "@/components/seo-resource-links";
import { getAuthor, personSchema } from "@/lib/authors";
import { getBlogCommercialResources } from "@/lib/seo-resources";

const baseUrl = "https://getappointly.co";
const pagePath = "/floor-coating-benchmarks";
const canonical = `${baseUrl}${pagePath}`;
const bookingUrl = "https://client.getappointly.co/strategy-calendar";

// Refresh these two lines every quarter when the numbers are re-pulled.
const publishedAt = new Date("2026-09-11T12:00:00Z");
const updatedAt = new Date("2026-09-11T12:00:00Z");
const updatedLabel = "September 2026";

const pageTitle = "Floor Coating Lead and Sales Benchmarks";
const seoTitle = "Floor Coating Lead and Sales Benchmarks (2026) | Appointly";
const description =
  "Lead to appointment rate, phone answer rate, show rate, price per square foot, and seasonality benchmarks for garage floor coating contractors, from live Appointly accounts. Updated September 2026.";

export const metadata: Metadata = {
  title: seoTitle,
  description,
  authors: [{ name: "Patrick Mietka", url: `${baseUrl}/about#patrick-mietka` }],
  alternates: { canonical },
  openGraph: {
    title: seoTitle,
    description,
    url: canonical,
    siteName: "Appointly Solutions",
    type: "article",
    publishedTime: publishedAt.toISOString(),
    modifiedTime: updatedAt.toISOString(),
    authors: ["Patrick Mietka"],
    images: [
      {
        url: `${baseUrl}/images/appointly-og.png`,
        width: 1200,
        height: 630,
        alt: pageTitle,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: seoTitle,
    description,
    images: [`${baseUrl}/images/appointly-og.png`],
  },
};

type Benchmark = {
  id: string;
  index: string;
  label: string;
  stat: string;
  statNote?: string;
  heading: string;
  /** One self-contained sentence with the number in it. Quotable on its own. */
  answer: string;
  body: string[];
  driver: string;
};

const benchmarks: Benchmark[] = [
  {
    id: "lead-to-appointment-rate",
    index: "01",
    label: "Lead to appointment rate",
    stat: "60 to 70%",
    heading: "Lead to appointment rate: 60 to 70%",
    answer:
      "60 to 70% of floor coating leads should turn into a booked estimate when the ads are high intent, refreshed often, and send traffic to a landing page.",
    body: [
      "This is the benchmark to check first, because it tells you whether the front of the pipeline is healthy. If the ads are well researched, high intent, and refreshed before they fatigue, and if they send the homeowner to a landing page instead of a native lead form, six or seven out of every ten leads should end up as a booked estimate on the calendar.",
      "A rate well below that range is almost never a market problem. It is usually a creative problem, where the ad is pulling in people who were not really shopping for a floor, or a speed problem, where the lead was real but nobody reached them while they were still interested.",
    ],
    driver: "Creative quality and speed to lead",
  },
  {
    id: "phone-answer-rate",
    index: "02",
    label: "Phone answer rate",
    stat: "90%",
    heading: "Phone answer rate: 90%",
    answer:
      "Nine out of ten floor coating leads should answer the phone, and the answer rate is driven almost entirely by how quickly the first call happens after the form is submitted.",
    body: [
      "A lead called within one minute of submitting the form is a different lead than the same person called an hour later. In the first minute they are still on their phone, still thinking about the garage, and still happy to talk. An hour later they have gone back to their day, or they have already reached another contractor.",
      "Most owners call when they get back to the truck or after the last estimate of the day, and by then the lead has cooled off. That gap is the single reason a dedicated calling team outperforms an owner doing the calls himself. The team is not better at talking. The team is faster.",
    ],
    driver: "Speed to lead",
  },
  {
    id: "show-rate",
    index: "03",
    label: "Estimate show rate",
    stat: "80% to 95%",
    statNote: "80% with no reminders, 95% with a reminder system",
    heading: "Show rate: 80% without reminders, 95% with",
    answer:
      "About 80% of booked floor coating estimates show up with no reminders, and around 95% show when the appointment is confirmed at booking, reminded 24 hours out and 1 hour out, and triaged when the homeowner goes quiet.",
    body: [
      "With no reminders and no triage, roughly four out of five booked estimates show. That sounds acceptable until you count the fifth one: an afternoon blocked off, a drive across town, and no quote at the end of it.",
      "With a confirmation at booking, a reminder 24 hours out, a reminder one hour out, and a person following up on the ones that stop responding, show rate should sit around 95%. Put another way, the no show rate is 20% without a system and 5% with one. The reminders are cheap. The empty driveway is not.",
    ],
    driver: "Confirmation, reminders, and triage",
  },
  {
    id: "close-rate",
    index: "04",
    label: "Close rate",
    stat: "Varies",
    statNote: "Set by product and sales skill",
    heading: "Close rate: depends on the product and the estimator",
    answer:
      "There is no single close rate benchmark for floor coating estimates, because close rate moves with the product being sold and how well the estimator sells it.",
    body: [
      "Two contractors can run the same ads, book the same number of estimates, and close very different shares of them. One is selling a two day epoxy system in a price sensitive market. The other is selling full polyaspartic in a wealthy metro. One has a process for the estimate. The other is winging it.",
      "The pattern we see is consistent: owners who get coached on what works in a floor coating estimate close meaningfully better than owners running on instinct. The objections repeat. The one day guys are cheaper. I need to talk to my spouse. I am just getting quotes. Each one has a known answer, and estimators who have that answer ready close more floors.",
    ],
    driver: "Product mix and sales coaching",
  },
  {
    id: "seasonality",
    index: "05",
    label: "Seasonality",
    stat: "Year round",
    statNote: "In the South. Spring through fall everywhere else",
    heading: "Seasonality: the South runs year round, everywhere else loses winter",
    answer:
      "Floor coating contractors in Florida, the Gulf Coast, and the Carolinas book estimates year round, while the rest of the country is strong from spring through fall and drops in winter.",
    body: [
      "Warm markets do not have an off season. Florida, the Gulf Coast, and the Carolinas book estimates in January the same way they book them in June.",
      "The Midwest, the Pacific Northwest, and the rest of the northern half of the country run strong from spring through fall and then drop in winter. The exception is a contractor with a setup that can coat in cold conditions, which keeps the calendar open when everyone else in the market has gone quiet.",
    ],
    driver: "Climate and cold weather capability",
  },
  {
    id: "price-per-square-foot",
    index: "06",
    label: "Price per square foot",
    stat: "$5 to $8",
    heading: "Price per square foot: $5 to $8, set by the market and the product",
    answer:
      "Garage floor coating contractors quote between $5 and $8 per square foot, with saturated markets like Florida closer to $5 and less saturated, wealthier metros closer to $8.",
    body: [
      "Market sets the floor. In a saturated Florida market a contractor is quoting closer to $5 a square foot because the homeowner has five other quotes to compare it to. In a less saturated, wealthier metro, the same job goes closer to $8.",
      "Product matters as much as market. An epoxy base with a polyaspartic top coat is generally cheaper than full polyaspartic or polyurea, even though the two day epoxy system takes longer and has real advantages. Not every contractor can install full poly well. It takes skill, and the price reflects it.",
    ],
    driver: "Market saturation and coating system",
  },
  {
    id: "landing-page-vs-lead-form",
    index: "07",
    label: "Landing page vs lead form",
    stat: "Landing page",
    statNote: "Beats the native Meta lead form",
    heading: "Landing page beats lead form",
    answer:
      "Sending Meta ad traffic to a dedicated landing page produces better floor coating leads than the native Meta lead form.",
    body: [
      "The native lead form is easy to submit and easy to forget. The homeowner taps twice, the form auto fills, and they move on. A landing page asks for a little more, and the homeowner who fills it out has read about the work, seen the floors, and decided they want a quote.",
      "That extra step shows up downstream in every other benchmark on this page: higher answer rate, higher lead to appointment rate, and fewer estimates with someone who does not remember filling anything out.",
    ],
    driver: "Where the ad sends the click",
  },
  {
    id: "homeowner-share",
    index: "08",
    label: "Homeowner share of leads",
    stat: "100%",
    statNote: "With the right creative",
    heading: "Homeowner share: 100% with the right creative",
    answer:
      "Every floor coating lead from Meta ads should be a homeowner, because on Meta the creative is the targeting and an ad that shows a garage floor and speaks to a homeowner attracts homeowners.",
    body: [
      "On Meta the creative is the targeting. If the ad shows a garage floor and speaks to a homeowner about their garage, the people who respond are homeowners with garages.",
      "If renters or the wrong kind of lead start coming through, the fix is not in the audience settings. The creative is attracting the wrong person, and the creative is what needs to change.",
    ],
    driver: "Ad creative",
  },
  {
    id: "speed-to-lead",
    index: "09",
    label: "Speed to lead",
    stat: "Under 1 minute",
    statNote: "The lever every other number depends on",
    heading: "Speed to lead is the single most important lever",
    answer:
      "Every floor coating benchmark on this page moves with how fast the first call happens after the lead comes in, and nothing else in the pipeline comes close.",
    body: [
      "Answer rate depends on it. Lead to appointment rate depends on it. Show rate depends on it, because a homeowner who talked to a real person within a minute of filling out the form remembers the appointment they booked.",
      "If you fix one thing in a floor coating pipeline, fix this one. Everything else on this page gets easier once the first call happens in under a minute.",
    ],
    driver: "Time from form submission to first call",
  },
];

const headlineStats = [
  {
    href: "#lead-to-appointment-rate",
    stat: "60 to 70%",
    label: "Lead to appointment rate",
    note: "Leads that become a booked estimate",
  },
  {
    href: "#phone-answer-rate",
    stat: "90%",
    label: "Phone answer rate",
    note: "When the lead is called within a minute",
  },
  {
    href: "#show-rate",
    stat: "95%",
    label: "Show rate with reminders",
    note: "Versus 80% with no reminder system",
  },
  {
    href: "#price-per-square-foot",
    stat: "$5 to $8",
    label: "Price per square foot",
    note: "Set by market saturation and product",
  },
];

const quickReference = [
  { metric: "Lead to appointment rate", target: "60 to 70%", driver: "Creative quality and speed to lead" },
  { metric: "Phone answer rate", target: "90%", driver: "Speed to lead" },
  { metric: "Show rate, no reminders", target: "80%", driver: "None. This is the baseline" },
  { metric: "Show rate, with reminders", target: "95%", driver: "Confirmation, 24 hour and 1 hour reminders, triage" },
  { metric: "No show rate", target: "20% without a system, 5% with", driver: "Reminder system" },
  { metric: "Close rate", target: "Varies", driver: "Product and sales coaching" },
  { metric: "Price per square foot", target: "$5 to $8", driver: "Market saturation and coating system" },
  { metric: "Homeowner share of leads", target: "100%", driver: "Ad creative" },
  { metric: "Booking season", target: "Year round in the South", driver: "Climate and cold weather capability" },
];

const faqItems: FaqItem[] = [
  {
    question: "What is a good lead to appointment rate for floor coating leads?",
    answer:
      "A good lead to appointment rate for garage floor coating leads is 60 to 70%. That means six or seven of every ten leads from Meta ads book an estimate. Rates well below that usually point to weak ad creative or slow follow up, not a weak market.",
  },
  {
    question: "What percentage of floor coating leads answer the phone?",
    answer:
      "About 90% of floor coating leads answer the phone when they are called within one minute of submitting the form. Answer rate falls quickly as the delay grows, which is why owners who call back hours later reach far fewer leads than a dedicated calling team.",
  },
  {
    question: "What show rate should a floor coating contractor expect on booked estimates?",
    answer:
      "Expect about 80% of booked floor coating estimates to show with no reminders, and about 95% with a confirmation at booking, a reminder 24 hours out, a reminder 1 hour out, and someone following up on homeowners who go quiet. That is a 20% no show rate without a system and 5% with one.",
  },
  {
    question: "What is the average close rate on floor coating estimates?",
    answer:
      "There is no single close rate benchmark for floor coating estimates. Close rate depends on the product being sold and how well the estimator sells it. Contractors who are coached on handling the common objections close meaningfully better than contractors running on instinct.",
  },
  {
    question: "How much does garage floor coating cost per square foot in 2026?",
    answer:
      "Garage floor coating contractors quote between $5 and $8 per square foot in 2026. Saturated markets like Florida sit closer to $5. Less saturated, wealthier metros sit closer to $8. Epoxy with a polyaspartic top coat is generally cheaper than full polyaspartic or polyurea.",
  },
  {
    question: "Is floor coating a seasonal business?",
    answer:
      "It depends on the market. Florida, the Gulf Coast, and the Carolinas book floor coating estimates year round. The rest of the country is strong from spring through fall and drops in winter unless the contractor can coat in cold conditions.",
  },
  {
    question: "Do Meta lead forms or landing pages produce better floor coating leads?",
    answer:
      "Landing pages produce better floor coating leads than the native Meta lead form. A homeowner who clicks through and fills out a landing page has seen the work and decided they want a quote, which shows up as higher answer rates and higher lead to appointment rates.",
  },
  {
    question: "Why does speed to lead matter so much for floor coating contractors?",
    answer:
      "Speed to lead is the single most important lever in a floor coating pipeline because answer rate, lead to appointment rate, and show rate all move with how fast the first call happens. A lead called within one minute behaves differently from the same lead called an hour later.",
  },
  {
    question: "Where do these floor coating benchmarks come from?",
    answer:
      "The benchmarks are aggregated from garage floor coating accounts run by Appointly Solutions in Florida, Oregon, the Carolinas, the Pacific Northwest, and the Midwest. Every account uses Meta ads to a landing page, a calling team that contacts every lead, and estimates booked on the contractor's calendar. Numbers are refreshed quarterly.",
  },
];

const relatedReading = [
  {
    href: "/blog/speed-to-lead-wins-floor-coating-jobs",
    title: "Speed to Lead Wins Floor Coating Jobs",
    description: "Why the first contractor to call back gets the estimate.",
  },
  {
    href: "/blog/how-to-close-more-floor-coating-estimates",
    title: "How to Close More Floor Coating Estimates",
    description: "A repeatable in garage sales process and the objections it handles.",
  },
  {
    href: "/blog/floor-coating-pricing-and-margins",
    title: "Floor Coating Pricing and Margins",
    description: "What a garage floor job is worth and the margin behind it.",
  },
  {
    href: "/blog/polyaspartic-vs-epoxy-garage-floors",
    title: "Polyaspartic vs Epoxy Garage Floors",
    description: "What to quote, when to recommend each system, and how to sell the premium option.",
  },
  {
    href: "/blog/best-time-of-year-for-floor-coating-jobs",
    title: "Best Time of Year for Floor Coating Jobs",
    description: "Seasonality by region and how to plan crew capacity around it.",
  },
  {
    href: "/blog/what-is-a-booked-floor-coating-estimate-worth",
    title: "What a Booked Floor Coating Estimate Is Worth",
    description: "Job value, close rate, and what you can afford to pay per booked estimate.",
  },
];

function formatDate(date: Date) {
  return new Intl.DateTimeFormat("en-US", { month: "short", day: "numeric", year: "numeric" }).format(
    date,
  );
}

export default function FloorCoatingBenchmarksPage() {
  const author = getAuthor("patrick");
  const commercialResources = getBlogCommercialResources("economics");

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "@id": `${canonical}#article`,
    headline: pageTitle,
    alternativeHeadline: "Garage floor coating lead, appointment, and pricing benchmarks for contractors",
    description,
    image: `${baseUrl}/images/appointly-og.png`,
    datePublished: publishedAt.toISOString(),
    dateModified: updatedAt.toISOString(),
    mainEntityOfPage: { "@type": "WebPage", "@id": canonical },
    inLanguage: "en-US",
    isAccessibleForFree: true,
    audience: { "@type": "Audience", audienceType: "Floor coating contractors" },
    about: [
      { "@type": "Thing", name: "Garage floor coating lead generation" },
      { "@type": "Thing", name: "Floor coating contractor sales benchmarks" },
      { "@type": "Thing", name: "Speed to lead" },
    ],
    keywords: [
      "floor coating benchmarks",
      "floor coating lead to appointment rate",
      "floor coating show rate",
      "garage floor coating price per square foot",
      "floor coating speed to lead",
    ],
    author: personSchema(author),
    publisher: {
      "@type": "Organization",
      "@id": `${baseUrl}/#organization`,
      name: "Appointly Solutions",
      logo: { "@type": "ImageObject", url: `${baseUrl}/images/appointly-logo-mark.png` },
    },
    speakable: {
      "@type": "SpeakableSpecification",
      cssSelector: ["[data-benchmark-answer]"],
    },
  };

  const datasetSchema = {
    "@context": "https://schema.org",
    "@type": "Dataset",
    "@id": `${canonical}#dataset`,
    name: "Floor Coating Lead and Sales Benchmarks",
    description:
      "Aggregated lead to appointment rate, phone answer rate, show rate, price per square foot, and seasonality benchmarks from garage floor coating accounts run by Appointly Solutions. Cost per lead and cost per appointment are not published.",
    url: canonical,
    license: "https://creativecommons.org/licenses/by/4.0/",
    isAccessibleForFree: true,
    creator: { "@id": `${baseUrl}/#organization` },
    dateModified: updatedAt.toISOString().slice(0, 10),
    temporalCoverage: "2026",
    spatialCoverage: "United States: Florida, Oregon, the Carolinas, the Pacific Northwest, the Midwest",
    variableMeasured: quickReference.map((row) => ({
      "@type": "PropertyValue",
      name: row.metric,
      value: row.target,
    })),
  };

  return (
    <>
      <Navbar />
      <main className="overflow-hidden">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(datasetSchema) }}
        />

        {/* Hero */}
        <section className="relative pt-32 pb-16 md:pt-44 md:pb-20">
          <div className="absolute inset-0 -z-10">
            <div className="absolute top-0 right-0 h-[760px] w-[760px] rounded-full bg-primary/[0.06] blur-[150px]" />
            <div className="absolute inset-0 dot-grid opacity-35" />
          </div>

          <div className="mx-auto max-w-6xl px-6">
            <Breadcrumbs
              items={[
                { name: "Blog", href: "/blog" },
                { name: "Floor Coating Benchmarks", href: pagePath },
              ]}
              className="mb-8"
            />

            <div className="max-w-4xl">
              <p className="mb-6 inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.25em] text-muted-foreground">
                <Database className="h-3.5 w-3.5" />
                Industry Benchmarks
              </p>
              <h1 className="font-display text-5xl font-bold tracking-tight leading-[1.05] text-balance text-foreground md:text-6xl">
                {pageTitle}
              </h1>
              <p className="mt-6 max-w-3xl text-base leading-relaxed text-muted-foreground md:text-lg">
                What we see across every floor coating account Appointly runs. Meta ads
                to a landing page, every lead called by our team within a minute, and
                estimates booked on the contractor&apos;s calendar. These are the numbers
                a garage floor coating contractor should expect from that system, and
                what to look at when a number is off.
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
                <Link
                  href={author.url.replace(baseUrl, "")}
                  rel="author"
                  className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white py-1.5 pl-1.5 pr-3 transition-colors hover:text-foreground"
                >
                  <Image
                    src={author.image.replace(baseUrl, "")}
                    alt={author.name}
                    width={28}
                    height={28}
                    sizes="28px"
                    className="h-7 w-7 rounded-full object-cover"
                  />
                  <span className="font-medium text-foreground">{author.name}</span>
                </Link>
                <span className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1.5">
                  <RefreshCw className="h-4 w-4" />
                  Last updated{" "}
                  <time dateTime={updatedAt.toISOString()}>{updatedLabel}</time>
                </span>
                <span className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1.5">
                  <CalendarDays className="h-4 w-4" />
                  Refreshed quarterly
                </span>
                <span className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1.5">
                  <Clock3 className="h-4 w-4" />8 min read
                </span>
              </div>
            </div>

            {/* Headline stats */}
            <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {headlineStats.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="group rounded-3xl border border-slate-200 bg-white p-6 shadow-[0_20px_60px_rgba(15,23,42,0.06)] transition-all hover:-translate-y-1 hover:shadow-lg"
                >
                  <p className="font-display text-4xl font-bold tracking-tight text-slate-950 md:text-5xl">
                    {item.stat}
                  </p>
                  <p className="mt-3 text-sm font-semibold text-slate-900">{item.label}</p>
                  <p className="mt-1 text-sm leading-6 text-slate-600">{item.note}</p>
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* Body */}
        <section className="section-divider py-16 md:py-24">
          <div className="mx-auto grid max-w-6xl gap-8 px-6 lg:grid-cols-[minmax(0,1fr)_320px]">
            <article className="min-w-0 rounded-3xl border border-slate-200 bg-white p-6 shadow-[0_20px_60px_rgba(15,23,42,0.06)] md:p-10">
              {/* Methodology */}
              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
                  Source and method
                </p>
                <p className="mt-3 text-sm leading-7 text-slate-700 md:text-base">
                  Aggregated by Appointly Solutions across garage floor coating accounts in
                  Florida, Oregon, the Carolinas, the Pacific Northwest, and the Midwest.
                  Every account runs the same system: Meta ads to a landing page, a
                  calling team that contacts every lead, and estimates booked directly on
                  the contractor&apos;s calendar. Cost per lead and cost per booked
                  appointment are not published. Numbers are re-pulled and the
                  &quot;last updated&quot; date refreshed every quarter.
                </p>
              </div>

              {/* Quick reference table */}
              <h2
                id="quick-reference"
                className="mt-12 scroll-mt-32 text-3xl font-bold tracking-tight text-slate-950 md:text-4xl"
              >
                Floor coating benchmarks at a glance
              </h2>
              <p className="mt-4 text-base leading-8 text-slate-600 md:text-lg">
                Every number below assumes Meta ads sent to a landing page and a first call
                inside one minute. Each row links to the section that explains it.
              </p>
              <div className="mt-6 overflow-x-auto rounded-2xl border border-slate-200">
                <table className="w-full min-w-[560px] text-left text-sm">
                  <thead className="bg-slate-50 text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                    <tr>
                      <th scope="col" className="px-5 py-4">Benchmark</th>
                      <th scope="col" className="px-5 py-4">Target</th>
                      <th scope="col" className="px-5 py-4">What drives it</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200">
                    {quickReference.map((row) => (
                      <tr key={row.metric} className="align-top">
                        <th scope="row" className="px-5 py-4 font-semibold text-slate-900">
                          {row.metric}
                        </th>
                        <td className="px-5 py-4 font-semibold text-slate-950">{row.target}</td>
                        <td className="px-5 py-4 leading-6 text-slate-600">{row.driver}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Benchmark sections */}
              {benchmarks.map((item) => (
                <section key={item.id} id={item.id} className="mt-16 scroll-mt-32">
                  <div className="flex items-start gap-4">
                    <span className="mt-1 inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-slate-950 font-mono text-xs font-semibold text-white">
                      {item.index}
                    </span>
                    <div className="min-w-0">
                      <h2 className="text-3xl font-bold tracking-tight text-slate-950 md:text-4xl">
                        {item.heading}
                      </h2>
                    </div>
                  </div>

                  <div className="mt-6 grid gap-4 sm:grid-cols-[200px_minmax(0,1fr)]">
                    <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
                      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                        {item.label}
                      </p>
                      <p className="mt-2 font-display text-3xl font-bold tracking-tight text-slate-950">
                        {item.stat}
                      </p>
                      {item.statNote ? (
                        <p className="mt-2 text-xs leading-5 text-slate-600">{item.statNote}</p>
                      ) : null}
                      <p className="mt-4 text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                        Driven by
                      </p>
                      <p className="mt-1 text-sm font-medium text-slate-900">{item.driver}</p>
                    </div>
                    <p
                      data-benchmark-answer
                      className="rounded-2xl border-l-4 border-slate-950 bg-white p-5 text-lg font-semibold leading-8 text-slate-900 md:text-xl"
                    >
                      {item.answer}
                    </p>
                  </div>

                  <div className="mt-6 space-y-5">
                    {item.body.map((paragraph) => (
                      <p key={paragraph} className="text-base leading-8 text-slate-600 md:text-lg">
                        {paragraph}
                      </p>
                    ))}
                  </div>
                </section>
              ))}

              {/* How to use */}
              <section id="how-to-use" className="mt-16 scroll-mt-32">
                <h2 className="text-3xl font-bold tracking-tight text-slate-950 md:text-4xl">
                  How to use these benchmarks
                </h2>
                <p className="mt-4 text-base leading-8 text-slate-600 md:text-lg">
                  Read your own pipeline against the table from the top down. The first
                  number that misses tells you where the leak is.
                </p>
                <ol className="mt-6 space-y-4 pl-6 text-base leading-8 text-slate-600 md:text-lg">
                  <li className="list-decimal pl-1">
                    <strong className="font-semibold text-slate-900">Answer rate under 90%.</strong>{" "}
                    Measure the time between the form submission and the first call. If it
                    is not under a minute, nothing else on this list matters yet.
                  </li>
                  <li className="list-decimal pl-1">
                    <strong className="font-semibold text-slate-900">Lead to appointment rate under 60%.</strong>{" "}
                    Check the creative first and the calling process second. Refresh fatigued
                    ads and make sure the click lands on a landing page, not a lead form.
                  </li>
                  <li className="list-decimal pl-1">
                    <strong className="font-semibold text-slate-900">Show rate under 95%.</strong>{" "}
                    Add the confirmation at booking, the 24 hour reminder, the 1 hour reminder,
                    and a person who follows up on anyone who goes quiet.
                  </li>
                  <li className="list-decimal pl-1">
                    <strong className="font-semibold text-slate-900">Close rate feels low.</strong>{" "}
                    Write down the three objections you hear most and script an answer for
                    each. Then compare your price per square foot to your market&apos;s range
                    and your product&apos;s tier.
                  </li>
                </ol>
              </section>

              {/* Cite */}
              <div className="mt-14 flex gap-4 rounded-2xl border border-slate-200 bg-slate-50 p-6">
                <Quote className="mt-1 h-5 w-5 shrink-0 text-slate-500" aria-hidden />
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
                    Cite this page
                  </p>
                  <p className="mt-2 text-sm leading-7 text-slate-700">
                    Appointly Solutions. &quot;Floor Coating Lead and Sales Benchmarks.&quot;{" "}
                    {updatedLabel}. {canonical}
                  </p>
                  <p className="mt-2 text-xs leading-6 text-slate-500">
                    You are welcome to quote any benchmark on this page with a link back to it.
                  </p>
                </div>
              </div>

              {/* Author */}
              <div className="mt-8 flex gap-5 rounded-2xl border border-slate-200 bg-slate-50 p-6">
                <Image
                  src={author.image.replace(baseUrl, "")}
                  alt={`${author.name}, ${author.role}`}
                  width={72}
                  height={72}
                  sizes="72px"
                  className="h-[72px] w-[72px] shrink-0 rounded-2xl object-cover"
                />
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
                    About the author
                  </p>
                  <p className="mt-2 text-lg font-bold text-slate-950">{author.name}</p>
                  <p className="text-sm font-medium text-primary">{author.role}</p>
                  <p className="mt-3 text-sm leading-7 text-slate-600">{author.bio}</p>
                  <Link
                    href={author.url.replace(baseUrl, "")}
                    className="mt-3 inline-block text-sm font-semibold text-primary transition-opacity hover:opacity-80"
                  >
                    More about the Appointly team
                  </Link>
                </div>
              </div>
            </article>

            {/* Sidebar */}
            <aside className="space-y-6 lg:sticky lg:top-28 lg:self-start">
              <nav
                aria-label="On this page"
                className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm"
              >
                <p className="text-xs font-semibold uppercase tracking-[0.25em] text-muted-foreground">
                  On this page
                </p>
                <ol className="mt-4 space-y-2 text-sm">
                  <li>
                    <a href="#quick-reference" className="text-slate-600 transition-colors hover:text-foreground">
                      Benchmarks at a glance
                    </a>
                  </li>
                  {benchmarks.map((item) => (
                    <li key={item.id} className="flex gap-3">
                      <span className="w-6 shrink-0 font-mono text-xs text-slate-400">{item.index}</span>
                      <a href={`#${item.id}`} className="text-slate-600 transition-colors hover:text-foreground">
                        {item.label}
                      </a>
                    </li>
                  ))}
                  <li>
                    <a href="#how-to-use" className="text-slate-600 transition-colors hover:text-foreground">
                      How to use these benchmarks
                    </a>
                  </li>
                </ol>
              </nav>

              <div className="rounded-3xl border border-primary/20 bg-primary/10 p-6 shadow-sm">
                <p className="text-xs font-semibold uppercase tracking-[0.25em] text-slate-600">
                  Hit these numbers
                </p>
                <h2 className="mt-4 text-2xl font-bold leading-tight text-slate-950">
                  Want your pipeline running at these benchmarks?
                </h2>
                <p className="mt-4 text-sm leading-7 text-slate-700">
                  Book a strategy call and we&apos;ll walk through the ads, the one minute
                  speed to lead, and the reminder system behind every number on this page.
                </p>
                <a
                  href={bookingUrl}
                  className="mt-6 inline-flex items-center justify-center rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90"
                >
                  Book a Call
                </a>
                <p className="mt-4 text-xs leading-6 text-slate-600">
                  Or read how{" "}
                  <Link
                    href="/floor-coating-leads"
                    className="font-semibold text-slate-950 underline underline-offset-4"
                  >
                    booked floor coating leads
                  </Link>{" "}
                  work first.
                </p>
              </div>
            </aside>
          </div>
        </section>

        <FaqBlock
          eyebrow="Benchmark FAQ"
          title="Floor coating benchmark questions, answered."
          items={faqItems}
        />

        {/* Related reading */}
        <section className="section-divider bg-[hsl(var(--surface-subtle))] py-20 md:py-28">
          <div className="mx-auto max-w-6xl px-6">
            <div className="mb-10">
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-muted-foreground">
                Go Deeper
              </p>
              <h2 className="mt-3 font-display text-3xl font-bold text-foreground md:text-4xl">
                The guides behind each benchmark.
              </h2>
            </div>
            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {relatedReading.map((post) => (
                <Link
                  key={post.href}
                  href={post.href}
                  className="group rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg"
                >
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
                    Related guide
                  </p>
                  <h3 className="mt-4 text-xl font-bold tracking-tight text-slate-950">{post.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-slate-600">{post.description}</p>
                  <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-primary">
                    Read article
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <SeoResourceLinks
          eyebrow="Next Step"
          title="Service pages for contractors ready to act on the numbers."
          description="Each benchmark on this page comes from the system described on these pages."
          resources={commercialResources}
        />
      </main>
      <Footer />
    </>
  );
}
