import { describe, expect, it } from "vitest";

import robots from "@/app/robots";
import sitemap from "@/app/sitemap";
import { caseStudies } from "@/content/caseStudies";
import { siteUrl } from "@/lib/site";

describe("sitemap", () => {
  it("lists the home page and every case study", () => {
    expect(sitemap().map(({ url }) => url)).toEqual([
      siteUrl,
      ...caseStudies.map(({ slug }) => `${siteUrl}/work/${slug}`),
    ]);
  });
});

describe("robots", () => {
  it("allows everything and points at the sitemap", () => {
    expect(robots()).toEqual({
      rules: { userAgent: "*", allow: "/" },
      sitemap: `${siteUrl}/sitemap.xml`,
    });
  });
});
