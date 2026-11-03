"use client";

import { ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";

import { cn } from "@/lib/cn";

export type CaseStudyContentsProps = {
  sections: { id: string; title: string }[];
  className?: string;
};

export function CaseStudyContents({
  sections,
  className,
}: CaseStudyContentsProps) {
  const [active, setActive] = useState<string>();

  useEffect(() => {
    if (!("IntersectionObserver" in window)) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActive(
              entry.target.getAttribute("aria-labelledby") ?? undefined,
            );
          }
        }
      },
      { rootMargin: "-25% 0px -70% 0px" },
    );
    for (const section of document.querySelectorAll(
      "section[aria-labelledby]",
    )) {
      observer.observe(section);
    }
    return () => observer.disconnect();
  }, []);

  return (
    <nav aria-label="On this page" className={className}>
      <ul className="sticky top-32 grid gap-3 text-label font-normal text-text-on-dark-muted">
        {sections.map(({ id, title }) => {
          const current = id === active;
          return (
            <li key={id}>
              <a
                href={`#${id}`}
                aria-current={current ? "true" : undefined}
                className={cn(
                  "relative inline-block transition-[color,translate] duration-240 ease-out-expo hover:text-accent-bright",
                  current && "translate-x-5 text-accent-bright",
                )}
              >
                <ChevronRight
                  aria-hidden="true"
                  className={cn(
                    "absolute top-1/2 -left-5 size-3.5 -translate-y-1/2 transition-opacity duration-240 ease-out-expo",
                    current ? "opacity-100" : "opacity-0",
                  )}
                />
                {title}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
