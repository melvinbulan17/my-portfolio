import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { Work } from "@/components/sections/Work";

const project = (title: string) => ({
  kicker: "Lorem ipsum",
  title,
  tags: ["Lorem"],
  summary: "Lorem ipsum dolor sit amet.",
  actions: [{ label: "Case study", href: "#" }],
});

describe("Work", () => {
  it("is the #work section with a heading and one card per project", () => {
    const { container } = render(
      <Work projects={[project("First"), project("Second")]} />,
    );

    expect(container.querySelector("section#work")).toHaveClass(
      "bg-surface-900",
      "py-32",
    );
    expect(container.querySelector("section#work")).not.toHaveClass("bg-paper");
    expect(
      screen.getByRole("heading", { level: 2, name: "Work" }),
    ).toBeInTheDocument();
    expect(screen.getAllByRole("article")).toHaveLength(2);
  });
});
