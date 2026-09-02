import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, BadgeAlert, Briefcase, RefreshCw, ShieldCheck } from "lucide-react";

import { Breadcrumbs } from "@/components/breadcrumbs";
import { FaqBlock } from "@/components/faq-block";
import { Footer } from "@/components/footer";
import { Navbar } from "@/components/navbar";
import { ProofSection } from "@/components/proof-section";
import { SeoResourceLinks } from "@/components/seo-resource-links";
import { getCommercialResources } from "@/lib/seo-resources";

const bookingUrl = "https://client.getappointly.co/strategy-calendar";

const agencyProblems = [
  {
    icon: BadgeAlert,
    title: "Retainer-only, with no appointments promised",
    description:
      "Traditional agencies charge a monthly retainer and stop there. You carry the full spend with no booked estimates guaranteed in return.",
  },
  {
    icon: RefreshCw,
    title: "Unclear attribution",
    description:
      "It can be hard to tell whether growth is coming from the agency, your own referrals, or delayed follow up cleanup.",
  },
  {
    icon: Briefcase,
    title: "High overhead communication",
    description:
      "Too many meetings and reports can distract from the only question that matters: are floor coating estimates landing on your calendar?",
  },
  {
    icon: ShieldCheck,
    title: "A more accountable alternative",
    description:
      "Appointly Solutions adds a per-appointment fee on top of the retainer, so spend is tied to booked estimates, instant speed to lead, and Meta ad delivery.",
  },
];

const faqItems = [
  {
    question: "How is Appointly different from a floor coating marketing agency?",
    answer:
      "An agency sells activity: ads, posts, reports, and meetings, billed monthly regardless of results. Appointly sells booked estimates. We run the ads, call the leads, and book the appointment, and a per-appointment fee ties most of your spend to results.",
  },
  {
    question: "Do I still need a marketing agency if I use Appointly?",
    answer:
      "Most clients do not. Appointly covers the channel that produces the fastest booked estimates for coating contractors, which is Meta ads plus instant follow-up. Reviews, your Google profile, and referrals are things you can keep running yourself.",
  },
  {
    question: "What should I ask an agency before signing a retainer?",
    answer:
      "Ask what they are accountable for. If the answer is impressions, clicks, or leads rather than booked estimates, you carry all the risk. Ask who calls the leads and how fast. Ask for the contract length and what happens if nothing books.",
  },
  {
    question: "Can I run Appointly alongside an existing agency?",
    answer:
      "Yes, as long as the agency is not running Meta ads for the same service area. Two advertisers bidding on the same homeowners raises costs for both.",
  },
];

export const metadata: Metadata = {
  title: "Floor Coating Marketing Agency Alternative | Appointly",
  description:
    "Compare retainer-only marketing agencies with the Appointly Model, where a per-appointment fee ties your spend to booked floor coating estimates.",
  keywords: [
    "floor coating marketing agency alternative",
    "the appointly model",
    "booked floor coating appointments",
    "epoxy contractor marketing",
    "Appointly Solutions",
  ],
  alternates: {
    canonical: "https://getappointly.co/floor-coating-marketing-agency-alternative",
  },
  openGraph: {
    title: "Floor Coating Marketing Agency Alternative | Appointly",
    description:
      "See why coating contractors prefer booked appointments with a per-appointment fee over a retainer-only marketing agency.",
    url: "https://getappointly.co/floor-coating-marketing-agency-alternative",
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
            <Breadcrumbs items={[{ name: "Agency Alternative", href: "/floor-coating-marketing-agency-alternative" }]} className="mb-8" />
            <div className="max-w-3xl">
              <p className="mb-6 text-xs font-semibold uppercase tracking-[0.25em] text-muted-foreground">
                Agency Alternative
              </p>
              <h1 className="font-display text-5xl font-bold leading-[1.05] tracking-tight text-balance md:text-6xl">
                A Floor Coating Marketing Agency Alternative Built Around{" "}
                <span className="gradient-text">Booked Appointments</span>
              </h1>
              <p className="mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg">
                If you are searching for a floor coating marketing agency, you may really
                be searching for a better business model. The Appointly Model pairs a
                retainer that covers our labor with a per-appointment fee, so the focus
                stays on booked estimates landing on your calendar.
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
                  href="/pricing"
                  className="inline-flex items-center justify-center rounded-xl border border-gray-300 bg-white px-8 py-4 text-sm font-semibold text-gray-700 transition-all hover:bg-gray-50"
                >
                  The Appointly Model
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
                The retainer-only agency model can feel misaligned.
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
                Built for coating contractors who want clarity around growth.
              </h2>
              <p className="mt-5 text-sm leading-7 text-muted-foreground md:text-base">
                Appointly Solutions handles the whole job of filling your calendar: Meta
                ads to generate the lead, instant speed to lead, and booking the estimate
                for you. That is why many floor coating contractors see it less as an
                agency and more as a performance-oriented growth system.
              </p>
              <p className="mt-4 text-sm leading-7 text-muted-foreground md:text-base">
                For a broader commercial overview, see{" "}
                <Link href="/floor-coating-leads" className="text-primary transition-opacity hover:opacity-80">
                  Floor Coating Appointments
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
                current agency or in-house marketing approach against the Appointly Model,
                booked appointments designed for floor coating contractors.
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

        <FaqBlock items={faqItems} />
        <ProofSection />
        <SeoResourceLinks
          title="Resources for contractors comparing agencies and performance models."
          description="These pages and articles add more depth around the Appointly Model, booked appointments, and how speed to lead fills your calendar."
          resources={getCommercialResources("floor-coating-marketing-agency-alternative")}
        />
      </main>
      <Footer />
    </>
  );
}
