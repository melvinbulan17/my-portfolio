import type { CSSProperties } from "react";

import { ContactForm } from "@/components/sections/ContactForm";
import { RevealHeading } from "@/components/sections/RevealHeading";
import { RiseIn } from "@/components/sections/RiseIn";
import { contact } from "@/content/contact";
import { cn } from "@/lib/cn";
import { arrive } from "@/lib/motion";

const second = { "--rise-delay": "90ms" } as CSSProperties;

export function Contact() {
  return (
    <section
      id="contact"
      className="border-t border-line-dark py-24 max-[760px]:py-16"
    >
      <div className="wrap">
        <RevealHeading number={contact.number} title={contact.title} />
        <div className="grid grid-cols-[1fr_1.2fr] items-start gap-16 max-[760px]:grid-cols-1">
          <RiseIn>
            <h2
              className={cn(
                "mb-6 text-display leading-18 font-bold tracking-[-0.01em] max-[1000px]:text-[2.25rem] max-[1000px]:leading-11",
                arrive,
              )}
            >
              {contact.heading}
            </h2>
            <p
              style={second}
              className={cn("mb-8 max-w-110 text-text-on-dark-muted", arrive)}
            >
              {contact.lede}
            </p>
          </RiseIn>
          <ContactForm />
        </div>
      </div>
    </section>
  );
}
