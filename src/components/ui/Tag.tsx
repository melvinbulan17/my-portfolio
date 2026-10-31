import { cn } from "@/lib/cn";

export function TagList({
  tags,
  className,
}: {
  tags: string[];
  className?: string;
}) {
  return (
    <ul className={cn("flex flex-wrap gap-2", className)}>
      {tags.map((tag) => (
        <li
          key={tag}
          className="bg-tag px-3 py-1.5 text-[12px]/4 font-semibold text-on-tag uppercase"
        >
          {tag}
        </li>
      ))}
    </ul>
  );
}
