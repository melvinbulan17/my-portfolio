"use client";

import {
  type CSSProperties,
  type ReactNode,
  useEffect,
  useRef,
  useState,
} from "react";

import { RiseIn } from "@/components/sections/RiseIn";
import { constellationDraw } from "@/lib/motion";

export type ExperienceConstellationProps = {
  children: ReactNode;
};

export function ExperienceConstellation({
  children,
}: ExperienceConstellationProps) {
  const listRef = useRef<HTMLOListElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const [path, setPath] = useState("");

  useEffect(() => {
    const list = listRef.current;
    const svg = svgRef.current;
    if (!list || !svg) return;

    const measure = () => {
      const origin = svg.getBoundingClientRect();
      const points = Array.from(list.querySelectorAll("[data-star]")).map(
        (star) => {
          const box = star.getBoundingClientRect();
          const x = box.left + box.width / 2 - origin.left;
          const y = box.top + box.height / 2 - origin.top;
          return `${x.toFixed(1)} ${y.toFixed(1)}`;
        },
      );
      setPath(points.length > 1 ? `M${points.join("L")}` : "");
    };
    measure();

    if (!("ResizeObserver" in window)) return;
    const resize = new ResizeObserver(measure);
    resize.observe(list);
    return () => resize.disconnect();
  }, []);

  return (
    <RiseIn className="relative">
      <svg
        ref={svgRef}
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 size-full overflow-visible"
      >
        {path && (
          <path
            d={path}
            pathLength={1}
            fill="none"
            strokeWidth={1}
            style={
              { "--draw": `${constellationDraw * 1000}ms` } as CSSProperties
            }
            className="stroke-line-dark-strong motion-safe:[stroke-dasharray:1] motion-safe:group-data-[stage=armed]/rise:[stroke-dashoffset:1] motion-safe:group-data-[stage=in]/rise:transition-[stroke-dashoffset] motion-safe:group-data-[stage=in]/rise:duration-(--draw) motion-safe:group-data-[stage=in]/rise:ease-linear motion-safe:group-data-[stage=in]/rise:[stroke-dashoffset:0]"
          />
        )}
      </svg>
      <ol ref={listRef} className="relative">
        {children}
      </ol>
    </RiseIn>
  );
}
