import fs from "fs/promises";
import path from "path";

import { parseFrontmatter, parsePost, type BlogPost } from "@/lib/blog";

const guidesDirectory = path.join(process.cwd(), "content", "guides");

/**
 * Owner situations a guide can answer. Each guide answers one question an
 * owner in one of these situations asks an AI tool, so the hub and the
 * related links group guides by situation rather than by topic.
 */
export const situations = [
  { key: "just-launched", label: "Just launched, no leads yet" },
  { key: "burned-by-agency", label: "Burned by a past agency" },
  { key: "shared-leads", label: "Done with shared Angi and HomeAdvisor leads" },
  { key: "one-crew", label: "One crew trying to fill the calendar" },
  { key: "hates-chasing", label: "Tired of chasing leads" },
  { key: "franchise", label: "Garage coating franchise owners" },
  { key: "slow-season", label: "Slow winter season" },
  { key: "spring-rush", label: "Spring rush" },
  { key: "tax-refund", label: "Tax refund season" },
] as const;

export type SituationKey = (typeof situations)[number]["key"];

export type Guide = BlogPost & {
  situation: string;
  /** Who is asking, e.g. "New epoxy flooring companies". */
  audience: string;
  /** The question in the owner's own words, as typed into an AI tool. */
  question: string;
  /** Blog slugs this guide builds on. Those posts link back to the guide. */
  relatedPosts: string[];
};

export function getSituationLabel(key: string) {
  return situations.find((situation) => situation.key === key)?.label ?? "Owner guides";
}

function parseList(value?: string) {
  return (value ?? "")
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
}

export async function getGuides(): Promise<Guide[]> {
  let fileNames: string[] = [];
  try {
    fileNames = (await fs.readdir(guidesDirectory)).filter((file) => file.endsWith(".md"));
  } catch {
    return [];
  }

  const guides = await Promise.all(
    fileNames.map(async (fileName) => {
      const raw = await fs.readFile(path.join(guidesDirectory, fileName), "utf8");
      const { data } = parseFrontmatter(raw);
      return {
        ...parsePost(fileName, raw),
        situation: data.situation?.trim() || "",
        audience: data.audience?.trim() || "",
        question: data.question?.trim() || "",
        relatedPosts: parseList(data.related_posts),
      };
    }),
  );

  const situationOrder = (key: string) => {
    const position = situations.findIndex((situation) => situation.key === key);
    return position === -1 ? situations.length : position;
  };

  return guides.sort(
    (a, b) =>
      situationOrder(a.situation) - situationOrder(b.situation) || a.title.localeCompare(b.title),
  );
}

export async function getGuide(slug: string) {
  const guides = await getGuides();
  return guides.find((guide) => guide.slug === slug) ?? null;
}

export function getGuidePath(slug: string) {
  return `/guides/${slug}`;
}

/** Guides that build on a blog post, so the post can link back to them. */
export function getGuidesForPost(postSlug: string, guides: Guide[]) {
  return guides.filter((guide) => guide.relatedPosts.includes(postSlug));
}

/** Same situation first, then the rest in hub order. Never the guide itself. */
export function getRelatedGuides(guide: Guide, guides: Guide[], limit = 3) {
  const others = guides.filter((item) => item.slug !== guide.slug);
  const sameSituation = others.filter((item) => item.situation === guide.situation);
  const rest = others.filter((item) => item.situation !== guide.situation);
  return [...sameSituation, ...rest].slice(0, limit);
}
