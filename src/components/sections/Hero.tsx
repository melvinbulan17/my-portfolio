import { TerminalCard } from "@/components/sections/TerminalCard";
import { Button } from "@/components/ui/Button";
import { TextLink } from "@/components/ui/TextLink";
import type { NavLink, TerminalLine } from "@/types/site";

export type HeroProps = {
  greeting: string;
  name: string;
  role: { lead: string; emphasis: string };
  intro: string;
  primaryAction: NavLink;
  secondaryAction: NavLink;
  terminalLines: TerminalLine[];
};

export function Hero({
  greeting,
  name,
  role,
  intro,
  primaryAction,
  secondaryAction,
  terminalLines,
}: HeroProps) {
  return (
    <section className="relative flex flex-col justify-center pt-24 pb-32 lg:flex-1">
      <div aria-hidden="true" className="hero-grid" />
      <div className="relative wrap grid grid-cols-[1.6fr_1fr] items-center gap-16 max-[760px]:grid-cols-1">
        <div>
          <p className="mb-4 text-eyebrow text-text-on-dark-muted">
            {greeting}
          </p>
          <h1 className="text-display tracking-[-0.01em] max-[760px]:text-[40px]/12">
            {name}
          </h1>
          <p className="mt-2 text-role max-[760px]:text-[24px]/8">
            <span className="inline-block [clip-path:inset(0)]">
              <span className="inline-block motion-safe:animate-reveal">
                {role.lead}
              </span>
            </span>{" "}
            <span className="inline-block [clip-path:inset(0)]">
              <em className="relative inline-block text-accent not-italic [--reveal-at:150ms] motion-safe:animate-reveal">
                {role.emphasis}
                <span
                  aria-hidden="true"
                  data-underline
                  className="absolute inset-x-0 bottom-0.5 h-0.5 origin-left bg-accent [--reveal-at:450ms] motion-safe:animate-draw"
                />
              </em>
            </span>
          </p>
          <p className="mt-8 max-w-[520px] text-text-on-dark-muted">{intro}</p>
          <div className="mt-8 flex flex-wrap items-center gap-8">
            <Button href={primaryAction.href}>{primaryAction.label}</Button>
            <TextLink href={secondaryAction.href}>
              {secondaryAction.label}
            </TextLink>
          </div>
        </div>
        <TerminalCard lines={terminalLines} />
      </div>
    </section>
  );
}
