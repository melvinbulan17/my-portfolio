import { render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { Work } from "@/components/sections/Work";

const project = (title: string) => ({
  kicker: "Lorem ipsum",
  title,
  tags: ["Lorem"],
  summary: "Lorem ipsum dolor sit amet.",
  actions: [{ label: "Case study", href: "#" }],
});

const side = (title: string) => ({
  title,
  summary: "Lorem ipsum.",
  tags: ["Lorem"],
  links: [{ label: "Code", href: "https://github.com/example" }],
});

describe("Work", () => {
  it("is the #work section headed Selected Work with one card per project", () => {
    const { container } = render(
      <Work
        projects={[project("First"), project("Second")]}
        sideProjects={[]}
      />,
    );

    expect(container.querySelector("section#work")).toHaveClass("py-24");
    expect(
      screen.getByRole("heading", { level: 2, name: "Selected Work" }),
    ).toBeInTheDocument();
    expect(screen.getAllByRole("article")).toHaveLength(2);
    expect(
      screen.queryByRole("heading", { name: "Side projects" }),
    ).not.toBeInTheDocument();
  });

  it("leaves out hidden projects", () => {
    render(
      <Work
        projects={[project("Shown"), { ...project("Gone"), hidden: true }]}
        sideProjects={[side("Tool A"), { ...side("Tool B"), hidden: true }]}
      />,
    );

    expect(screen.getByText("Shown")).toBeInTheDocument();
    expect(screen.queryByText("Gone")).not.toBeInTheDocument();
    expect(screen.getByText("Tool A")).toBeInTheDocument();
    expect(screen.queryByText("Tool B")).not.toBeInTheDocument();
  });

  it("drops the side projects heading when every side project is hidden", () => {
    render(
      <Work
        projects={[project("Shown")]}
        sideProjects={[{ ...side("Tool A"), hidden: true }]}
      />,
    );

    expect(
      screen.queryByRole("heading", { name: "Side projects" }),
    ).not.toBeInTheDocument();
  });

  it("lists side projects under their own heading after the selected work", () => {
    render(
      <Work
        projects={[project("Main")]}
        sideProjects={[side("Tool A"), side("Tool B"), side("Tool C")]}
      />,
    );

    const heading = screen.getByRole("heading", {
      level: 3,
      name: "Side projects",
    });
    const grid = heading.parentElement!.nextElementSibling as HTMLElement;
    expect(
      within(grid)
        .getAllByRole("heading", { level: 4 })
        .map((title) => title.textContent),
    ).toEqual(["Tool A", "Tool B", "Tool C"]);
    expect(grid).toHaveClass(
      "grid-cols-3",
      "max-[1000px]:grid-cols-2",
      "max-[760px]:grid-cols-1",
    );
    expect(
      heading.compareDocumentPosition(screen.getByText("Main")) &
        Node.DOCUMENT_POSITION_PRECEDING,
    ).toBeTruthy();
  });
});
