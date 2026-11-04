import { existsSync } from "node:fs";
import { join } from "node:path";

import { describe, expect, it } from "vitest";

import {
  disciplines,
  hero,
  projects,
  resumeHref,
  sideProjects,
  siteTagline,
  socialLinks,
  terminalLines,
} from "@/content/site";

describe("site content", () => {
  it("shows Dummio as the only selected work, linking to its site and code", () => {
    const visible = projects.filter((project) => !project.hidden);

    expect(visible.map((project) => project.title)).toEqual(["Dummio"]);
    expect(visible[0].actions.map((action) => action.href)).toEqual([
      "https://dummio.vercel.app/",
      "https://github.com/melvinbulan17/dummio",
    ]);
    expect(
      existsSync(join(process.cwd(), "public", visible[0].image!.src)),
    ).toBe(true);
  });

  it("shows this portfolio as the only side project", () => {
    expect(
      sideProjects
        .filter((project) => !project.hidden)
        .map((project) => project.title),
    ).toEqual(["My Digital Portfolio"]);
  });

  it("gives every side project one or two links that leave the site", () => {
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
    expect(siteTagline).toBe("Make it work. Make it right.");
  });

  it("points the resume link at a file in public", () => {
    expect(existsSync(join(process.cwd(), "public", resumeHref))).toBe(true);
  });

  it("introduces the current role in the hero and terminal", () => {
    expect(hero.intro).toBe(
      "Currently a software engineer and project manager on a public key infrastructure (PKI) web application at a Swiss company.",
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
