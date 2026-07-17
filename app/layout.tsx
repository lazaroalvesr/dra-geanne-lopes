import type { Metadata, Viewport } from 'next';
import './globals.css';
import { absoluteUrl, primaryOffice, siteUrl } from './site-config';

const locationLabel = `${primaryOffice.city} - ${primaryOffice.state}`;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `Dra. Geanne Lopes | Advocacia Previdenciária em ${locationLabel}`,
    template: '%s | Dra. Geanne Lopes',
  },
  description: `Advocacia previdenciária em ${locationLabel}, com atendimento próximo, responsável e estratégico, presencial e on-line para todo o Brasil.`,
  applicationName: 'Dra. Geanne Lopes | Advocacia Previdenciária',
  keywords: ['advocacia previdenciária', 'INSS', 'aposentadoria', 'BPC LOAS', 'benefícios previdenciários', 'direito previdenciário'],
  authors: [{ name: 'Dra. Geanne Lopes' }],
  creator: 'Dra. Geanne Lopes',
  publisher: 'Dra. Geanne Lopes | Advocacia Previdenciária',
  alternates: { canonical: '/' },
  robots: { index: true, follow: true },
  openGraph: {
    type: 'website',
    locale: 'pt_BR',
    url: absoluteUrl('/'),
    siteName: 'Dra. Geanne Lopes | Advocacia Previdenciária',
    title: `Dra. Geanne Lopes | Advocacia Previdenciária em ${locationLabel}`,
    description: `Advocacia previdenciária em ${locationLabel}, com atendimento presencial e on-line para todo o Brasil.`,
  },
  twitter: {
    card: 'summary',
    title: `Dra. Geanne Lopes | Advocacia Previdenciária em ${locationLabel}`,
    description: `Advocacia previdenciária em ${locationLabel}, com atendimento presencial e on-line para todo o Brasil.`,
  },
  verification: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION ? { google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION } : undefined,
  icons: {
    icon: [
      { url: '/assets/Icon.png', sizes: '32x32', type: 'image/png' },
    ],
  },
};

export const viewport: Viewport = {
  themeColor: '#0A2723',
  colorScheme: 'light',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=Playfair+Display:wght@500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body>{children}</body>
    </html>
  );
}
