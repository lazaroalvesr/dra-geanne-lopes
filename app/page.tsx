import { AboutSection } from '../components/AboutSection';
import { BlogSection } from '../components/BlogSection';
import { ClientEffects } from '../components/ClientEffects';
import { ContactSection } from '../components/ContactSection';
import { Footer } from '../components/Footer';
import { Header } from '../components/Header';
import { HeroSection } from '../components/HeroSection';
import { MissionSection } from '../components/MissionSection';
import { PracticeAreasSection } from '../components/PracticeAreasSection';
import { Testimonials } from '../components/Testimonials';
import { WhatsAppButton } from '../components/WhatsAppButton';
import { absoluteUrl, contactDetails, officeLocations, primaryOffice } from './site-config';

const legalServiceJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'LegalService',
  name: 'Dra. Geanne Lopes | Advocacia Previdenciária',
  description: `Advocacia previdenciária em ${primaryOffice.city} - ${primaryOffice.state}, com atendimento próximo, responsável e estratégico.`,
  url: absoluteUrl('/'),
  telephone: contactDetails.phoneE164,
  sameAs: ['https://www.instagram.com/geanne_lopes/'],
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Praça 13 de Maio, 27, Centro',
    addressLocality: primaryOffice.city,
    addressRegion: primaryOffice.state,
    addressCountry: primaryOffice.country,
  },
  areaServed: [
    ...officeLocations.map((office) => ({
      '@type': 'City',
      name: office.city,
      containedInPlace: {
        '@type': 'State',
        name: office.state,
      },
    })),
    {
      '@type': 'Country',
      name: 'Brasil',
    },
  ],
  availableLanguage: 'Português',
};

export default function Home() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(legalServiceJsonLd).replace(/</g, '\\u003c') }} />
      <Header />
      <main>
        <HeroSection />
        <AboutSection />
        <MissionSection />
        <PracticeAreasSection />
        <BlogSection />
        <Testimonials />
        <ContactSection />
      </main>
      <Footer />
      <WhatsAppButton />
      <ClientEffects />
    </>
  );
}
