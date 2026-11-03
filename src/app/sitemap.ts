import type { MetadataRoute } from "next";

import { caseStudies } from "@/content/caseStudies";
import { siteUrl } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: siteUrl, priority: 1 },
    ...caseStudies.map(({ slug }) => ({
      url: `${siteUrl}/work/${slug}`,
      priority: 0.8,
    })),
  ];
}
