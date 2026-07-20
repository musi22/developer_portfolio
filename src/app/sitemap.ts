import type { MetadataRoute } from "next";
import { personal } from "@/content/data/personal";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: personal.website,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: `${personal.website}/desktop`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
  ];
}
