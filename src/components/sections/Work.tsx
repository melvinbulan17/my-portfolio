import { ProjectCard } from "@/components/sections/ProjectCard";
import { SectionHeading } from "@/components/ui/SectionHeading";
import type { Project } from "@/types/site";

export type WorkProps = {
  projects: Project[];
};

export function Work({ projects }: WorkProps) {
  return (
    <section
      id="work"
      className="bg-paper py-32 text-text-on-paper max-[760px]:py-16"
    >
      <div className="wrap">
        <SectionHeading number="01." title="Work" onPaper />
        <div className="grid gap-24">
          {projects.map((project, index) => (
            <ProjectCard
              key={project.title}
              {...project}
              flip={index % 2 === 1}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
