import { SectionHeading } from "@/components/ui/SectionHeading";
import { TextLink } from "@/components/ui/TextLink";
import type { ExperienceJob } from "@/content/experience";
import { cn } from "@/lib/cn";

export type ExperienceProps = {
  jobs: ExperienceJob[];
  resumeHref: string;
};

export function Experience({ jobs, resumeHref }: ExperienceProps) {
  return (
    <section id="experience" className="bg-surface-900 pb-32 max-[760px]:pb-16">
      <div className="wrap">
        <SectionHeading number="03." title="Experience" />
        <ol>
          {jobs.map((job) => (
            <li
              key={`${job.company}-${job.when}`}
              className="group grid gap-4 min-[761px]:grid-cols-[15rem_1fr] min-[761px]:gap-16"
            >
              <div className="pl-8 text-[14px] leading-7 text-text-on-dark-muted transition-colors duration-150 ease-out group-hover:text-accent-bright min-[761px]:pl-0">
                {job.when}
                {job.where && (
                  <span className="block text-[13px] leading-5 text-text-on-dark-muted">
                    {job.where}
                  </span>
                )}
              </div>
              <div
                className={cn(
                  "relative border-l pb-16 pl-8 group-last:border-l-transparent group-last:pb-0",
                  "before:absolute before:top-[7px] before:-left-[7px] before:size-[13px] before:border before:border-accent before:content-['']",
                  job.current
                    ? "border-accent before:bg-accent"
                    : "border-line-dark before:bg-surface-900",
                )}
              >
                <h3 className="text-h3">{job.title}</h3>
                <p className="text-[14px] leading-5 text-text-on-dark-muted">
                  {job.internship ? `${job.company} · Internship` : job.company}
                </p>
                {job.steps.length > 0 && (
                  <ol className="mt-6 grid gap-4">
                    {job.steps.map((step) => (
                      <li
                        key={step.title}
                        className={cn(
                          "relative text-[15px] leading-6 font-semibold",
                          "before:absolute before:top-[9px] before:-left-9 before:size-[7px] before:content-['']",
                          step.current
                            ? "before:bg-accent-bright"
                            : "before:bg-line-dark-strong",
                        )}
                      >
                        {step.title}
                        {step.current && (
                          <span className="ml-2 border border-accent-bright px-1.5 align-[1px] text-[12px] text-accent-bright">
                            now
                          </span>
                        )}
                      </li>
                    ))}
                  </ol>
                )}
              </div>
            </li>
          ))}
        </ol>
        <TextLink
          href={resumeHref}
          prefetch={false}
          className="mt-8 ml-8 inline-block min-[761px]:ml-[21rem]"
        >
          Full history in the resume (PDF) →
        </TextLink>
      </div>
    </section>
  );
}
