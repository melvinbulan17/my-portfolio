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
        <ol className="min-[761px]:flex min-[761px]:flex-row-reverse">
          {jobs.map((job) => (
            <li
              key={`${job.company}-${job.when}`}
              className={cn(
                "group grid gap-4",
                "min-[761px]:relative min-[761px]:block min-[761px]:flex-1 min-[761px]:basis-0 min-[761px]:border-t min-[761px]:pt-8 min-[761px]:pr-8",
                "min-[761px]:before:absolute min-[761px]:before:-top-[7px] min-[761px]:before:left-0 min-[761px]:before:size-[13px] min-[761px]:before:border min-[761px]:before:border-accent min-[761px]:before:content-['']",
                job.current
                  ? "min-[761px]:border-accent min-[761px]:before:bg-accent"
                  : "min-[761px]:border-line-dark min-[761px]:before:bg-surface-900",
              )}
            >
              <div className="pl-8 text-[14px] leading-7 text-text-on-dark-muted transition-colors duration-150 ease-out group-hover:text-accent-bright min-[761px]:mb-4 min-[761px]:min-h-12 min-[761px]:pl-0">
                {job.when}
                {job.where && (
                  <span className="block text-[13px] leading-5 text-text-on-dark-muted">
                    {job.where}
                  </span>
                )}
              </div>
              <div
                className={cn(
                  "relative border-l border-line-dark pb-16 pl-8 group-last:border-l-transparent group-last:pb-0",
                  "before:absolute before:top-[7px] before:-left-[7px] before:size-[13px] before:border before:border-accent before:content-['']",
                  job.current ? "before:bg-accent" : "before:bg-surface-900",
                  "min-[761px]:border-l-0 min-[761px]:p-0 min-[761px]:before:hidden",
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
                          "min-[761px]:pl-4 min-[761px]:before:left-0",
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
          className="mt-8 ml-8 inline-block min-[761px]:ml-0"
        >
          Full history in the resume (PDF) →
        </TextLink>
      </div>
    </section>
  );
}
