import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { MoonWord } from "@/components/sections/MoonWord";

describe("MoonWord", () => {
  it("shows the word and keeps the note out of the accessible text", () => {
    const { container } = render(
      <h1>
        <MoonWord
          word="Bulan"
          label="// did you know?"
          text="bulan means moon in Filipino"
        />
      </h1>,
    );

    expect(
      screen.getByRole("heading", { level: 1, name: "Bulan" }),
    ).toBeInTheDocument();
    const note = container.querySelector("[data-note]");
    expect(note).toHaveAttribute("aria-hidden", "true");
    expect(note).toHaveTextContent(
      "// did you know?bulan means moon in Filipino",
    );
  });

  it("reveals the note and draws the arrow only on hover, on wide screens", () => {
    const { container } = render(
      <MoonWord word="Bulan" label="// did you know?" text="moon" />,
    );

    const note = container.querySelector("[data-note]")!;
    expect(note).toHaveClass("max-[1099px]:hidden", "pointer-events-none");
    expect(note.firstElementChild).toHaveClass(
      "opacity-0",
      "group-hover/moon:opacity-100",
    );
    const paths = note.querySelectorAll("path");
    expect(paths).toHaveLength(2);
    for (const path of paths) {
      expect(path).toHaveAttribute("pathLength", "1");
      expect(path).toHaveClass("group-hover/moon:[stroke-dashoffset:0]");
    }
  });
});
