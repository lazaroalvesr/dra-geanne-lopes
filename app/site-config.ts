// Em produção, metadados e imagens de compartilhamento devem sempre apontar
// para a URL pública estável — nunca para um endereço temporário de deploy.
const configuredSiteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://dra-geanne-lopes.vercel.app';

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
