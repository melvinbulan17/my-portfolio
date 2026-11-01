import Link from "next/link";
import type { ComponentProps } from "react";

import { cn } from "@/lib/cn";
import { isAppRoute, newTabProps } from "@/lib/links";

export type TextLinkProps = Omit<ComponentProps<typeof Link>, "href"> & {
  href: string;
  onPaper?: boolean;
};

export function TextLink({ onPaper, className, ...props }: TextLinkProps) {
  const Anchor = isAppRoute(props.href) ? Link : "a";
  return (
    <Anchor
      className={cn(
        "relative text-label",
        "before:absolute before:inset-x-0 before:-bottom-1 before:h-px before:origin-left before:scale-x-0 before:bg-current before:transition-transform before:duration-160 before:ease-out-expo hover:before:scale-x-100 hover:before:duration-240",
        "motion-reduce:before:transition-none",
        onPaper
          ? "text-accent focus-visible:outline-accent"
          : "text-accent-bright",
        className,
      )}
      {...newTabProps(props.href)}
      {...props}
    />
  );
}
