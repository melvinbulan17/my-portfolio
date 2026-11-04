import { RevealHeading } from "@/components/sections/RevealHeading";
import { SkillList } from "@/components/sections/SkillList";
import type { SkillGroup } from "@/types/skills";

export type SkillsProps = {
  groups: SkillGroup[];
};

export function Skills({ groups }: SkillsProps) {
  return (
    <section
      id="tools"
      aria-labelledby="tools-heading"
      className="border-t border-line-dark py-24 max-[760px]:py-16"
    >
      <div className="wrap">
        <RevealHeading id="tools-heading" number="04." title="Tools & Skills" />
        <SkillList groups={groups} />
      </div>
    </section>
  );
}
