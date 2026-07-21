import { ImageResponse } from 'next/og';

export const alt = 'Dra. Geanne Lopes | Advocacia Previdenciária em Taiobeiras, MG';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

const heroPhoto = fetch(new URL('../public/assets/dra-geanne-hero.jpg', import.meta.url)).then((response) => response.arrayBuffer());

export default async function OpenGraphImage() {
  const photo = await heroPhoto;

  return new ImageResponse(
    (
      <div
        style={{
          alignItems: 'stretch',
          background: '#F3F3F3',
          color: '#0A2723',
          display: 'flex',
          height: '100%',
          overflow: 'hidden',
          padding: '58px',
          position: 'relative',
          width: '100%',
        }}
      >
        <div style={{ background: '#0A2723', bottom: 0, display: 'flex', height: '14px', left: 0, position: 'absolute', width: '100%' }} />
        <div style={{ background: '#0A2723', bottom: 0, display: 'flex', height: '100%', position: 'absolute', right: 0, top: 0, width: '420px' }} />
        <div style={{ border: '1px solid #D1AD7D', borderRadius: '999px', height: '630px', position: 'absolute', right: '-150px', top: '-260px', width: '630px', zIndex: 2 }} />

        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', maxWidth: '840px', padding: '20px 0', zIndex: 1 }}>
          <div style={{ color: '#D1AD7D', display: 'flex', fontSize: '22px', fontWeight: 700, letterSpacing: '3px' }}>ADVOCACIA PREVIDENCIÁRIA</div>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <div style={{ display: 'flex', fontFamily: 'serif', fontSize: '78px', fontWeight: 700, letterSpacing: '-3px', lineHeight: 1.04 }}>Dra. Geanne Lopes</div>
            <div style={{ color: '#D1AD7D', display: 'flex', fontFamily: 'serif', fontSize: '46px', fontStyle: 'italic', marginTop: '16px' }}>Clareza jurídica para decisões importantes.</div>
          </div>
          <div style={{ display: 'flex', fontSize: '24px', fontWeight: 600 }}>Taiobeiras, MG · Atendimento presencial e on-line</div>
        </div>
        <div style={{ bottom: 0, display: 'flex', height: '630px', overflow: 'hidden', position: 'absolute', right: 0, top: 0, width: '420px' }}>
          <img
            src={photo as unknown as string}
            alt=""
            style={{ height: '630px', objectFit: 'cover', objectPosition: 'center 35%', width: '420px' }}
          />
          <div style={{ background: 'linear-gradient(90deg, rgba(10,39,35,.28), transparent 45%, rgba(10,39,35,.16))', inset: 0, position: 'absolute' }} />
        </div>
      </div>
    ),
    size,
  );
}
