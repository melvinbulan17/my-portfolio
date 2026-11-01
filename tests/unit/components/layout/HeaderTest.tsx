import { fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";

import { Header } from "@/components/layout/Header";

function scrollTo(y: number) {
  Object.defineProperty(window, "scrollY", { value: y, configurable: true });
  fireEvent.scroll(window);
}

describe("Header", () => {
  afterEach(() => {
    scrollTo(0);
  });

  it("stays fixed to the top of the viewport", () => {
    render(<Header>nav</Header>);

    expect(screen.getByRole("banner")).toHaveClass("fixed", "top-0");
  });

  it("marks itself scrolled once the page leaves the top", () => {
    render(<Header>nav</Header>);
    const header = screen.getByRole("banner");
    expect(header).not.toHaveAttribute("data-scrolled");

    scrollTo(120);
    expect(header).toHaveAttribute("data-scrolled");

    scrollTo(0);
    expect(header).not.toHaveAttribute("data-scrolled");
  });

  it("starts scrolled when the page loads partway down", () => {
    scrollTo(400);
    render(<Header>nav</Header>);

    expect(screen.getByRole("banner")).toHaveAttribute("data-scrolled");
  });
});
