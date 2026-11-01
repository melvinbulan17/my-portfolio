import { ArrowUpRight } from "lucide-react";
import type { CSSProperties } from "react";

import { riseClass } from "@/components/sections/RiseIn";
import { TagList } from "@/components/ui/Tag";
import { TextLink } from "@/components/ui/TextLink";
import { cn } from "@/lib/cn";
import type { SideProject } from "@/types/site";

export type SideProjectCardProps = SideProject & {
  style?: CSSProperties;
};

export function SideProjectCard({
  title,
  summary,
  tags,
  links,
  style,
}: SideProjectCardProps) {
  return (
    <div style={style} className={cn("flex min-w-0", riseClass)}>
      <article
        className={cn(
          "group/card flex min-w-0 flex-1 flex-col border border-line-dark bg-surface-800 p-6",
          "transition-[border-color,translate,box-shadow] duration-240 ease-out-expo hover:border-line-dark-strong hover:shadow-[0_12px_24px_-12px_rgb(0_0_0/0.6)]",
          "motion-safe:hover:-translate-y-1",
        )}
      >
        <h4 title={title} className="mb-2 truncate text-h3">
          {title}
        </h4>
        <p className="mb-6 line-clamp-2 min-h-12 text-[15px]/6 text-text-on-dark-muted">
          {summary}
        </p>
        <TagList tags={tags} className="mb-6" />
        <ul className="mt-auto flex flex-wrap gap-6">
          {links.map((link) => (
            <li key={link.label}>
              <TextLink href={link.href} aria-label={`${title}: ${link.label}`}>
                {link.label}
                <ArrowUpRight
                  aria-hidden="true"
                  className="ml-1 inline size-3.5 align-[-2px] transition-transform duration-240 ease-out-expo motion-safe:group-hover/card:translate-x-0.5 motion-safe:group-hover/card:-translate-y-0.5"
                />
              </TextLink>
            </li>
          ))}
        </ul>
      </article>
    </div>
  );
}
