import { act, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";

import { CaseStudyContents } from "@/components/sections/CaseStudyContents";

const sections = [
  { id: "problem", title: "Problem Statement" },
  { id: "goals", title: "Goals" },
];

afterEach(() => {
  vi.unstubAllGlobals();
});

describe("CaseStudyContents", () => {
  it("marks nothing as current without IntersectionObserver", () => {
    render(<CaseStudyContents sections={sections} />);

    expect(screen.getByRole("link", { name: "Goals" })).not.toHaveAttribute(
      "aria-current",
    );
  });

  it("marks the section being read as current", () => {
    type Callback = (
      entries: { isIntersecting: boolean; target: Element }[],
    ) => void;
    let notify: Callback = () => {};
    vi.stubGlobal(
      "IntersectionObserver",
      class {
        observe = vi.fn();
        disconnect = vi.fn();
        constructor(callback: Callback) {
          notify = callback;
        }
      },
    );
    render(<CaseStudyContents sections={sections} />);
    const target = document.createElement("section");
    target.setAttribute("aria-labelledby", "goals");

    act(() => notify([{ isIntersecting: true, target }]));

    expect(screen.getByRole("link", { name: "Goals" })).toHaveAttribute(
      "aria-current",
      "true",
    );
    expect(
      screen.getByRole("link", { name: "Problem Statement" }),
    ).not.toHaveAttribute("aria-current");
  });
});
