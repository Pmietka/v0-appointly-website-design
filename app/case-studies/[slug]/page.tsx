import type { Metadata, Viewport } from "next";
import { notFound } from "next/navigation";
import { PhoneCall } from "lucide-react";

import { SiteNav } from "@/components/site-nav";
import { DscrollFooter } from "@/components/dscroll-footer";
import { CASE_STUDIES, getCaseStudy } from "@/lib/case-studies";
import { VIDEO_STORIES, getVideoStory } from "@/lib/video-case-studies";
import {
  CASE_STUDIES_URL,
  CtaBand,
  StoryChapters,
  StoryHero,
  StoryStats,
  SupportCard,
  storyVideoSchema,
} from "../story";
import "../../home.css";
import "../case-studies.css";

/* One company's video case study on its own page, for sharing a single
   story. The same story also runs in full on /case-studies. */

export const dynamicParams = false;

export function generateStaticParams() {
  return VIDEO_STORIES.map((s) => ({ slug: s.slug }));
}

export const viewport: Viewport = {
  themeColor: "#0f0f10",
};

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const story = getVideoStory(slug);
  if (!story) return {};
  const url = `${CASE_STUDIES_URL}/${slug}`;
  const { title, description } = story.seo;
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      siteName: "Appointly Solutions",
      type: "website",
      images: [{ url: "https://getappointly.co/images/og-home.png", width: 1200, height: 630, alt: description }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["https://getappointly.co/images/og-home.png"],
    },
  };
}

export default async function CompanyCaseStudyPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const story = getVideoStory(slug);
  const cs = getCaseStudy(slug);
  if (!story || !cs) notFound();

  const url = `${CASE_STUDIES_URL}/${slug}`;
  const others = CASE_STUDIES.filter((c) => c.slug !== slug);

  const schema = [
    {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "@id": `${url}#page`,
      url,
      name: story.seo.title,
      description: story.seo.description,
      isPartOf: { "@id": "https://getappointly.co/#website" },
      about: { "@id": "https://getappointly.co/#service" },
      video: storyVideoSchema(story, url),
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://getappointly.co/" },
        { "@type": "ListItem", position: 2, name: "Case Studies", item: CASE_STUDIES_URL },
        { "@type": "ListItem", position: 3, name: cs.company, item: url },
      ],
    },
  ];

  return (
    <div className="dscroll csp">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <SiteNav />

      <StoryHero
        story={story}
        cs={cs}
        heading="h1"
        eyebrow={`Case study · ${cs.company}`}
        crumbs={[{ label: "Home", href: "/" }, { label: "Case Studies", href: "/case-studies" }, { label: cs.company }]}
        sectionId="top"
        priority
      />
      <StoryStats story={story} cs={cs} />
      <StoryChapters story={story} cs={cs} />

      <section className="sec tint" id="more-case-studies">
        <div className="wrap wide">
          <p className="eyebrow">More case studies</p>
          <h2>
            Other markets. <span className="hl">Same process.</span>
          </h2>
          <p className="sub">
            Every homeowner is called and qualified before the appointment is
            booked, and the close rates follow from that.
          </p>
          <div className="scards">
            {others.map((c) => (
              <SupportCard c={c} key={c.slug} />
            ))}
          </div>
          <div className="glancenote">
            <span className="gicon"><PhoneCall aria-hidden /></span>
            <p>
              <strong>Phil, Mark and Eric have each agreed to take a call about
              their experience.</strong> Ask on your strategy call and Jacob will
              share their contact details.
            </p>
          </div>
        </div>
      </section>

      <CtaBand quote={story.ctaQuote} cite={cs.owner} ownerFirst={story.ownerFirst} />

      <DscrollFooter />
    </div>
  );
}
