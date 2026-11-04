import { RiseIn } from "@/components/sections/RiseIn";
import {
  SectionHeading,
  type SectionHeadingProps,
} from "@/components/ui/SectionHeading";
import { cn } from "@/lib/cn";
import { arrive, drawLine } from "@/lib/motion";

export function RevealHeading({
  className,
  lineClassName,
  ...heading
}: SectionHeadingProps) {
  return (
    <RiseIn>
      <SectionHeading
        {...heading}
        className={cn(arrive, className)}
        lineClassName={cn(drawLine, lineClassName)}
      />
    </RiseIn>
  );
}
