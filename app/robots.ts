import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        // /showcase is a private creative gallery shared by link only. It is
        // also noindex'd in its own metadata and kept out of the sitemap.
        disallow: ["/thank-you", "/showcase"],
      },
    ],
    sitemap: "https://getappointly.co/sitemap.xml",
    host: "https://getappointly.co",
  };
}
