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
          display: 'flex',
          height: '100%',
          overflow: 'hidden',
          position: 'relative',
          width: '100%',
        }}
      >
        <img
          src={absoluteUrl('/assets/dra-geanne-hero.jpg')}
          alt=""
          width={1200}
          height={630}
          style={{ height: '630px', left: 0, objectFit: 'cover', objectPosition: 'center 18%', position: 'absolute', top: 0, width: '1200px' }}
        />
        <div style={{ background: 'rgba(10,39,35,.08)', inset: 0, position: 'absolute' }} />
        <div style={{ border: '1px solid rgba(209,173,125,.75)', borderRadius: '999px', height: '610px', left: '-180px', position: 'absolute', top: '-300px', width: '610px' }} />
      </div>
    ),
    size,
  );
}
