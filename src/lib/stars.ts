export type Star = {
  x: number;
  y: number;
  size: 1 | 2 | 3;
  opacity: number;
  twinkle: boolean;
  delay: number;
  appear: number;
};

export type Sparkle = {
  x: number;
  y: number;
  size: number;
  opacity: number;
  delay: number;
};

function random(seed: number) {
  let state = seed;
  return () => {
    state = (state * 1664525 + 1013904223) % 4294967296;
    return state / 4294967296;
  };
}

const round = (value: number, places = 1) =>
  Math.round(value * 10 ** places) / 10 ** places;

export const fade = (y: number) => 1 - 0.85 * (y / 100);

export function makeStars(count: number, seed: number): Star[] {
  const next = random(seed);
  return Array.from({ length: count }, (_, index) => {
    const x = round(next() * 100);
    const y = round(100 * next() ** 2.5);
    const roll = next();
    const size = roll > 0.92 ? 3 : roll > 0.65 ? 2 : 1;
    const base = size === 1 ? 0.45 + next() * 0.3 : 0.6 + next() * 0.3;
    return {
      x,
      y,
      size,
      opacity: round(base * fade(y), 2),
      twinkle: index % 4 === 0,
      delay: Math.round(next() * 6000),
      appear: Math.round(y * 20 + next() * 600),
    };
  });
}

export function makeSparkles(count: number, seed: number): Sparkle[] {
  const next = random(seed);
  return Array.from({ length: count }, () => {
    const y = round(100 * next() ** 3);
    return {
      x: round(4 + next() * 92),
      y,
      size: Math.round(9 + next() * 5),
      opacity: round((0.55 + next() * 0.25) * fade(y), 2),
      delay: Math.round(next() * 6000),
    };
  });
}

export const pageStars = makeStars(170, 17);

export const pageSparkles = makeSparkles(7, 29);
