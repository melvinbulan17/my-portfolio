import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import type { CSSProperties } from "react";

import { RiseIn } from "@/components/sections/RiseIn";
import { Button } from "@/components/ui/Button";
import { TagList } from "@/components/ui/Tag";
import { TextLink } from "@/components/ui/TextLink";
import { cn } from "@/lib/cn";
import { cardTextDelay, riseClass } from "@/lib/motion";
import type { Project } from "@/types/site";

export type ProjectCardProps = Project & {
  flip?: boolean;
};

const textDelay = {
  "--rise-delay": `${cardTextDelay * 1000}ms`,
} as CSSProperties;

export function ProjectCard({
  kicker,
  title,
  tags,
  summary,
  image,
  actions,
  caseStudyHref,
  flip,
}: ProjectCardProps) {
  return (
    <article>
      <RiseIn
        className={cn(
          "grid items-center gap-16 max-[1000px]:gap-10 max-[760px]:grid-cols-1 max-[760px]:gap-8 min-[761px]:min-h-[min(calc(100svh-12rem),47.5rem)]",
          flip ? "grid-cols-[1fr_1.5fr]" : "grid-cols-[1.5fr_1fr]",
        )}
      >
        <div
          data-slot="shot"
          className={cn(flip && "min-[761px]:order-2", riseClass)}
        >
          <div
            className={cn(
              "group/shot relative grid aspect-[16/10] place-items-center overflow-hidden text-[0.875rem] text-text-on-dark-muted min-[761px]:aspect-[4/3]",
              !image &&
                "border border-dashed border-line-dark-strong transition-colors duration-240 ease-out-expo hover:border-text-on-dark-muted",
            )}
          >
            {image ? (
              <Image
                src={image.src}
                alt={image.alt}
                fill
                sizes="(max-width: 760px) 100vw, (min-width: 1536px) 1190px, 680px"
                className="object-cover motion-safe:transition-transform motion-safe:duration-480 motion-safe:ease-out-expo motion-safe:group-hover/shot:scale-[1.025]"
              />
            ) : (
              "Lorem ipsum screenshot"
            )}
          </div>
        </div>
        <div data-slot="text" style={textDelay} className={riseClass}>
          <p className="mb-2 text-[0.875rem]/5 text-accent-bright">{kicker}</p>
          <h3 className="mb-4 text-[1.75rem]/9 font-semibold max-[760px]:text-[1.75rem]/9">
            {title}
          </h3>
          <TagList tags={tags} className="mb-6" />
          <p className="mb-6 text-text-on-dark-muted">{summary}</p>
          {caseStudyHref ? (
            <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
              <Button href={caseStudyHref}>Read case study</Button>
              <div className="flex gap-6">
                {actions.map((action) => (
                  <TextLink
                    key={action.label}
                    href={action.href}
                    aria-label={`${title}: ${action.label}`}
                  >
                    {action.label}
                    <ArrowUpRight
                      aria-hidden="true"
                      className="ml-1 inline size-3.5 align-[-0.125rem]"
                    />
                  </TextLink>
                ))}
              </div>
            </div>
          ) : (
            <div className="flex flex-wrap gap-4">
              {actions.map((action) => (
                <Button key={action.label} href={action.href}>
                  {action.label}
                </Button>
              ))}
            </div>
          )}
        </div>
      </RiseIn>
    </article>
  );
}
