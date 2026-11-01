import { ArrowUp } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";

import type { NavLink, SocialLink } from "@/types/site";

export type FooterProps = {
  tagline: string;
  navLinks: NavLink[];
  socialLinks: SocialLink[];
  resumeHref: string;
  owner: string;
  year: number;
};

const linkClass =
  "transition-colors duration-120 ease-out-expo hover:text-accent-bright";

function Column({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div>
      <h2 className="mb-4 text-eyebrow font-semibold text-text-on-dark-muted">
        {title}
      </h2>
      <ul className="grid gap-2">{children}</ul>
    </div>
  );
}

export function Footer({
  tagline,
  navLinks,
  socialLinks,
  resumeHref,
  owner,
  year,
}: FooterProps) {
  return (
    <footer className="border-t border-line-dark bg-surface-800 pt-16 pb-8 text-label font-normal">
      <div className="wrap">
        <div className="grid grid-cols-[1.5fr_1fr_1fr_1fr] gap-8 max-[760px]:grid-cols-2">
          <div className="max-[760px]:col-span-full">
            <Image
              src="/logos/m-mark.svg"
              alt=""
              width={36}
              height={36}
              className="mb-4"
            />
            <p className="max-w-[260px] text-text-on-dark-muted">{tagline}</p>
          </div>
          <Column title="Navigate">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className={linkClass}>
                  {link.label}
                </Link>
              </li>
            ))}
          </Column>
          <Column title="Elsewhere">
            {socialLinks.map((link) => (
              <li key={link.icon}>
                <a href={link.href} className={linkClass}>
                  {link.label}
                </a>
              </li>
            ))}
          </Column>
          <Column title="Files">
            <li>
              <a href={resumeHref} className={linkClass}>
                Resume (PDF)
              </a>
            </li>
          </Column>
        </div>
        <div className="mt-16 flex flex-wrap justify-between gap-4 border-t border-line-dark pt-6 text-eyebrow text-text-on-dark-muted">
          <span>
            &copy; {year} {owner}
          </span>
          <Link
            href="#top"
            className={`inline-flex items-center gap-1 ${linkClass}`}
          >
            Back to top
            <ArrowUp aria-hidden="true" className="size-3.5" />
          </Link>
        </div>
      </div>
    </footer>
  );
}
