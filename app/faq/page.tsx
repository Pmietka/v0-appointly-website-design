import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Breadcrumbs } from "@/components/breadcrumbs";
import type { FaqItem } from "@/components/faq-block";
import { Footer } from "@/components/footer";
import { Navbar } from "@/components/navbar";
import { coreFaqItems } from "@/lib/faq";
import { BILLING_ANSWER, OFFER, RESULTS } from "@/lib/offer";
import { pageMetadata } from "@/lib/seo";

const bookingUrl = "https://client.getappointly.co/strategy-calendar";

const core = (question: string) => coreFaqItems.find((item) => item.question === question)!;

// Answers render as plain text in the initial HTML (no accordion) so AI search
// tools and Google can read every answer, and the FAQPage JSON-LD below matches
// the visible copy word for word.
const faqItems: FaqItem[] = [
  core("How much does Appointly Solutions cost?"),
  {
    question: "Is the appointment fee the only thing I pay?",
    answer: `No. ${OFFER.total} Ad spend goes to Meta at cost, and the appointment fee is invoiced separately, so you always see both numbers.`,
  },
  core("What happens if an appointment is bad or the homeowner does not show up?"),
  {
    question: "What counts as a billable appointment?",
    answer: `A homeowner in your service area, qualified on intent, who has confirmed an estimate time on your calendar. ${OFFER.qualification} ${BILLING_ANSWER}`,
  },
  {
    question: "Are no show credits automatic?",
    answer:
      "Yes. A no show, and any appointment you grade a C, is credited automatically to your next appointment. You do not have to ask for it.",
  },
  core("What show and close rates do Appointly clients get?"),
  {
    question: "How many appointments will I get?",
    answer: `Our clients typically get ${RESULTS.monthlyAppointments} appointments a month. Your volume depends on your market, your ticket, and the daily ad budget we set with you based on the results you need. Most contractors see their first booked estimates within 24 to 48 hours of campaign launch.`,
  },
  core("Are the appointments exclusive or shared?"),
  {
    question: "Is territory exclusivity in writing?",
    answer:
      "Yes. Your territory exclusivity is written into your service agreement. If another floor coating contractor in your market applies, they go on a waitlist. We check whether your market is open on the strategy call.",
  },
  core("Who runs the Meta ad account, and who owns the data?"),
  {
    question: "Who makes the calls to my leads?",
    answer: `${OFFER.caller} ${OFFER.speed} The homeowner hears about your company and your product from someone who knows floor coating, not a call center.`,
  },
  core("How do the appointments reach my calendar?"),
  {
    question: "Who is Appointly Solutions a fit for, and who is it not for?",
    answer: `${OFFER.fit} ${OFFER.notFit}`,
  },
  {
    question: "Can I talk to current clients?",
    answer:
      "Yes. References are available on request before you sign, so you can ask a current Appointly Solutions client about appointment quality and how the process works. You can also hear three clients describe their results in their own words on our case studies page.",
  },
  {
    question: "Is there a long term contract?",
    answer:
      "No. Appointly Solutions does not lock you into a long term contract. If you stop, any unused ad balance is returned within 10 business days of termination.",
  },
  {
    question: "Do you only work with floor coating contractors?",
    answer:
      "Yes. Garage floor coating, epoxy, polyaspartic, and concrete coating contractors are the only contractors we take on. Our creative, qualifying criteria, and booking scripts are built for coating work and nothing else, which is why we can tell a real coating job from a tire kicker in the first 30 seconds of a call.",
  },
  {
    question: "What markets do you work in?",
    answer:
      "We focus on small to mid sized markets in the US and Canada where floor coating contractors have room to grow. We work with one coating contractor per market, so availability depends on whether your market is already taken.",
  },
  {
    question: "Do I need to run my own ads or chase leads?",
    answer:
      "No. We run the Meta ads, text and call every lead within one minute, and book the appointments. Your team shows up, runs the estimate, and closes the work.",
  },
  {
    question: "How do I get started?",
    answer:
      "Book a strategy call. We review your market, service area, ticket, and goals, then tell you whether Appointly Solutions is a fit for your business.",
  },
];

export const metadata: Metadata = pageMetadata({
  title: "FAQ | Appointly Solutions",
  description:
    "You fund your own ad spend at cost, then pay $125 to $175 per booked appointment. Answers on billing, the appointment quality guarantee, show and close rates, territory, and fit.",
  path: "/faq",
  ogTitle: "Appointly Solutions FAQ: Pricing, Billing, Territory and Fit",
  keywords: [
    "Appointly Solutions FAQ",
    "booked floor coating estimates pricing",
    "pay per appointment floor coating",
  ],
});

export default function FaqPage() {
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqItems.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };

  return (
    <>
      <Navbar />
      <main className="overflow-hidden">
        <section className="relative pb-20 pt-32 md:pb-28 md:pt-44">
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
          />

          <div className="absolute inset-0 -z-10">
            <div className="absolute right-10 top-0 h-[700px] w-[700px] rounded-full bg-primary/[0.10] blur-[145px]" />
            <div className="absolute inset-0 dot-grid opacity-35" />
          </div>

          <div className="mx-auto max-w-6xl px-6">
            <Breadcrumbs items={[{ name: "FAQ", href: "/faq" }]} className="mb-8" />
            <div className="max-w-3xl">
              <p className="mb-6 text-xs font-semibold uppercase tracking-[0.25em] text-muted-foreground">
                Frequently Asked Questions
              </p>
              <h1 className="font-display text-5xl font-bold leading-[1.05] tracking-tight text-balance md:text-6xl">
                FAQ for <span className="gradient-text">Appointly Solutions</span>
              </h1>
              <p className="mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg">
                Straight answers to the questions contractors ask before they work
                with us: what you pay in ad spend and appointment fees, how the
                appointment quality guarantee works, our show and close rates, how
                territory works, and who we are not a fit for.
              </p>
            </div>
          </div>
        </section>

        <section className="section-divider py-24 md:py-32">
          <div className="mx-auto grid max-w-6xl gap-8 px-6 lg:grid-cols-[1.2fr_0.8fr]">
            <div className="glass-card rounded-3xl p-4 md:p-6">
              <dl className="divide-y divide-white/[0.07]">
                {faqItems.map((item) => (
                  <div key={item.question} className="px-4 py-6">
                    <dt className="font-display text-lg text-foreground">{item.question}</dt>
                    <dd className="mt-3 text-sm leading-7 text-muted-foreground">{item.answer}</dd>
                  </div>
                ))}
              </dl>
            </div>

            <aside className="space-y-6">
              <article className="glass-card rounded-3xl p-8">
                <p className="text-xs font-semibold uppercase tracking-[0.25em] text-muted-foreground">
                  Keep Reading
                </p>
                <h2 className="mt-4 font-display text-2xl font-bold text-foreground">
                  Want more context before you book?
                </h2>
                <p className="mt-4 text-sm leading-7 text-muted-foreground">
                  The{" "}
                  <Link href="/how-it-works" className="text-primary transition-colors hover:opacity-80">
                    How It Works
                  </Link>{" "}
                  page breaks down the delivery process, and the{" "}
                  <Link href="/about" className="text-primary transition-colors hover:opacity-80">
                    About page
                  </Link>{" "}
                  explains who runs Appointly Solutions. For client numbers, see{" "}
                  <Link href="/results" className="text-primary transition-colors hover:opacity-80">
                    Results
                  </Link>
                  .
                  For the main service page, visit{" "}
                  <Link
                    href="/floor-coating-leads"
                    className="text-primary transition-colors hover:opacity-80"
                  >
                    Floor Coating Appointments
                  </Link>
                  .
                </p>
              </article>

              <article className="rounded-3xl border border-primary/20 bg-primary/10 p-8 shadow-[0_0_70px_rgba(125,135,247,0.10)]">
                <p className="text-xs font-semibold uppercase tracking-[0.25em] text-slate-600">
                  Next Step
                </p>
                <h2 className="mt-4 font-display text-2xl font-bold text-slate-950">
                  Get direct answers for your market.
                </h2>
                <p className="mt-4 text-sm leading-7 text-slate-700">
                  Book a strategy call and we will walk through your area, your current
                  lead flow, and whether Appointly makes sense for your team.
                </p>
                <a
                  href={bookingUrl}
                  className="mt-8 inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90"
                >
                  Book a Strategy Call
                  <ArrowRight className="h-4 w-4" />
                </a>
              </article>
            </aside>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
