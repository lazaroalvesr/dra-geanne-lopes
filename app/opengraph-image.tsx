import { ImageResponse } from 'next/og';
import { absoluteUrl } from './site-config';

export const alt = 'Dra. Geanne Lopes | Advocacia Previdenciária em Taiobeiras, MG';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';
export const dynamic = 'force-dynamic';

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          background: '#0A2723',
          color: 'white',
          display: 'flex',
          height: '100%',
          overflow: 'hidden',
          padding: '64px',
          position: 'relative',
          width: '100%',
        }}
      >
        <img
          src={absoluteUrl('/assets/dra-geanne-hero.jpg')}
          alt=""
          width={1200}
          height={630}
          style={{ height: '630px', left: 0, objectFit: 'cover', objectPosition: 'center 35%', position: 'absolute', top: 0, width: '1200px' }}
        />
        <div style={{ background: 'linear-gradient(90deg, rgba(10,39,35,.96) 0%, rgba(10,39,35,.82) 43%, rgba(10,39,35,.24) 72%, rgba(10,39,35,.08) 100%)', inset: 0, position: 'absolute' }} />
        <div style={{ border: '1px solid rgba(209,173,125,.75)', borderRadius: '999px', height: '610px', left: '-180px', position: 'absolute', top: '-300px', width: '610px' }} />

        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', maxWidth: '700px', padding: '20px 0' }}>
          <div style={{ color: '#D1AD7D', display: 'flex', fontSize: '22px', fontWeight: 700, letterSpacing: '3px' }}>ADVOCACIA PREVIDENCIÁRIA</div>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <div style={{ display: 'flex', fontFamily: 'serif', fontSize: '76px', fontWeight: 700, letterSpacing: '-3px', lineHeight: 1.04 }}>Dra. Geanne Lopes</div>
            <div style={{ color: '#D1AD7D', display: 'flex', fontFamily: 'serif', fontSize: '46px', fontStyle: 'italic', marginTop: '16px' }}>Clareza jurídica para decisões importantes.</div>
          </div>
          <div style={{ display: 'flex', fontSize: '24px', fontWeight: 600 }}>Taiobeiras, MG · Atendimento presencial e on-line</div>
        </div>
      </div>
    ),
    size,
  );
}
