import fs from "fs/promises";
import path from "path";
import { MetadataRoute } from "next";

import { getBlogPosts } from "@/lib/blog";

const base = "https://getappointly.co";

const staticRoutes = [
  {
    url: base,
    filePath: "app/page.tsx",
    changeFrequency: "weekly" as const,
    priority: 1,
  },
  {
    url: `${base}/blog`,
    filePath: "app/blog/page.tsx",
    changeFrequency: "weekly" as const,
    priority: 0.8,
  },
  {
    url: `${base}/about`,
    filePath: "app/about/page.tsx",
    changeFrequency: "monthly" as const,
    priority: 0.8,
  },
  {
    url: `${base}/how-it-works`,
    filePath: "app/how-it-works/page.tsx",
    changeFrequency: "monthly" as const,
    priority: 0.8,
  },
  {
    url: `${base}/faq`,
    filePath: "app/faq/page.tsx",
    changeFrequency: "monthly" as const,
    priority: 0.7,
  },
  {
    url: `${base}/insulation-contractor-leads`,
    filePath: "app/insulation-contractor-leads/page.tsx",
    changeFrequency: "monthly" as const,
    priority: 0.9,
  },
  {
    url: `${base}/exclusive-insulation-leads`,
    filePath: "app/exclusive-insulation-leads/page.tsx",
    changeFrequency: "monthly" as const,
    priority: 0.8,
  },
  {
    url: `${base}/pay-per-lead-insulation`,
    filePath: "app/pay-per-lead-insulation/page.tsx",
    changeFrequency: "monthly" as const,
    priority: 0.8,
  },
  {
    url: `${base}/insulation-marketing-agency`,
    filePath: "app/insulation-marketing-agency/page.tsx",
    changeFrequency: "monthly" as const,
    priority: 0.8,
  },
  {
    url: `${base}/appointment-setting-for-contractors`,
    filePath: "app/appointment-setting-for-contractors/page.tsx",
    changeFrequency: "monthly" as const,
    priority: 0.8,
  },
  {
    url: `${base}/spray-foam-contractor-leads`,
    filePath: "app/spray-foam-contractor-leads/page.tsx",
    changeFrequency: "monthly" as const,
    priority: 0.85,
  },
  {
    url: `${base}/insulation-contractor-leads-small-markets`,
    filePath: "app/insulation-contractor-leads-small-markets/page.tsx",
    changeFrequency: "monthly" as const,
    priority: 0.8,
  },
  {
    url: `${base}/privacy`,
    filePath: "app/privacy/page.tsx",
    changeFrequency: "yearly" as const,
    priority: 0.3,
  },
  {
    url: `${base}/terms`,
    filePath: "app/terms/page.tsx",
    changeFrequency: "yearly" as const,
    priority: 0.3,
  },
];

async function getLastModified(filePath: string) {
  const stats = await fs.stat(path.join(process.cwd(), filePath));
  return stats.mtime;
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const blogPosts = await getBlogPosts();
  const sitemapEntries = await Promise.all(
    staticRoutes.map(async (route) => ({
      url: route.url,
      lastModified: await getLastModified(route.filePath),
      changeFrequency: route.changeFrequency,
      priority: route.priority,
    })),
  );

  blogPosts.forEach((post) => {
    sitemapEntries.push({
      url: `${base}/blog/${post.slug}`,
      lastModified: post.updatedAt,
      changeFrequency: "monthly",
      priority: 0.7,
    });
  });

  return sitemapEntries;
}
