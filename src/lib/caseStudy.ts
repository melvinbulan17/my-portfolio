import type { CaseStudy, CaseStudyBlock } from "@/types/site";

export const caseStudySections = [
  { id: "overview", title: "Overview" },
  { id: "problem", title: "Problem & Context" },
  { id: "approach", title: "Approach" },
  { id: "implementation", title: "Implementation" },
  { id: "challenges", title: "Challenges" },
  { id: "testing", title: "Testing" },
  { id: "outcome", title: "Outcome" },
] as const;

export type CaseStudySectionId = (typeof caseStudySections)[number]["id"];

export type CaseStudySection = {
  id: CaseStudySectionId;
  title: string;
  blocks: CaseStudyBlock[];
};

export function sectionsOf({ sections }: CaseStudy): CaseStudySection[] {
  return caseStudySections.flatMap(({ id, title }) => {
    const blocks = sections[id];
    return blocks?.length ? [{ id, title, blocks }] : [];
  });
}
