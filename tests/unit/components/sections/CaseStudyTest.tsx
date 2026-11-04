import { existsSync } from "node:fs";
import { join } from "node:path";

import { render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { CaseStudy } from "@/components/sections/CaseStudy";
import { caseStudies } from "@/content/caseStudies";

const [dummio] = caseStudies;

describe("CaseStudy", () => {
  it("has one title and a heading for every section", () => {
    render(<CaseStudy {...dummio} />);

    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(
      "Dummio",
    );
    expect(
      screen.getAllByRole("heading", { level: 2 }).map((h) => h.textContent),
    ).toEqual(dummio.sections.map((section) => section.title));
  });

  it("links each contents entry to its section", () => {
    const { container } = render(<CaseStudy {...dummio} />);
    const contents = screen.getByRole("navigation", { name: "On this page" });

    for (const { id, title } of dummio.sections) {
      expect(
        within(contents).getByRole("link", { name: title }),
      ).toHaveAttribute("href", `#${id}`);
      expect(container.querySelector(`[id="${id}"]`)).toBeInTheDocument();
    }
  });

  it("links back to the work section on the home page", () => {
    render(<CaseStudy {...dummio} />);

    expect(screen.getByRole("link", { name: "All work" })).toHaveAttribute(
      "href",
      "/#work",
    );
  });

  it("links the store listing only when there is one", () => {
    const { unmount } = render(<CaseStudy {...dummio} />);

    const links = screen.getAllByRole("link", { name: /Chrome Web Store/ });
    expect(links).toHaveLength(2);
    for (const link of links) {
      expect(link).toHaveAttribute("href", dummio.storeHref);
    }
    unmount();

    render(<CaseStudy {...dummio} storeHref={undefined} />);
    expect(
      screen.queryByRole("link", { name: /Chrome Web Store/ }),
    ).not.toBeInTheDocument();
  });

  it("marks inline test values as code", () => {
    render(<CaseStudy {...dummio} />);

    expect(screen.getByText("test@test.com").tagName).toBe("CODE");
  });

  it.each(caseStudies.map((study) => [study.slug, study] as const))(
    "%s has the eight headers and images that exist, all with alt text",
    (_slug, study) => {
      render(<CaseStudy {...study} />);

      expect(study.sections).toHaveLength(8);
      for (const image of screen.getAllByRole("img")) {
        expect(image).toHaveAccessibleName();
      }
      const shots = study.sections
        .flatMap((section) => section.blocks)
        .flatMap((block) => (block.kind === "shots" ? block.shots : []));
      for (const { src } of [study.heroImage, ...shots]) {
        expect(existsSync(join(process.cwd(), "public", src))).toBe(true);
      }
    },
  );
});
