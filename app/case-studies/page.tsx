import type { Metadata, Viewport } from "next";
import { ChevronDown, PhoneCall } from "lucide-react";

import { SiteNav } from "@/components/site-nav";
import { DscrollFooter } from "@/components/dscroll-footer";
import { LogoMarquee } from "@/components/sales/logo-marquee";
import { HiddenWall, ProofHeader } from "@/components/sales/proof-section";
import { CASE_STUDIES } from "@/lib/case-studies";
import { CFC_STORY } from "@/lib/cfc-case-study";
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
import "../sales.css";

const TITLE = "Floor Coating Case Studies | Clean Floor Coatings, AFAB Services and Garage Force on Video | Appointly Solutions";
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

// The line that walks the reader from the cards (or the previous story) into
// each owner's story, in the same voice as the bridge into Phil's on /connect.
const BRIDGES: Record<string, string> = {
  "clean-floor-coatings": "Hear from Phil himself",
  "afab-services": "Now hear from Mark himself",
  "garage-force-inland-northwest": "Now hear from Eric and Shani themselves",
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

      {/* Same flow as the proof on /connect: client logos, the three result
          cards, then each owner's story in the compact /connect format (clip,
          headline and quote per chapter). The full transcripts live on each
          company's own page. */}
      <section className="lmqband" id="clients" aria-label="Clients">
        <div className="wrap">
          <LogoMarquee />
        </div>
      </section>

      <section className="sec pwsec" id="top">
        <div className="wrap pwwide">
          <ProofHeader
            heading="h1"
            eyebrow="Appointly Solutions case studies"
            title={<>Don&apos;t take our word for it. <span className="hl">Take theirs.</span></>}
            sub="Three floor coating contractors on camera, in their own words, with their real estimate calendars. Watch the short clip on each card, or the full story below."
            linkMode="anchor"
          />
          <Bridge slug={stories[0].story.slug} />
        </div>
      </section>

      {stories.map(({ story, cs }, i) => (
        <div className="cstory cfcstory" key={story.slug}>
          {i > 0 && (
            <div className="wrap pwwide">
              <Bridge slug={story.slug} />
            </div>
          )}
          <StoryHero
            story={story}
            cs={cs}
            eyebrow={`Case study ${String(i + 1).padStart(2, "0")} · ${cs.company}`}
            sectionId={`${story.slug}-story`}
            pageLink
            priority={i === 0}
            compact
          />
          <StoryStats story={story} cs={cs} compact />
          <StoryChapters story={story} cs={cs} level="h3" compact />
        </div>
      ))}

      {/* Case studies without a video story, if any */}
      {supporting.length > 0 && (
        <section className="sec" id="more-case-studies">
          <div className="wrap wide">
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
          </div>
        </section>
      )}

      {/* The rest of the wall, only when asked for, as on /connect */}
      <section className="sec pwsec tint" id="more-proof">
        <div className="wrap pwwide">
          <div className="pwhead">
            <p className="eyebrow">Want more?</p>
            <h2>There&apos;s a <span className="hl">whole wall</span> of it.</h2>
            <p className="sub">
              Every interview clip, client message, number and calendar we have, in one place.
            </p>
          </div>
          <div className="pwreveal">
            <HiddenWall />
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

      <CtaBand quote={CFC_STORY.ctaQuote} cite="Phil A." ownerFirst={CFC_STORY.ownerFirst} />

      <DscrollFooter />
    </div>
  );
}

function Bridge({ slug }: { slug: string }) {
  return (
    <div className="pwbridge">
      <h3>{BRIDGES[slug]}</h3>
      <a className="pwbridge-arrow" href={`#${slug}-story`} aria-label={`Jump to ${BRIDGES[slug].replace(/^Now /, "").toLowerCase()}`}>
        <ChevronDown aria-hidden />
      </a>
    </div>
  );
}
