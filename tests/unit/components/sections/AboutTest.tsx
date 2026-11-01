import { render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { About } from "@/components/sections/About";
import { about } from "@/content/about";

describe("About", () => {
  it("is the #about section with its heading", () => {
    const { container } = render(<About {...about} />);

    expect(container.querySelector("section#about")).not.toBeNull();
    expect(
      screen.getByRole("heading", { level: 2, name: "About" }),
    ).toBeInTheDocument();
  });

  it("renders the story with its bold phrases as strong text", () => {
    const { container } = render(
      <About
        story={[["I am a ", { strong: "tester" }, " at heart."]]}
        glanceTitle="// at a glance"
        glance={[]}
      />,
    );

    const strong = screen.getByText("tester");
    expect(strong.tagName).toBe("STRONG");
    expect(container.querySelector("p")).toHaveTextContent(
      "I am a tester at heart.",
    );
  });

  it("lists every glance item as a term and its description", () => {
    render(<About {...about} />);

    const glance = screen.getByRole("complementary", {
      name: "// at a glance",
    });
    const terms = within(glance).getAllByRole("term");
    const definitions = within(glance).getAllByRole("definition");

    expect(terms).toHaveLength(about.glance.length);
    expect(definitions).toHaveLength(about.glance.length);
    expect(terms[0]).toHaveTextContent("Role");
    expect(definitions[0]).toHaveTextContent("Project Manager & QA");
  });

  it("mutes placeholder glance values", () => {
    render(
      <About
        story={[]}
        glanceTitle="// at a glance"
        glance={[
          { label: "Since", value: "2022" },
          { label: "Based in", value: "Lorem ipsum", placeholder: true },
        ]}
      />,
    );

    expect(screen.getByText("Lorem ipsum")).toHaveClass(
      "text-text-on-dark-muted",
    );
    expect(screen.getByText("2022")).toHaveClass("text-text-on-dark");
  });
});
