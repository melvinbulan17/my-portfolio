import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import { Button } from "@/components/ui/Button";

describe("Button", () => {
  it("renders a link when given an href", () => {
    render(<Button href="#work">View Works</Button>);

    expect(screen.getByRole("link", { name: "View Works" })).toHaveAttribute(
      "href",
      "#work",
    );
  });

  it("keeps in-page links in the same tab", () => {
    render(<Button href="#work">View Works</Button>);

    const link = screen.getByRole("link", { name: "View Works" });
    expect(link).not.toHaveAttribute("target");
    expect(link).not.toHaveAttribute("rel");
  });

  it("opens links that leave the site in a new tab", () => {
    render(<Button href="https://github.com/example">View code</Button>);

    const link = screen.getByRole("link", { name: "View code" });
    expect(link).toHaveAttribute("target", "_blank");
    expect(link).toHaveAttribute("rel", "noopener noreferrer");
  });

  it("renders a button that defaults to type=button", async () => {
    const onClick = vi.fn();
    render(<Button onClick={onClick}>Send</Button>);

    const button = screen.getByRole("button", { name: "Send" });
    expect(button).toHaveAttribute("type", "button");

    await userEvent.click(button);
    expect(onClick).toHaveBeenCalledOnce();
  });

  it("does not fire clicks when disabled", async () => {
    const onClick = vi.fn();
    render(
      <Button disabled onClick={onClick}>
        Sending
      </Button>,
    );

    await userEvent.click(screen.getByRole("button", { name: "Sending" }));
    expect(onClick).not.toHaveBeenCalled();
  });

  it("does not pass Link options to a plain anchor", () => {
    render(
      <Button href="https://example.com" prefetch={false}>
        Live site
      </Button>,
    );

    expect(screen.getByRole("link", { name: "Live site" })).not.toHaveAttribute(
      "prefetch",
    );
  });
});
