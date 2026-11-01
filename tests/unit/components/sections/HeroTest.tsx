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
});
