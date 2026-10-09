import type { Metadata, Viewport } from "next";
import { PhoneCall } from "lucide-react";

import { SiteNav } from "@/components/site-nav";
import { DscrollFooter } from "@/components/dscroll-footer";
import { TestimonialWall } from "@/components/proof";
import { CASE_STUDIES } from "@/lib/case-studies";
import { CFC_STORY } from "@/lib/cfc-case-study";
import { FEATURED_TESTIMONIALS, QUOTE_TESTIMONIALS } from "@/lib/testimonials";
import { VIDEO_STORIES } from "@/lib/video-case-studies";
import {
  CASE_STUDIES_URL as PAGE_URL,
  CtaBand,
  StoryChapters,
  StoryHero,
  StoryStats,
  SupportCard,
  storyVideoSchema,
} from "./story";
import "../home.css";
import "./case-studies.css";

const TITLE = "Floor Coating Case Studies | Clean Floor Coatings, AFAB Services and Garage Force on Video | Appointly";
const DESCRIPTION =
  "Watch Phil from Clean Floor Coatings, Mark from AFAB Services, and Eric and Shani from Garage Force of the Inland Northwest explain, in their own words, what changed when Appointly started booking their calendars. Close rates from ~50% to ~70%.";

export const viewport: Viewport = {
  themeColor: "#0f0f10",
};

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: PAGE_URL,
    siteName: "Appointly Solutions",
    type: "website",
    images: [
      {
        url: "https://getappointly.co/images/og-home.png",
        width: 1200,
        height: 630,
        alt: "Appointly Solutions client case studies",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
    images: ["https://getappointly.co/images/og-home.png"],
  },
};

export default function CaseStudiesPage() {
  const bySlug = (slug: string) => CASE_STUDIES.find((c) => c.slug === slug)!;
  const stories = VIDEO_STORIES.map((story) => ({ story, cs: bySlug(story.slug) }));
  const supporting = CASE_STUDIES.filter((c) => !VIDEO_STORIES.some((s) => s.slug === c.slug));

  const schema = [
    {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      "@id": `${PAGE_URL}#page`,
      url: PAGE_URL,
      name: TITLE,
      description: DESCRIPTION,
      isPartOf: { "@id": "https://getappointly.co/#website" },
      about: { "@id": "https://getappointly.co/#service" },
      mainEntity: {
        "@type": "ItemList",
        itemListElement: CASE_STUDIES.map((c) => ({
          "@type": "ListItem",
          position: c.order,
          url: VIDEO_STORIES.some((s) => s.slug === c.slug) ? `${PAGE_URL}/${c.slug}` : `${PAGE_URL}#${c.slug}`,
          name: `${c.company} case study`,
          description: c.headline,
        })),
      },
      video: stories.flatMap(({ story }) => storyVideoSchema(story, PAGE_URL)),
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://getappointly.co/" },
        { "@type": "ListItem", position: 2, name: "Case Studies", item: PAGE_URL },
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

      {/* Every video case study in full, one after another: hero, stat bar,
          chapters, calendar proof and transcript. The first one carries the
          page's h1 and breadcrumb. */}
      {stories.map(({ story, cs }, i) => (
        <div className="cstory" key={story.slug}>
          <StoryHero
            story={story}
            cs={cs}
            heading={i === 0 ? "h1" : "h2"}
            eyebrow={`Case study ${String(i + 1).padStart(2, "0")} · ${cs.company}`}
            crumbs={i === 0 ? [{ label: "Home", href: "/" }, { label: "Case Studies" }] : undefined}
            sectionId={i === 0 ? "top" : undefined}
            pageLink
            priority={i === 0}
          />
          <StoryStats story={story} cs={cs} />
          <StoryChapters story={story} cs={cs} level={i === 0 ? "h2" : "h3"} />
        </div>
      ))}

      {/* Case studies without a video story, if any, plus the reference offer */}
      <section className="sec tint" id="more-case-studies">
        <div className="wrap wide">
          {supporting.length > 0 && (
            <>
              <p className="eyebrow">More case studies</p>
              <h2>
                More markets. <span className="hl">Same process.</span>
              </h2>
              <p className="sub">
                Every homeowner is called and qualified before the appointment is
                booked, and the close rates follow from that.
              </p>
              <div className="scards">
                {supporting.map((c) => (
                  <SupportCard c={c} key={c.slug} />
                ))}
              </div>
            </>
          )}
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

      {/* Testimonial wall */}
      <section className="sec" id="more-clients">
        <div className="wrap wide">
          <p className="eyebrow">More from the calendar</p>
          <h2>
            What other clients <span className="hl">tell us.</span>
          </h2>
          <p className="sub">
            Straight from the contractors we book for, in their words.
          </p>
          <TestimonialWall
            items={[...FEATURED_TESTIMONIALS.slice(1), ...QUOTE_TESTIMONIALS]}
          />
        </div>
      </section>

      <CtaBand quote={CFC_STORY.ctaQuote} cite="Phil A." ownerFirst={CFC_STORY.ownerFirst} />

      <DscrollFooter />
    </div>
  );
}
