import type { CSSProperties } from "react";

import { timeline } from "@/lib/terminal";
import type { TerminalLine } from "@/types/site";

export type TerminalCardProps = {
  lines: TerminalLine[];
  title?: string;
};

function Highlighted({ text, highlight }: { text: string; highlight: string }) {
  const parts = text.split(highlight);
  return parts.map((part, index) => (
    <span key={index}>
      {index > 0 && <b className="text-accent-bright">{highlight}</b>}
      {part}
    </span>
  ));
}

const lineClass = "block min-h-[22px] whitespace-pre-wrap";
const landClass =
  "motion-safe:translate-y-1 motion-safe:opacity-0 motion-safe:animate-land";

export function TerminalCard({
  lines,
  title = "~/portfolio",
}: TerminalCardProps) {
  const columns =
    Math.max(
      ...lines.map((line) => (line.kind === "cmd" ? line.text.length : 0)),
    ) + 3;

  return (
    <div
      aria-hidden="true"
      className="border border-line-dark bg-surface-800 text-[13px]/[22px]"
    >
      <div className="flex items-center gap-1.5 border-b border-line-dark px-4 py-2.5">
        <i className="size-2.5 rounded-full bg-line-dark" />
        <i className="size-2.5 rounded-full bg-line-dark" />
        <i className="size-2.5 rounded-full bg-line-dark" />
        <span className="ml-auto text-[12px] text-text-on-dark-muted">
          {title}
        </span>
      </div>
      <div className="@container px-6 pt-4 pb-6">
        <div
          style={{ "--cols": columns } as CSSProperties}
          className="text-[length:min(13px,calc(100cqi/(var(--cols)*0.6)))]"
        >
          {timeline(lines).map((line, index) => {
            if (line.kind === "gap") {
              return <span key={index} className="block h-[22px]" />;
            }

            if (line.kind === "cmd") {
              return (
                <span
                  key={index}
                  data-kind="cmd"
                  style={
                    {
                      "--n": line.text.length,
                      "--at": line.at,
                    } as CSSProperties
                  }
                  className={`${lineClass} before:text-accent-bright before:content-['$_'] motion-safe:w-0 motion-safe:max-w-[calc(var(--n)*1ch+3ch)] motion-safe:animate-type motion-safe:overflow-hidden motion-safe:whitespace-nowrap`}
                >
                  {line.text}
                </span>
              );
            }

            return (
              <span
                key={index}
                data-kind={line.kind}
                style={{ "--at": line.at } as CSSProperties}
                className={`${lineClass} ${landClass} ${
                  line.kind === "ok"
                    ? "font-semibold text-text-on-dark"
                    : "text-text-on-dark-muted"
                }`}
              >
                {line.kind === "ok" ? (
                  <Highlighted text={line.text} highlight={line.highlight} />
                ) : (
                  line.text
                )}
              </span>
            );
          })}
        </div>
      </div>
    </div>
  );
}
