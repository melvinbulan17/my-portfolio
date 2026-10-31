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
});
