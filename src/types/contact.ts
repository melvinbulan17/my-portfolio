export type ContactFormStatus = "idle" | "sending" | "sent" | "failed";

export type ContactField = "name" | "email" | "message";

export type ContactFormValues = Record<ContactField, string>;

export type ContactFormErrors = Partial<Record<ContactField, string>>;
