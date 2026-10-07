import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Breadcrumbs } from "@/components/breadcrumbs";
import { Footer } from "@/components/footer";
import { Navbar } from "@/components/navbar";
import { getGuidePath, getGuides, situations } from "@/lib/guides";

const baseUrl = "https://getappointly.co";
const canonical = `${baseUrl}/guides`;
const title = "Floor Coating Owner Guides by Situation | Appointly";
const description =
  "Straight answers for garage floor coating, epoxy flooring, and concrete coating owners: first estimates, agencies, shared leads, one crew calendars, winter, spring, and tax season.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical },
  openGraph: {
    title,
    description,
    url: canonical,
    siteName: "Appointly Solutions",
    type: "website",
    images: [{ url: `${baseUrl}/images/appointly-og.png`, width: 1200, height: 630, alt: title }],
  },
};

// Numbers that are true for every situation. Kept in sync with /pricing,
// /case-studies, and /floor-coating-benchmarks.
const keyNumbers = [
  { stat: "$125 to $199", label: "per booked estimate, nothing for leads that never book" },
  { stat: "100+", label: "jobs closed by clients from estimates we booked" },
  { stat: "~$3,500", label: "average ticket across client jobs" },
  { stat: "60 to 70%", label: "of leads should become booked estimates when called fast" },
];

export default async function GuidesIndexPage() {
  const guides = await getGuides();
  const groups = situations
    .map((situation) => ({
      ...situation,
      guides: guides.filter((guide) => guide.situation === situation.key),
    }))
    .filter((group) => group.guides.length > 0);

  const collectionSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "@id": `${canonical}#collection`,
    name: "Floor coating owner guides by situation",
    description,
    url: canonical,
    publisher: { "@id": `${baseUrl}/#organization` },
    mainEntity: {
      "@type": "ItemList",
      itemListElement: guides.map((guide, index) => ({
        "@type": "ListItem",
        position: index + 1,
        url: `${baseUrl}${getGuidePath(guide.slug)}`,
        name: guide.title,
      })),
    },
  };

  return (
    <>
      <Navbar />
      <main className="overflow-hidden">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionSchema) }}
        />

        <section className="relative pt-32 pb-16 md:pt-44 md:pb-24">
          <div className="absolute inset-0 -z-10">
            <div className="absolute top-0 right-0 h-[760px] w-[760px] rounded-full bg-primary/[0.06] blur-[150px]" />
            <div className="absolute inset-0 dot-grid opacity-35" />
          </div>

          <div className="mx-auto max-w-6xl px-6">
            <Breadcrumbs items={[{ name: "Owner Guides", href: "/guides" }]} className="mb-8" />
            <div className="max-w-3xl">
              <p className="mb-6 text-xs font-semibold uppercase tracking-[0.25em] text-muted-foreground">
                Owner guides
              </p>
              <h1 className="font-display text-4xl font-bold tracking-tight leading-[1.05] text-balance md:text-6xl">
                Straight answers for floor coating owners, by situation
              </h1>
              <p className="mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg">
                Garage floor coating, epoxy flooring, concrete coating, or polyaspartic. Whatever
                you call your business, find the spot you are in and get the answer for it, with
                the numbers behind it.
              </p>
            </div>

            <nav aria-label="Situations" className="mt-10 flex flex-wrap gap-2">
              {groups.map((group) => (
                <a
                  key={group.key}
                  href={`#${group.key}`}
                  className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition-colors hover:border-slate-400 hover:text-slate-950"
                >
                  {group.label}
                </a>
              ))}
            </nav>
          </div>
        </section>

        <section className="section-divider py-12 md:py-16">
          <div className="mx-auto grid max-w-6xl gap-4 px-6 sm:grid-cols-2 lg:grid-cols-4">
            {keyNumbers.map((item) => (
              <div key={item.stat} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <p className="font-display text-3xl font-bold tracking-tight text-slate-950">{item.stat}</p>
                <p className="mt-2 text-sm leading-6 text-slate-600">{item.label}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="section-divider py-16 md:py-24">
          <div className="mx-auto max-w-6xl space-y-16 px-6">
            {groups.map((group) => (
              <div key={group.key} id={group.key} className="scroll-mt-28">
                <h2 className="font-display text-2xl font-bold tracking-tight text-foreground md:text-3xl">
                  {group.label}
                </h2>
                <div className="mt-6 grid gap-6 md:grid-cols-2">
                  {group.guides.map((guide) => (
                    <Link
                      key={guide.slug}
                      href={getGuidePath(guide.slug)}
                      className="flex flex-col rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg md:p-8"
                    >
                      {guide.audience && (
                        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
                          For {guide.audience.toLowerCase()}
                        </p>
                      )}
                      <h3 className="mt-3 text-xl font-bold tracking-tight text-slate-950 md:text-2xl">
                        {guide.title}
                      </h3>
                      <p className="mt-3 text-sm leading-7 text-slate-600">{guide.description}</p>
                      <span className="mt-auto inline-flex items-center gap-1.5 pt-5 text-sm font-semibold text-slate-950">
                        Read the answer <ArrowRight className="h-4 w-4" />
                      </span>
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="section-divider bg-[hsl(var(--surface-subtle))] py-20 md:py-24">
          <div className="mx-auto max-w-4xl px-6 text-center">
            <h2 className="font-display text-3xl font-bold tracking-tight text-foreground md:text-4xl">
              Not seeing your situation?
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg">
              The <Link href="/blog" className="font-semibold text-foreground underline underline-offset-4">blog</Link>{" "}
              covers pricing, closing, crews, and ads in depth. Or book a call and ask us directly.
            </p>
            <a
              href="https://client.getappointly.co/strategy-calendar"
              className="mt-8 inline-flex items-center justify-center rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90"
            >
              Book a strategy call
            </a>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
