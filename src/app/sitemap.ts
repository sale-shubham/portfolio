import type { MetadataRoute } from "next";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://shubsale.in/",
      lastModified: "2026-11-16",
      changeFrequency: "monthly",
      priority: 1,
    },
  ];
}
