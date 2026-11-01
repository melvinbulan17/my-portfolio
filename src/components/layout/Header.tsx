"use client";

import { useEffect, useState, type ReactNode } from "react";

export type HeaderProps = {
  children: ReactNode;
};

export function Header({ children }: HeaderProps) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const update = () => setScrolled(window.scrollY > 0);
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);

  return (
    <header
      data-scrolled={scrolled || undefined}
      className="fixed inset-x-0 top-0 z-20 bg-surface-900 after:pointer-events-none after:absolute after:inset-x-0 after:bottom-0 after:h-px after:bg-line-dark after:opacity-0 after:transition-opacity after:duration-240 after:ease-out-expo has-aria-expanded:after:opacity-100 data-scrolled:after:opacity-100 motion-reduce:after:transition-none"
    >
      <div className="wrap">{children}</div>
    </header>
  );
}
