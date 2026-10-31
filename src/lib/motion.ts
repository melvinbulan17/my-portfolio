export const ease = [0.16, 1, 0.3, 1] as const;

export const duration = {
  fast: 0.12,
  base: 0.24,
  slow: 0.48,
} as const;

export const typeChar = 0.038;

export const marqueeLoop = 48;

export const skillDelay = (group: number, index: number) =>
  group * 0.06 + index * 0.05;
