import { existsSync } from "node:fs";
import { join } from "node:path";

import { describe, expect, it } from "vitest";

import {
  disciplines,
  hero,
  resumeHref,
  siteTagline,
  socialLinks,
  terminalLines,
} from "@/content/site";

describe("site content", () => {
  it("gives every social link a real destination", () => {
    for (const link of socialLinks) {
      expect(link.href).not.toBe("#");
      expect(link.href).toMatch(/^(https:\/\/|mailto:)/);
    }
  });

  it("uses the short footer line", () => {
    expect(siteTagline).toBe("Plan. Execute. Excel.");
  });

  it("points the resume link at a file in public", () => {
    expect(existsSync(join(process.cwd(), "public", resumeHref))).toBe(true);
  });

  it("introduces the current role in the hero and terminal", () => {
    expect(hero.intro).toBe(
      "Currently a software engineer and project manager on a public key infrastructure (PKI) web application at a Swiss startup.",
    );
    expect(terminalLines[1]).toEqual({
      kind: "out",
      text: "software-engineer, project-manager",
    });
  });

  it("lists the marquee disciplines in order", () => {
    expect(disciplines).toEqual([
      "Project Management",
      "Software Testing",
      "Test Management",
      "Public Key Infrastructure",
      "Agile / Scrum",
      "Waterfall",
      "SDLC & STLC",
    ]);
  });
});
