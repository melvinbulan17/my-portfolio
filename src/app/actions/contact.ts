"use server";

import { trimValues, validate } from "@/lib/contact";
import type { ContactFormValues } from "@/types/contact";

export type DeliverResult = { ok: boolean };

export async function deliverContact(
  values: ContactFormValues,
): Promise<DeliverResult> {
  const endpoint = process.env.CONTACT_FORM_ENDPOINT;
  if (!endpoint) return { ok: false };

  const clean = trimValues(values);
  if (Object.keys(validate(clean)).length > 0) return { ok: false };

  try {
    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(clean),
      signal: AbortSignal.timeout(10000),
    });
    return { ok: response.ok };
  } catch {
    return { ok: false };
  }
}
