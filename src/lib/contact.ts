import { contactErrors } from "@/content/contact";
import type {
  ContactField,
  ContactFormErrors,
  ContactFormValues,
} from "@/types/contact";

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const checks: Record<ContactField, (value: string) => string> = {
  name: (value) => (value.trim() ? "" : contactErrors.name),
  email: (value) =>
    emailPattern.test(value.trim()) ? "" : contactErrors.email,
  message: (value) => (value.trim().length >= 10 ? "" : contactErrors.message),
};

export const contactFieldNames = Object.keys(checks) as ContactField[];

export function validate(values: ContactFormValues): ContactFormErrors {
  const errors: ContactFormErrors = {};
  for (const field of contactFieldNames) {
    const message = checks[field](values[field]);
    if (message) errors[field] = message;
  }
  return errors;
}

export function trimValues(values: ContactFormValues): ContactFormValues {
  return {
    name: values.name.trim(),
    email: values.email.trim(),
    message: values.message.trim(),
  };
}

export function firstName(name: string) {
  return name.trim().split(/\s+/)[0];
}
