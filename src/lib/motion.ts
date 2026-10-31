/** Motion constants shared by every animated component. */

/** Exponential ease-out. Everything that arrives uses it. */
export const ease = [0.16, 1, 0.3, 1] as const;

export const duration = {
  /** Hover and focus colour changes. */
  fast: 0.12,
  /** Menu panel, form status, a line landing. */
  base: 0.24,
  /** The skill list entrance. */
  slow: 0.48,
} as const;

/** Terminal typing speed, in seconds per character. */
export const typeChar = 0.038;

/** Seconds per marquee loop. */
export const marqueeLoop = 48;

/** Skill list stagger: 50ms down a column, 60ms across columns. */
export const skillDelay = (group: number, index: number) =>
  group * 0.06 + index * 0.05;
