import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { Marquee } from "@/components/sections/Marquee";

describe("Marquee", () => {
  it("exposes the disciplines once and hides the looping copy", () => {
    render(<Marquee items={["Software testing", "PKI"]} />);

    const band = screen.getByRole("region", { name: "Disciplines" });
    expect(
      screen.getAllByRole("listitem").map((item) => item.textContent),
    ).toEqual(["Software testing", "PKI"]);
    expect(band.querySelectorAll("ul")[1]).toHaveAttribute(
      "aria-hidden",
      "true",
    );
  });
});
