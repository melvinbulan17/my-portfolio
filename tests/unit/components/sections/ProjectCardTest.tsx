import { act, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";

import { ProjectCard } from "@/components/sections/ProjectCard";

type Callback = (entries: { isIntersecting: boolean }[]) => void;

function mockObserver() {
  const observers: { callback: Callback; disconnect: () => void }[] = [];
  vi.stubGlobal(
    "IntersectionObserver",
    class {
      callback: Callback;
      disconnect = vi.fn();
      observe = vi.fn();
      constructor(callback: Callback) {
        this.callback = callback;
        observers.push(this);
      }
    },
  );
  return observers;
}

const stage = (container: HTMLElement) =>
  container.querySelector("[data-stage]")?.getAttribute("data-stage");

afterEach(() => {
  vi.unstubAllGlobals();
});

const project = {
  kicker: "Project lead · QA",
  title: "Signing Portal",
  tags: ["Next.js", "Playwright"],
  summary: "A portal for signing documents.",
  actions: [
    { label: "Live site", href: "https://example.com" },
    { label: "View code", href: "https://github.com/example" },
  ],
};

describe("ProjectCard", () => {
  it("renders the title, tags, summary and every action", () => {
    render(<ProjectCard {...project} />);

    expect(
      screen.getByRole("heading", { level: 3, name: "Signing Portal" }),
    ).toBeInTheDocument();
    expect(screen.getAllByRole("listitem")).toHaveLength(2);
    expect(
      screen.getByText("A portal for signing documents."),
    ).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "View code" })).toHaveAttribute(
      "href",
      "https://github.com/example",
    );
  });

  it("shows a placeholder slot until a screenshot exists", () => {
    render(<ProjectCard {...project} />);

    expect(screen.getByText("Lorem ipsum screenshot")).toBeInTheDocument();
  });

  it("shows the screenshot with its alt text when given one", () => {
    render(
      <ProjectCard
        {...project}
        image={{ src: "/images/portal.png", alt: "Signing portal dashboard" }}
      />,
    );

    expect(
      screen.getByRole("img", { name: "Signing portal dashboard" }),
    ).toBeInTheDocument();
    expect(
      screen.queryByText("Lorem ipsum screenshot"),
    ).not.toBeInTheDocument();
  });

  it("stays visible without IntersectionObserver", () => {
    const { container } = render(<ProjectCard {...project} />);

    expect("IntersectionObserver" in window).toBe(false);
    expect(stage(container)).toBe("rest");
    expect(screen.getByText("Signing Portal")).toBeVisible();
  });

  it("rises in once, the text just after the screenshot", () => {
    const observers = mockObserver();
    const { container } = render(<ProjectCard {...project} />);

    expect(stage(container)).toBe("armed");

    act(() => observers[0].callback([{ isIntersecting: true }]));

    expect(stage(container)).toBe("in");
    expect(observers[0].disconnect).toHaveBeenCalled();
    const text = container.querySelector<HTMLElement>('[data-slot="text"]');
    expect(text?.style.getPropertyValue("--rise-delay")).toBe("80ms");
    const shot = container.querySelector<HTMLElement>('[data-slot="shot"]');
    expect(shot?.style.getPropertyValue("--rise-delay")).toBe("");
  });
});
