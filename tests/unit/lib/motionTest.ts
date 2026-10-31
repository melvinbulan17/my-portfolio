import { describe, expect, it } from "vitest";

import { skillDelay } from "./motion";

describe("skillDelay", () => {
  it("staggers down a column and across columns", () => {
    expect(skillDelay(0, 0)).toBe(0);
    expect(skillDelay(0, 2)).toBeCloseTo(0.1);
    expect(skillDelay(1, 0)).toBeCloseTo(0.06);
  });
});
