import type { ComponentProps } from "react";

const fileLink = /\.pdf(?:[?#].*)?$/i;

export function isExternal(href: string) {
  return /^(?:https?:)?\/\//i.test(href);
}

export function opensInNewTab(href: string) {
  return isExternal(href) || fileLink.test(href);
}

export function isAppRoute(href: string) {
  return href.startsWith("/") && !isExternal(href) && !fileLink.test(href);
}

export function newTabProps(href: string) {
  return opensInNewTab(href)
    ? { target: "_blank", rel: "noopener noreferrer" }
    : {};
}

const linkOnlyProps = new Set([
  "prefetch",
  "replace",
  "scroll",
  "shallow",
  "locale",
  "passHref",
  "legacyBehavior",
  "onNavigate",
]);

export function anchorProps<T extends object>(props: T) {
  return Object.fromEntries(
    Object.entries(props).filter(([key]) => !linkOnlyProps.has(key)),
  ) as ComponentProps<"a">;
}
