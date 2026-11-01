import { Hero } from "@/components/sections/Hero";
import { Marquee } from "@/components/sections/Marquee";
import { disciplines, hero, terminalLines } from "@/content/site";

export default function Home() {
  return (
    <main className="flex-1">
      <div className="flex flex-col lg:min-h-[calc(100dvh-6rem)]">
        <Hero {...hero} terminalLines={terminalLines} />
        <Marquee items={disciplines} />
      </div>
    </main>
  );
}
