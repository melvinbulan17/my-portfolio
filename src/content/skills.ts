import {
  BadgeCheck,
  BookMarked,
  BookOpen,
  ClipboardCheck,
  FileBadge2,
  FileKey2,
  FileText,
  History,
  Kanban,
  ListChecks,
  type LucideIcon,
  MessagesSquare,
  Repeat2,
  ShieldCheck,
} from "lucide-react";
import {
  type SimpleIcon,
  siGitea,
  siGitlab,
  siHtml5,
  siOpenjdk,
  siTailwindcss,
  siTeamcity,
  siTypescript,
} from "simple-icons";

import type { Skill, SkillGroup } from "@/types/skills";

const logo = (name: string, icon: SimpleIcon): Skill => ({
  name,
  icon: { set: "simple-icons", icon },
});

const glyph = (name: string, icon: LucideIcon): Skill => ({
  name,
  icon: { set: "lucide", icon },
});

export const skillGroups: SkillGroup[] = [
  {
    label: "Project delivery",
    skills: [
      glyph("YouTrack", Kanban),
      glyph("Agile / Scrum", Repeat2),
      glyph("Retros & check-ins", MessagesSquare),
      glyph("Knowledge bases", BookOpen),
    ],
  },
  {
    label: "Quality & testing",
    skills: [
      glyph("ISTQB test lifecycle", ListChecks),
      glyph("Test case specification", FileText),
      glyph("Test management", ClipboardCheck),
      glyph("Regression testing", History),
    ],
  },
  {
    label: "PKI domain",
    skills: [
      glyph("X.509 certificates", FileBadge2),
      glyph("CA / RA", ShieldCheck),
      glyph("CSR", FileKey2),
      glyph("OCSP / CRL", BadgeCheck),
    ],
  },
  {
    label: "Tooling",
    skills: [
      logo("GitLab", siGitlab),
      logo("Gitea", siGitea),
      logo("TeamCity", siTeamcity),
      glyph("Zensical docs", BookMarked),
    ],
  },
  {
    label: "Building with",
    skills: [
      logo("TypeScript", siTypescript),
      logo("Tailwind CSS", siTailwindcss),
      logo("HTML & CSS", siHtml5),
      logo("Java", siOpenjdk),
    ],
  },
];
