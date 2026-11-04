import type { CSSProperties } from "react";

import { RevealHeading } from "@/components/sections/RevealHeading";
import { RiseIn } from "@/components/sections/RiseIn";
import type { AboutContent } from "@/content/about";
import { cn } from "@/lib/cn";
import { arrive } from "@/lib/motion";

export type AboutProps = AboutContent;

const order = (index: number) =>
  ({ "--rise-delay": `${index * 90}ms` }) as CSSProperties;

export function About({ story, glanceTitle, glance }: AboutProps) {
  return (
    <section
      id="about"
      className="border-t border-line-dark py-24 max-[760px]:py-16"
    >
      <div className="wrap">
        <RevealHeading number="02." title="About" />
        <RiseIn className="grid grid-cols-[1.4fr_1fr] gap-16 max-[760px]:grid-cols-1">
          <div className="space-y-6 text-text-on-dark-muted">
            {story.map((paragraph, index) => (
              <p key={index} style={order(index)} className={arrive}>
                {paragraph.map((segment, segmentIndex) =>
                  typeof segment === "string" ? (
                    segment
                  ) : (
                    <strong
                      key={segmentIndex}
                      className="font-semibold text-text-on-dark"
                    >
                      {segment.strong}
                    </strong>
                  ),
                )}
              </p>
            ))}
          </div>
          <aside
            aria-labelledby="about-glance"
            style={order(story.length)}
            className={cn(
              "self-start border border-line-dark bg-surface-800 p-8",
              arrive,
            )}
          >
            <h3
              id="about-glance"
              className="mb-6 text-label text-accent-bright"
            >
              {glanceTitle}
            </h3>
            <dl className="grid grid-cols-[auto_1fr] gap-x-6 gap-y-4 text-label font-normal">
              {glance.map(({ label, value }) => (
                <div key={label} className="contents">
                  <dt className="text-text-on-dark-muted">{label}</dt>
                  <dd className="m-0 text-text-on-dark">{value}</dd>
                </div>
              ))}
            </dl>
          </aside>
        </RiseIn>
      </div>
    </section>
  );
}
