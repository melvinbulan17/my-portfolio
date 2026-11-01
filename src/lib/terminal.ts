import type { TerminalLine } from "@/types/site";

export type TimedLine = TerminalLine & { at: number };

const pauseAfterCommand = 8;
const pauseAfterOutput = 10;

export function timeline(lines: TerminalLine[]): TimedLine[] {
  let cursor = 0;

  return lines.map((line) => {
    const at = cursor;
    if (line.kind === "cmd") cursor += line.text.length + pauseAfterCommand;
    if (line.kind === "out" || line.kind === "ok") cursor += pauseAfterOutput;
    return { ...line, at };
  });
}
