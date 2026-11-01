import { act, render, screen, within } from "@testing-library/react";
import { Kanban } from "lucide-react";
import { siConfluence, siGithub, siGitlab, siJira } from "simple-icons";
import { afterEach, describe, expect, it, vi } from "vitest";

import { Skills } from "@/components/sections/Skills";
import { skillGroups } from "@/content/skills";
import type { SkillGroup } from "@/types/skills";

const groups: SkillGroup[] = [
  {
    label: "Project management",
    skills: [{ name: "YouTrack", icon: { set: "lucide", icon: Kanban } }],
  },
  {
    label: "Tooling",
    skills: [{ name: "GitLab", icon: { set: "simple-icons", icon: siGitlab } }],
  },
];

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

describe("Skills", () => {
  it("is the #tools section with a heading and one list per group", () => {
    const { container } = render(<Skills groups={groups} />);

    expect(container.querySelector("section#tools")).toHaveClass(
      "border-t",
      "py-32",
    );
    expect(
      screen.getByRole("region", { name: "Tools & Skills" }),
    ).toBeInTheDocument();
    expect(
      screen.getAllByRole("heading", { level: 3 }).map((h) => h.textContent),
    ).toEqual(["Project management", "Tooling"]);
    expect(screen.getAllByRole("list")).toHaveLength(2);
  });

  it("draws a logo or a glyph beside each name and hides it from readers", () => {
    render(<Skills groups={groups} />);

    const [youtrack, gitlab] = screen.getAllByRole("listitem");
    expect(youtrack).toHaveTextContent("YouTrack");
    expect(youtrack.querySelector("svg.lucide-kanban")).not.toBeNull();
    expect(within(gitlab).getByText("GitLab")).toBeInTheDocument();
    expect(gitlab.querySelector("path")).toHaveAttribute("d", siGitlab.path);
    for (const svg of document.querySelectorAll("li svg")) {
      expect(svg).toHaveAttribute("aria-hidden", "true");
    }
  });

  it("stays visible without IntersectionObserver", () => {
    const { container } = render(<Skills groups={groups} />);

    expect("IntersectionObserver" in window).toBe(false);
    expect(stage(container)).toBe("rest");
  });

  it("rises in once when it scrolls into view, staggered by column and row", () => {
    const observers = mockObserver();
    const { container } = render(<Skills groups={groups} />);

    expect(stage(container)).toBe("armed");

    act(() => observers[0].callback([{ isIntersecting: false }]));
    expect(stage(container)).toBe("armed");

    act(() => observers[0].callback([{ isIntersecting: true }]));

    expect(stage(container)).toBe("in");
    expect(observers[0].disconnect).toHaveBeenCalled();
    const root = container.querySelector<HTMLElement>("[data-stage]");
    expect(root?.style.getPropertyValue("--rise-duration")).toBe("480ms");
    const [first, second] = screen.getAllByRole("listitem");
    expect(first.style.getPropertyValue("--rise-delay")).toBe("0ms");
    expect(second.style.getPropertyValue("--rise-delay")).toBe("60ms");
  });

  it("keeps the real content to five groups of four to six skills", () => {
    expect(skillGroups.map((group) => group.label)).toEqual([
      "Project management",
      "Quality & testing",
      "PKI domain",
      "Tooling",
      "Building with",
    ]);
    for (const group of skillGroups) {
      expect(group.skills.length).toBeGreaterThanOrEqual(4);
      expect(group.skills.length).toBeLessThanOrEqual(6);
    }
    expect(skillGroups[0].skills[0]).toMatchObject({
      name: "YouTrack",
      icon: { set: "lucide" },
    });
  });

  it("uses brand logos for GitHub, Jira and Confluence", () => {
    const names = Object.fromEntries(
      skillGroups.flatMap((group) => group.skills).map((s) => [s.name, s.icon]),
    );

    expect(names.GitHub).toMatchObject({ set: "simple-icons", icon: siGithub });
    expect(names.Jira).toMatchObject({ set: "simple-icons", icon: siJira });
    expect(names.Confluence).toMatchObject({
      set: "simple-icons",
      icon: siConfluence,
    });
    expect(names["Regression testing"]).toBeUndefined();
  });
});
