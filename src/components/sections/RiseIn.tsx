"use client";

import {
  type CSSProperties,
  type ReactNode,
  useEffect,
  useRef,
  useState,
} from "react";

import { cn } from "@/lib/cn";
import { duration, ease } from "@/lib/motion";

export type RiseInProps = {
  children: ReactNode;
  className?: string;
};

export const riseClass =
  "motion-safe:group-data-[stage=armed]/rise:translate-y-2 motion-safe:group-data-[stage=armed]/rise:opacity-0 motion-safe:group-data-[stage=in]/rise:transition-[opacity,translate] motion-safe:group-data-[stage=in]/rise:duration-(--rise-duration) motion-safe:group-data-[stage=in]/rise:ease-(--rise-ease) motion-safe:group-data-[stage=in]/rise:delay-(--rise-delay)";

type Stage = "rest" | "armed" | "in";

const timing = {
  "--rise-duration": `${duration.slow * 1000}ms`,
  "--rise-ease": `cubic-bezier(${ease.join(", ")})`,
} as CSSProperties;

export function RiseIn({ children, className }: RiseInProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [stage, setStage] = useState<Stage>("rest");

  useEffect(() => {
    const root = ref.current;
    if (!root || !("IntersectionObserver" in window)) return;

    setStage("armed");
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          setStage("in");
          observer.disconnect();
        }
      },
      { threshold: 0.2 },
    );
    observer.observe(root);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      data-stage={stage}
      style={timing}
      className={cn("group/rise", className)}
    >
      {children}
    </div>
  );
}
