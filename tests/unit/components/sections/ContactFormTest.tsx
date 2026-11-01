import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import { ContactForm } from "@/components/sections/ContactForm";

vi.mock("@/app/actions/contact", () => ({ deliverContact: vi.fn() }));

type User = ReturnType<typeof userEvent.setup>;

async function fill(user: User, name = "Sam Cruz") {
  await user.type(field("Name"), name);
  await user.type(field("Email"), "sam@company.com");
  await user.type(field("Message"), "Let's talk about testing.");
}

const field = (name: string) => screen.getByRole("textbox", { name });

const submitButton = () => screen.getByRole("button", { name: "Send message" });

describe("ContactForm", () => {
  it("marks each field required with a hidden red asterisk and no combined note", () => {
    const { container } = render(<ContactForm onSubmit={vi.fn()} />);

    for (const name of ["Name", "Email", "Message"]) {
      expect(field(name)).toBeRequired();
      expect(field(name)).toHaveAttribute("aria-required", "true");
    }
    const stars = container.querySelectorAll(
      "label > span[aria-hidden='true']",
    );
    expect(stars).toHaveLength(3);
    for (const star of stars) {
      expect(star).toHaveTextContent("*");
      expect(star).toHaveClass("text-accent-bright");
    }
    expect(screen.queryByText(/fields are required/i)).not.toBeInTheDocument();
    expect(submitButton()).toBeEnabled();
  });

  it.each([
    ["Name", "enter your name"],
    ["Email", "enter an email like name@company.com"],
    ["Message", "write a little more (10 characters or more)"],
  ])(
    "shows only the %s error when only that field is blank",
    async (blank, message) => {
      const user = userEvent.setup();
      const onSubmit = vi.fn();
      render(<ContactForm onSubmit={onSubmit} />);
      const filled: Record<string, string> = {
        Name: "Sam",
        Email: "sam@company.com",
        Message: "Let's talk about testing.",
      };
      for (const [name, value] of Object.entries(filled)) {
        if (name !== blank) await user.type(field(name), value);
      }

      await user.click(submitButton());

      expect(field(blank)).toHaveFocus();
      expect(field(blank)).toHaveAttribute("aria-invalid", "true");
      expect(field(blank)).toHaveAccessibleDescription(message);
      for (const name of Object.keys(filled)) {
        if (name === blank) continue;
        expect(field(name)).not.toHaveAttribute("aria-invalid");
        expect(field(name)).not.toHaveAttribute("aria-describedby");
      }
      expect(screen.getAllByText(/^(enter|write)/)).toHaveLength(1);
      expect(onSubmit).not.toHaveBeenCalled();
    },
  );

  it("shows every error on an empty submit and focuses the first field", async () => {
    const user = userEvent.setup();
    const onSubmit = vi.fn();
    render(<ContactForm onSubmit={onSubmit} />);

    await user.click(submitButton());

    const name = field("Name");
    expect(name).toHaveFocus();
    expect(name).toHaveAttribute("aria-invalid", "true");
    expect(name).toHaveAccessibleDescription("enter your name");
    expect(field("Email")).toHaveAccessibleDescription(
      "enter an email like name@company.com",
    );
    expect(field("Message")).toHaveAccessibleDescription(
      "write a little more (10 characters or more)",
    );
    expect(onSubmit).not.toHaveBeenCalled();
  });

  it("focuses the first invalid field when earlier ones pass", async () => {
    const user = userEvent.setup();
    render(<ContactForm onSubmit={vi.fn()} />);
    await user.type(field("Name"), "Sam");
    await user.type(field("Email"), "sam@company.com");

    await user.click(submitButton());

    expect(field("Message")).toHaveFocus();
    expect(field("Name")).not.toHaveAttribute("aria-invalid");
  });

  it("flags a touched field emptied on blur and clears it once fixed", async () => {
    const user = userEvent.setup();
    render(<ContactForm onSubmit={vi.fn()} />);
    const name = field("Name");

    await user.type(name, "S");
    await user.clear(name);
    await user.tab();
    expect(name).toHaveAccessibleDescription("enter your name");
    expect(field("Email")).not.toHaveAttribute("aria-invalid");

    await user.type(name, "S");
    expect(name).not.toHaveAttribute("aria-invalid");
    expect(screen.queryByText("enter your name")).not.toBeInTheDocument();
  });

  it("clears each error on an empty submit as its field is fixed", async () => {
    const user = userEvent.setup();
    render(<ContactForm onSubmit={vi.fn()} />);
    await user.click(submitButton());

    await user.type(field("Name"), "Sam");
    expect(field("Name")).not.toHaveAttribute("aria-invalid");
    expect(field("Email")).toHaveAttribute("aria-invalid", "true");

    await user.type(field("Message"), "Hello there!");
    expect(field("Message")).not.toHaveAttribute("aria-invalid");
    expect(field("Email")).toHaveAccessibleDescription(
      "enter an email like name@company.com",
    );
  });

  it("checks a field on blur once it has text and clears the error while typing", async () => {
    const user = userEvent.setup();
    render(<ContactForm onSubmit={vi.fn()} />);
    const email = field("Email");

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
    expect(field("Name")).toHaveValue("Sam Cruz");
    expect(field("Email")).toHaveValue("sam@company.com");
    expect(field("Message")).toHaveValue("Let's talk about testing.");
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
