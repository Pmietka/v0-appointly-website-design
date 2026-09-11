import fs from "fs/promises";
import path from "path";

const blogDirectory = path.join(process.cwd(), "content", "blog");

// Posts without an explicit `date:` in their frontmatter fall back to a weekly
// schedule counted back from this date.
const latestPublishDate = new Date("2026-03-31T12:00:00Z");

export type BlogPost = {
  slug: string;
  title: string;
  /** <title> tag. Kept to roughly 60 characters. Falls back to `title`. */
  seoTitle: string;
  description: string;
  body: string;
  order: number;
  fileName: string;
  publishedAt: Date;
  updatedAt: Date;
  /** True when the post declares its own publish date in frontmatter. */
  hasExplicitDate: boolean;
  readingTime: number;
  authorId: string;
  cluster: string;
  image: string;
  /** Parsed from the `## Key takeaways` bullet list. Empty when the post has none. */
  takeaways: string[];
  /** Parsed from `## Frequently asked questions` (`### Question?` + paragraph). */
  faq: { question: string; answer: string }[];
  /** H2 headings in body order, for the table of contents. */
  headings: { id: string; text: string }[];
};

export const clusterLabels: Record<string, string> = {
  economics: "Economics",
  "marketing-channels": "Marketing",
  sales: "Sales",
  operations: "Operations",
  general: "Guides",
};

export function getClusterLabel(cluster: string) {
  return clusterLabels[cluster] ?? clusterLabels.general;
}

/** Stable anchor id for a heading. Shared with the markdown renderer. */
export function slugifyHeading(text: string) {
  return stripInlineMarkdown(text)
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/[\s-]+/g, "-")
    .slice(0, 80);
}

function stripInlineMarkdown(text: string) {
  return text
    .replace(/\[([^\]]+)\]\([^)]*\)/g, "$1")
    .replace(/[*_`]/g, "")
    .trim();
}

const takeawaysHeading = /^##\s+key takeaways\s*$/i;
const faqHeading = /^##\s+(frequently asked questions|faq)\s*$/i;

function extractTakeaways(body: string) {
  const lines = body.split("\n");
  const start = lines.findIndex((line) => takeawaysHeading.test(line.trim()));
  if (start === -1) return [];

  const items: string[] = [];
  for (let index = start + 1; index < lines.length; index += 1) {
    const line = lines[index].trim();
    if (/^#{2,}\s/.test(line)) break;
    const match = line.match(/^[-*]\s+(.+)$/) ?? line.match(/^\d+\.\s+(.+)$/);
    if (match) items.push(stripInlineMarkdown(match[1]));
  }
  return items;
}

function extractFaq(body: string) {
  const lines = body.split("\n");
  const start = lines.findIndex((line) => faqHeading.test(line.trim()));
  if (start === -1) return [];

  const items: { question: string; answer: string }[] = [];
  let question: string | null = null;
  let answer: string[] = [];

  const flush = () => {
    if (question && answer.length) {
      items.push({ question, answer: stripInlineMarkdown(answer.join(" ")) });
    }
    question = null;
    answer = [];
  };

  for (let index = start + 1; index < lines.length; index += 1) {
    const line = lines[index].trim();
    if (/^##\s/.test(line)) break;

    const h3 = line.match(/^###\s+(.+)$/);
    const legacy = line.match(/^\*\*Q:\s*(.+?)\*\*$/);
    if (h3 || legacy) {
      flush();
      question = stripInlineMarkdown((h3 ?? legacy)![1]);
      continue;
    }

    if (!question || !line) continue;
    answer.push(line.replace(/^A:\s*/, ""));
  }
  flush();

  return items;
}

function extractHeadings(body: string) {
  const headings: { id: string; text: string }[] = [];
  const seen = new Map<string, number>();

  body.split("\n").forEach((line) => {
    const match = line.trim().match(/^##\s+(.+)$/);
    if (!match) return;
    const text = stripInlineMarkdown(match[1]);
    const base = slugifyHeading(text) || "section";
    const count = seen.get(base) ?? 0;
    seen.set(base, count + 1);
    headings.push({ id: count ? `${base}-${count + 1}` : base, text });
  });

  return headings;
}

function slugFromFileName(fileName: string) {
  return fileName.replace(/^\d+-/, "").replace(/\.md$/i, "");
}

function titleCase(value: string) {
  return value
    .split("-")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

function parseFrontmatter(raw: string) {
  const lines = raw.replace(/\r\n/g, "\n").split("\n");

  if (lines[0]?.trim() !== "---") {
    return {
      data: {} as Record<string, string>,
      contentStartIndex: 0,
    };
  }

  const data: Record<string, string> = {};
  let index = 1;

  while (index < lines.length && lines[index].trim() !== "---") {
    const line = lines[index];
    const match = line.match(/^([A-Za-z0-9_-]+):\s*(.*)$/);

    if (match) {
      data[match[1]] = match[2].trim().replace(/^["']|["']$/g, "");
    }

    index += 1;
  }

  return {
    data,
    contentStartIndex: index < lines.length ? index + 1 : lines.length,
  };
}

function extractDescription(content: string) {
  const metaMatch = content.match(/\*\*Meta Description:\*\*\s*(.+)/);
  if (metaMatch) {
    return metaMatch[1].trim();
  }

  const stripped = stripIntro(content);
  const paragraph = stripped
    .split(/\n\s*\n/)
    .map((section) => section.replace(/\s+/g, " ").trim())
    .find((section) => section && !section.startsWith("##") && !section.startsWith("###"));

  return paragraph ? paragraph.slice(0, 180) : "";
}

function stripIntro(content: string) {
  const lines = content.replace(/\r\n/g, "\n").split("\n");
  let index = 0;

  while (index < lines.length && lines[index].trim() === "") {
    index += 1;
  }

  if (/^#\s+/.test(lines[index] ?? "")) {
    index += 1;
  }

  while (index < lines.length && lines[index].trim() === "") {
    index += 1;
  }

  if (/^\*\*Meta Description:\*\*/.test(lines[index] ?? "")) {
    index += 1;

    while (index < lines.length && lines[index].trim() === "") {
      index += 1;
    }

    if ((lines[index] ?? "").trim() === "---") {
      index += 1;
    }

    while (index < lines.length && lines[index].trim() === "") {
      index += 1;
    }
  }

  return lines.slice(index).join("\n").trim();
}

function estimateReadingTime(text: string) {
  const words = text
    .replace(/\r\n/g, "\n")
    .replace(/^#+\s.+$/gm, "")
    .replace(/^\s*[-*]\s+/gm, "")
    .split(/\s+/)
    .filter(Boolean).length;

  return Math.max(1, Math.round(words / 220));
}

function parseDate(value?: string) {
  if (!value) return null;
  const parsed = new Date(value.length === 10 ? `${value}T12:00:00Z` : value);
  return Number.isNaN(parsed.getTime()) ? null : parsed;
}

function getScheduledPublishDate(order: number, latestOrder: number) {
  const publishDate = new Date(latestPublishDate);
  publishDate.setUTCDate(latestPublishDate.getUTCDate() - (latestOrder - order) * 7);
  return publishDate;
}

function parsePost(fileName: string, raw: string): BlogPost {
  const slug = slugFromFileName(fileName);
  const orderMatch = fileName.match(/^(\d+)-/);
  const order = orderMatch ? Number(orderMatch[1]) : 0;
  const { data, contentStartIndex } = parseFrontmatter(raw);
  const lines = raw.replace(/\r\n/g, "\n").split("\n");
  const content = lines.slice(contentStartIndex).join("\n");
  const title =
    data.title?.trim() ||
    content.match(/^#\s+(.+)$/m)?.[1]?.trim() ||
    titleCase(slug);
  const description =
    data.meta_description?.trim() ||
    extractDescription(content) ||
    `Read ${title} on Appointly Solutions.`;
  const body = stripIntro(content);
  const explicitDate = parseDate(data.date);
  const publishedAt = explicitDate ?? latestPublishDate;
  const updatedAt = parseDate(data.updated) ?? publishedAt;

  return {
    slug,
    title,
    seoTitle: data.seo_title?.trim() || title,
    description,
    body,
    order,
    fileName,
    publishedAt,
    updatedAt,
    hasExplicitDate: Boolean(explicitDate),
    readingTime: estimateReadingTime(body),
    authorId: data.author?.trim() || "patrick",
    cluster: data.cluster?.trim() || "general",
    image: data.image?.trim() || "/images/appointly-og.png",
    takeaways: extractTakeaways(body),
    faq: extractFaq(body),
    headings: extractHeadings(body),
  };
}

export async function getBlogPosts(): Promise<BlogPost[]> {
  const fileNames = (await fs.readdir(blogDirectory)).filter((file) => file.endsWith(".md"));
  const posts = await Promise.all(
    fileNames.map(async (fileName) => {
      const raw = await fs.readFile(path.join(blogDirectory, fileName), "utf8");
      return parsePost(fileName, raw);
    }),
  );

  const latestOrder = posts.reduce((max, post) => Math.max(max, post.order), 0);
  const postsWithDates = posts.map((post) => {
    if (post.hasExplicitDate) return post;
    const publishedAt = getScheduledPublishDate(post.order, latestOrder);
    return { ...post, publishedAt, updatedAt: publishedAt };
  });

  return postsWithDates.sort((a, b) => {
    if (b.publishedAt.getTime() !== a.publishedAt.getTime()) {
      return b.publishedAt.getTime() - a.publishedAt.getTime();
    }
    if (b.order !== a.order) {
      return b.order - a.order;
    }

    return a.title.localeCompare(b.title);
  });
}

/**
 * Topical related posts: same cluster first, then everything else, newest
 * first. Never includes the post itself.
 */
export function getRelatedPosts(post: BlogPost, allPosts: BlogPost[], limit = 3) {
  const others = allPosts.filter((item) => item.slug !== post.slug);
  const sameCluster = others.filter((item) => item.cluster === post.cluster);
  const rest = others.filter((item) => item.cluster !== post.cluster);
  return [...sameCluster, ...rest].slice(0, limit);
}

export async function getBlogPost(slug: string) {
  const posts = await getBlogPosts();
  return posts.find((post) => post.slug === slug) ?? null;
}

export async function getBlogPostSlugs() {
  const posts = await getBlogPosts();
  return posts.map((post) => post.slug);
}

export function getBlogPath(slug: string) {
  return `/blog/${slug}`;
}

export function formatBlogDate(date: Date) {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(date);
}
