const configuredSiteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'http://localhost:3000');

export const siteUrl = configuredSiteUrl.replace(/\/$/, '');

export const officeLocations = [
  { city: 'Taiobeiras', state: 'MG', country: 'BR' },
] as const;

export const primaryOffice = officeLocations[0];

export function absoluteUrl(path = '/') {
  return new URL(path, `${siteUrl}/`).toString();
}
