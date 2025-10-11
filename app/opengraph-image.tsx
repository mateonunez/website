import { readFileSync } from 'node:fs';
import path from 'node:path';
import { ImageResponse } from 'next/og';
import personal from '@/lib/config/personal';

export const runtime = 'nodejs';

export const alt = `${personal.name} - ${personal.jobTitle} at ${personal.company}. ${personal.location.display}. Building web & AI systems with TypeScript/Next.js.`;
export const size = {
  width: 1200,
  height: 630,
};

export const contentType = 'image/png';

export const metadata = {
  title: alt,
  description: personal.site.description,
};

export default async function Image() {
  const imagePath = path.join(process.cwd(), 'public', personal.assets.avatar);
  const imageBuffer = readFileSync(imagePath);
  const base64Image = `data:image/png;base64,${imageBuffer.toString('base64')}`;

  return new ImageResponse(
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/** biome-ignore lint/performance/noImgElement: Required for next/og ImageResponse */}
      <img
        src={base64Image}
        alt={alt}
        style={{
          position: 'absolute',
          top: '-15%',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '100%',
        }}
      />
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          background: 'linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.6) 60%, transparent 100%)',
          padding: '60px',
          display: 'flex',
          flexDirection: 'column',
          gap: '16px',
          backdropFilter: 'blur(8px)',
        }}
      >
        <div
          style={{
            fontSize: 64,
            fontWeight: 'bold',
            color: 'white',
            lineHeight: 1.1,
            textShadow: '0 4px 20px rgba(0,0,0,0.8), 0 2px 4px rgba(0,0,0,0.6)',
            filter: 'drop-shadow(0 0 20px rgba(0,0,0,0.5))',
            display: 'flex',
          }}
        >
          {personal.name}
        </div>
        <div
          style={{
            fontSize: 28,
            color: 'white',
            opacity: 0.95,
            display: 'flex',
            flexDirection: 'column',
            gap: '8px',
            textShadow: '0 2px 8px rgba(0,0,0,0.7), 0 1px 2px rgba(0,0,0,0.5)',
          }}
        >
          <span>
            {personal.jobTitle} @ {personal.company}
          </span>
          <span style={{ opacity: 0.9, fontSize: 24 }}>{personal.website}</span>
        </div>
      </div>
    </div>,
    {
      ...size,
    },
  );
}
