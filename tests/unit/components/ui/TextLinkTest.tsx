import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { TextLink } from "@/components/ui/TextLink";

describe("TextLink", () => {
  it("keeps in-page links in the same tab", () => {
    render(<TextLink href="#about">More about me</TextLink>);

    const link = screen.getByRole("link", { name: "More about me" });
    expect(link).toHaveAttribute("href", "#about");
    expect(link).not.toHaveAttribute("target");
    expect(link).not.toHaveAttribute("rel");
  });

  it("opens the resume in a new tab", () => {
    render(<TextLink href="/resume.pdf">Full resume</TextLink>);

    const link = screen.getByRole("link", { name: "Full resume" });
    expect(link).toHaveAttribute("target", "_blank");
    expect(link).toHaveAttribute("rel", "noopener noreferrer");
  });

  it("does not pass Link options to a plain anchor", () => {
    render(
      <TextLink href="/resume.pdf" prefetch={false}>
        Resume
      </TextLink>,
    );

    expect(screen.getByRole("link", { name: "Resume" })).not.toHaveAttribute(
      "prefetch",
    );
  });
});
