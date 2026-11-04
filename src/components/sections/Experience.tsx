import type { CSSProperties } from "react";

import { ExperienceConstellation } from "@/components/sections/ExperienceConstellation";
import { RevealHeading } from "@/components/sections/RevealHeading";
import { TextLink } from "@/components/ui/TextLink";
import type { ExperienceJob } from "@/content/experience";
import { cn } from "@/lib/cn";
import { constellationDraw } from "@/lib/motion";

export type ExperienceProps = {
  jobs: ExperienceJob[];
  resumeHref: string;
};

const starMotion =
  "transition-[scale,opacity] duration-160 ease-out-expo motion-safe:group-data-[stage=armed]/rise:scale-50 motion-safe:group-data-[stage=armed]/rise:opacity-0 motion-safe:group-data-[stage=in]/rise:delay-(--star-delay) motion-safe:group-data-[stage=in]/rise:duration-500 motion-reduce:transition-none";

const starOffsets = ["0.25rem", "2rem", "0.75rem", "2.25rem", "1.25rem"];

export function Experience({ jobs, resumeHref }: ExperienceProps) {
  const starStyle = (index: number) =>
    ({
      left: starOffsets[index % starOffsets.length],
      "--star-delay": `${Math.round((index / Math.max(jobs.length - 1, 1)) * constellationDraw * 1000)}ms`,
    }) as CSSProperties;

  return (
    <section
      id="experience"
      className="border-t border-line-dark py-24 max-[760px]:py-16"
    >
      <div className="wrap">
        <RevealHeading number="03." title="Experience" />
        <ExperienceConstellation>
          {jobs.map((job, index) => (
            <li
              key={`${job.company}-${job.when}`}
              className="group grid gap-4 min-[761px]:grid-cols-[15rem_1fr] min-[761px]:gap-16"
            >
              <div className="pl-16 text-[0.875rem] leading-7 text-text-on-dark-muted transition-colors duration-150 ease-out group-hover:text-accent-bright min-[761px]:pl-0">
                {job.when}
                {job.where && (
                  <span className="block text-[0.875rem] leading-5 text-text-on-dark-muted">
                    {job.where}
                  </span>
                )}
              </div>
              <div className="relative pb-16 pl-16 group-last:pb-0">
                <span
                  data-star
                  style={starStyle(index)}
                  className={cn(
                    starMotion,
                    "absolute top-2 size-3 rounded-full group-hover:scale-125",
                    job.current ? "bg-accent-bright" : "bg-text-on-dark",
                  )}
                />
                <h3 className="text-h3">{job.title}</h3>
                <p className="text-[0.875rem] leading-5 text-text-on-dark-muted">
                  {job.internship ? `${job.company} · Internship` : job.company}
                </p>
                {job.description && (
                  <p className="mt-4 max-w-160 text-text-on-dark">
                    {job.description}
                  </p>
                )}
              </div>
            </li>
          ))}
        </ExperienceConstellation>
        <TextLink
          href={resumeHref}
          className="mt-8 ml-16 inline-block min-[761px]:ml-[23rem]"
        >
          Full history in the resume (PDF) →
        </TextLink>
      </div>
    </section>
  );
}
