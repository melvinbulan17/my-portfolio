"use client";

import { type FormEvent, useEffect, useRef, useState } from "react";

import { Button } from "@/components/ui/Button";
import { contactCopy, contactFields } from "@/content/contact";
import {
  checks,
  contactFieldNames,
  firstName,
  trimValues,
} from "@/lib/contact";
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

export function ContactForm({ onSubmit = send }: ContactFormProps) {
  const [values, setValues] = useState(empty);
  const [errors, setErrors] = useState<ContactFormErrors>({});
  const [status, setStatus] = useState<ContactFormStatus>("idle");
  const [sentTo, setSentTo] = useState(empty);
  const fieldRefs = useRef<
    Partial<Record<ContactField, HTMLInputElement | HTMLTextAreaElement>>
  >({});
  const trapRef = useRef<HTMLInputElement>(null);
  const sentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (status === "sent") sentRef.current?.focus();
  }, [status]);

  function mark(field: ContactField, value: string) {
    const message = checks[field](value);
    setErrors((current) => ({ ...current, [field]: message || undefined }));
    return !message;
  }

  function change(field: ContactField, value: string) {
    setValues((current) => ({ ...current, [field]: value }));
    if (errors[field]) mark(field, value);
  }

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (status === "sending") return;

    const bad = contactFieldNames.filter(
      (field) => !mark(field, values[field]),
    );
    if (bad.length > 0) {
      fieldRefs.current[bad[0]]?.focus();
      return;
    }

    const clean = trimValues(values);
    setStatus("sending");
    try {
      if (!trapRef.current?.value) await onSubmit(clean);
      setSentTo(clean);
      setStatus("sent");
    } catch {
      setStatus("failed");
    }
  }

  if (status === "sent") {
    return (
      <div
        ref={sentRef}
        role="status"
        tabIndex={-1}
        className="grid gap-2 border border-line-dark bg-surface-800 p-8 [--at:0] motion-safe:translate-y-1 motion-safe:animate-land motion-safe:opacity-0"
      >
        <p>
          <b className="text-accent-bright">{contactCopy.sentCode}</b>{" "}
          {contactCopy.sentLine}
        </p>
        <p className="text-text-on-dark-muted">
          {contactCopy.thanks(firstName(sentTo.name), sentTo.email)}
        </p>
      </div>
    );
  }

  const sending = status === "sending";
  const failed = status === "failed";

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
          value: values[field.name],
          "aria-invalid": error ? true : undefined,
          "aria-describedby": error ? errorId : undefined,
          onBlur: (
            event: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>,
          ) => {
            if (event.target.value) mark(field.name, event.target.value);
          },
          onChange: (
            event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
          ) => change(field.name, event.target.value),
        };

        return (
          <div key={field.name} className="grid gap-2">
            <label htmlFor={id} className="text-label">
              {field.label}
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
          role="status"
          aria-live="polite"
          className={
            failed
              ? "text-eyebrow text-accent-bright before:content-['//_error:_']"
              : "text-eyebrow text-text-on-dark-muted"
          }
        >
          {sending
            ? contactCopy.sendingStatus
            : failed
              ? contactCopy.failed
              : contactCopy.hint}
        </p>
      </div>
    </form>
  );
}
