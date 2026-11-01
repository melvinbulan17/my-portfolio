import { ContactForm } from "@/components/sections/ContactForm";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { contact } from "@/content/contact";

export function Contact() {
  return (
    <section
      id="contact"
      className="border-t border-line-dark py-32 max-[760px]:py-16"
    >
      <div className="wrap">
        <SectionHeading number={contact.number} title={contact.title} />
        <div className="grid grid-cols-[1fr_1.2fr] items-start gap-16 max-[760px]:grid-cols-1">
          <div>
            <h2 className="mb-6 text-[56px] leading-16 font-bold tracking-[-0.01em] max-[760px]:text-[36px] max-[760px]:leading-11">
              {contact.heading}
            </h2>
            <p className="mb-8 max-w-110 text-text-on-dark-muted">
              {contact.lede}
            </p>
          </div>
          <ContactForm />
        </div>
      </div>
    </section>
  );
}
