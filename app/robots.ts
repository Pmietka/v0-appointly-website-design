import { MetadataRoute } from "next";

// /showcase is a private creative gallery shared by link only. It is also
// noindex'd in its own metadata and kept out of the sitemap.
const disallow = ["/thank-you", "/showcase"];

// AI search and answer engine crawlers, named explicitly so there is no doubt
// they are welcome. A crawler that matches a named group ignores the "*"
// group, so each one repeats the same disallow list.
const aiAndSearchBots = [
  "OAI-SearchBot",
  "GPTBot",
  "ChatGPT-User",
  "PerplexityBot",
  "Perplexity-User",
  "ClaudeBot",
  "Claude-SearchBot",
  "Claude-User",
  "Google-Extended",
  "Bingbot",
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", allow: "/", disallow },
      ...aiAndSearchBots.map((userAgent) => ({ userAgent, allow: "/", disallow })),
    ],
    sitemap: "https://getappointly.co/sitemap.xml",
    host: "https://getappointly.co",
  };
}
