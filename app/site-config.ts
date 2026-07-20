const configuredSiteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'http://localhost:3000');

export const siteUrl = configuredSiteUrl.replace(/\/$/, '');

export const officeLocations = [
  { city: 'Taiobeiras', state: 'MG', country: 'BR' },
] as const;

export const primaryOffice = officeLocations[0];

export const contactDetails = {
  phoneDisplay: '(38) 99254-3642',
  phoneE164: '+5538992543642',
  whatsappNumber: '5538992543642',
  whatsappMessage: 'Olá, Dra. Geanne! Vim pelo site e gostaria de agendar uma consulta.',
  address: 'Praça 13 de Maio, 27, Centro, Taiobeiras/MG',
  oab: 'OAB/MG 140.998',
} as const;

export function absoluteUrl(path = '/') {
  return new URL(path, `${siteUrl}/`).toString();
}
