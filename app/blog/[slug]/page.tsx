import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, CalendarDays, Clock3 } from "lucide-react";

import { BlogMarkdown } from "@/components/blog-markdown";
import { Footer } from "@/components/footer";
import { Navbar } from "@/components/navbar";
import { SeoResourceLinks } from "@/components/seo-resource-links";
import {
  formatBlogDate,
  getBlogPath,
  getBlogPost,
  getBlogPostSlugs,
  getBlogPosts,
} from "@/lib/blog";
import { getBlogCommercialResources } from "@/lib/seo-resources";

const baseUrl = "https://getappointly.co";

export async function generateStaticParams() {
  const slugs = await getBlogPostSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getBlogPost(slug);

  if (!post) {
    return {};
  }

  const canonical = `${baseUrl}${getBlogPath(post.slug)}`;

  return {
    title: `${post.title} | Appointly Solutions Blog`,
    description: post.description,
    alternates: {
      canonical,
    },
    openGraph: {
      title: post.title,
      description: post.description,
      url: canonical,
      siteName: "Appointly Solutions",
      type: "article",
      publishedTime: post.publishedAt.toISOString(),
      modifiedTime: post.updatedAt.toISOString(),
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
    },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getBlogPost(slug);

  if (!post) {
    notFound();
  }

  const allPosts = await getBlogPosts();
  const relatedPosts = allPosts
    .filter((item) => item.slug !== post.slug)
    .slice(0, 3);
  const commercialResources = getBlogCommercialResources(post.slug);

  const canonical = `${baseUrl}${getBlogPath(post.slug)}`;

  return (
    <>
      <Navbar />
      <main className="overflow-hidden">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "BlogPosting",
              headline: post.title,
              description: post.description,
              datePublished: post.publishedAt.toISOString(),
              dateModified: post.updatedAt.toISOString(),
              mainEntityOfPage: canonical,
              author: {
                "@type": "Organization",
                name: "Appointly Solutions",
              },
              publisher: {
                "@type": "Organization",
                name: "Appointly Solutions",
                logo: {
                  "@type": "ImageObject",
                  url: `${baseUrl}/images/appointly-logo.png`,
                },
              },
            }),
          }}
        />

        <section className="relative pt-32 pb-20 md:pt-44 md:pb-28">
          <div className="absolute inset-0 -z-10">
            <div className="absolute top-0 right-0 h-[760px] w-[760px] rounded-full bg-[#7d87f7]/[0.08] blur-[150px]" />
            <div className="absolute inset-0 dot-grid opacity-35" />
          </div>

          <div className="mx-auto max-w-4xl px-6">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-sm font-semibold text-[#5f57e8] transition-colors hover:opacity-80"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to blog
            </Link>

            <div className="mt-8 flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
              <span className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1.5">
                <CalendarDays className="h-4 w-4" />
                {formatBlogDate(post.updatedAt)}
              </span>
              <span className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1.5">
                <Clock3 className="h-4 w-4" />
                {post.readingTime} min read
              </span>
            </div>

            <h1 className="mt-6 font-display text-5xl font-bold tracking-tight leading-[1.05] text-balance text-foreground md:text-6xl">
              {post.title}
            </h1>
            <p className="mt-6 max-w-3xl text-base leading-relaxed text-muted-foreground md:text-lg">
              {post.description}
            </p>
          </div>
        </section>

        <section className="section-divider py-16 md:py-24">
          <div className="mx-auto grid max-w-6xl gap-8 px-6 lg:grid-cols-[minmax(0,1fr)_320px]">
            <article className="rounded-3xl border border-slate-200 bg-white p-6 shadow-[0_20px_60px_rgba(15,23,42,0.06)] md:p-10">
              <BlogMarkdown content={post.body} />
            </article>

            <aside className="space-y-6">
              <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                <p className="text-xs font-semibold uppercase tracking-[0.25em] text-muted-foreground">
                  Why it matters
                </p>
                <p className="mt-4 text-sm leading-7 text-slate-600">
                  This article is part of the Appointly blog library, which is designed
                  to help insulation contractors generate more qualified leads without
                  relying on vague marketing promises.
                </p>
              </div>

              <div className="rounded-3xl bg-[#1a1f3e] p-6 text-white shadow-lg">
                <p className="text-xs font-semibold uppercase tracking-[0.25em] text-white/60">
                  Need help?
                </p>
                <h2 className="mt-4 text-2xl font-bold leading-tight">
                  Want a lead system that matches what you just read?
                </h2>
                <p className="mt-4 text-sm leading-7 text-white/70">
                  Book a strategy call and we'll walk through lead flow, qualification,
                  and the channels that make the most sense for your market.
                </p>
                <a
                  href="https://client.getappointly.co/strategy-calendar"
                  className="mt-6 inline-flex items-center justify-center rounded-full bg-[#5f57e8] px-5 py-3 text-sm font-semibold text-white transition-opacity hover:opacity-90"
                >
                  Book a Call
                </a>
              </div>
            </aside>
          </div>
        </section>

        {relatedPosts.length > 0 && (
          <section className="section-divider bg-[#f8f9ff] py-20 md:py-28">
            <div className="mx-auto max-w-6xl px-6">
              <div className="mb-10">
                <p className="text-xs font-semibold uppercase tracking-[0.25em] text-muted-foreground">
                  More Reads
                </p>
                <h2 className="mt-3 font-display text-3xl font-bold text-foreground md:text-4xl">
                  Keep going with related articles.
                </h2>
              </div>

              <div className="grid gap-6 md:grid-cols-3">
                {relatedPosts.map((related) => (
                  <Link
                    key={related.slug}
                    href={getBlogPath(related.slug)}
                    className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg"
                  >
                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#5f57e8]">
                      Related
                    </p>
                    <h3 className="mt-4 text-xl font-bold tracking-tight text-slate-950">
                      {related.title}
                    </h3>
                    <p className="mt-3 text-sm leading-7 text-slate-600">
                      {related.description}
                    </p>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}

        <SeoResourceLinks
          eyebrow="Next Step"
          title="Related service pages for contractors ready to act."
          description="Each article supports a commercial page so readers can move from research into the offer that best matches their situation."
          resources={commercialResources}
        />
      </main>
      <Footer />
    </>
  );
}

