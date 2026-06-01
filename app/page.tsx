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

export const metadata: Metadata = {
  title: "Appointment Booking for Home Service Contractors | Appointly Solutions",
  description:
    "Appointly Solutions runs Meta ads, qualifies prospects, and books appointments straight onto your calendar. Pay for performance. Featured niche: floor coatings.",
  keywords: [
    "floor coating contractor appointments",
    "epoxy floor coating marketing",
    "appointment booking for contractors",
    "home service contractor appointments",
    "pay for performance contractor marketing",
  ],
  alternates: {
    canonical: "https://getappointly.co",
  },
  openGraph: {
    title: "Appointment Booking for Home Service Contractors | Appointly Solutions",
    description:
      "We run Meta ads, qualify prospects, and book appointments straight onto your calendar. Pay for performance — when we do well, you do well.",
    url: "https://getappointly.co",
    type: "website",
    siteName: "Appointly Solutions",
  },
};

export default async function Page() {
  const blogPosts = await getBlogPosts();
  const featuredPosts = blogPosts.slice(0, 3);
  const homeSchema = [
    {
      "@context": "https://schema.org",
      "@type": "Service",
      "@id": "https://getappointly.co/#service",
      serviceType: "Home service contractor appointment booking",
      name: "Pay-for-performance appointment booking for home service contractors",
      provider: {
        "@id": "https://getappointly.co/#organization",
      },
      areaServed: ["US", "CA"],
      audience: {
        "@type": "Audience",
        audienceType: "Home service contractors",
      },
      offers: {
        "@type": "Offer",
        availability: "https://schema.org/InStock",
        url: "https://client.getappointly.co/strategy-calendar",
      },
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Home",
          item: "https://getappointly.co",
        },
      ],
    },
  ];

  return (
    <>
      <Navbar />
      <main>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(homeSchema) }}
        />
        <Hero />
        <Stats />
        <Results />
        <ProofSection />
        <Problem />
        <Solution />
        <SeoResourceLinks
          eyebrow="More Detail"
          title="More specific answers for more specific questions."
          description="These pages go deeper on floor coating appointments, insulation appointments, exclusivity, and what working in a smaller market looks like."
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
                className="inline-flex items-center gap-2 text-sm font-semibold text-primary transition-opacity hover:opacity-80"
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
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
                    {formatBlogDate(post.publishedAt)}
                  </p>
                  <h3 className="mt-4 text-xl font-bold tracking-tight text-slate-950">
                    {post.title}
                  </h3>
                  <p className="mt-3 text-sm leading-7 text-slate-600">
                    {post.description}
                  </p>
                  <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-primary">
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
