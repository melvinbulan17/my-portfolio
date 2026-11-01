import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { TerminalCard } from "@/components/sections/TerminalCard";

describe("TerminalCard", () => {
  it("is hidden from assistive technology", () => {
    const { container } = render(
      <TerminalCard lines={[{ kind: "cmd", text: "whoami" }]} />,
    );

    expect(container.firstChild).toHaveAttribute("aria-hidden", "true");
  });

  it("types at the shared per-character speed", () => {
    const { container } = render(
      <TerminalCard lines={[{ kind: "cmd", text: "whoami" }]} />,
    );

    expect(container.firstChild).toHaveStyle({ "--type-char": "24ms" });
  });

  it("gives each command its length and start time", () => {
    const { container } = render(
      <TerminalCard
        lines={[
          { kind: "cmd", text: "whoami" },
          { kind: "cmd", text: "ls" },
        ]}
      />,
    );

    const commands = container.querySelectorAll('[data-kind="cmd"]');
    expect(commands[1]).toHaveStyle({ "--n": "2", "--at": "14" });
  });

  it("highlights every marker in an ok line", () => {
    const { container } = render(
      <TerminalCard
        lines={[{ kind: "ok", text: "✓ planned ✓ reported", highlight: "✓" }]}
      />,
    );

    const ok = container.querySelector('[data-kind="ok"]');
    expect(ok).toHaveTextContent("✓ planned ✓ reported");
    expect(ok?.querySelectorAll("b")).toHaveLength(2);
  });
});
