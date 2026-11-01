import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { SideProjectCard } from "@/components/sections/SideProjectCard";

const project = {
  title: "Cert Checker",
  summary: "Checks certificate chains from the command line.",
  tags: ["Node", "PKI"],
  links: [
    { label: "Code", href: "https://github.com/example/cert-checker" },
    { label: "Demo", href: "https://example.com" },
  ],
};

describe("SideProjectCard", () => {
  it("shows the title, summary and tags without a screenshot", () => {
    render(<SideProjectCard {...project} />);

    expect(
      screen.getByRole("heading", { level: 4, name: "Cert Checker" }),
    ).toBeInTheDocument();
    expect(
      screen.getByText("Checks certificate chains from the command line."),
    ).toBeInTheDocument();
    expect(screen.getByText("Node")).toBeInTheDocument();
    expect(screen.getByText("PKI")).toBeInTheDocument();
    expect(screen.queryByRole("img")).not.toBeInTheDocument();
  });

  it("opens each link in a new tab and names the project it belongs to", () => {
    render(<SideProjectCard {...project} />);

    const code = screen.getByRole("link", { name: "Cert Checker: Code" });
    expect(code).toHaveAttribute(
      "href",
      "https://github.com/example/cert-checker",
    );
    expect(code).toHaveAttribute("target", "_blank");
    expect(code).toHaveAttribute("rel", "noopener noreferrer");
    expect(
      screen.getByRole("link", { name: "Cert Checker: Demo" }),
    ).toHaveAttribute("target", "_blank");
  });

  it("is a square bordered card", () => {
    render(<SideProjectCard {...project} />);

    const card = screen.getByRole("article");
    expect(card).toHaveClass("border", "border-line-dark");
    expect(card.className).not.toMatch(/rounded/);
  });

  it("cuts a long title to one line and a long summary to two with an ellipsis", () => {
    const long = "Lorem ipsum dolor sit amet ".repeat(12).trim();
    render(<SideProjectCard {...project} title={long} summary={long} />);

    const title = screen.getByRole("heading", { level: 4 });
    expect(title).toHaveClass("truncate");
    expect(title).toHaveAttribute("title", long);
    expect(title).toHaveTextContent(long);
    const summary = screen.getByText(long, { selector: "p" });
    expect(summary).toHaveClass("line-clamp-2");
  });

  it("lifts on hover without waiting for the rise-in delay", () => {
    render(<SideProjectCard {...project} style={{ opacity: 1 }} />);

    const card = screen.getByRole("article");
    expect(card).toHaveClass(
      "motion-safe:hover:-translate-y-1",
      "hover:border-line-dark-strong",
    );
    expect(card.className).not.toMatch(/group-data-\[stage/);
    expect(card.parentElement!.className).toMatch(/group-data-\[stage=armed\]/);
    expect(card.parentElement).toHaveStyle({ opacity: "1" });
  });
});
