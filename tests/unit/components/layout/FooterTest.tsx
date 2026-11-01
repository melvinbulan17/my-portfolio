import { render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { Footer } from "@/components/layout/Footer";

describe("Footer", () => {
  it("renders the link columns, copyright and back-to-top link", () => {
    render(
      <Footer
        tagline="Software engineer: project manager and QA."
        navLinks={[{ label: "Work", href: "#work" }]}
        socialLinks={[
          {
            label: "GitHub",
            href: "https://github.com/example",
            icon: "github",
          },
        ]}
        resumeHref="/resume.pdf"
        owner="Melvin S. Bulan"
        year={2026}
      />,
    );

    const footer = screen.getByRole("contentinfo");
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
});
