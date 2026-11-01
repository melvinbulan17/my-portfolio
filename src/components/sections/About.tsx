import { SectionHeading } from "@/components/ui/SectionHeading";
import type { AboutContent } from "@/content/about";

export type AboutProps = AboutContent;

export function About({ story, glanceTitle, glance }: AboutProps) {
  return (
    <section
      id="about"
      className="border-t border-line-dark py-32 max-[760px]:py-16"
    >
      <div className="wrap">
        <SectionHeading number="02." title="About" />
        <div className="grid grid-cols-[1.4fr_1fr] gap-16 max-[760px]:grid-cols-1">
          <div className="space-y-6 text-text-on-dark-muted">
            {story.map((paragraph, index) => (
              <p key={index}>
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
            className="self-start border border-line-dark bg-surface-800 p-8"
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
        </div>
      </div>
    </section>
  );
}
