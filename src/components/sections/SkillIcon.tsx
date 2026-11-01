import type { SkillIcon as SkillIconData } from "@/types/skills";

export function SkillIcon({ icon }: { icon: SkillIconData }) {
  if (icon.set === "lucide") {
    const Glyph = icon.icon;
    return <Glyph aria-hidden="true" size={16} strokeWidth={2} />;
  }

  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      className="size-4"
    >
      <path d={icon.icon.path} />
    </svg>
  );
}
