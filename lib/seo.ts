import type { Metadata } from "next";

export const SITE_URL = "https://getappointly.co";
export const SITE_NAME = "Appointly Solutions";

/** Google Business Profile, by its Knowledge Graph id. */
export const GOOGLE_BUSINESS_PROFILE = "https://www.google.com/search?kgmid=/g/11yyhrz9hv";

/**
 * Official profiles for Organization.sameAs. TODO: add the BBB profile URL
 * once the listing exists; none was found when this was written.
 */
export const ORGANIZATION_SAME_AS = [
  "https://www.linkedin.com/company/112093148/",
  "https://www.linkedin.com/company/appointlysolutions",
  "https://www.facebook.com/profile.php?id=61587335026673",
  "https://www.instagram.com/appointlychicago",
  "https://www.youtube.com/@GetAppointly",
  GOOGLE_BUSINESS_PROFILE,
];

export type OgImage = { url: string; width: number; height: number; alt: string };

/** Branded 1200x630 card used wherever a page has no image of its own. */
export const DEFAULT_OG_IMAGE: OgImage = {
  url: `${SITE_URL}/images/appointly-og.png`,
  width: 1200,
  height: 630,
  alt: "Appointly Solutions: booked estimates for floor coating contractors",
};

/**
 * Title, description, canonical, Open Graph and Twitter tags for one page.
 *
 * Next merges metadata shallowly, so a page that sets `openGraph` without
 * `images`, or skips `twitter`, silently drops the og:image and inherits the
 * homepage's twitter:title. Building all of them here keeps every page's
 * social and AI preview tags complete and unique.
 */
export function pageMetadata({
  title,
  description,
  path,
  ogTitle = title,
  ogDescription = description,
  image = DEFAULT_OG_IMAGE,
  keywords,
  robots,
  type = "website",
}: {
  title: string;
  description: string;
  /** Path starting with "/", e.g. "/faq". */
  path: string;
  ogTitle?: string;
  ogDescription?: string;
  image?: OgImage;
  keywords?: string[];
  robots?: Metadata["robots"];
  type?: "website" | "article";
}): Metadata {
  const url = path === "/" ? `${SITE_URL}/` : `${SITE_URL}${path}`;
  return {
    title,
    description,
    ...(keywords ? { keywords } : {}),
    ...(robots ? { robots } : {}),
    alternates: { canonical: url },
    openGraph: {
      title: ogTitle,
      description: ogDescription,
      url,
      siteName: SITE_NAME,
      type,
      images: [image],
    },
    twitter: {
      card: "summary_large_image",
      title: ogTitle,
      description: ogDescription,
      images: [image.url],
    },
  };
}
