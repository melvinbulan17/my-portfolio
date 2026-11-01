import { afterEach, describe, expect, it, vi } from "vitest";

import { deliverContact } from "@/app/actions/contact";
import { send } from "@/lib/send";

vi.mock("@/app/actions/contact", () => ({ deliverContact: vi.fn() }));

const values = {
  name: "Sam",
  email: "sam@company.com",
  message: "Hello there!",
};

describe("send", () => {
  afterEach(() => {
    vi.mocked(deliverContact).mockReset();
  });

  it("resolves when the message is delivered", async () => {
    vi.mocked(deliverContact).mockResolvedValue({ ok: true });

    await expect(send(values)).resolves.toBeUndefined();
    expect(deliverContact).toHaveBeenCalledWith(values);
  });

  it("rejects when delivery fails", async () => {
    vi.mocked(deliverContact).mockResolvedValue({ ok: false });

    await expect(send(values)).rejects.toThrow();
  });
});
