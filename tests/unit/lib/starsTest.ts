import { describe, expect, it } from "vitest";

import {
  fade,
  makeSparkles,
  makeStars,
  pageSparkles,
  pageStars,
} from "@/lib/stars";

describe("makeStars", () => {
  it("places the same stars every time for the same seed", () => {
    expect(makeStars(10, 3)).toEqual(makeStars(10, 3));
    expect(makeStars(10, 3)).not.toEqual(makeStars(10, 4));
  });

  it("keeps every star inside the page and never fully bright", () => {
    for (const star of makeStars(300, 9)) {
      expect(star.x).toBeGreaterThanOrEqual(0);
      expect(star.x).toBeLessThanOrEqual(100);
      expect(star.y).toBeGreaterThanOrEqual(0);
      expect(star.y).toBeLessThanOrEqual(100);
      expect([1, 2, 3]).toContain(star.size);
      expect(star.opacity).toBeGreaterThan(0);
      expect(star.opacity).toBeLessThanOrEqual(0.9);
    }
  });

  it("packs most stars near the top and dims them toward the bottom", () => {
    const stars = makeStars(400, 5);
    const top = stars.filter((star) => star.y < 15);
    const bottom = stars.filter((star) => star.y >= 85);
    expect(top.length).toBeGreaterThan(bottom.length * 4);

    const average = (list: typeof stars) =>
      list.reduce((sum, star) => sum + star.opacity, 0) / list.length;
    expect(average(top)).toBeGreaterThan(average(bottom) * 2);
  });

  it("brings stars in from the top down", () => {
    const stars = makeStars(200, 7);
    const high = stars.filter((star) => star.y < 10);
    const low = stars.filter((star) => star.y > 60);
    expect(Math.max(...high.map((star) => star.appear))).toBeLessThan(
      Math.min(...low.map((star) => star.appear)),
    );
  });
});

describe("fade", () => {
  it("keeps full strength at the top and a faint trace at the bottom", () => {
    expect(fade(0)).toBe(1);
    expect(fade(100)).toBeCloseTo(0.15);
  });
});

describe("makeSparkles", () => {
  it("places a few sparkles, mostly near the top, at a readable size", () => {
    const sparkles = makeSparkles(4, 29);
    expect(sparkles).toEqual(pageSparkles);
    for (const sparkle of sparkles) {
      expect(sparkle.size).toBeGreaterThanOrEqual(9);
      expect(sparkle.size).toBeLessThanOrEqual(14);
      expect(sparkle.x).toBeGreaterThan(3);
      expect(sparkle.x).toBeLessThan(97);
    }
    expect(pageStars).toHaveLength(90);
  });
});
