import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, BadgeCheck, Clock3, ShieldCheck, Zap } from "lucide-react";

import Image from "next/image";

import { Breadcrumbs } from "@/components/breadcrumbs";
import { FaqBlock } from "@/components/faq-block";
import { Footer } from "@/components/footer";
import { Navbar } from "@/components/navbar";
import { ProofSection } from "@/components/proof-section";
import { SeoResourceLinks } from "@/components/seo-resource-links";
import { authors, personSchema } from "@/lib/authors";
import { coreFaqItems } from "@/lib/faq";
import { getCommercialResources } from "@/lib/seo-resources";

const bookingUrl = "https://client.getappointly.co/strategy-calendar";

const differentiators = [
  {
    icon: ShieldCheck,
    title: "One contractor per market",
    description:
      "We only work with one contractor per service area. The appointments we book are never shared with a competitor.",
  },
  {
    icon: BadgeCheck,
    title: "We book the appointment for you",
    description:
      "We hit every lead the second they raise their hand and book the estimate onto your calendar. You just show up and quote.",
  },
  {
    icon: Clock3,
    title: "We run the whole system",
    description:
      "Meta ads, instant speed-to-lead outreach, and appointment booking are all handled for you - not sold as add-ons.",
  },
  {
    icon: Zap,
    title: "Spend tied to booked estimates",
    description:
      "You pay one flat fee per booked estimate. Every dollar you spend is tied to a real appointment on your calendar.",
  },
];

export const metadata: Metadata = {
  title: "About Appointly | Booked Floor Coating Estimates",
  description:
    "Appointly Solutions is a pay per appointment Meta ads agency that books estimates for garage floor coating and concrete coating contractors.",
  keywords: [
    "Appointly Solutions",
    "appointment generation for contractors",
    "about us",
    "contractor marketing",
  ],
  alternates: {
    canonical: "https://getappointly.co/about",
  },
  openGraph: {
    title: "About Appointly | Booked Floor Coating Estimates",
    description:
      "See the mission, approach, and values behind Appointly Solutions and how we fill contractors' calendars with booked estimates.",
    url: "https://getappointly.co/about",
    siteName: "Appointly Solutions",
    type: "website",
  },
};

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <main className="overflow-hidden">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@graph": [personSchema(authors.patrick), personSchema(authors.jacob)],
            }),
          }}
        />
        <section className="relative pt-32 pb-20 md:pt-44 md:pb-28">
          <div className="absolute inset-0 -z-10">
            <div className="absolute top-0 right-0 h-[720px] w-[720px] rounded-full bg-primary/[0.06] blur-[140px]" />
            <div className="absolute inset-0 dot-grid opacity-40" />
          </div>

          <div className="mx-auto max-w-6xl px-6">
            <Breadcrumbs items={[{ name: "About", href: "/about" }]} className="mb-8" />
            <div className="max-w-3xl">
              <p className="mb-6 text-xs font-semibold uppercase tracking-[0.25em] text-muted-foreground">
                About Appointly Solutions
              </p>
              <h1 className="font-display text-5xl font-bold leading-[1.05] tracking-tight text-balance md:text-6xl">
                About <span className="gradient-text">Appointly Solutions</span>
              </h1>
              <p className="mt-6 max-w-2xl text-base leading-relaxed text-foreground md:text-lg">
                Appointly Solutions is a pay per appointment Meta ads agency that
                books estimates for garage floor coating and concrete coating
                contractors.
              </p>
              <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg">
                Floor coating is what we specialize in. Garage floors, epoxy,
                polyaspartic, and concrete coatings are the only work our creative,
                our qualifying questions, and our booking scripts are built around,
                which is why we can tell a real coating job from a tire kicker in
                the first 30 seconds of a call.
              </p>
              <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg">
                Founded by brothers Patrick and Jacob Mietka in Chicago, IL, Appointly
                Solutions was built out of frustration with agencies that charge big
                monthly fees without delivering results. We created the Appointly Model so
                contractors get accountability: one flat fee per booked estimate we
                actually put on your calendar, and nothing for activity.
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
                  See How It Works
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section className="section-divider py-24 md:py-32">
          <div className="mx-auto grid max-w-6xl gap-6 px-6 lg:grid-cols-2">
            <article className="glass-card rounded-3xl p-8 md:p-10">
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-muted-foreground">
                Why We Exist
              </p>
              <h2 className="mt-4 font-display text-3xl font-bold text-foreground">
                Contractors deserve a model that rewards results.
              </h2>
              <p className="mt-5 text-sm leading-7 text-muted-foreground md:text-base">
                Traditional agencies charge large monthly fees before any result
                shows up. That leaves contractors carrying all the risk while the
                agency collects regardless. Appointly Solutions was built specifically
                for owner-operators who are done paying for promises. The Appointly Model
                exists for one reason: most of your spend should be tied to booked
                estimates you can actually show up to and close.
              </p>
              <p className="mt-4 text-sm leading-7 text-muted-foreground md:text-base">
                If you want the full breakdown, our{" "}
                <Link href="/faq" className="text-primary transition-opacity hover:opacity-80">
                  FAQ page
                </Link>{" "}
                covers what qualifies as a lead and how the model works in practice.
              </p>
            </article>

            <article className="glass-card rounded-3xl p-8 md:p-10">
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-muted-foreground">
                Our Approach
              </p>
              <h2 className="mt-4 font-display text-3xl font-bold text-foreground">
                Booked appointments, tied to results.
              </h2>
              <p className="mt-5 text-sm leading-7 text-muted-foreground md:text-base">
                Appointly Solutions runs your Meta ads, contacts every homeowner the
                second they raise their hand, and books the estimate straight onto your
                calendar. You pay a flat fee for each booked estimate, not for hours,
                reports, or guesswork.
              </p>
              <p className="mt-4 text-sm leading-7 text-muted-foreground md:text-base">
                Our{" "}
                <Link href="/how-it-works" className="text-primary transition-opacity hover:opacity-80">
                  How It Works
                </Link>{" "}
                page walks through each step of the process from campaign launch to
                booked estimate. You can also explore{" "}
                <Link
                  href="/floor-coating-leads"
                  className="text-primary transition-opacity hover:opacity-80"
                >
                  Floor Coating Leads
                </Link>{" "}
                if you want the commercial overview first.
              </p>
            </article>
          </div>
        </section>

        <section className="section-divider relative py-24 md:py-32">
          <div className="absolute inset-0 -z-10">
            <div className="absolute left-1/4 top-0 h-[560px] w-[560px] rounded-full bg-primary/[0.06] blur-[120px]" />
          </div>

          <div className="mx-auto max-w-6xl px-6">
            <div className="max-w-2xl">
              <p className="mb-4 text-xs font-semibold uppercase tracking-[0.25em] text-muted-foreground">
                What We Value
              </p>
              <h2 className="font-display text-3xl font-bold text-foreground md:text-4xl">
                Built around exclusivity, speed, and trust.
              </h2>
              <p className="mt-4 leading-relaxed text-muted-foreground">
                Appointly Solutions is designed to give home service contractors a
                reliable growth engine that feels accountable from day one.
              </p>
            </div>

            <div className="mt-12 grid gap-5 md:grid-cols-2">
              {differentiators.map((item) => (
                <article
                  key={item.title}
                  className="glass-card glass-card-hover rounded-2xl p-6"
                >
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

        <section className="section-divider py-24 md:py-32" id="founders">
          <div className="mx-auto max-w-6xl px-6">
            <div className="max-w-2xl">
              <p className="mb-4 text-xs font-semibold uppercase tracking-[0.25em] text-muted-foreground">
                Who You Are Working With
              </p>
              <h2 className="font-display text-3xl font-bold text-foreground md:text-4xl">
                Two brothers from Chicago who run the whole system themselves.
              </h2>
              <p className="mt-4 leading-relaxed text-muted-foreground">
                There is no account manager between you and the people running your
                campaigns. Patrick runs the ads and the numbers. Jacob runs speed to
                lead and booking. Both of them write the guides on this site.
              </p>
            </div>

            <div className="mt-12 grid gap-6 md:grid-cols-2">
              {[authors.patrick, authors.jacob].map((person) => (
                <article
                  key={person.id}
                  id={`${person.id}-mietka`}
                  className="glass-card flex gap-5 rounded-3xl p-6 scroll-mt-32"
                >
                  <Image
                    src={person.image.replace("https://getappointly.co", "")}
                    alt={`${person.name}, ${person.role}`}
                    width={96}
                    height={96}
                    sizes="96px"
                    className="h-24 w-24 shrink-0 rounded-2xl object-cover"
                  />
                  <div>
                    <h3 className="font-display text-xl font-semibold text-foreground">
                      {person.name}
                    </h3>
                    <p className="mt-1 text-sm font-medium text-primary">{person.role}</p>
                    <p className="mt-3 text-sm leading-7 text-muted-foreground">{person.bio}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <FaqBlock
          title="What contractors ask before they start."
          items={coreFaqItems}
        />
        <ProofSection />
        <SeoResourceLinks
          title="Supporting pages worth visiting next."
          description="These pages reinforce the about story with clearer commercial intent, pricing context, and proof-led comparisons."
          resources={getCommercialResources("floor-coating-marketing-agency-alternative")}
        />

        <section className="section-divider py-24 md:py-32">
          <div className="mx-auto max-w-5xl px-6">
            <div className="rounded-[32px] border border-primary/20 bg-primary/10 p-8 text-center shadow-[0_0_80px_rgba(125,135,247,0.12)] md:p-12">
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-slate-600">
                Ready To Grow
              </p>
              <h2 className="mt-4 font-display text-3xl font-bold text-foreground md:text-4xl">
                See if Appointly Solutions fits your market.
              </h2>
              <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-slate-700 md:text-base">
                Book a strategy call and we will map out where your jobs are coming
                from, what is slipping through the cracks, and how booked estimates
                could support your next stage of growth. If you want to see the pricing
                first, visit{" "}
                <Link
                  href="/pricing"
                  className="text-slate-950 underline decoration-slate-400/70 underline-offset-4 transition-colors hover:text-slate-700"
                >
                  Pricing
                </Link>
                .
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
