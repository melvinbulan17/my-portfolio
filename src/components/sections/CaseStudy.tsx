import { ArrowLeft, ArrowUpRight } from "lucide-react";
import Image from "next/image";
import type { CSSProperties, ReactNode } from "react";

import { CaseStudyContents } from "@/components/sections/CaseStudyContents";
import { RiseIn } from "@/components/sections/RiseIn";
import { Button } from "@/components/ui/Button";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { TextLink } from "@/components/ui/TextLink";
import { sectionsOf } from "@/lib/caseStudy";
import { cn } from "@/lib/cn";
import { arrive, drawLine } from "@/lib/motion";
import type {
  CaseStudy as CaseStudyContent,
  CaseStudyBlock,
} from "@/types/site";

const settle =
  "motion-safe:group-data-[stage=armed]/rise:scale-[0.97] motion-safe:group-data-[stage=armed]/rise:opacity-0 motion-safe:group-data-[stage=in]/rise:transition-[opacity,scale] motion-safe:group-data-[stage=in]/rise:duration-900 motion-safe:group-data-[stage=in]/rise:ease-out-expo motion-safe:group-data-[stage=in]/rise:delay-(--rise-delay)";
const unroll =
  "motion-safe:group-data-[stage=armed]/rise:[clip-path:inset(0_0_100%_0)] motion-safe:group-data-[stage=in]/rise:[clip-path:inset(0_0_0_0)] motion-safe:group-data-[stage=in]/rise:transition-[clip-path] motion-safe:group-data-[stage=in]/rise:duration-1200 motion-safe:group-data-[stage=in]/rise:ease-[cubic-bezier(0.65,0,0.35,1)]";
const bullets = "grid list-disc gap-3 pl-5 marker:text-accent-bright";
const row = "border-b border-line-dark py-3";

const stagger = (index: number) =>
  ({ "--rise-delay": `${index * 70}ms` }) as CSSProperties;

const loadAt = (ms: number) => ({ "--load-at": `${ms}ms` }) as CSSProperties;

function withCode(text: string) {
  return text.split(/`([^`]+)`/).map((part, index) =>
    index % 2 === 1 ? (
      <code key={part} className="text-accent-bright">
        {part}
      </code>
    ) : (
      part
    ),
  );
}

function Outbound({ children }: { children: ReactNode }) {
  return (
    <>
      {children}
      <ArrowUpRight
        aria-hidden="true"
        className="ml-1 inline size-3.5 align-[-0.125rem]"
      />
    </>
  );
}

function BulletList({ items }: { items: string[] }) {
  return (
    <ul className={bullets}>
      {items.map((item, index) => (
        <li key={item} style={stagger(index + 1)} className={arrive}>
          {item}
        </li>
      ))}
    </ul>
  );
}

function Block({ block }: { block: CaseStudyBlock }) {
  switch (block.kind) {
    case "text":
      return (
        <RiseIn>
          <p className={arrive}>{withCode(block.text)}</p>
        </RiseIn>
      );
    case "topic":
      return (
        <RiseIn>
          <h3 className={cn("mb-2 text-h3", arrive)}>{block.title}</h3>
          <p style={stagger(1)} className={arrive}>
            {block.text}
          </p>
        </RiseIn>
      );
    case "list":
      return (
        <RiseIn>
          <BulletList items={block.items} />
        </RiseIn>
      );
    case "points":
      return (
        <RiseIn>
          <h3 className={cn("mb-4 text-h3", arrive)}>{block.title}</h3>
          <BulletList items={block.points} />
        </RiseIn>
      );
    case "facts":
      return (
        <RiseIn>
          <dl>
            {block.facts.map(({ label, value }, index) => (
              <div
                key={label}
                style={stagger(index)}
                className={cn(
                  "grid grid-cols-[7.5rem_minmax(0,1fr)] gap-x-6 gap-y-1 max-[640px]:grid-cols-1",
                  row,
                  arrive,
                )}
              >
                <dt className="text-text-on-dark-muted">{label}</dt>
                <dd>{value}</dd>
              </div>
            ))}
          </dl>
        </RiseIn>
      );
    case "shots":
      return (
        <RiseIn className="flex items-start gap-6 max-[640px]:flex-col">
          {block.shots.map((shot, index) => (
            <div
              key={shot.src}
              style={{
                ...stagger(index * 2),
                flexGrow: shot.width / shot.height,
                flexBasis: 0,
              }}
              className={cn(
                "group/shot min-w-0 overflow-hidden max-[640px]:w-full",
                block.crop && "aspect-[16/10]",
                settle,
              )}
            >
              <Image
                src={shot.src}
                alt={shot.alt}
                width={shot.width}
                height={shot.height}
                sizes="(max-width: 760px) 100vw, (min-width: 1536px) 1260px, 720px"
                className="motion-safe:transition-transform motion-safe:duration-480 motion-safe:ease-out-expo motion-safe:group-hover/shot:scale-[1.02]"
              />
            </div>
          ))}
        </RiseIn>
      );
    case "figure":
      return (
        <RiseIn>
          <div
            tabIndex={0}
            role="group"
            aria-label={`${block.title}, scrolls sideways on small screens`}
            className={cn("overflow-x-auto", unroll)}
          >
            <Image
              src={block.src}
              alt={block.alt}
              width={block.width}
              height={block.height}
              sizes="(min-width: 1536px) 1260px, 720px"
              className="min-w-150"
            />
          </div>
          <p
            aria-hidden="true"
            className="mt-2 text-[0.75rem] text-text-on-dark-muted min-[641px]:hidden"
          >
            Scroll sideways to see the whole diagram →
          </p>
        </RiseIn>
      );
  }
}

export function CaseStudy(study: CaseStudyContent) {
  const { title, tagline, liveHref, codeHref, heroImage } = study;
  const sections = sectionsOf(study);
  const wideHero = heroImage.width > heroImage.height;

  return (
    <main className="flex-1">
      <header
        className={cn(
          "wrap grid gap-16 pt-16 pb-32 max-[760px]:gap-10 max-[760px]:pt-8 max-[760px]:pb-16",
          !wideHero &&
            "grid-cols-[1.5fr_1fr] items-center max-[760px]:grid-cols-1",
        )}
      >
        <div>
          <div className="motion-safe:animate-rise-in">
            <TextLink href="/#work" className="inline-flex items-center gap-2">
              <ArrowLeft aria-hidden="true" className="size-3.5" />
              All work
            </TextLink>
          </div>
          <h1 className="mt-10 overflow-hidden text-display tracking-[-0.01em] max-[760px]:text-[2.25rem]/11">
            <span className="block [--reveal-at:60ms] motion-safe:animate-reveal">
              {title}
            </span>
          </h1>
          <p
            style={loadAt(200)}
            className="mt-2 text-role text-balance motion-safe:animate-rise-in max-[1000px]:text-[1.75rem]/9"
          >
            {tagline}
          </p>
          <div
            style={loadAt(320)}
            className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-3 motion-safe:animate-rise-in"
          >
            {liveHref && <Button href={liveHref}>Live site</Button>}
            <TextLink href={codeHref}>
              <Outbound>Code</Outbound>
            </TextLink>
          </div>
        </div>
        <div
          className={cn(
            "overflow-hidden",
            !wideHero && "max-[760px]:mx-auto max-[760px]:max-w-[20rem]",
          )}
        >
          <Image
            src={heroImage.src}
            alt={heroImage.alt}
            width={heroImage.width}
            height={heroImage.height}
            priority
            sizes={
              wideHero
                ? "(max-width: 1120px) 100vw, (min-width: 1536px) 1848px, 1056px"
                : "(min-width: 1536px) 700px, 400px"
            }
            style={loadAt(240)}
            className="motion-safe:animate-settle"
          />
        </div>
      </header>

      <div className="wrap grid grid-cols-[15rem_minmax(0,45rem)] gap-24 pb-32 max-[1000px]:grid-cols-1 max-[760px]:pb-16">
        <CaseStudyContents
          sections={sections.map(({ id, title: name }) => ({
            id,
            title: name,
          }))}
          className="max-[1000px]:hidden"
        />

        <article className="grid w-full max-w-180 min-w-0 grid-cols-1 gap-24 max-[1000px]:mx-auto max-[760px]:gap-16">
          {sections.map((section, index) => (
            <section key={section.id} aria-labelledby={section.id}>
              <RiseIn>
                <SectionHeading
                  id={section.id}
                  number={`${String(index + 1).padStart(2, "0")}.`}
                  title={section.title}
                  className={cn("mb-8", arrive)}
                  lineClassName={drawLine}
                />
              </RiseIn>
              <div className="grid grid-cols-1 gap-8">
                {section.blocks.map((block, blockIndex) => (
                  <Block key={blockIndex} block={block} />
                ))}
              </div>
            </section>
          ))}

          <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
            <Button href="/#work">Back to all work</Button>
            {liveHref && (
              <TextLink href={liveHref}>
                <Outbound>Live site</Outbound>
              </TextLink>
            )}
            <TextLink href={codeHref}>
              <Outbound>Code</Outbound>
            </TextLink>
          </div>
        </article>
      </div>
    </main>
  );
}
