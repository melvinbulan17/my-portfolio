import type {
  NavLink,
  Project,
  SideProject,
  SocialLink,
  TerminalLine,
} from "@/types/site";

export const siteOwner = "Melvin S. Bulan";

export const siteTagline = "Plan. Execute. Excel.";

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
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/melvin-bulan-335987220/",
    icon: "linkedin",
  },
  {
    label: "Email",
    href: "mailto:melvin.bulan17@gmail.com",
    icon: "email",
  },
];

export const hero = {
  greeting: "Hi! My name is",
  name: siteOwner,
  role: { lead: "I lead it.", emphasis: "I test it." },
  intro:
    "Currently a software engineer and project manager on a public key infrastructure (PKI) web application at a Swiss startup.",
  primaryAction: { label: "View Works", href: "#work" },
  secondaryAction: { label: "More about me →", href: "#about" },
};

export const terminalLines: TerminalLine[] = [
  { kind: "cmd", text: "whoami" },
  { kind: "out", text: "software-engineer, project-manager" },
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
  "Project Management",
  "Software Testing",
  "Test Management",
  "Public Key Infrastructure",
  "Agile / Scrum",
  "Waterfall",
  "SDLC & STLC",
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

export const sideProjects: SideProject[] = [
  {
    title: "Lorem Tracker",
    summary: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    tags: ["Lorem", "Ipsum"],
    links: [
      { label: "Live", href: "https://example.com" },
      { label: "Code", href: "https://github.com/melvinbulan17" },
    ],
  },
  {
    title: "Ipsum Notes",
    summary: "Sed do eiusmod tempor incididunt ut labore et dolore.",
    tags: ["Dolor", "Sit"],
    links: [
      { label: "Live", href: "https://example.com" },
      { label: "Code", href: "https://github.com/melvinbulan17" },
    ],
  },
  {
    title: "Dolor Scripts",
    summary: "Ut enim ad minim veniam, quis nostrud exercitation ullamco.",
    tags: ["Amet", "Lorem", "Elit"],
    links: [
      { label: "Live", href: "https://example.com" },
      { label: "Code", href: "https://github.com/melvinbulan17" },
    ],
  },
  {
    title: "Sit Amet CLI",
    summary: "Duis aute irure dolor in reprehenderit in voluptate velit.",
    tags: ["Ipsum", "Tempor"],
    links: [
      { label: "Live", href: "https://example.com" },
      { label: "Code", href: "https://github.com/melvinbulan17" },
    ],
  },
  {
    title: "Consectetur Kit",
    summary: "Excepteur sint occaecat cupidatat non proident, sunt in culpa.",
    tags: ["Dolor", "Magna"],
    links: [
      { label: "Live", href: "https://example.com" },
      { label: "Code", href: "https://github.com/melvinbulan17" },
    ],
  },
  {
    title: "Adipiscing Board",
    summary: "Nemo enim ipsam voluptatem quia voluptas sit aspernatur.",
    tags: ["Lorem", "Aliqua"],
    links: [
      { label: "Live", href: "https://example.com" },
      { label: "Code", href: "https://github.com/melvinbulan17" },
    ],
  },
];
