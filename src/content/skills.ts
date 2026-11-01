import {
  BadgeCheck,
  BookMarked,
  Bot,
  CalendarSync,
  ChartGantt,
  ClipboardCheck,
  FileBadge2,
  FileKey2,
  FileText,
  Kanban,
  ListChecks,
  type LucideIcon,
  MousePointerClick,
  Repeat2,
  ScrollText,
  ShieldCheck,
  Workflow,
} from "lucide-react";
import {
  type SimpleIcon,
  siConfluence,
  siGitea,
  siGithub,
  siGitlab,
  siHtml5,
  siJira,
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
    label: "Project management",
    skills: [
      glyph("YouTrack", Kanban),
      logo("Jira", siJira),
      logo("Confluence", siConfluence),
      glyph("Agile / Scrum", Repeat2),
      glyph("Waterfall", ChartGantt),
      glyph("Sprint planning & retros", CalendarSync),
    ],
  },
  {
    label: "Quality & testing",
    skills: [
      glyph("SDLC", Workflow),
      glyph("STLC (ISTQB)", ListChecks),
      glyph("Test management", ClipboardCheck),
      glyph("Test case specification", FileText),
      glyph("Manual testing", MousePointerClick),
      glyph("Test automation", Bot),
    ],
  },
  {
    label: "PKI domain",
    skills: [
      glyph("X.509 certificates", FileBadge2),
      glyph("CA / RA", ShieldCheck),
      glyph("CSR", FileKey2),
      glyph("OCSP / CRL", BadgeCheck),
      glyph("RFCs", ScrollText),
    ],
  },
  {
    label: "Tooling",
    skills: [
      logo("GitHub", siGithub),
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
