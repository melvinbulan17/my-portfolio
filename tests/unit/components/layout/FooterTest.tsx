import { render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { Footer } from "@/components/layout/Footer";

function renderFooter() {
  render(
    <Footer
      tagline="Plan. Execute. Excel."
      navLinks={[{ label: "Work", href: "#work" }]}
      socialLinks={[
        {
          label: "GitHub",
          href: "https://github.com/example",
          icon: "github",
        },
        { label: "Email", href: "mailto:me@example.com", icon: "email" },
      ]}
      resumeHref="/resume.pdf"
      owner="Melvin S. Bulan"
      year={2026}
    />,
  );
  return screen.getByRole("contentinfo");
}

describe("Footer", () => {
  it("renders the link columns, copyright and back-to-top link", () => {
    const footer = renderFooter();

    expect(
      within(footer)
        .getAllByRole("heading")
        .map((h) => h.textContent),
    ).toEqual(["Navigate", "Elsewhere", "Files"]);
    expect(
      within(footer).getByRole("link", { name: "Resume (PDF)" }),
    ).toHaveAttribute("href", "/resume.pdf");
    expect(
      within(footer).getByText("© 2026 Melvin S. Bulan"),
    ).toBeInTheDocument();
    expect(
      within(footer).getByRole("link", { name: "Back to top" }),
    ).toHaveAttribute("href", "#top");
  });

  it("opens the resume and profiles in a new tab", () => {
    const footer = renderFooter();

    for (const name of ["Resume (PDF)", "GitHub"]) {
      const link = within(footer).getByRole("link", { name });
      expect(link).toHaveAttribute("target", "_blank");
      expect(link).toHaveAttribute("rel", "noopener noreferrer");
    }
  });

  it("keeps email and in-page links in the same tab", () => {
    const footer = renderFooter();

    for (const name of ["Email", "Work", "Back to top"]) {
      expect(within(footer).getByRole("link", { name })).not.toHaveAttribute(
        "target",
      );
    }
  });
});
