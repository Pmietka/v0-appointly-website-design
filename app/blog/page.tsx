import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, CalendarDays, Clock3, Search } from "lucide-react";

import { Footer } from "@/components/footer";
import { Navbar } from "@/components/navbar";
import { formatBlogDate, getBlogPath, getBlogPosts } from "@/lib/blog";

export const metadata: Metadata = {
  title: "Blog | Appointly Solutions",
  description:
    "Read practical marketing guidance for insulation contractors, including lead generation, local SEO, Facebook ads, and conversion-focused growth ideas.",
  alternates: {
    canonical: "https://getappointly.co/blog",
  },
  openGraph: {
    title: "Blog | Appointly Solutions",
    description:
      "Read practical marketing guidance for insulation contractors, including lead generation, local SEO, Facebook ads, and conversion-focused growth ideas.",
    url: "https://getappointly.co/blog",
    siteName: "Appointly Solutions",
    type: "website",
  },
};

export default async function BlogIndexPage() {
  const posts = await getBlogPosts();
  const featured = posts.slice(0, 3);
  const rest = posts.slice(3);

  return (
    <>
      <Navbar />
      <main className="overflow-hidden">
        <section className="relative pt-32 pb-20 md:pt-44 md:pb-28">
          <div className="absolute inset-0 -z-10">
            <div className="absolute top-0 right-0 h-[760px] w-[760px] rounded-full bg-primary/[0.06] blur-[150px]" />
            <div className="absolute inset-0 dot-grid opacity-35" />
          </div>

          <div className="mx-auto max-w-6xl px-6">
            <div className="max-w-3xl">
              <p className="mb-6 text-xs font-semibold uppercase tracking-[0.25em] text-muted-foreground">
                Appointly Blog
              </p>
              <h1 className="font-display text-5xl font-bold tracking-tight leading-[1.05] text-balance md:text-6xl">
                Practical ideas for insulation contractors who want{" "}
                <span className="gradient-text">more qualified leads</span>
              </h1>
              <p className="mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg">
                These articles are built to help contractors improve lead flow, sharpen
                their marketing, and make better decisions about channels, budgets,
                and follow-up.
              </p>
            </div>
          </div>
        </section>

        <section className="section-divider py-24 md:py-32">
          <div className="mx-auto max-w-6xl px-6">
            <div className="mb-10 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.25em] text-muted-foreground">
                  Featured Articles
                </p>
                <h2 className="mt-3 font-display text-3xl font-bold text-foreground md:text-4xl">
                  Start with the highest-impact topics.
                </h2>
              </div>
              <p className="max-w-xl text-sm leading-7 text-muted-foreground md:text-base">
                Each post is linked below and included in the sitemap so search engines
                can discover every article cleanly.
              </p>
            </div>

            <div className="grid gap-6 lg:grid-cols-3">
              {featured.map((post) => (
                <Link
                  key={post.slug}
                  href={getBlogPath(post.slug)}
                  className="group overflow-hidden rounded-3xl border border-white/10 bg-white shadow-[0_20px_60px_rgba(15,23,42,0.08)] transition-transform hover:-translate-y-1"
                >
                  <div className="aspect-[1.7/1] bg-gradient-to-br from-slate-900 via-slate-800 to-primary p-6 text-white">
                    <div className="flex items-center justify-between text-xs font-semibold uppercase tracking-[0.2em] text-white/70">
                      <span>Blog Post</span>
                      <span>{post.readingTime} min read</span>
                    </div>
                    <div className="mt-10 max-w-[85%]">
                      <p className="text-sm font-medium text-white/70">
                        {formatBlogDate(post.publishedAt)}
                      </p>
                      <h3 className="mt-3 text-2xl font-bold leading-tight text-white">
                        {post.title}
                      </h3>
                    </div>
                  </div>
                  <div className="space-y-4 p-6">
                    <p className="text-sm leading-7 text-muted-foreground md:text-base">
                      {post.description}
                    </p>
                    <span className="inline-flex items-center gap-2 text-sm font-semibold text-primary">
                      Read article
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="section-divider bg-[hsl(var(--surface-subtle))] py-24 md:py-32">
          <div className="mx-auto max-w-6xl px-6">
            <div className="mb-10 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.25em] text-muted-foreground">
                  All Posts
                </p>
                <h2 className="mt-3 font-display text-3xl font-bold text-foreground md:text-4xl">
                  Browse the full library.
                </h2>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Search className="h-4 w-4" />
                {posts.length} articles
              </div>
            </div>

            <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              {rest.map((post) => (
                <Link
                  key={post.slug}
                  href={getBlogPath(post.slug)}
                  className="group rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg"
                >
                  <div className="flex items-center justify-between gap-4">
                    <span className="inline-flex rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-primary">
                      Blog
                    </span>
                    <span className="flex items-center gap-1 text-xs font-medium text-slate-500">
                      <CalendarDays className="h-3.5 w-3.5" />
                      {formatBlogDate(post.publishedAt)}
                    </span>
                  </div>
                  <h3 className="mt-5 text-xl font-bold tracking-tight text-slate-950">
                    {post.title}
                  </h3>
                  <p className="mt-3 text-sm leading-7 text-slate-600">
                    {post.description}
                  </p>
                  <div className="mt-6 flex items-center gap-2 text-sm font-semibold text-primary">
                    <Clock3 className="h-4 w-4" />
                    {post.readingTime} min read
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

