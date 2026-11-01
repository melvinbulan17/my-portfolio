export type MoonWordProps = {
  word: string;
  label: string;
  text: string;
};

const draw =
  "[stroke-dasharray:1] [stroke-dashoffset:1] transition-[stroke-dashoffset] duration-160 ease-out-expo group-hover/moon:[stroke-dashoffset:0] group-hover/moon:duration-480 motion-reduce:transition-none";

export function MoonWord({ word, label, text }: MoonWordProps) {
  return (
    <span data-moon className="group/moon relative inline-block cursor-default">
      {word}
      <span
        aria-hidden="true"
        data-note
        className="pointer-events-none absolute right-0 bottom-[calc(100%-0.1em)] flex flex-col items-end max-[1099px]:hidden"
      >
        <span className="translate-y-1 text-right text-[13px]/5 font-normal tracking-normal whitespace-nowrap text-text-on-dark-muted opacity-0 transition-[opacity,translate] duration-160 ease-out-expo group-hover/moon:translate-y-0 group-hover/moon:opacity-100 group-hover/moon:duration-240 motion-reduce:translate-y-0 motion-reduce:transition-none">
          <span className="block text-accent-bright">{label}</span>
          <span className="block">{text}</span>
        </span>
        <svg
          viewBox="0 0 40 30"
          fill="none"
          stroke="currentColor"
          strokeWidth={1.5}
          strokeLinecap="round"
          strokeLinejoin="round"
          className="mt-1 mr-11 h-10 w-[54px] text-accent-bright"
        >
          <path
            pathLength={1}
            d="M36 2c-2 7-12 4-15 10-3 5 2 9-4 13-3 2-7 2-10 2"
            className={`${draw} group-hover/moon:delay-80`}
          />
          <path
            pathLength={1}
            d="M11 22l-4 5 6 2"
            className={`${draw} group-hover/moon:delay-400`}
          />
        </svg>
      </span>
    </span>
  );
}
