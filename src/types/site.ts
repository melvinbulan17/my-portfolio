export type NavLink = {
  label: string;
  href: string;
};

export type SocialLink = NavLink & {
  icon: "github" | "linkedin" | "email";
};

export type TerminalLine =
  | { kind: "cmd"; text: string }
  | { kind: "out"; text: string }
  | { kind: "ok"; text: string; highlight: string }
  | { kind: "gap" };
