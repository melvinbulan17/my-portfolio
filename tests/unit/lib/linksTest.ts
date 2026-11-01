import { describe, expect, it } from "vitest";

import {
  anchorProps,
  isAppRoute,
  isExternal,
  newTabProps,
  opensInNewTab,
} from "@/lib/links";

describe("links", () => {
  it("treats absolute web addresses as external", () => {
    expect(isExternal("https://github.com/example")).toBe(true);
    expect(isExternal("http://example.com")).toBe(true);
    expect(isExternal("//cdn.example.com/file")).toBe(true);
    expect(isExternal("mailto:me@example.com")).toBe(false);
    expect(isExternal("#work")).toBe(false);
    expect(isExternal("/resume.pdf")).toBe(false);
  });

  it("opens external links and files in a new tab", () => {
    expect(opensInNewTab("https://www.linkedin.com/in/example")).toBe(true);
    expect(opensInNewTab("/resume.pdf")).toBe(true);
    expect(opensInNewTab("/resume.pdf#page=2")).toBe(true);
    expect(opensInNewTab("mailto:me@example.com")).toBe(false);
    expect(opensInNewTab("#top")).toBe(false);
    expect(opensInNewTab("/")).toBe(false);
  });

  it("only routes internal pages through the app router", () => {
    expect(isAppRoute("/")).toBe(true);
    expect(isAppRoute("/work/case")).toBe(true);
    expect(isAppRoute("/resume.pdf")).toBe(false);
    expect(isAppRoute("#work")).toBe(false);
    expect(isAppRoute("//example.com")).toBe(false);
    expect(isAppRoute("https://example.com")).toBe(false);
  });

  it("returns target and rel only for new-tab links", () => {
    expect(newTabProps("https://github.com/example")).toEqual({
      target: "_blank",
      rel: "noopener noreferrer",
    });
    expect(newTabProps("#contact")).toEqual({});
    expect(newTabProps("mailto:me@example.com")).toEqual({});
  });

  it("drops Next.js Link options before rendering a plain anchor", () => {
    expect(
      anchorProps({ href: "/resume.pdf", prefetch: false, scroll: true }),
    ).toEqual({ href: "/resume.pdf" });
  });
});
