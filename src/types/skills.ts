import type { LucideIcon } from "lucide-react";
import type { SimpleIcon } from "simple-icons";

export type SkillIcon =
  | { set: "simple-icons"; icon: SimpleIcon }
  | { set: "lucide"; icon: LucideIcon };

export type Skill = {
  name: string;
  icon: SkillIcon;
};

export type SkillGroup = {
  label: string;
  skills: Skill[];
};
