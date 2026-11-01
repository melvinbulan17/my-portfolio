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
      name: "// right now",
    });
    const terms = within(glance).getAllByRole("term");
    const definitions = within(glance).getAllByRole("definition");

    expect(terms).toHaveLength(about.glance.length);
    expect(definitions).toHaveLength(about.glance.length);
    expect(terms[0]).toHaveTextContent("Role");
    expect(definitions[0]).toHaveTextContent("Software Engineer (PM & QA)");
    expect(terms.map((term) => term.textContent)).toEqual([
      "Role",
      "Domain",
      "Since",
      "Company",
      "Based in",
    ]);
  });

  it("tells the story in two paragraphs with the key roles in bold", () => {
    const { container } = render(<About {...about} />);

    expect(container.querySelectorAll("p")).toHaveLength(2);
    expect(
      Array.from(container.querySelectorAll("strong")).map(
        (strong) => strong.textContent,
      ),
    ).toEqual([
      "software test engineer",
      "test manager",
      "project manager",
      "PKI (public key infrastructure)",
    ]);
  });
});
