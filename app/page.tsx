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
import { absoluteUrl, officeLocations, primaryOffice } from './site-config';

const legalServiceJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'LegalService',
  name: 'Dra. Geanne Lopes | Advocacia Previdenciária',
  description: `Advocacia previdenciária em ${primaryOffice.city} - ${primaryOffice.state}, com atendimento próximo, responsável e estratégico.`,
  url: absoluteUrl('/'),
  sameAs: ['https://www.instagram.com/geanne_lopes/'],
  address: {
    '@type': 'PostalAddress',
    addressLocality: primaryOffice.city,
    addressRegion: primaryOffice.state,
    addressCountry: primaryOffice.country,
  },
  areaServed: [...officeLocations.map((office) => `${office.city} - ${office.state}`), 'Brasil'],
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
