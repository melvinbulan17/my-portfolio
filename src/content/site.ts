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
  role: { lead: "Make it work.", emphasis: "Make it right." },
  nameNote: {
    label: "// did you know?",
    text: "means moon in Filipino",
  },
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
    kicker: "Browser extension",
    title: "Dummio",
    tags: ["TypeScript", "React", "Tailwind CSS"],
    summary:
      "A browser extension that fills web forms with realistic test data in one click. It reads each field and shapes the value to fit, and nothing leaves your browser.",
    image: {
      src: "/images/dummio.png",
      alt: "The Dummio website, with the headline Stop typing test data and a sample of filled form fields",
    },
    actions: [
      { label: "Live site", href: "https://dummio.vercel.app/" },
      { label: "View code", href: "https://github.com/melvinbulan17/dummio" },
    ],
  },
  {
    hidden: true,
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
    title: "This portfolio",
    summary: "The site you're on, designed and built from scratch.",
    tags: ["Next.js", "TypeScript", "Tailwind CSS"],
    links: [
      { label: "Code", href: "https://github.com/melvinbulan17/my-portfolio" },
    ],
  },
  {
    hidden: true,
    title: "Ipsum Notes",
    summary: "Sed do eiusmod tempor incididunt ut labore et dolore.",
    tags: ["Dolor", "Sit"],
    links: [
      { label: "Live", href: "https://example.com" },
      { label: "Code", href: "https://github.com/melvinbulan17" },
    ],
  },
  {
    hidden: true,
    title: "Dolor Scripts",
    summary: "Ut enim ad minim veniam, quis nostrud exercitation ullamco.",
    tags: ["Amet", "Lorem", "Elit"],
    links: [
      { label: "Live", href: "https://example.com" },
      { label: "Code", href: "https://github.com/melvinbulan17" },
    ],
  },
  {
    hidden: true,
    title: "Sit Amet CLI",
    summary: "Duis aute irure dolor in reprehenderit in voluptate velit.",
    tags: ["Ipsum", "Tempor"],
    links: [
      { label: "Live", href: "https://example.com" },
      { label: "Code", href: "https://github.com/melvinbulan17" },
    ],
  },
  {
    hidden: true,
    title: "Consectetur Kit",
    summary: "Excepteur sint occaecat cupidatat non proident, sunt in culpa.",
    tags: ["Dolor", "Magna"],
    links: [
      { label: "Live", href: "https://example.com" },
      { label: "Code", href: "https://github.com/melvinbulan17" },
    ],
  },
  {
    hidden: true,
    title: "Adipiscing Board",
    summary: "Nemo enim ipsam voluptatem quia voluptas sit aspernatur.",
    tags: ["Lorem", "Aliqua"],
    links: [
      { label: "Live", href: "https://example.com" },
      { label: "Code", href: "https://github.com/melvinbulan17" },
    ],
  },
];
