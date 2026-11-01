import Link from "next/link";
import type { ComponentProps } from "react";

import { cn } from "@/lib/cn";

type BaseProps = {
  onPaper?: boolean;
};

type ButtonAsLink = BaseProps &
  Omit<ComponentProps<typeof Link>, "href"> & { href: string };

type ButtonAsButton = BaseProps &
  ComponentProps<"button"> & { href?: undefined };

export type ButtonProps = ButtonAsLink | ButtonAsButton;

export function Button({ onPaper, className, ...props }: ButtonProps) {
  const classes = cn(
    "relative isolate inline-flex items-center justify-center gap-2 border border-accent px-4 py-2.5 text-label",
    "transition-colors duration-160 ease-out-expo not-disabled:hover:text-paper not-disabled:hover:delay-40 not-disabled:hover:duration-240",
    "before:absolute before:inset-0 before:-z-10 before:origin-left before:scale-x-0 before:bg-accent before:transition-transform before:duration-160 before:ease-out-expo not-disabled:hover:before:scale-x-100 not-disabled:hover:before:duration-240",
    "motion-reduce:before:hidden motion-reduce:duration-120 motion-reduce:not-disabled:hover:bg-accent motion-reduce:not-disabled:hover:delay-0 motion-reduce:not-disabled:hover:duration-120",
    "disabled:border-line-dark disabled:bg-transparent disabled:text-text-on-dark-muted disabled:cursor-default",
    onPaper
      ? "text-text-on-paper uppercase focus-visible:outline-accent"
      : "text-text-on-dark",
    className,
  );

  if (props.href !== undefined) {
    return <Link className={classes} {...props} />;
  }

  const { type = "button", ...rest } = props;
  return (
    <button type={type} className={cn(classes, "cursor-pointer")} {...rest} />
  );
}
