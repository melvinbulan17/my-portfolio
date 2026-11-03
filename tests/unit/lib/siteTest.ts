import { afterEach, describe, expect, it, vi } from "vitest";

const loadSiteUrl = async () => {
  vi.resetModules();
  return (await import("@/lib/site")).siteUrl;
};

afterEach(() => {
  vi.unstubAllEnvs();
});

describe("siteUrl", () => {
  it("prefers the address set by hand", async () => {
    vi.stubEnv("NEXT_PUBLIC_SITE_URL", "https://example.com");
    vi.stubEnv("VERCEL_PROJECT_PRODUCTION_URL", "mbulan.vercel.app");

    expect(await loadSiteUrl()).toBe("https://example.com");
  });

  it("falls back to the Vercel production address", async () => {
    vi.stubEnv("NEXT_PUBLIC_SITE_URL", "");
    vi.stubEnv("VERCEL_PROJECT_PRODUCTION_URL", "mbulan.vercel.app");

    expect(await loadSiteUrl()).toBe("https://mbulan.vercel.app");
  });

  it("uses localhost when neither is set", async () => {
    vi.stubEnv("NEXT_PUBLIC_SITE_URL", "");
    vi.stubEnv("VERCEL_PROJECT_PRODUCTION_URL", "");

    expect(await loadSiteUrl()).toBe("http://localhost:3000");
  });
});
