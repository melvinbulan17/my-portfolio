import type { CSSProperties } from "react";

import { ProjectCard } from "@/components/sections/ProjectCard";
import { RiseIn } from "@/components/sections/RiseIn";
import { SideProjectCard } from "@/components/sections/SideProjectCard";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { sideProjectDelay } from "@/lib/motion";
import type { Project, SideProject } from "@/types/site";

export type WorkProps = {
  projects: Project[];
  sideProjects: SideProject[];
};

const delay = (index: number) =>
  ({
    "--rise-delay": `${Math.round(sideProjectDelay(index) * 1000)}ms`,
  }) as CSSProperties;

export function Work({ projects, sideProjects }: WorkProps) {
  return (
    <section id="work" className="bg-surface-900 py-32 max-[760px]:py-16">
      <div className="wrap">
        <SectionHeading number="01." title="Selected Work" />
        <div className="grid gap-16 max-[760px]:gap-20">
          {projects.map((project, index) => (
            <ProjectCard
              key={project.title}
              {...project}
              flip={index % 2 === 1}
            />
          ))}
        </div>
        {sideProjects.length > 0 && (
          <div className="mt-32 max-[760px]:mt-20">
            <div className="mb-10 flex items-baseline gap-4">
              <h3 className="text-h3">Side projects</h3>
              <span
                aria-hidden="true"
                className="h-px flex-1 -translate-y-1 bg-line-dark"
              />
            </div>
            <RiseIn className="grid grid-cols-3 gap-6 max-[1000px]:grid-cols-2 max-[760px]:grid-cols-1">
              {sideProjects.map((project, index) => (
                <SideProjectCard
                  key={project.title}
                  {...project}
                  style={delay(index)}
                />
              ))}
            </RiseIn>
          </div>
        )}
      </div>
    </section>
  );
}
