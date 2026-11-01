import Image from "next/image";
import type { CSSProperties } from "react";

import { RiseIn, riseClass } from "@/components/sections/RiseIn";
import { Button } from "@/components/ui/Button";
import { TagList } from "@/components/ui/Tag";
import { cn } from "@/lib/cn";
import { cardTextDelay } from "@/lib/motion";
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
  flip,
}: ProjectCardProps) {
  return (
    <article>
      <RiseIn
        className={cn(
          "grid items-center gap-16 max-[1000px]:gap-10 max-[760px]:grid-cols-1 max-[760px]:gap-8 min-[761px]:min-h-[min(calc(100svh-12rem),760px)]",
          flip ? "grid-cols-[1fr_1.5fr]" : "grid-cols-[1.5fr_1fr]",
        )}
      >
        <div
          data-slot="shot"
          className={cn(flip && "min-[761px]:order-2", riseClass)}
        >
          <div
            className={cn(
              "group/shot relative grid aspect-[16/10] place-items-center overflow-hidden text-[13px] text-text-on-dark-muted min-[761px]:aspect-[4/3]",
              !image &&
                "border border-dashed border-line-dark-strong transition-colors duration-240 ease-out-expo hover:border-text-on-dark-muted",
            )}
          >
            {image ? (
              <Image
                src={image.src}
                alt={image.alt}
                fill
                sizes="(max-width: 760px) 100vw, 680px"
                className="object-cover motion-safe:transition-transform motion-safe:duration-480 motion-safe:ease-out-expo motion-safe:group-hover/shot:scale-[1.025]"
              />
            ) : (
              "Lorem ipsum screenshot"
            )}
          </div>
        </div>
        <div data-slot="text" style={textDelay} className={riseClass}>
          <p className="mb-2 text-[13px]/5 text-accent-bright">{kicker}</p>
          <h3 className="mb-4 text-[28px]/9 font-semibold max-[760px]:text-[24px]/8">
            {title}
          </h3>
          <TagList tags={tags} className="mb-6" />
          <p className="mb-6 text-text-on-dark-muted">{summary}</p>
          <div className="flex flex-wrap gap-4">
            {actions.map((action) => (
              <Button key={action.label} href={action.href}>
                {action.label}
              </Button>
            ))}
          </div>
        </div>
      </RiseIn>
    </article>
  );
}
