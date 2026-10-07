import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, CalendarDays, Clock3, Database, MessageCircleQuestion, RefreshCw } from "lucide-react";

import { Breadcrumbs } from "@/components/breadcrumbs";
import { BlogMarkdown } from "@/components/blog-markdown";
import { Footer } from "@/components/footer";
import { Navbar } from "@/components/navbar";
import { getAuthor, personSchema } from "@/lib/authors";
import { formatBlogDate, getBlogPath, getBlogPosts } from "@/lib/blog";
import { getGuide, getGuidePath, getGuides, getRelatedGuides, getSituationLabel } from "@/lib/guides";

const baseUrl = "https://getappointly.co";
const bookingUrl = "https://client.getappointly.co/strategy-calendar";

export async function generateStaticParams() {
  const guides = await getGuides();
  return guides.map((guide) => ({ slug: guide.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const guide = await getGuide(slug);

  if (!guide) {
    return { robots: { index: false, follow: false } };
  }

  const canonical = `${baseUrl}${getGuidePath(guide.slug)}`;
  const author = getAuthor(guide.authorId);
  const image = `${baseUrl}${guide.image}`;

  return {
    title: guide.seoTitle,
    description: guide.description,
    authors: [{ name: author.name, url: author.url }],
    alternates: { canonical },
    openGraph: {
      title: guide.seoTitle,
      description: guide.description,
      url: canonical,
      siteName: "Appointly Solutions",
      type: "article",
      publishedTime: guide.publishedAt.toISOString(),
      modifiedTime: guide.updatedAt.toISOString(),
      authors: [author.name],
      images: [{ url: image, width: 1200, height: 630, alt: guide.title }],
    },
    twitter: {
      card: "summary_large_image",
      title: guide.seoTitle,
      description: guide.description,
      images: [image],
    },
  };
}

export default async function GuidePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const guide = await getGuide(slug);

  if (!guide) {
    notFound();
  }

  const [allGuides, allPosts] = await Promise.all([getGuides(), getBlogPosts()]);
  const relatedGuides = getRelatedGuides(guide, allGuides, 3);
  const relatedPosts = guide.relatedPosts
    .map((postSlug) => allPosts.find((post) => post.slug === postSlug))
    .filter((post): post is NonNullable<typeof post> => Boolean(post))
    .slice(0, 4);
  const author = getAuthor(guide.authorId);
  const canonical = `${baseUrl}${getGuidePath(guide.slug)}`;
  const situationLabel = getSituationLabel(guide.situation);
  const wasUpdated = guide.updatedAt.getTime() - guide.publishedAt.getTime() > 24 * 60 * 60 * 1000;

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "@id": `${canonical}#article`,
    headline: guide.title,
    description: guide.description,
    image: `${baseUrl}${guide.image}`,
    datePublished: guide.publishedAt.toISOString(),
    dateModified: guide.updatedAt.toISOString(),
    mainEntityOfPage: { "@type": "WebPage", "@id": canonical },
    isPartOf: { "@type": "CollectionPage", "@id": `${baseUrl}/guides#collection` },
    inLanguage: "en-US",
    about: guide.question || guide.title,
    audience: {
      "@type": "BusinessAudience",
      audienceType: guide.audience || "Floor coating contractors",
    },
    author: personSchema(author),
    publisher: {
      "@type": "Organization",
      "@id": `${baseUrl}/#organization`,
      name: "Appointly Solutions",
      logo: { "@type": "ImageObject", url: `${baseUrl}/images/appointly-logo-mark.png` },
    },
    ...(guide.takeaways.length
      ? {
          speakable: {
            "@type": "SpeakableSpecification",
            cssSelector: ["[data-key-takeaways]"],
          },
        }
      : {}),
  };

  const faqSchema = guide.faq.length
    ? {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "@id": `${canonical}#faq`,
        mainEntity: guide.faq.map((item) => ({
          "@type": "Question",
          name: item.question,
          acceptedAnswer: { "@type": "Answer", text: item.answer },
        })),
      }
    : null;

  const tocHeadings = guide.headings.filter((heading) => !/^key takeaways$/i.test(heading.text));

  return (
    <>
      <Navbar />
      <main className="overflow-hidden">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
        />
        {faqSchema && (
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
          />
        )}

        <section className="relative pt-32 pb-16 md:pt-44 md:pb-24">
          <div className="absolute inset-0 -z-10">
            <div className="absolute top-0 right-0 h-[760px] w-[760px] rounded-full bg-primary/[0.06] blur-[150px]" />
            <div className="absolute inset-0 dot-grid opacity-35" />
          </div>

          <div className="mx-auto max-w-4xl px-6">
            <Breadcrumbs
              items={[
                { name: "Owner Guides", href: "/guides" },
                { name: guide.title, href: getGuidePath(guide.slug) },
              ]}
              className="mb-8"
            />

            <Link
              href={`/guides#${guide.situation}`}
              className="mb-6 inline-flex rounded-full border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.25em] text-muted-foreground transition-colors hover:text-foreground"
            >
              {situationLabel}
            </Link>
            <h1 className="font-display text-4xl font-bold tracking-tight leading-[1.08] text-balance text-foreground md:text-6xl">
              {guide.title}
            </h1>

            {guide.question && (
              <div className="mt-8 flex gap-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm md:p-6">
                <MessageCircleQuestion className="mt-0.5 h-5 w-5 shrink-0 text-slate-500" aria-hidden />
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
                    The question{guide.audience ? `, from ${guide.audience.toLowerCase()}` : ""}
                  </p>
                  <p className="mt-2 text-lg font-medium leading-relaxed text-slate-900">
                    &ldquo;{guide.question}&rdquo;
                  </p>
                </div>
              </div>
            )}

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
                <time dateTime={guide.publishedAt.toISOString()}>{formatBlogDate(guide.publishedAt)}</time>
              </span>
              {wasUpdated && (
                <span className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1.5">
                  <RefreshCw className="h-4 w-4" />
                  Updated <time dateTime={guide.updatedAt.toISOString()}>{formatBlogDate(guide.updatedAt)}</time>
                </span>
              )}
              <span className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1.5">
                <Clock3 className="h-4 w-4" />
                {guide.readingTime} min read
              </span>
            </div>
          </div>
        </section>

        <section className="section-divider py-16 md:py-24">
          <div className="mx-auto grid max-w-6xl gap-8 px-6 lg:grid-cols-[minmax(0,1fr)_320px]">
            <article className="min-w-0 rounded-3xl border border-slate-200 bg-white p-6 shadow-[0_20px_60px_rgba(15,23,42,0.06)] md:p-10">
              <BlogMarkdown content={guide.body} />

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
                </div>
              </div>
            </article>

            <aside className="space-y-6 lg:sticky lg:top-28 lg:self-start">
              {tocHeadings.length > 2 && (
                <nav
                  aria-label="On this page"
                  className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm"
                >
                  <p className="text-xs font-semibold uppercase tracking-[0.25em] text-muted-foreground">
                    On this page
                  </p>
                  <ol className="mt-4 space-y-2 text-sm">
                    {tocHeadings.map((heading) => (
                      <li key={heading.id}>
                        <a
                          href={`#${heading.id}`}
                          className="block leading-6 text-slate-600 transition-colors hover:text-foreground"
                        >
                          {heading.text}
                        </a>
                      </li>
                    ))}
                  </ol>
                </nav>
              )}

              <Link
                href="/floor-coating-benchmarks"
                className="group block rounded-3xl bg-gradient-to-br from-slate-900 via-slate-800 to-slate-950 p-6 text-white shadow-sm transition-transform hover:-translate-y-0.5"
              >
                <p className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.25em] text-white/70">
                  <Database className="h-3.5 w-3.5" />
                  Benchmarks
                </p>
                <p className="mt-3 text-lg font-bold leading-snug text-white">
                  Floor coating lead and sales benchmarks
                </p>
                <p className="mt-2 text-sm leading-6 text-white/75">
                  Lead to appointment rate, answer rate, show rate, and price per square
                  foot from live coating accounts.
                </p>
              </Link>

              <div className="rounded-3xl border border-primary/20 bg-primary/10 p-6 shadow-sm">
                <p className="text-xs font-semibold uppercase tracking-[0.25em] text-slate-600">
                  Pay per booked estimate
                </p>
                <h2 className="mt-4 text-2xl font-bold leading-tight text-slate-950">
                  $125 to $199 per confirmed estimate. Nothing for leads that never book.
                </h2>
                <p className="mt-4 text-sm leading-7 text-slate-700">
                  We run the Meta ads, call every homeowner within minutes, and book the
                  estimate on your calendar. One floor coating contractor per market.
                </p>
                <a
                  href={bookingUrl}
                  className="mt-6 inline-flex items-center justify-center rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90"
                >
                  Book a Call
                </a>
              </div>
            </aside>
          </div>
        </section>

        {(relatedPosts.length > 0 || relatedGuides.length > 0) && (
          <section className="section-divider bg-[hsl(var(--surface-subtle))] py-20 md:py-28">
            <div className="mx-auto max-w-6xl space-y-16 px-6">
              {relatedPosts.length > 0 && (
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.25em] text-muted-foreground">
                    Go deeper
                  </p>
                  <h2 className="mt-3 font-display text-3xl font-bold text-foreground md:text-4xl">
                    The articles behind this answer.
                  </h2>
                  <div className="mt-10 grid gap-6 md:grid-cols-2">
                    {relatedPosts.map((post) => (
                      <Link
                        key={post.slug}
                        href={getBlogPath(post.slug)}
                        className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg"
                      >
                        <h3 className="text-xl font-bold tracking-tight text-slate-950">{post.title}</h3>
                        <p className="mt-3 text-sm leading-7 text-slate-600">{post.description}</p>
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {relatedGuides.length > 0 && (
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.25em] text-muted-foreground">
                    Other situations
                  </p>
                  <h2 className="mt-3 font-display text-3xl font-bold text-foreground md:text-4xl">
                    Answers for owners in a different spot.
                  </h2>
                  <div className="mt-10 grid gap-6 md:grid-cols-3">
                    {relatedGuides.map((related) => (
                      <Link
                        key={related.slug}
                        href={getGuidePath(related.slug)}
                        className="flex flex-col rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg"
                      >
                        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
                          {getSituationLabel(related.situation)}
                        </p>
                        <h3 className="mt-4 text-xl font-bold tracking-tight text-slate-950">
                          {related.title}
                        </h3>
                        <span className="mt-auto inline-flex items-center gap-1.5 pt-5 text-sm font-semibold text-slate-950">
                          Read the answer <ArrowRight className="h-4 w-4" />
                        </span>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </section>
        )}

        <div className="mx-auto max-w-4xl px-6 py-16">
          <Link
            href="/guides"
            className="inline-flex items-center gap-2 text-sm font-semibold text-primary transition-colors hover:opacity-80"
          >
            <ArrowLeft className="h-4 w-4" />
            All owner guides
          </Link>
        </div>
      </main>
      <Footer />
    </>
  );
}
