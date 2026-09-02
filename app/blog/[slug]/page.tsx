import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, CalendarDays, Clock3, RefreshCw } from "lucide-react";

import { Breadcrumbs } from "@/components/breadcrumbs";
import { BlogMarkdown } from "@/components/blog-markdown";
import { Footer } from "@/components/footer";
import { Navbar } from "@/components/navbar";
import { SeoResourceLinks } from "@/components/seo-resource-links";
import { getAuthor, personSchema } from "@/lib/authors";
import {
  formatBlogDate,
  getBlogPath,
  getBlogPost,
  getBlogPostSlugs,
  getBlogPosts,
  getRelatedPosts,
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
    return { robots: { index: false, follow: false } };
  }

  const canonical = `${baseUrl}${getBlogPath(post.slug)}`;
  const author = getAuthor(post.authorId);
  const image = `${baseUrl}${post.image}`;

  return {
    title: post.seoTitle,
    description: post.description,
    authors: [{ name: author.name, url: author.url }],
    alternates: {
      canonical,
    },
    openGraph: {
      title: post.seoTitle,
      description: post.description,
      url: canonical,
      siteName: "Appointly Solutions",
      type: "article",
      publishedTime: post.publishedAt.toISOString(),
      modifiedTime: post.updatedAt.toISOString(),
      authors: [author.name],
      images: [{ url: image, width: 1200, height: 630, alt: post.title }],
    },
    twitter: {
      card: "summary_large_image",
      title: post.seoTitle,
      description: post.description,
      images: [image],
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
  const relatedPosts = getRelatedPosts(post, allPosts, 3);
  const commercialResources = getBlogCommercialResources(post.cluster);
  const author = getAuthor(post.authorId);
  const canonical = `${baseUrl}${getBlogPath(post.slug)}`;
  const wasUpdated = post.updatedAt.getTime() - post.publishedAt.getTime() > 24 * 60 * 60 * 1000;

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "@id": `${canonical}#article`,
    headline: post.title,
    description: post.description,
    image: `${baseUrl}${post.image}`,
    datePublished: post.publishedAt.toISOString(),
    dateModified: post.updatedAt.toISOString(),
    mainEntityOfPage: { "@type": "WebPage", "@id": canonical },
    inLanguage: "en-US",
    audience: { "@type": "Audience", audienceType: "Floor coating contractors" },
    author: personSchema(author),
    publisher: {
      "@type": "Organization",
      "@id": `${baseUrl}/#organization`,
      name: "Appointly Solutions",
      logo: {
        "@type": "ImageObject",
        url: `${baseUrl}/images/appointly-logo-mark.png`,
      },
    },
  };

  return (
    <>
      <Navbar />
      <main className="overflow-hidden">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
        />

        <section className="relative pt-32 pb-20 md:pt-44 md:pb-28">
          <div className="absolute inset-0 -z-10">
            <div className="absolute top-0 right-0 h-[760px] w-[760px] rounded-full bg-primary/[0.06] blur-[150px]" />
            <div className="absolute inset-0 dot-grid opacity-35" />
          </div>

          <div className="mx-auto max-w-4xl px-6">
            <Breadcrumbs
              items={[
                { name: "Blog", href: "/blog" },
                { name: post.title, href: getBlogPath(post.slug) },
              ]}
              className="mb-8"
            />

            <h1 className="font-display text-5xl font-bold tracking-tight leading-[1.05] text-balance text-foreground md:text-6xl">
              {post.title}
            </h1>
            <p className="mt-6 max-w-3xl text-base leading-relaxed text-muted-foreground md:text-lg">
              {post.description}
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
              <Link
                href={author.url.replace(baseUrl, "")}
                rel="author"
                className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white py-1.5 pl-1.5 pr-3 transition-colors hover:text-foreground"
              >
                <Image
                  src={author.image.replace(baseUrl, "")}
                  alt={author.name}
                  width={28}
                  height={28}
                  sizes="28px"
                  className="h-7 w-7 rounded-full object-cover"
                />
                <span className="font-medium text-foreground">{author.name}</span>
              </Link>
              <span className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1.5">
                <CalendarDays className="h-4 w-4" />
                <time dateTime={post.publishedAt.toISOString()}>{formatBlogDate(post.publishedAt)}</time>
              </span>
              {wasUpdated && (
                <span className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1.5">
                  <RefreshCw className="h-4 w-4" />
                  Updated <time dateTime={post.updatedAt.toISOString()}>{formatBlogDate(post.updatedAt)}</time>
                </span>
              )}
              <span className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1.5">
                <Clock3 className="h-4 w-4" />
                {post.readingTime} min read
              </span>
            </div>
          </div>
        </section>

        <section className="section-divider py-16 md:py-24">
          <div className="mx-auto grid max-w-6xl gap-8 px-6 lg:grid-cols-[minmax(0,1fr)_320px]">
            <article className="rounded-3xl border border-slate-200 bg-white p-6 shadow-[0_20px_60px_rgba(15,23,42,0.06)] md:p-10">
              <BlogMarkdown content={post.body} />

              <div className="mt-14 flex gap-5 rounded-2xl border border-slate-200 bg-slate-50 p-6">
                <Image
                  src={author.image.replace(baseUrl, "")}
                  alt={`${author.name}, ${author.role}`}
                  width={72}
                  height={72}
                  sizes="72px"
                  className="h-[72px] w-[72px] shrink-0 rounded-2xl object-cover"
                />
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
                    About the author
                  </p>
                  <p className="mt-2 text-lg font-bold text-slate-950">{author.name}</p>
                  <p className="text-sm font-medium text-primary">{author.role}</p>
                  <p className="mt-3 text-sm leading-7 text-slate-600">{author.bio}</p>
                  <Link
                    href={author.url.replace(baseUrl, "")}
                    className="mt-3 inline-block text-sm font-semibold text-primary transition-opacity hover:opacity-80"
                  >
                    More about the Appointly team
                  </Link>
                </div>
              </div>
            </article>

            <aside className="space-y-6">
              <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                <p className="text-xs font-semibold uppercase tracking-[0.25em] text-muted-foreground">
                  Why it matters
                </p>
                <p className="mt-4 text-sm leading-7 text-slate-600">
                  This article is part of the Appointly library for floor coating
                  contractors: practical guides on pricing, closing, marketing, and
                  keeping a crew booked without chasing leads.
                </p>
              </div>

              <div className="rounded-3xl border border-primary/20 bg-primary/10 p-6 shadow-sm">
                <p className="text-xs font-semibold uppercase tracking-[0.25em] text-slate-600">
                  Need help?
                </p>
                <h2 className="mt-4 text-2xl font-bold leading-tight text-slate-950">
                  Want a system that books estimates while you work?
                </h2>
                <p className="mt-4 text-sm leading-7 text-slate-700">
                  Book a strategy call and we'll walk through how we run the ads, hit
                  speed-to-lead, and book estimates onto your calendar in your market.
                </p>
                <a
                  href="https://client.getappointly.co/strategy-calendar"
                  className="mt-6 inline-flex items-center justify-center rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90"
                >
                  Book a Call
                </a>
                <p className="mt-4 text-xs leading-6 text-slate-600">
                  Or read how{" "}
                  <Link href="/floor-coating-leads" className="font-semibold text-slate-950 underline underline-offset-4">
                    booked floor coating leads
                  </Link>{" "}
                  work first.
                </p>
              </div>
            </aside>
          </div>
        </section>

        {relatedPosts.length > 0 && (
          <section className="section-divider bg-[hsl(var(--surface-subtle))] py-20 md:py-28">
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
                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
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
          description="Each article supports a commercial page so readers can move from research into the page that best matches their situation."
          resources={commercialResources}
        />

        <div className="mx-auto max-w-4xl px-6 pb-16">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-sm font-semibold text-primary transition-colors hover:opacity-80"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to all guides
          </Link>
        </div>
      </main>
      <Footer />
    </>
  );
}
