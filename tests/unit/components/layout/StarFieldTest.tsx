import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { StarField } from "@/components/layout/StarField";
import { makeSparkles, makeStars } from "@/lib/stars";

describe("StarField", () => {
  it("sits behind the page, hidden from assistive tech, with one dot per star", () => {
    const stars = makeStars(12, 2);
    const { container } = render(
      <StarField stars={stars} sparkles={makeSparkles(2, 1)} />,
    );

    const field = container.firstElementChild as HTMLElement;
    expect(field).toHaveAttribute("aria-hidden", "true");
    expect(field).toHaveClass(
      "pointer-events-none",
      "-z-10",
      "absolute",
      "inset-0",
    );
    const dots = field.querySelectorAll("[data-star]");
    expect(dots).toHaveLength(12);
    expect(dots[0]).toHaveStyle({
      left: `${stars[0].x}%`,
      top: `${stars[0].y}%`,
    });
    expect(field.querySelectorAll("[data-sparkle]")).toHaveLength(2);
  });

  it("fades every star in, twinkles one in five, and glows only the biggest", () => {
    const stars = makeStars(40, 3);
    const { container } = render(<StarField stars={stars} sparkles={[]} />);

    const dots = [...container.querySelectorAll<HTMLElement>("[data-star]")];
    for (const dot of dots) {
      expect(dot.className).toMatch(/motion-safe:animate-/);
      expect(dot.className.includes("shadow-")).toBe(dot.dataset.star === "3");
    }
    expect(dots.filter((dot) => dot.dataset.twinkle)).toHaveLength(8);
  });
});
