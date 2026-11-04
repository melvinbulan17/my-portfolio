import { cn } from "@/lib/cn";

export type SectionHeadingProps = {
  number: string;
  title: string;
  id?: string;
  onPaper?: boolean;
  className?: string;
  lineClassName?: string;
};

export function SectionHeading({
  number,
  title,
  id,
  onPaper,
  className,
  lineClassName,
}: SectionHeadingProps) {
  return (
    <div className={cn("mb-16 flex items-baseline gap-4", className)}>
      <span
        aria-hidden="true"
        className={cn(
          "text-[1.25rem]",
          onPaper ? "text-accent" : "text-accent-bright",
        )}
      >
        {number}
      </span>
      <h2 id={id} className={cn("text-h2", onPaper && "text-accent")}>
        {title}
      </h2>
      <span
        aria-hidden="true"
        className={cn(
          "h-px flex-1 -translate-y-1.5",
          onPaper ? "bg-line-paper" : "bg-line-dark",
          lineClassName,
        )}
      />
    </div>
  );
}
