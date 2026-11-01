import type { CSSProperties } from "react";

import { RiseIn } from "@/components/sections/RiseIn";
import { SkillIcon } from "@/components/sections/SkillIcon";
import { cn } from "@/lib/cn";
import { skillDelay } from "@/lib/motion";
import type { SkillGroup } from "@/types/skills";

export type SkillListProps = {
  groups: SkillGroup[];
};

const riseClass =
  "motion-safe:group-data-[stage=armed]/rise:translate-y-2 motion-safe:group-data-[stage=armed]/rise:opacity-0 motion-safe:group-data-[stage=in]/rise:transition-[opacity,translate] motion-safe:group-data-[stage=in]/rise:duration-(--rise-duration) motion-safe:group-data-[stage=in]/rise:ease-(--rise-ease) motion-safe:group-data-[stage=in]/rise:delay-(--rise-delay)";

const delay = (group: number, index: number) =>
  ({
    "--rise-delay": `${Math.round(skillDelay(group, index) * 1000)}ms`,
  }) as CSSProperties;

export function SkillList({ groups }: SkillListProps) {
  return (
    <RiseIn className="grid grid-cols-3 gap-x-8 gap-y-16 max-[1000px]:grid-cols-2 max-[480px]:grid-cols-1 max-[480px]:gap-8">
      {groups.map((group, g) => (
        <div key={group.label}>
          <h3
            style={delay(g, 0)}
            className={cn(
              "mb-6 text-[12px]/4 tracking-[0.16em] text-text-on-dark-muted uppercase",
              riseClass,
            )}
          >
            {group.label}
          </h3>
          <ul className="grid gap-4">
            {group.skills.map((skill, i) => (
              <li
                key={skill.name}
                style={delay(g, i)}
                className={cn(
                  "group/skill flex items-center gap-4 text-[15px]/5 text-text-on-dark",
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
