import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { Hero } from "@/components/sections/Hero";

describe("Hero", () => {
  it("renders the name, role line and both actions", () => {
    render(
      <Hero
        greeting="Hi! My name is"
        name="Melvin S. Bulan"
        role={{ lead: "I lead it.", emphasis: "I test it." }}
        intro="I set up software testing from scratch."
        primaryAction={{ label: "View Works", href: "#work" }}
        secondaryAction={{ label: "More about me", href: "#about" }}
        terminalLines={[{ kind: "cmd", text: "whoami" }]}
      />,
    );

    expect(
      screen.getByRole("heading", { level: 1, name: "Melvin S. Bulan" }),
    ).toBeInTheDocument();
    expect(screen.getByText("I test it.")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "View Works" })).toHaveAttribute(
      "href",
      "#work",
    );
    expect(screen.getByRole("link", { name: "More about me" })).toHaveAttribute(
      "href",
      "#about",
    );
  });

  it("keeps the name whole and unselectable with a hidden note on Bulan", () => {
    const { container } = render(
      <Hero
        greeting="Hi! My name is"
        name="Melvin S. Bulan"
        nameNote={{
          label: "// did you know?",
          text: "means moon in Filipino",
        }}
        role={{ lead: "I lead it.", emphasis: "I test it." }}
        intro="Intro"
        primaryAction={{ label: "View Works", href: "#work" }}
        secondaryAction={{ label: "More about me", href: "#about" }}
        terminalLines={[]}
      />,
    );

    const heading = screen.getByRole("heading", {
      level: 1,
      name: "Melvin S. Bulan",
    });
    expect(heading).toHaveClass("select-none");
    const moon = container.querySelector("[data-moon]");
    expect(moon?.firstChild).toHaveTextContent("Bulan");
    expect(moon?.querySelector("[data-note]")).toHaveTextContent(
      "means moon in Filipino",
    );
  });

  it("reveals the role line from behind a mask and underlines the emphasis", () => {
    const { container } = render(
      <Hero
        greeting="Hi! My name is"
        name="Melvin S. Bulan"
        role={{ lead: "I lead it.", emphasis: "I test it." }}
        intro="Intro"
        primaryAction={{ label: "View Works", href: "#work" }}
        secondaryAction={{ label: "More about me", href: "#about" }}
        terminalLines={[]}
      />,
    );

    const lead = screen.getByText("I lead it.");
    const emphasis = screen.getByText("I test it.");
    expect(lead).toHaveClass("motion-safe:animate-reveal");
    expect(emphasis).toHaveClass("motion-safe:animate-reveal");
    expect(emphasis).toHaveClass("[--reveal-at:150ms]");
    expect(lead.parentElement).toHaveClass("[clip-path:inset(0)]");
    expect(emphasis.parentElement).toHaveClass("[clip-path:inset(0)]");
    expect(lead.closest("p")).toHaveTextContent("I lead it. I test it.");

    const underline = container.querySelector("[data-underline]");
    expect(underline).toHaveAttribute("aria-hidden", "true");
    expect(underline).toHaveClass("motion-safe:animate-draw", "bg-accent");
  });
});
