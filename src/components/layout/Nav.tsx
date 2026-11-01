"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/cn";
import type { NavLink } from "@/types/site";

export type NavProps = {
  links: NavLink[];
  resumeHref: string;
};

export function Nav({ links, resumeHref }: NavProps) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open]);

  const close = () => setOpen(false);

  return (
    <nav
      aria-label="Main"
      className="relative flex h-24 items-center justify-between"
    >
      <Link href="#top" onClick={close} className="block">
        <Image
          src="/logos/m-mark.svg"
          alt="Home"
          width={40}
          height={40}
          priority
        />
      </Link>

      <button
        type="button"
        aria-expanded={open}
        aria-controls="nav-links"
        onClick={() => setOpen((value) => !value)}
        className="cursor-pointer py-2.5 text-label min-[761px]:hidden"
      >
        <span className="text-accent-bright">[</span> menu{" "}
        <span className="text-accent-bright">]</span>
      </button>

      <ul
        id="nav-links"
        className={cn(
          "flex items-center gap-8 text-label",
          "max-[760px]:absolute max-[760px]:-inset-x-8 max-[760px]:top-24 max-[760px]:z-10 max-[760px]:flex-col max-[760px]:items-stretch max-[760px]:gap-0",
          "max-[760px]:border-y max-[760px]:border-line-dark max-[760px]:bg-surface-800 max-[760px]:px-8 max-[760px]:pt-2 max-[760px]:pb-6",
          "motion-reduce:transition-none max-[760px]:transition-[opacity,translate,visibility] max-[760px]:duration-240 max-[760px]:ease-out-expo",
          open
            ? "max-[760px]:visible max-[760px]:translate-y-0 max-[760px]:opacity-100"
            : "max-[760px]:invisible max-[760px]:-translate-y-2 max-[760px]:opacity-0",
        )}
      >
        {links.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              onClick={close}
              className="transition-colors duration-120 ease-out-expo hover:text-accent-bright max-[760px]:block max-[760px]:border-b max-[760px]:border-line-dark max-[760px]:py-3"
            >
              {link.label}
            </Link>
          </li>
        ))}
        <li className="max-[760px]:mt-6">
          <Button href={resumeHref} onClick={close}>
            Resume
          </Button>
        </li>
      </ul>
    </nav>
  );
}
