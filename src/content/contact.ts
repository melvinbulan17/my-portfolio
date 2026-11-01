import type { ContactField } from "@/types/contact";

export const contact = {
  number: "05.",
  title: "Contact",
  heading: "Let's work together.",
  lede: "I'm open to new roles and to talking about project delivery or software testing. Send a message and I'll reply by email.",
};

export const contactFields: Array<{
  name: ContactField;
  label: string;
  placeholder: string;
  type?: "email";
  autoComplete?: string;
  multiline?: boolean;
}> = [
  {
    name: "name",
    label: "Name",
    placeholder: "Your name",
    autoComplete: "name",
  },
  {
    name: "email",
    label: "Email",
    placeholder: "you@company.com",
    type: "email",
    autoComplete: "email",
  },
  {
    name: "message",
    label: "Message",
    placeholder: "What would you like to talk about?",
    multiline: true,
  },
];

export const contactErrors: Record<ContactField, string> = {
  name: "enter your name",
  email: "enter an email like name@company.com",
  message: "write a little more (10 characters or more)",
};

export const contactCopy = {
  submit: "Send message",
  sending: "Sending…",
  hint: "All three fields are required.",
  sendingStatus: "Sending your message.",
  failed: "couldn’t send. Try again, or use LinkedIn in the footer.",
  sentCode: "200 OK",
  sentLine: "message sent.",
  thanks: (firstName: string, email: string) =>
    `Thanks, ${firstName}. I’ll reply to ${email}.`,
  honeypot: "Leave this field empty",
};
