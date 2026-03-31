import Link from "next/link";

import { Navbar } from "@/components/navbar";
import { Hero } from "@/components/hero";
import { Stats } from "@/components/stats";
import { Results } from "@/components/results";
import { Problem } from "@/components/problem";
import { Solution } from "@/components/solution";
import { CTA } from "@/components/cta";
import { Footer } from "@/components/footer";
import { formatBlogDate, getBlogPath, getBlogPosts } from "@/lib/blog";

export default async function Page() {
  const blogPosts = await getBlogPosts();
  const featuredPosts = blogPosts.slice(0, 3);

  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Stats />
        <Results />
        <Problem />
        <Solution />
        <section className="section-divider bg-[#f8f9ff] py-24 md:py-28">
          <div className="mx-auto max-w-6xl px-6">
            <div className="mb-10 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.25em] text-muted-foreground">
                  From the blog
                </p>
                <h2 className="mt-3 font-display text-3xl font-bold text-foreground md:text-4xl">
                  Fresh articles for insulation contractors.
                </h2>
              </div>
              <Link
                href="/blog"
                className="inline-flex items-center gap-2 text-sm font-semibold text-[#5f57e8] transition-opacity hover:opacity-80"
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
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#5f57e8]">
                    {formatBlogDate(post.updatedAt)}
                  </p>
                  <h3 className="mt-4 text-xl font-bold tracking-tight text-slate-950">
                    {post.title}
                  </h3>
                  <p className="mt-3 text-sm leading-7 text-slate-600">
                    {post.description}
                  </p>
                  <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-[#5f57e8]">
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
