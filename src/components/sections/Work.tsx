import { ProjectCard } from "@/components/sections/ProjectCard";
import { SectionHeading } from "@/components/ui/SectionHeading";
import type { Project } from "@/types/site";

export type WorkProps = {
  projects: Project[];
};

export function Work({ projects }: WorkProps) {
  return (
    <section id="work" className="bg-surface-900 py-32 max-[760px]:py-16">
      <div className="wrap">
        <SectionHeading number="01." title="Work" />
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
