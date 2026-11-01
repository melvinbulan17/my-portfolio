import type { NavLink, SocialLink } from "@/types/site";

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
