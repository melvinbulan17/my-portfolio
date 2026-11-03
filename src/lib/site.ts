function productionUrl() {
  const host = process.env.VERCEL_PROJECT_PRODUCTION_URL;
  return host ? `https://${host}` : undefined;
}

export const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ||
  productionUrl() ||
  "http://localhost:3000";
