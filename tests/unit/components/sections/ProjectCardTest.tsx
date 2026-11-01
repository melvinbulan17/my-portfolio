import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { ProjectCard } from "@/components/sections/ProjectCard";

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
});
