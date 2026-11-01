import Image from "next/image";

import { Button } from "@/components/ui/Button";
import { TagList } from "@/components/ui/Tag";
import { cn } from "@/lib/cn";
import type { Project } from "@/types/site";

export type ProjectCardProps = Project & {
  flip?: boolean;
};

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
    <article className="grid grid-cols-[1.2fr_1fr] items-center gap-16 max-[760px]:grid-cols-1 max-[760px]:gap-8">
      <div
        className={cn(
          "relative grid aspect-[16/10] place-items-center overflow-hidden text-[13px] text-text-on-paper-muted",
          !image && "border border-dashed border-line-paper",
          flip && "min-[761px]:order-2",
        )}
      >
        {image ? (
          <Image
            src={image.src}
            alt={image.alt}
            fill
            sizes="(max-width: 760px) 100vw, 600px"
            className="object-cover"
          />
        ) : (
          "Lorem ipsum screenshot"
        )}
      </div>
      <div>
        <p className="mb-2 text-[13px]/5 text-accent">{kicker}</p>
        <h3 className="mb-4 text-[24px]/8 font-semibold">{title}</h3>
        <TagList tags={tags} className="mb-6" />
        <p className="mb-6">{summary}</p>
        <div className="flex flex-wrap gap-4">
          {actions.map((action) => (
            <Button key={action.label} href={action.href} onPaper>
              {action.label}
            </Button>
          ))}
        </div>
      </div>
    </article>
  );
}
