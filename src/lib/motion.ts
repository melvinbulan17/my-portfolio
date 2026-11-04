export const ease = [0.16, 1, 0.3, 1] as const;

export const duration = {
  fast: 0.12,
  base: 0.24,
  slow: 0.48,
} as const;

export const typeChar = 0.024;

export const cardTextDelay = 0.08;

export const marqueeLoop = 48;

export const skillDelay = (group: number, index: number) =>
  group * 0.06 + index * 0.05;

export const sideProjectDelay = (index: number) => index * 0.06;

export const riseClass =
  "motion-safe:group-data-[stage=armed]/rise:translate-y-2 motion-safe:group-data-[stage=armed]/rise:opacity-0 motion-safe:group-data-[stage=in]/rise:transition-[opacity,translate] motion-safe:group-data-[stage=in]/rise:duration-(--rise-duration) motion-safe:group-data-[stage=in]/rise:ease-(--rise-ease) motion-safe:group-data-[stage=in]/rise:delay-(--rise-delay)";

export const arrive =
  "motion-safe:group-data-[stage=armed]/rise:translate-y-6 motion-safe:group-data-[stage=armed]/rise:opacity-0 motion-safe:group-data-[stage=in]/rise:transition-[opacity,translate] motion-safe:group-data-[stage=in]/rise:duration-700 motion-safe:group-data-[stage=in]/rise:ease-out-expo motion-safe:group-data-[stage=in]/rise:delay-(--rise-delay)";

export const drawLine =
  "origin-left motion-safe:group-data-[stage=armed]/rise:scale-x-0 motion-safe:group-data-[stage=in]/rise:transition-[scale] motion-safe:group-data-[stage=in]/rise:delay-150 motion-safe:group-data-[stage=in]/rise:duration-900 motion-safe:group-data-[stage=in]/rise:ease-out-expo";

export const constellationDraw = 1.4;
