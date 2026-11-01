import { describe, expect, it } from "vitest";

import { terminalLines } from "@/content/site";
import { typeChar } from "@/lib/motion";
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

  it("finishes the hero sequence in about three seconds", () => {
    const last = timeline(terminalLines).at(-1);
    const seconds = (last?.at ?? 0) * typeChar;

    expect(seconds).toBeGreaterThan(2.5);
    expect(seconds).toBeLessThan(3.5);
  });
});
