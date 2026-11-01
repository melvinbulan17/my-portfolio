export type MarqueeProps = {
  items: string[];
  label?: string;
};

function List({ items, hidden }: { items: string[]; hidden?: boolean }) {
  return (
    <ul
      aria-hidden={hidden || undefined}
      className="flex flex-none items-center"
    >
      {items.map((item) => (
        <li
          key={item}
          className="flex items-center text-[20px]/7 font-semibold tracking-[0.04em] whitespace-nowrap uppercase after:mx-8 after:size-2 after:bg-accent after:content-['']"
        >
          {item}
        </li>
      ))}
    </ul>
  );
}

export function Marquee({ items, label = "Disciplines" }: MarqueeProps) {
  return (
    <section
      aria-label={label}
      className="group overflow-hidden border-y border-line-dark bg-surface-800 py-6"
    >
      <div className="flex w-max motion-safe:animate-marquee motion-safe:group-hover:[animation-play-state:paused]">
        <List items={items} />
        <List items={items} hidden />
      </div>
    </section>
  );
}
