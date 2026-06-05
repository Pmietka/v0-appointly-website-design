import type { Metadata } from "next";
import Link from "next/link";

import { Navbar } from "@/components/navbar";
import { Hero } from "@/components/hero";
import { ProofSection } from "@/components/proof-section";
import { Stats } from "@/components/stats";
import { Results } from "@/components/results";
import { Problem } from "@/components/problem";
import { SeoResourceLinks } from "@/components/seo-resource-links";
import { Solution } from "@/components/solution";
import { CTA } from "@/components/cta";
import { Footer } from "@/components/footer";
import { formatBlogDate, getBlogPath, getBlogPosts } from "@/lib/blog";
import { homepageResources } from "@/lib/seo-resources";

// Preserved copy of the previous homepage (was app/page.tsx) so the old design
// is never lost. Kept out of the index with noindex to avoid duplicate content
// now that /deck-scroll has been promoted to the root homepage.
export const metadata: Metadata = {
  title: "Booked Estimates for Floor Coating Contractors | Appointly Solutions",
  description:
    "Appointly Solutions fills your calendar with booked floor coating estimates. We run Meta ads, hit speed-to-lead, and book the appointment for you so you just show up and close.",
  alternates: {
    canonical: "https://getappointly.co/legacy-home",
  },
  robots: {
    index: false,
    follow: false,
  },
};

export default async function LegacyHomePage() {
  const blogPosts = await getBlogPosts();
  const featuredPosts = blogPosts.slice(0, 3);

  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Stats />
        <Results />
        <ProofSection />
        <Problem />
        <Solution />
        <SeoResourceLinks
          eyebrow="More Detail"
          title="More specific answers for more specific questions."
          description="These pages go deeper on exclusivity, how the Appointly Model works, epoxy and concrete coating appointments, and what working with a smaller market looks like."
          resources={homepageResources}
        />
        <section className="section-divider bg-[hsl(var(--surface-subtle))] py-24 md:py-28">
          <div className="mx-auto max-w-6xl px-6">
            <div className="mb-10 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.25em] text-muted-foreground">
                  From the blog
                </p>
                <h2 className="mt-3 font-display text-3xl font-bold text-foreground md:text-4xl">
                  Fresh articles for home service contractors.
                </h2>
              </div>
              <Link
                href="/blog"
                className="inline-flex items-center gap-2 text-sm font-semibold text-gray-900 transition-colors hover:text-gray-600"
              >
                View all posts
              </Link>
            </div>

            <div className="grid gap-6 lg:grid-cols-3">
              {featuredPosts.map((post) => (
                <Link
                  key={post.slug}
                  href={getBlogPath(post.slug)}
                  className="group rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg"
                >
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gray-500">
                    {formatBlogDate(post.publishedAt)}
                  </p>
                  <h3 className="mt-4 text-xl font-bold tracking-tight text-slate-950">
                    {post.title}
                  </h3>
                  <p className="mt-3 text-sm leading-7 text-slate-600">
                    {post.description}
                  </p>
                  <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-gray-900 transition-colors group-hover:text-gray-600">
                    Read more
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>
        <CTA />
      </main>
      <Footer />
    </>
  );
}
