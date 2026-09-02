import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Crown, ShieldCheck, SplitSquareVertical, Users } from "lucide-react";

import { Breadcrumbs } from "@/components/breadcrumbs";
import { FaqBlock } from "@/components/faq-block";
import { Footer } from "@/components/footer";
import { Navbar } from "@/components/navbar";
import { SeoResourceLinks } from "@/components/seo-resource-links";
import { getCommercialResources } from "@/lib/seo-resources";

const bookingUrl = "https://client.getappointly.co/strategy-calendar";

const comparisons = [
  {
    icon: SplitSquareVertical,
    title: "Shared lead marketplaces",
    description:
      "Shared lead systems push several floor coating contractors into the same homeowner conversation, which drives down margins and raises response pressure.",
  },
  {
    icon: Crown,
    title: "Exclusive booked appointments",
    description:
      "Appointly Solutions works with one coating contractor per market, so every booked estimate is yours alone and never sold to a competitor.",
  },
  {
    icon: ShieldCheck,
    title: "Booked, not just handed off",
    description:
      "Exclusive only matters when the appointment is real. We generate the lead, hit it instantly, and lock in a confirmed time on your calendar.",
  },
  {
    icon: Users,
    title: "Less chaos for your sales team",
    description:
      "When you are not racing several contractors to the same homeowner, follow up feels cleaner and close rate potential improves.",
  },
];

const faqItems = [
  {
    question: "What does exclusive mean at Appointly?",
    answer:
      "Every booked estimate goes to one contractor only. We never sell the same homeowner to two coating companies, and we only work with one floor coating contractor per market.",
  },
  {
    question: "Why do shared floor coating leads close so poorly?",
    answer:
      "A shared lead is sent to three to five contractors at the same time, so the homeowner is fielding calls and collecting quotes. Close rates on shared leads are often under 10 percent. An exclusive, booked estimate usually closes at 40 to 60 percent for a prepared crew.",
  },
  {
    question: "How do you decide the boundaries of my market?",
    answer:
      "We map your service area with you before launch, usually by county or drive-time radius, and the ads only run inside that boundary. No other Appointly client runs in the same territory.",
  },
  {
    question: "What happens if another coating contractor in my area wants to sign up?",
    answer:
      "They go on a waitlist until you leave. Market exclusivity is the core of the model, not an add-on.",
  },
];

export const metadata: Metadata = {
  title: "Exclusive Floor Coating Leads | One Contractor Per Market",
  description:
    "Appointly books exclusive floor coating estimates onto your calendar. One contractor per market, no shared leads, and every appointment booked for you.",
  keywords: [
    "exclusive floor coating appointments",
    "one contractor per market",
    "exclusive epoxy flooring leads",
    "floor coating estimates",
    "Appointly Solutions",
  ],
  alternates: {
    canonical: "https://getappointly.co/exclusive-floor-coating-leads",
  },
  openGraph: {
    title: "Exclusive Floor Coating Leads | One Contractor Per Market",
    description:
      "See why exclusive booked floor coating appointments beat shared lead systems for coating contractors.",
    url: "https://getappointly.co/exclusive-floor-coating-leads",
    siteName: "Appointly Solutions",
    type: "website",
  },
};

export default function ExclusiveInsulationLeadsPage() {
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
            <Breadcrumbs items={[{ name: "Exclusive Floor Coating Leads", href: "/exclusive-floor-coating-leads" }]} className="mb-8" />
            <div className="max-w-3xl">
              <p className="text-xs font-semibold tracking-[0.25em] uppercase text-muted-foreground mb-6">
                Exclusive Appointments
              </p>
              <h1 className="font-display text-5xl md:text-6xl font-bold tracking-tight leading-[1.05] text-balance">
                Exclusive Floor Coating Appointments Without the{" "}
                <span className="gradient-text">Shared Lead Scramble</span>
              </h1>
              <p className="mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg">
                Floor coating contractors do not just want more leads. They want better
                conditions to close. Appointly Solutions gives coating contractors one
                market per contractor, booked estimates instead of raw leads, and less
                margin-killing competition.
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
                  href="/floor-coating-leads"
                  className="inline-flex items-center justify-center rounded-xl border border-gray-300 bg-white px-8 py-4 text-sm font-semibold text-gray-700 hover:bg-gray-50 transition-all"
                >
                  Floor Coating Appointments
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section className="section-divider py-24 md:py-32">
          <div className="mx-auto max-w-6xl px-6">
            <div className="mb-12 max-w-2xl">
              <p className="text-xs font-semibold tracking-[0.25em] uppercase text-muted-foreground mb-4">
                Shared Versus Exclusive
              </p>
              <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground">
                Why exclusive booked appointments matter to close rate and margin.
              </h2>
            </div>

            <div className="grid gap-5 md:grid-cols-2">
              {comparisons.map((item) => (
                <article key={item.title} className="glass-card glass-card-hover rounded-3xl p-6">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-primary/20 bg-primary/10">
                    <item.icon className="h-5 w-5 text-primary" />
                  </div>
                  <h3 className="mt-5 font-display text-xl font-semibold text-foreground">
                    {item.title}
                  </h3>
                  <p className="mt-3 text-sm leading-7 text-muted-foreground">
                    {item.description}
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
                Where Appointly Solutions Fits
              </p>
              <h2 className="mt-4 font-display text-3xl font-bold text-foreground">
                Best for coating contractors who value quality over noise.
              </h2>
              <p className="mt-5 text-sm leading-7 text-muted-foreground md:text-base">
                Appointly Solutions works best for crews that want fewer wasted
                conversations, a calendar of booked estimates, and a system that ties
                spend to appointments that actually show up.
              </p>
              <p className="mt-4 text-sm leading-7 text-muted-foreground md:text-base">
                To see how exclusive appointments fit into the bigger delivery system, visit{" "}
                <Link href="/how-it-works" className="text-primary transition-opacity hover:opacity-80">
                  How It Works
                </Link>
                . If you are comparing pricing models, continue to{" "}
                <Link href="/pricing" className="text-primary transition-opacity hover:opacity-80">
                  The Appointly Model
                </Link>
                .
              </p>
            </article>

            <article className="rounded-3xl border border-primary/20 bg-primary/10 p-8 shadow-[0_0_70px_rgba(125,135,247,0.1)] md:p-10">
              <p className="text-xs font-semibold tracking-[0.25em] uppercase text-slate-600">
                Ready To Talk
              </p>
              <h2 className="mt-4 font-display text-3xl font-bold text-foreground">
                Explore whether exclusive booked appointments fit your market.
              </h2>
              <p className="mt-4 text-sm leading-7 text-slate-700 md:text-base">
                A strategy call with Appointly Solutions will show you where exclusive
                floor coating appointments make sense, how the speed-to-lead booking works,
                and what to expect from the process.
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
          description="Supporting service pages and guides that go deeper on the topics covered above."
          resources={getCommercialResources("exclusive-floor-coating-leads")}
        />
      </main>
      <Footer />
    </>
  );
}
