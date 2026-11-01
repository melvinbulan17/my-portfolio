import { deliverContact } from "@/app/actions/contact";
import type { ContactFormValues } from "@/types/contact";

export async function send(values: ContactFormValues) {
  const { ok } = await deliverContact(values);
  if (!ok) throw new Error("Message not sent");
}
