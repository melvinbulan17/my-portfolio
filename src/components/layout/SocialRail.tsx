import { SocialIcon } from "@/components/ui/SocialIcon";
import { cn } from "@/lib/cn";
import { newTabProps } from "@/lib/links";
import type { SocialLink } from "@/types/site";

export type SocialRailProps = {
  links: SocialLink[];
  className?: string;
};

export function SocialRail({ links, className }: SocialRailProps) {
  return (
    <div
      className={cn("hidden flex-col items-center gap-4 xl:flex", className)}
    >
      <ul className="flex flex-col items-center gap-4">
        {links.map((link) => (
          <li key={link.icon}>
            <a
              href={link.href}
              aria-label={link.label}
              {...newTabProps(link.href)}
              className="grid size-8 place-items-center rounded-full border border-line-dark-strong bg-text-on-dark text-surface-900 transition-colors duration-120 ease-out-expo hover:border-accent-bright hover:bg-accent-bright"
            >
              <SocialIcon icon={link.icon} className="size-4" />
            </a>
          </li>
        ))}
      </ul>
      <span aria-hidden="true" className="h-24 w-px bg-line-dark" />
    </div>
  );
}
