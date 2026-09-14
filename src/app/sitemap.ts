import type { MetadataRoute } from "next";
import { personal } from "@/content/data/personal";
import { projects } from "@/content/data/projects";

export default function sitemap(): MetadataRoute.Sitemap {
  const caseStudyEntries: MetadataRoute.Sitemap = projects.map((p) => ({
    url: `${personal.website}/work/${p.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 0.85,
  }));

  return [
    {
      url: personal.website,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1.0,
    },
    ...caseStudyEntries,
  ];
}
