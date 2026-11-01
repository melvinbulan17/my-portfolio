import { SkillList } from "@/components/sections/SkillList";
import { SectionHeading } from "@/components/ui/SectionHeading";
import type { SkillGroup } from "@/types/skills";

export type SkillsProps = {
  groups: SkillGroup[];
};

export function Skills({ groups }: SkillsProps) {
  return (
    <section
      id="tools"
      aria-labelledby="tools-heading"
      className="py-32 max-[760px]:py-16"
    >
      <div className="wrap">
        <SectionHeading
          id="tools-heading"
          number="04."
          title="Tools & Skills"
        />
        <SkillList groups={groups} />
      </div>
    </section>
  );
}
