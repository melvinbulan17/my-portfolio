import Link from "next/link";
import type { ComponentProps } from "react";

import { cn } from "@/lib/cn";

export type TextLinkProps = ComponentProps<typeof Link> & {
  onPaper?: boolean;
};

export function TextLink({ onPaper, className, ...props }: TextLinkProps) {
  return (
    <Link
      className={cn(
        "relative text-label",
        "before:absolute before:inset-x-0 before:-bottom-1 before:h-px before:origin-left before:scale-x-0 before:bg-current before:transition-transform before:duration-160 before:ease-out-expo hover:before:scale-x-100 hover:before:duration-240",
        "motion-reduce:before:transition-none",
        onPaper
          ? "text-accent focus-visible:outline-accent"
          : "text-accent-bright",
        className,
      )}
      {...props}
    />
  );
}
