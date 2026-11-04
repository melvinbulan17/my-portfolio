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

export type Project = {
  kicker: string;
  title: string;
  tags: string[];
  summary: string;
  image?: { src: string; alt: string };
  actions: NavLink[];
  caseStudyHref?: string;
  hidden?: boolean;
};

export type SideProject = {
  title: string;
  summary: string;
  tags: string[];
  links: NavLink[];
  caseStudyHref?: string;
  hidden?: boolean;
};

export type CaseStudyImage = {
  src: string;
  alt: string;
  width: number;
  height: number;
};

export type CaseStudyBlock =
  | { kind: "text"; text: string }
  | { kind: "topic"; title: string; text: string }
  | { kind: "list"; items: string[] }
  | { kind: "points"; title: string; points: string[] }
  | { kind: "facts"; facts: { label: string; value: string }[] }
  | { kind: "shots"; shots: CaseStudyImage[]; crop?: boolean }
  | ({ kind: "figure"; title: string } & CaseStudyImage);

export type CaseStudy = {
  slug: string;
  title: string;
  tagline: string;
  description: string;
  liveHref?: string;
  storeHref?: string;
  codeHref: string;
  heroImage: CaseStudyImage;
  sections: { id: string; title: string; blocks: CaseStudyBlock[] }[];
};
