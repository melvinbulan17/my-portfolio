import type { CSSProperties } from "react";

import { cn } from "@/lib/cn";
import { pageSparkles, pageStars, type Sparkle, type Star } from "@/lib/stars";

export type StarFieldProps = {
  stars?: Star[];
  sparkles?: Sparkle[];
  className?: string;
};

const sizes = {
  1: "size-px",
  2: "size-0.5",
  3: "size-[3px] shadow-[0_0_4px_1px_rgb(230_232_236/0.35)]",
};

export function StarField({
  stars = pageStars,
  sparkles = pageSparkles,
  className,
}: StarFieldProps) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        "pointer-events-none absolute inset-x-0 top-8 bottom-0 -z-10 overflow-hidden",
        className,
      )}
    >
      {stars.map((star, index) => (
        <span
          key={index}
          data-star={star.size}
          data-twinkle={star.twinkle || undefined}
          style={
            {
              left: `${star.x}%`,
              top: `${star.y}%`,
              "--star-opacity": star.opacity,
              "--star-delay": `${star.delay}ms`,
              "--star-appear": `${star.appear}ms`,
            } as CSSProperties
          }
          className={cn(
            "absolute rounded-full bg-text-on-dark opacity-(--star-opacity)",
            sizes[star.size],
            star.twinkle
              ? "motion-safe:animate-[star-in_1.2s_var(--ease-out-expo)_var(--star-appear)_backwards,twinkle_5s_ease-in-out_var(--star-delay)_infinite_alternate]"
              : "motion-safe:animate-star-in",
          )}
        />
      ))}
      {sparkles.map((sparkle, index) => (
        <svg
          key={`sparkle-${index}`}
          data-sparkle
          viewBox="0 0 12 12"
          style={
            {
              left: `${sparkle.x}%`,
              top: `${sparkle.y}%`,
              width: sparkle.size,
              height: sparkle.size,
              "--star-opacity": sparkle.opacity,
              "--star-delay": `${sparkle.delay}ms`,
              "--star-appear": `${Math.round(sparkle.y * 20 + 300)}ms`,
            } as CSSProperties
          }
          className="absolute fill-text-on-dark opacity-(--star-opacity) motion-safe:animate-[star-in_1.2s_var(--ease-out-expo)_var(--star-appear)_backwards,twinkle_6s_ease-in-out_var(--star-delay)_infinite_alternate]"
        >
          <path d="M6 0c.4 3.2 2.4 5.6 6 6-3.6.4-5.6 2.8-6 6-.4-3.2-2.4-5.6-6-6 3.6-.4 5.6-2.8 6-6Z" />
        </svg>
      ))}
    </div>
  );
}
