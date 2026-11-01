import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { deliverContact } from "@/app/actions/contact";

const values = {
  name: " Sam Cruz ",
  email: "sam@company.com",
  message: "Hello, let's talk about testing.",
};

const endpoint = "https://forms.example.com/f/abc";

describe("deliverContact", () => {
  const fetchMock = vi.fn();

  beforeEach(() => {
    vi.stubGlobal("fetch", fetchMock);
  });

  afterEach(() => {
    vi.unstubAllEnvs();
    vi.unstubAllGlobals();
    fetchMock.mockReset();
  });

  it("fails without calling out when no endpoint is set", async () => {
    vi.stubEnv("CONTACT_FORM_ENDPOINT", "");

    expect(await deliverContact(values)).toEqual({ ok: false });
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it("posts trimmed JSON to the endpoint", async () => {
    vi.stubEnv("CONTACT_FORM_ENDPOINT", endpoint);
    fetchMock.mockResolvedValue(new Response(null, { status: 200 }));

    expect(await deliverContact(values)).toEqual({ ok: true });
    const [url, init] = fetchMock.mock.calls[0];
    expect(url).toBe(endpoint);
    expect(init.method).toBe("POST");
    expect(JSON.parse(init.body)).toEqual({ ...values, name: "Sam Cruz" });
  });

  it("refuses invalid values", async () => {
    vi.stubEnv("CONTACT_FORM_ENDPOINT", endpoint);

    expect(await deliverContact({ ...values, email: "nope" })).toEqual({
      ok: false,
    });
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it("fails when the service rejects or is unreachable", async () => {
    vi.stubEnv("CONTACT_FORM_ENDPOINT", endpoint);
    fetchMock.mockResolvedValueOnce(new Response(null, { status: 500 }));
    expect(await deliverContact(values)).toEqual({ ok: false });

    fetchMock.mockRejectedValueOnce(new Error("offline"));
    expect(await deliverContact(values)).toEqual({ ok: false });
  });
});
