import { existsSync } from "node:fs";
import { join } from "node:path";

import { describe, expect, it } from "vitest";

import {
  disciplines,
  hero,
  resumeHref,
  sideProjects,
  siteTagline,
  socialLinks,
  terminalLines,
} from "@/content/site";

describe("site content", () => {
  it("gives every side project a live site and its code", () => {
    for (const project of sideProjects) {
      expect(project.links.map((link) => link.label)).toEqual(["Live", "Code"]);
    }
  });

  it("has three to six side projects that each link out", () => {
    expect(sideProjects.length).toBeGreaterThanOrEqual(3);
    expect(sideProjects.length).toBeLessThanOrEqual(6);
    for (const project of sideProjects) {
      expect(project.links.length).toBeGreaterThanOrEqual(1);
      expect(project.links.length).toBeLessThanOrEqual(2);
      for (const link of project.links) {
        expect(link.href).toMatch(/^https:\/\//);
      }
    }
  });

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
