import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { SocialRail } from "@/components/layout/SocialRail";
import type { SocialLink } from "@/types/site";

const links: SocialLink[] = [
  { label: "GitHub", href: "https://github.com/example", icon: "github" },
  { label: "Email", href: "mailto:me@example.com", icon: "email" },
];

describe("SocialRail", () => {
  it("names each icon link by its label", () => {
    render(<SocialRail links={links} />);

    expect(screen.getByRole("link", { name: "GitHub" })).toHaveAttribute(
      "href",
      "https://github.com/example",
    );
    expect(screen.getByRole("link", { name: "Email" })).toHaveAttribute(
      "href",
      "mailto:me@example.com",
    );
  });

  it("opens profiles in a new tab and email in the same tab", () => {
    render(<SocialRail links={links} />);

    const github = screen.getByRole("link", { name: "GitHub" });
    expect(github).toHaveAttribute("target", "_blank");
    expect(github).toHaveAttribute("rel", "noopener noreferrer");
    expect(screen.getByRole("link", { name: "Email" })).not.toHaveAttribute(
      "target",
    );
  });
});
