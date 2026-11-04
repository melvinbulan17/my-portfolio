"use client";

import { type FormEvent, useEffect, useRef, useState } from "react";

import { Button } from "@/components/ui/Button";
import { contactCopy, contactFields } from "@/content/contact";
import { checks, contactFieldNames, trimValues } from "@/lib/contact";
import { send } from "@/lib/send";
import type {
  ContactField,
  ContactFormErrors,
  ContactFormStatus,
  ContactFormValues,
} from "@/types/contact";

export type ContactFormProps = {
  onSubmit?: (values: ContactFormValues) => Promise<void>;
};

const fieldClass =
  "w-full border border-line-dark-strong bg-surface-900 px-4 py-2.5 text-body text-text-on-dark transition-colors duration-120 ease-out-expo placeholder:text-text-on-dark-muted hover:border-text-on-dark-muted focus-visible:border-accent-bright focus-visible:outline-1 focus-visible:outline-offset-0 focus-visible:outline-accent-bright aria-invalid:border-accent-bright";

const empty: ContactFormValues = { name: "", email: "", message: "" };

const thanksDuration = 8000;

export function ContactForm({ onSubmit = send }: ContactFormProps) {
  const [values, setValues] = useState(empty);
  const [errors, setErrors] = useState<ContactFormErrors>({});
  const [status, setStatus] = useState<ContactFormStatus>("idle");
  const fieldRefs = useRef<
    Partial<Record<ContactField, HTMLInputElement | HTMLTextAreaElement>>
  >({});
  const touched = useRef(new Set<ContactField>());
  const trapRef = useRef<HTMLInputElement>(null);
  const statusRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    if (status !== "sent") return;
    statusRef.current?.focus();
    const timer = setTimeout(() => setStatus("idle"), thanksDuration);
    return () => clearTimeout(timer);
  }, [status]);

  function mark(field: ContactField, value: string) {
    const message = checks[field](value);
    setErrors((current) => ({ ...current, [field]: message || undefined }));
    return !message;
  }

  function change(field: ContactField, value: string) {
    setValues((current) => ({ ...current, [field]: value }));
    touched.current.add(field);
    if (status === "sent") setStatus("idle");
    if (errors[field]) mark(field, value);
  }

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (status === "sending") return;

    const bad = contactFieldNames.filter(
      (field) => !mark(field, values[field]),
    );
    if (bad.length > 0) {
      setStatus("idle");
      fieldRefs.current[bad[0]]?.focus();
      return;
    }

    const clean = trimValues(values);
    setStatus("sending");
    try {
      if (!trapRef.current?.value) await onSubmit(clean);
      setValues(empty);
      touched.current.clear();
      setStatus("sent");
    } catch {
      setStatus("failed");
    }
  }

  const sending = status === "sending";
  const failed = status === "failed";
  const sent = status === "sent";

  return (
    <form className="grid gap-6" noValidate onSubmit={submit}>
      {contactFields.map((field) => {
        const id = `contact-${field.name}`;
        const errorId = `${id}-err`;
        const error = errors[field.name];
        const shared = {
          id,
          name: field.name,
          placeholder: field.placeholder,
          required: true,
          "aria-required": true,
          value: values[field.name],
          "aria-invalid": error ? true : undefined,
          "aria-describedby": error ? errorId : undefined,
          onBlur: (
            event: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>,
          ) => {
            if (touched.current.has(field.name) || errors[field.name])
              mark(field.name, event.target.value);
          },
          onChange: (
            event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
          ) => change(field.name, event.target.value),
        };

        return (
          <div key={field.name} className="grid gap-2">
            <label htmlFor={id} className="text-label">
              {field.label}
              <span aria-hidden="true" className="ml-1 text-accent-bright">
                *
              </span>
            </label>
            {field.multiline ? (
              <textarea
                {...shared}
                ref={(node) => {
                  if (node) fieldRefs.current[field.name] = node;
                }}
                className={`${fieldClass} min-h-40 resize-y`}
              />
            ) : (
              <input
                {...shared}
                ref={(node) => {
                  if (node) fieldRefs.current[field.name] = node;
                }}
                type={field.type ?? "text"}
                autoComplete={field.autoComplete}
                className={fieldClass}
              />
            )}
            {error && (
              <p
                id={errorId}
                className="text-eyebrow text-accent-bright before:content-['//_error:_']"
              >
                {error}
              </p>
            )}
          </div>
        );
      })}
      <div
        aria-hidden="true"
        className="absolute -left-[10000px] size-px overflow-hidden"
      >
        <label htmlFor="contact-website">{contactCopy.honeypot}</label>
        <input
          ref={trapRef}
          id="contact-website"
          name="website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          defaultValue=""
        />
      </div>
      <div className="flex flex-wrap items-center gap-6">
        <Button type="submit" disabled={sending}>
          {sending ? contactCopy.sending : contactCopy.submit}
        </Button>
        <p
          ref={statusRef}
          role="status"
          aria-live="polite"
          tabIndex={-1}
          className={
            failed
              ? "text-eyebrow text-accent-bright before:content-['//_error:_']"
              : sent
                ? "text-eyebrow text-text-on-dark"
                : "text-eyebrow text-text-on-dark-muted"
          }
        >
          {sending
            ? contactCopy.sendingStatus
            : failed
              ? contactCopy.failed
              : sent
                ? contactCopy.thanks
                : null}
        </p>
      </div>
    </form>
  );
}
