import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, CalendarDays, Clock3, Database, Search } from "lucide-react";

import { Breadcrumbs } from "@/components/breadcrumbs";
import { Footer } from "@/components/footer";
import { Navbar } from "@/components/navbar";
import { formatBlogDate, getBlogPath, getBlogPosts } from "@/lib/blog";
import { servicePages } from "@/lib/seo-resources";

export const metadata: Metadata = {
  title: "Floor Coating Contractor Marketing Blog | Appointly",
  description:
    "Guides for floor coating contractors on pricing, closing estimates, Meta ads, reviews, seasonality, and getting booked jobs instead of chasing leads.",
  alternates: {
    canonical: "https://getappointly.co/blog",
  },
  openGraph: {
    title: "Floor Coating Contractor Marketing Blog | Appointly",
    description:
      "Read practical marketing guidance for floor coating and home service contractors, including booked estimates, Meta ads, local visibility, and growth ideas.",
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
            <Breadcrumbs items={[{ name: "Blog", href: "/blog" }]} className="mb-8" />
            <div className="max-w-3xl">
              <p className="mb-6 text-xs font-semibold uppercase tracking-[0.25em] text-muted-foreground">
                Appointly Blog
              </p>
              <h1 className="font-display text-5xl font-bold tracking-tight leading-[1.05] text-balance md:text-6xl">
                Practical ideas for contractors who want{" "}
                <span className="gradient-text">more booked estimates</span>
              </h1>
              <p className="mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg">
                These articles are built to help contractors fill their calendars, sharpen
                their marketing, and make better decisions about channels, budgets,
                and follow-up.
              </p>
            </div>
          </div>
        </section>

        <section className="section-divider py-24 md:py-32">
          <div className="mx-auto max-w-6xl px-6">
            <Link
              href={servicePages.benchmarks}
              className="group mb-16 flex flex-col gap-8 overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 via-slate-800 to-slate-950 p-8 text-white shadow-[0_20px_60px_rgba(15,23,42,0.12)] transition-transform hover:-translate-y-1 md:flex-row md:items-center md:justify-between md:p-10"
            >
              <div className="max-w-2xl">
                <p className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.25em] text-white/70">
                  <Database className="h-3.5 w-3.5" />
                  Industry Benchmarks
                </p>
                <h2 className="mt-4 font-display text-3xl font-bold leading-tight text-white md:text-4xl">
                  Floor Coating Lead and Sales Benchmarks
                </h2>
                <p className="mt-4 text-sm leading-7 text-white/75 md:text-base">
                  Lead to appointment rate, phone answer rate, show rate, price per square
                  foot, and seasonality from live garage floor coating accounts. Updated
                  quarterly.
                </p>
                <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-white">
                  See the numbers
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </span>
              </div>
              <dl className="flex shrink-0 flex-wrap gap-x-8 gap-y-5 md:gap-x-10">
                {[
                  { stat: "60 to 70%", label: "Lead to appointment" },
                  { stat: "90%", label: "Answer rate" },
                  { stat: "95%", label: "Show rate" },
                ].map((item) => (
                  <div key={item.label} className="flex flex-col">
                    <dt className="order-2 whitespace-nowrap text-xs font-medium uppercase tracking-[0.15em] text-white/60">
                      {item.label}
                    </dt>
                    <dd className="whitespace-nowrap font-display text-xl font-bold tracking-tight text-white sm:text-2xl md:text-3xl">
                      {item.stat}
                    </dd>
                  </div>
                ))}
              </dl>
            </Link>

            <div className="mb-10 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.25em] text-muted-foreground">
                  Featured Articles
                </p>
                <h2 className="mt-3 font-display text-3xl font-bold text-foreground md:text-4xl">
                  Start with the highest-impact topics for coating contractors.
                </h2>
              </div>
              <p className="max-w-xl text-sm leading-7 text-muted-foreground md:text-base">
                Straight, practical advice on pricing, selling, and booking more floor
                coating jobs - written for contractors, not marketers.
              </p>
            </div>

            <div className="grid gap-6 lg:grid-cols-3">
              {featured.map((post) => (
                <Link
                  key={post.slug}
                  href={getBlogPath(post.slug)}
                  className="group overflow-hidden rounded-3xl border border-white/10 bg-white shadow-[0_20px_60px_rgba(15,23,42,0.08)] transition-transform hover:-translate-y-1"
                >
                  <div className="aspect-[1.7/1] bg-gradient-to-br from-slate-900 via-slate-800 to-slate-950 p-6 text-white">
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

