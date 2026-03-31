import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/thank-you"],
      },
    ],
    sitemap: "https://getappointly.co/sitemap.xml",
    host: "https://getappointly.co",
  };
}
