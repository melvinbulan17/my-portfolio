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
