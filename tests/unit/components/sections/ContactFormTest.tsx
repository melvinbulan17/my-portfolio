import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import { ContactForm } from "@/components/sections/ContactForm";

vi.mock("@/app/actions/contact", () => ({ deliverContact: vi.fn() }));

type User = ReturnType<typeof userEvent.setup>;

async function fill(user: User, name = "Sam Cruz") {
  await user.type(screen.getByLabelText("Name"), name);
  await user.type(screen.getByLabelText("Email"), "sam@company.com");
  await user.type(
    screen.getByLabelText("Message"),
    "Let's talk about testing.",
  );
}

const submitButton = () => screen.getByRole("button", { name: "Send message" });

describe("ContactForm", () => {
  it("starts idle with the required hint", () => {
    render(<ContactForm onSubmit={vi.fn()} />);

    expect(
      screen.getByText("All three fields are required."),
    ).toBeInTheDocument();
    expect(submitButton()).toBeEnabled();
  });

  it("shows every error on an empty submit and focuses the first field", async () => {
    const user = userEvent.setup();
    const onSubmit = vi.fn();
    render(<ContactForm onSubmit={onSubmit} />);

    await user.click(submitButton());

    const name = screen.getByLabelText("Name");
    expect(name).toHaveFocus();
    expect(name).toHaveAttribute("aria-invalid", "true");
    expect(name).toHaveAccessibleDescription("enter your name");
    expect(screen.getByLabelText("Email")).toHaveAccessibleDescription(
      "enter an email like name@company.com",
    );
    expect(screen.getByLabelText("Message")).toHaveAccessibleDescription(
      "write a little more (10 characters or more)",
    );
    expect(onSubmit).not.toHaveBeenCalled();
  });

  it("focuses the first invalid field when earlier ones pass", async () => {
    const user = userEvent.setup();
    render(<ContactForm onSubmit={vi.fn()} />);
    await user.type(screen.getByLabelText("Name"), "Sam");
    await user.type(screen.getByLabelText("Email"), "sam@company.com");

    await user.click(submitButton());

    expect(screen.getByLabelText("Message")).toHaveFocus();
    expect(screen.getByLabelText("Name")).not.toHaveAttribute("aria-invalid");
  });

  it("checks a field on blur once it has text and clears the error while typing", async () => {
    const user = userEvent.setup();
    render(<ContactForm onSubmit={vi.fn()} />);
    const email = screen.getByLabelText("Email");

    await user.click(email);
    await user.tab();
    expect(email).not.toHaveAttribute("aria-invalid");

    await user.type(email, "sam@company");
    await user.tab();
    expect(email).toHaveAttribute("aria-invalid", "true");

    await user.type(email, ".com");
    expect(email).not.toHaveAttribute("aria-invalid");
    expect(
      screen.queryByText("enter an email like name@company.com"),
    ).not.toBeInTheDocument();
  });

  it("shows the sending state, then the sent message with focus", async () => {
    const user = userEvent.setup();
    let finish = () => {};
    const onSubmit = vi.fn(
      () =>
        new Promise<void>((resolve) => {
          finish = resolve;
        }),
    );
    render(<ContactForm onSubmit={onSubmit} />);
    await fill(user, "  Sam Cruz ");

    await user.click(submitButton());

    expect(screen.getByRole("button", { name: "Sending…" })).toBeDisabled();
    expect(screen.getByText("Sending your message.")).toBeInTheDocument();
    expect(onSubmit).toHaveBeenCalledWith({
      name: "Sam Cruz",
      email: "sam@company.com",
      message: "Let's talk about testing.",
    });

    finish();

    await waitFor(() => expect(screen.getByText("200 OK")).toBeInTheDocument());
    expect(
      screen.getByText("Thanks, Sam. I’ll reply to sam@company.com."),
    ).toBeInTheDocument();
    expect(screen.getByText("200 OK").closest("[tabindex]")).toHaveFocus();
    expect(screen.queryByRole("button")).not.toBeInTheDocument();
  });

  it("shows the failed state and keeps what was typed", async () => {
    const user = userEvent.setup();
    const onSubmit = vi.fn().mockRejectedValue(new Error("down"));
    render(<ContactForm onSubmit={onSubmit} />);
    await fill(user);

    await user.click(submitButton());

    expect(
      await screen.findByText(
        "couldn’t send. Try again, or use LinkedIn in the footer.",
      ),
    ).toHaveClass("text-accent-bright");
    expect(submitButton()).toBeEnabled();
    expect(screen.getByLabelText("Name")).toHaveValue("Sam Cruz");
    expect(screen.getByLabelText("Email")).toHaveValue("sam@company.com");
    expect(screen.getByLabelText("Message")).toHaveValue(
      "Let's talk about testing.",
    );
  });

  it("hides the honeypot and skips sending when it is filled", async () => {
    const user = userEvent.setup();
    const onSubmit = vi.fn();
    const { container } = render(<ContactForm onSubmit={onSubmit} />);
    const trap = container.querySelector<HTMLInputElement>(
      "input[name='website']",
    );

    expect(trap).toHaveAttribute("tabindex", "-1");
    expect(trap?.closest("[aria-hidden='true']")).not.toBeNull();

    await fill(user);
    if (trap) trap.value = "spam.example";
    await user.click(submitButton());

    expect(await screen.findByText("200 OK")).toBeInTheDocument();
    expect(onSubmit).not.toHaveBeenCalled();
  });
});
