import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";

import { Nav } from "@/components/layout/Nav";

const links = [
  { label: "Work", href: "#work" },
  { label: "Contact", href: "#contact" },
];

function renderNav() {
  render(<Nav links={links} resumeHref="/resume.pdf" />);
  return screen.getByRole("button", { name: /menu/ });
}

describe("Nav", () => {
  it("renders the section links and the resume button", () => {
    renderNav();

    expect(screen.getByRole("link", { name: "Work" })).toHaveAttribute(
      "href",
      "#work",
    );
    expect(screen.getByRole("link", { name: "Resume" })).toHaveAttribute(
      "href",
      "/resume.pdf",
    );
  });

  it("toggles the menu and reports it with aria-expanded", async () => {
    const toggle = renderNav();
    expect(toggle).toHaveAttribute("aria-expanded", "false");

    await userEvent.click(toggle);
    expect(toggle).toHaveAttribute("aria-expanded", "true");

    await userEvent.click(toggle);
    expect(toggle).toHaveAttribute("aria-expanded", "false");
  });

  it("closes the menu on Escape", async () => {
    const toggle = renderNav();

    await userEvent.click(toggle);
    await userEvent.keyboard("{Escape}");

    expect(toggle).toHaveAttribute("aria-expanded", "false");
  });

  it("closes the menu when a link is chosen", async () => {
    const toggle = renderNav();

    await userEvent.click(toggle);
    await userEvent.click(screen.getByRole("link", { name: "Contact" }));

    expect(toggle).toHaveAttribute("aria-expanded", "false");
  });
});
