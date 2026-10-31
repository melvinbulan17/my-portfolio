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
        "text-label underline-offset-4 hover:underline",
        onPaper
          ? "text-accent focus-visible:outline-accent"
          : "text-accent-bright",
        className,
      )}
      {...props}
    />
  );
}
