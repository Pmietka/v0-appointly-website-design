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
};

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
