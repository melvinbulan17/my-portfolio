import type { CSSProperties } from "react";

import { RiseIn } from "@/components/sections/RiseIn";
import { SkillIcon } from "@/components/sections/SkillIcon";
import { cn } from "@/lib/cn";
import { riseClass, skillDelay } from "@/lib/motion";
import type { SkillGroup } from "@/types/skills";

export type SkillListProps = {
  groups: SkillGroup[];
};

const delay = (group: number, index: number) =>
  ({
    "--rise-delay": `${Math.round(skillDelay(group, index) * 1000)}ms`,
  }) as CSSProperties;

export function SkillList({ groups }: SkillListProps) {
  return (
    <RiseIn className="grid gap-12">
      {groups.map((group, g) => (
        <div
          key={group.label}
          className="grid grid-cols-[13rem_1fr] gap-8 max-[760px]:grid-cols-1 max-[760px]:gap-5"
        >
          <h3 style={delay(g, 0)} className={cn("text-h3", riseClass)}>
            {group.label}
          </h3>
          <ul className="grid grid-cols-[repeat(auto-fill,minmax(14rem,1fr))] gap-x-6 gap-y-4">
            {group.skills.map((skill, i) => (
              <li
                key={skill.name}
                style={delay(g, i)}
                className={cn(
                  "group/skill flex items-center gap-4 text-[0.875rem]/5 text-text-on-dark",
                  riseClass,
                )}
              >
                <span className="grid size-9 flex-none place-items-center rounded-full border border-line-dark-strong text-text-on-dark-muted transition-colors duration-120 ease-out-expo group-hover/skill:border-accent group-hover/skill:bg-accent group-hover/skill:text-paper">
                  <SkillIcon icon={skill.icon} />
                </span>
                <span className="transition-transform duration-240 ease-out-expo group-hover/skill:translate-x-0.5">
                  {skill.name}
                </span>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </RiseIn>
  );
}
