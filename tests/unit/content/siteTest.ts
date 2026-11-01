import { existsSync } from "node:fs";
import { join } from "node:path";

import { describe, expect, it } from "vitest";

import { resumeHref, socialLinks } from "@/content/site";

describe("site content", () => {
  it("gives every social link a real destination", () => {
    for (const link of socialLinks) {
      expect(link.href).not.toBe("#");
      expect(link.href).toMatch(/^(https:\/\/|mailto:)/);
    }
  });

  it("points the resume link at a file in public", () => {
    expect(existsSync(join(process.cwd(), "public", resumeHref))).toBe(true);
  });
});
