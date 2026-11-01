import type { NavLink, Project, SocialLink, TerminalLine } from "@/types/site";

export const siteOwner = "Melvin S. Bulan";

export const siteTagline = "Software engineer: project manager and QA.";

export const copyrightYear = 2026;

export const resumeHref = "/resume.pdf";

export const navLinks: NavLink[] = [
  { label: "Work", href: "#work" },
  { label: "About", href: "#about" },
  { label: "Experience", href: "#experience" },
  { label: "Tools", href: "#tools" },
  { label: "Contact", href: "#contact" },
];

export const socialLinks: SocialLink[] = [
  { label: "GitHub", href: "https://github.com/melvinbulan17", icon: "github" },
  { label: "LinkedIn", href: "#", icon: "linkedin" },
  { label: "Email", href: "#", icon: "email" },
];

export const hero = {
  greeting: "Hi! My name is",
  name: siteOwner,
  role: { lead: "I lead it.", emphasis: "I test it." },
  intro:
    "I'm the project manager of a PKI web application at a startup, where I also set up software testing from scratch.",
  primaryAction: { label: "View Works", href: "#work" },
  secondaryAction: { label: "More about me →", href: "#about" },
};

export const terminalLines: TerminalLine[] = [
  { kind: "cmd", text: "whoami" },
  { kind: "out", text: "project-manager, qa-engineer" },
  { kind: "gap" },
  { kind: "cmd", text: "openssl verify -CAfile root.pem career.crt" },
  {
    kind: "out",
    text: "chain: test-engineer → test-manager → project-manager",
  },
  { kind: "ok", text: "career.crt: OK", highlight: "OK" },
  { kind: "gap" },
  { kind: "cmd", text: "./run-cycle --standard" },
  {
    kind: "ok",
    text: "✓ planned ✓ designed ✓ executed ✓ reported",
    highlight: "✓",
  },
];

export const disciplines = [
  "Project management",
  "Software testing",
  "Test management",
  "ISTQB lifecycle",
  "Agile delivery",
  "PKI",
];

export const projects: Project[] = [
  {
    kicker: "Lorem ipsum · dolor",
    title: "Lorem Ipsum Platform",
    tags: ["Lorem", "Ipsum", "Dolor", "Sit amet"],
    summary:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua, ut enim ad minim veniam.",
    actions: [{ label: "Case study", href: "#" }],
  },
  {
    kicker: "Lorem ipsum",
    title: "Lorem Ipsum Dolor",
    tags: ["Lorem", "Ipsum", "Dolor", "Amet"],
    summary:
      "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur, excepteur sint occaecat.",
    actions: [
      { label: "Live site", href: "#" },
      { label: "View code", href: "#" },
    ],
  },
];
