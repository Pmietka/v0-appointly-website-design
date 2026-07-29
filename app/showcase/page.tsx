import type { Metadata, Viewport } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { BrandMark } from "@/components/brand-mark";
import { AdVideo } from "./ad-video";
import { Watermark } from "./watermark";
import "./showcase.css";

export const viewport: Viewport = {
  themeColor: "#0a0a0b",
};

/*
 * Private creative showcase — shared by link with prospects, never crawled.
 * `noindex, nofollow, noarchive` here, plus a Disallow in app/robots.ts, and
 * deliberately absent from app/sitemap.ts.
 */
export const metadata: Metadata = {
  title: "Ad Showcase | Appointly Solutions",
  description:
    "A sample of the ad creative Appointly Solutions writes, produces, and runs for home service contractors.",
  robots: {
    index: false,
    follow: false,
    nocache: true,
    googleBot: {
      index: false,
      follow: false,
      noimageindex: true,
      "max-snippet": -1,
      "max-image-preview": "none",
    },
  },
};

type AdCreative = {
  id: string;
  title: string;
  note: string;
  tags: string[];
  media:
    | { kind: "image"; src: string; width: number; height: number; alt: string }
    | { kind: "video"; src: string; width: number; height: number };
};

const CREATIVES: AdCreative[] = [
  {
    id: "same-garage",
    title: "Same garage, one day apart",
    note:
      "The proof shot does the selling. A cracked, stained slab against the finished flake floor — no claims to argue with, so the scroll stops on its own.",
    tags: ["Static", "Before / After", "Garage Coatings"],
    media: {
      kind: "image",
      src: "/showcase/before-after-same-garage.webp",
      width: 2000,
      height: 2000,
      alt:
        "Split before-and-after ad: a stained, cracked concrete garage floor beside the same garage finished with a grey flake coating, captioned SAME GARAGE.",
    },
  },
  {
    id: "scarlett-ugc",
    title: "Creator-led walkthrough",
    note:
      "Vertical UGC shot for Reels and Stories. A real person carries the pitch, which keeps CPMs down and holds attention past the three-second mark.",
    tags: ["Video", "UGC", "9:16"],
    media: {
      kind: "video",
      src: "/showcase/afab-scarlett.mp4",
      width: 1080,
      height: 1920,
    },
  },
  {
    id: "color-picker",
    title: "Pick your flake",
    note:
      "An interaction people want to finish. Naming the popular chip turns a passive scroll into a small decision — and a decision is most of the way to a form fill.",
    tags: ["Static", "Interactive Hook", "Localized"],
    media: {
      kind: "image",
      src: "/showcase/flake-color-picker.webp",
      width: 1024,
      height: 1024,
      alt:
        "Ad showing a finished flake garage floor above six coating colour swatches, with the fourth highlighted and the caption Most Portland homeowners pick number four.",
    },
  },
  {
    id: "one-coating",
    title: "One coating, four uses",
    note:
      "Full-bleed 9:16 built for Stories. Four end states in one frame widens the audience past the homeowner who already wanted a coated floor, with scarcity on the counter.",
    tags: ["Static", "9:16", "Multi-Angle"],
    media: {
      kind: "image",
      src: "/showcase/one-coating-four-uses.webp",
      width: 1126,
      height: 2000,
      alt:
        "Vertical ad with four coated-garage scenes labelled daily driving, workshop, home gym and clean storage, above a Get Your Free Garage Floor Quote button.",
    },
  },
  {
    id: "iced-tea-ugc",
    title: "Hook-first vertical spot",
    note:
      "Paced for sound-off feeds: the promise lands before the logo does, captions carry the story, and the offer arrives while the viewer is still watching.",
    tags: ["Video", "Direct Response", "9:16"],
    media: {
      kind: "video",
      src: "/showcase/def-iced-tea.mp4",
      width: 1080,
      height: 1920,
    },
  },
  {
    id: "could-look-like-this",
    title: "Clean offer, clean frame",
    note:
      "The control we test everything else against. One aspiration, one CTA, trust badges along the bottom — it stays cheap and it rarely fatigues.",
    tags: ["Static", "Offer", "Lead Form"],
    media: {
      kind: "image",
      src: "/showcase/garage-could-look-like-this.webp",
      width: 1024,
      height: 1024,
      alt:
        "Ad reading Your garage could look like this with a free in-home estimate offer beside a photo of an organised garage with a grey flake floor.",
    },
  },
  {
    id: "cost-guide",
    title: "Cost guide angle",
    note:
      "Native-looking creative for the price shopper. Leading with a real range pulls the people already searching for a number and pre-frames the quote.",
    tags: ["Static", "Editorial", "Top of Funnel"],
    media: {
      kind: "image",
      src: "/showcase/cost-guide.webp",
      width: 1024,
      height: 1024,
      alt:
        "Editorial-style ad titled Garage Floor Coating Cost Guide showing a normal price range of $1,607 to $3,419 and a Find your price button.",
    },
  },
];

const STATS = [
  { value: "7", label: "Creatives below" },
  { value: "2", label: "Client brands" },
  { value: "9:16 · 1:1", label: "Formats shipped" },
];

export default function ShowcasePage() {
  return (
    <main className="sc-root">
      <div className="sc-shell">
        <header className="sc-topbar">
          <Link href="/" className="sc-brand">
            <BrandMark className="sc-brand-mark" />
            Appointly Solutions
          </Link>
          <Link href="/book" className="sc-topbar-cta">
            Book a call
          </Link>
        </header>

        <section className="sc-hero">
          <span className="sc-eyebrow">
            <span className="sc-eyebrow-dot" />
            Creative Showcase
          </span>
          <h1 className="sc-title">
            The ads we actually <em>run.</em>
          </h1>
          <p className="sc-lede">
            Every creative below was written, produced, and shipped in-house for
            a home service client. No stock mockups and no concept work — this
            is what goes live in the feed and what the leads come from.
          </p>
          <ul className="sc-stats">
            {STATS.map((stat) => (
              <li key={stat.label}>
                <span className="sc-stat-value">{stat.value}</span>
                <span className="sc-stat-label">{stat.label}</span>
              </li>
            ))}
          </ul>
        </section>

        <section className="sc-gallery" aria-label="Ad creative">
          {CREATIVES.map((creative) => (
            <article key={creative.id} className="sc-card">
              {creative.media.kind === "video" ? (
                <AdVideo
                  src={creative.media.src}
                  width={creative.media.width}
                  height={creative.media.height}
                />
              ) : (
                <div className="sc-media">
                  <Image
                    src={creative.media.src}
                    alt={creative.media.alt}
                    width={creative.media.width}
                    height={creative.media.height}
                    sizes="(min-width: 1180px) 30vw, (min-width: 720px) 45vw, 92vw"
                  />
                  <Watermark />
                </div>
              )}

              <div className="sc-card-body">
                <div className="sc-tags">
                  {creative.tags.map((tag) => (
                    <span
                      key={tag}
                      className={
                        tag === "Video" ? "sc-tag sc-tag--video" : "sc-tag"
                      }
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <h2 className="sc-card-title">{creative.title}</h2>
                <p className="sc-card-note">{creative.note}</p>
              </div>
            </article>
          ))}

          {/* Editorial closer. Also soaks up the short column the mixed
              aspect ratios leave behind at the end of the grid. */}
          <aside className="sc-card sc-note">
            <h2 className="sc-note-title">How these get made</h2>
            <p className="sc-note-body">
              Every angle starts as a cheap test. We ship a batch, let spend
              decide which hook survives, then rebuild the winner in new formats
              until it stops working — and start again.
            </p>
            <p className="sc-note-body">
              Nothing here is a mockup. Each one ran on a live account against
              real budget.
            </p>
          </aside>
        </section>

        <section className="sc-cta">
          <h2>Want creative like this running on your account?</h2>
          <p>
            We handle the concepting, the production, and the media buying — then
            book the estimates straight onto your calendar. You show up and
            close.
          </p>
          <Link href="/book" className="sc-cta-btn">
            Book a call
            <ArrowRight aria-hidden="true" size={17} />
          </Link>
        </section>

        <footer className="sc-footer">
          <span>
            © {new Date().getFullYear()} Appointly Solutions. All creative shown
            is our own work.
          </span>
          <Link href="/">getappointly.co</Link>
        </footer>
      </div>
    </main>
  );
}
