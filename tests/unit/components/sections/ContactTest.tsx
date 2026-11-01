import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import { Contact } from "@/components/sections/Contact";

vi.mock("@/app/actions/contact", () => ({ deliverContact: vi.fn() }));

describe("Contact", () => {
  it("is the #contact section with its heading, line and form", () => {
    const { container } = render(<Contact />);

    expect(container.querySelector("section#contact")).not.toBeNull();
    expect(
      screen.getByRole("heading", { level: 2, name: "Contact" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { level: 2, name: "Let's work together." }),
    ).toBeInTheDocument();
    expect(
      screen.getByText(/Have a role, a project, or just an idea\?/),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Send message" }),
    ).toBeInTheDocument();
  });
});
