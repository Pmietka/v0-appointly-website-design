import { MetadataRoute } from "next";

import { getBlogPosts } from "@/lib/blog";
import { servicePages } from "@/lib/seo-resources";

const base = "https://getappointly.co";

// Date of the last meaningful content change to each static page. Update the
// entry when the page copy changes so lastmod stays honest; a build timestamp
// would mark every URL as modified on every deploy.
const staticRoutes: {
  path: string;
  lastModified: string;
  changeFrequency: "weekly" | "monthly" | "yearly";
  priority: number;
}[] = [
  { path: "/", lastModified: "2026-09-17", changeFrequency: "weekly", priority: 1 },
  { path: "/blog", lastModified: "2026-09-17", changeFrequency: "weekly", priority: 0.8 },
  { path: servicePages.benchmarks, lastModified: "2026-09-11", changeFrequency: "monthly", priority: 0.85 },
  { path: "/about", lastModified: "2026-09-17", changeFrequency: "monthly", priority: 0.8 },
  { path: "/how-it-works", lastModified: "2026-09-02", changeFrequency: "monthly", priority: 0.8 },
  { path: "/faq", lastModified: "2026-09-17", changeFrequency: "monthly", priority: 0.7 },
  { path: servicePages.floorCoatingLeads, lastModified: "2026-09-02", changeFrequency: "monthly", priority: 0.9 },
  { path: servicePages.epoxyFlooringLeads, lastModified: "2026-09-02", changeFrequency: "monthly", priority: 0.85 },
  { path: servicePages.exclusive, lastModified: "2026-09-02", changeFrequency: "monthly", priority: 0.8 },
  { path: servicePages.pricing, lastModified: "2026-09-17", changeFrequency: "monthly", priority: 0.8 },
  { path: servicePages.agencyAlternative, lastModified: "2026-09-02", changeFrequency: "monthly", priority: 0.8 },
  { path: servicePages.appointmentSetting, lastModified: "2026-09-02", changeFrequency: "monthly", priority: 0.8 },
  { path: servicePages.smallMarkets, lastModified: "2026-09-02", changeFrequency: "monthly", priority: 0.8 },
  { path: "/privacy", lastModified: "2026-03-01", changeFrequency: "yearly", priority: 0.3 },
  { path: "/terms", lastModified: "2026-03-01", changeFrequency: "yearly", priority: 0.3 },
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const blogPosts = await getBlogPosts();

  const entries: MetadataRoute.Sitemap = staticRoutes.map((route) => ({
    url: route.path === "/" ? base : `${base}${route.path}`,
    lastModified: new Date(`${route.lastModified}T12:00:00Z`),
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));

  blogPosts.forEach((post) => {
    entries.push({
      url: `${base}/blog/${post.slug}`,
      lastModified: post.updatedAt,
      changeFrequency: "monthly",
      priority: 0.7,
    });
  });

  return entries;
}
