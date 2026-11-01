import { Hero } from "@/components/sections/Hero";
import { Marquee } from "@/components/sections/Marquee";
import { Skills } from "@/components/sections/Skills";
import { Work } from "@/components/sections/Work";
import { disciplines, hero, projects, terminalLines } from "@/content/site";
import { skillGroups } from "@/content/skills";

export default function Home() {
  return (
    <main className="flex-1">
      <div className="flex flex-col lg:min-h-[calc(100dvh-6rem)]">
        <Hero {...hero} terminalLines={terminalLines} />
      </div>
      <Marquee items={disciplines} />
      <Work projects={projects} />
      <Skills groups={skillGroups} />
    </main>
  );
}
