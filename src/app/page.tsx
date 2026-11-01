import { Hero } from "@/components/sections/Hero";
import { Marquee } from "@/components/sections/Marquee";
import { Work } from "@/components/sections/Work";
import { disciplines, hero, projects, terminalLines } from "@/content/site";

export default function Home() {
  return (
    <main className="flex-1">
      <div className="flex flex-col lg:min-h-[calc(100dvh-6rem)]">
        <Hero {...hero} terminalLines={terminalLines} />
      </div>
      <Marquee items={disciplines} />
      <Work projects={projects} />
    </main>
  );
}
