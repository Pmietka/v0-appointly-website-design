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
  title: "Insulation Contractor Leads | Pay-Per-Lead Growth for Contractors",
  description:
    "Appointly Solutions helps insulation contractors generate exclusive, qualified leads with pay-per-lead pricing, fast follow-up, and no monthly retainer.",
  keywords: [
    "insulation contractor leads",
    "pay per lead insulation",
    "exclusive insulation leads",
    "insulation lead generation",
    "insulation marketing company",
  ],
  alternates: {
    canonical: "https://getappointly.co",
  },
  openGraph: {
    title: "Insulation Contractor Leads | Pay-Per-Lead Growth for Contractors",
    description:
      "Generate exclusive insulation leads with a pay-per-lead model built for booked estimates, stronger qualification, and lower marketing risk.",
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
      serviceType: "Insulation contractor lead generation",
      name: "Pay-per-lead growth for insulation contractors",
      provider: {
        "@id": "https://getappointly.co/#organization",
      },
      areaServed: ["US", "CA"],
      audience: {
        "@type": "Audience",
        audienceType: "Insulation contractors",
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
          eyebrow="Explore By Intent"
          title="Find the page that matches how contractors search."
          description="These landing pages support the main offer with more specific search intent around exclusivity, pricing model, spray foam demand, and smaller market coverage."
          resources={homepageResources}
        />
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
