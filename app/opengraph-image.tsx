import { ImageResponse } from 'next/og';

export const alt = 'Dra. Geanne Lopes | Advocacia Previdenciária em Taiobeiras, MG';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function OpenGraphImage() {
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
        <div style={{ border: '1px solid #D1AD7D', borderRadius: '999px', height: '630px', position: 'absolute', right: '-150px', top: '-260px', width: '630px' }} />
        <div style={{ border: '42px solid rgba(209, 173, 125, .18)', borderRadius: '999px', height: '630px', position: 'absolute', right: '-110px', top: '-220px', width: '630px' }} />

        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', maxWidth: '840px', padding: '20px 0', zIndex: 1 }}>
          <div style={{ color: '#D1AD7D', display: 'flex', fontSize: '22px', fontWeight: 700, letterSpacing: '3px' }}>ADVOCACIA PREVIDENCIÁRIA</div>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <div style={{ display: 'flex', fontFamily: 'serif', fontSize: '78px', fontWeight: 700, letterSpacing: '-3px', lineHeight: 1.04 }}>Dra. Geanne Lopes</div>
            <div style={{ color: '#D1AD7D', display: 'flex', fontFamily: 'serif', fontSize: '46px', fontStyle: 'italic', marginTop: '16px' }}>Clareza jurídica para decisões importantes.</div>
          </div>
          <div style={{ display: 'flex', fontSize: '24px', fontWeight: 600 }}>Taiobeiras, MG · Atendimento presencial e on-line</div>
        </div>
      </div>
    ),
    size,
  );
}
