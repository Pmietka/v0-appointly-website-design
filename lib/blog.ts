import fs from "fs/promises";
import path from "path";

const blogDirectories = [
  path.join(process.cwd(), "content", "blog"),
  path.join(process.cwd(), "Blogs", "Blog Posts"),
];

async function getBlogDirectory() {
  for (const directory of blogDirectories) {
    try {
      await fs.access(directory);
      return directory;
    } catch {
      // Try the next location.
    }
  }

  return blogDirectories[0];
}

export type BlogPost = {
  slug: string;
  title: string;
  description: string;
  body: string;
  order: number;
  fileName: string;
  publishedAt: Date;
  updatedAt: Date;
  readingTime: number;
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

function parsePost(fileName: string, raw: string, stats: { birthtime: Date; mtime: Date }): BlogPost {
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

  return {
    slug,
    title,
    description,
    body,
    order,
    fileName,
    publishedAt: stats.birthtime,
    updatedAt: stats.mtime,
    readingTime: estimateReadingTime(body),
  };
}

export async function getBlogPosts(): Promise<BlogPost[]> {
  const blogDirectory = await getBlogDirectory();
  const fileNames = (await fs.readdir(blogDirectory)).filter((file) => file.endsWith(".md"));
  const posts = await Promise.all(
    fileNames.map(async (fileName) => {
      const filePath = path.join(blogDirectory, fileName);
      const [raw, stats] = await Promise.all([
        fs.readFile(filePath, "utf8"),
        fs.stat(filePath),
      ]);

      return parsePost(fileName, raw, {
        birthtime: stats.birthtime,
        mtime: stats.mtime,
      });
    }),
  );

  return posts.sort((a, b) => {
    if (b.order !== a.order) {
      return b.order - a.order;
    }

    return a.title.localeCompare(b.title);
  });
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
