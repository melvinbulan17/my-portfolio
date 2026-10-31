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
    "inline-flex items-center justify-center gap-2 border border-accent px-4 py-2.5 text-label",
    "transition-colors duration-120 ease-out-expo not-disabled:hover:bg-accent not-disabled:hover:text-paper",
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
