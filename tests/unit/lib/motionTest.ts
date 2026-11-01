import { describe, expect, it } from "vitest";

import { cardTextDelay, duration, skillDelay, typeChar } from "@/lib/motion";

describe("skillDelay", () => {
  it("staggers down a column and across columns", () => {
    expect(skillDelay(0, 0)).toBe(0);
    expect(skillDelay(0, 2)).toBeCloseTo(0.1);
    expect(skillDelay(1, 0)).toBeCloseTo(0.06);
  });
});

describe("timings", () => {
  it("types at 24ms a character", () => {
    expect(typeChar).toBe(0.024);
  });

  it("brings a card's text in just after its screenshot", () => {
    expect(cardTextDelay).toBeGreaterThan(0);
    expect(cardTextDelay).toBeLessThan(duration.slow);
  });
});
