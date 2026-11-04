import {
  BadgeCheck,
  Bot,
  CalendarSync,
  ChartGantt,
  ClipboardCheck,
  FileBadge2,
  FileKey2,
  Grid2x2,
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
  siNextdotjs,
  siOpenjdk,
  siPostman,
  siSelenium,
  siSwagger,
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
      glyph("SDLC", Workflow),
      glyph("STLC", ListChecks),
      glyph("Agile / Scrum", Repeat2),
      glyph("Waterfall", ChartGantt),
      glyph("Sprint planning & retros", CalendarSync),
    ],
  },
  {
    label: "Testing",
    skills: [
      glyph("Test management", ClipboardCheck),
      glyph("Manual testing", MousePointerClick),
      glyph("API testing", Bot),
      logo("Postman", siPostman),
      logo("Swagger", siSwagger),
      logo("Selenium", siSelenium),
    ],
  },
  {
    label: "PKI",
    skills: [
      glyph("X.509 certificates", FileBadge2),
      glyph("CSR", FileKey2),
      glyph("CA / RA", ShieldCheck),
      glyph("OCSP / CRL", BadgeCheck),
      glyph("RFCs", ScrollText),
    ],
  },
  {
    label: "Development",
    skills: [
      logo("TypeScript", siTypescript),
      logo("Next.js", siNextdotjs),
      logo("Java", siOpenjdk),
      logo("HTML & CSS", siHtml5),
      logo("Tailwind CSS", siTailwindcss),
    ],
  },
  {
    label: "Tools",
    skills: [
      glyph("YouTrack", Kanban),
      logo("Jira", siJira),
      logo("Confluence", siConfluence),
      logo("GitHub", siGithub),
      logo("GitLab", siGitlab),
      logo("Gitea", siGitea),
      logo("TeamCity", siTeamcity),
      glyph("Microsoft 365", Grid2x2),
    ],
  },
];
