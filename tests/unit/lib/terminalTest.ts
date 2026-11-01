import { describe, expect, it } from "vitest";

import { timeline } from "@/lib/terminal";

describe("timeline", () => {
  it("starts each line after the previous command has typed and paused", () => {
    const timed = timeline([
      { kind: "cmd", text: "whoami" },
      { kind: "out", text: "project-manager" },
      { kind: "gap" },
      { kind: "cmd", text: "ls" },
      { kind: "ok", text: "done: OK", highlight: "OK" },
    ]);

    expect(timed.map((line) => line.at)).toEqual([0, 14, 24, 24, 34]);
  });
});
