import { readFileSync } from 'node:fs';
import path from 'node:path';
import { ImageResponse } from 'next/og';
import { getArticle } from '@/lib/articles/parser';
import personal from '@/lib/config/personal';

export const runtime = 'nodejs';

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = 'image/png';

interface ImageParams {
  params: Promise<{ slug: string }>;
}

export async function generateImageMetadata({ params }: ImageParams) {
  const { slug } = await params;
  const { frontmatter } = await getArticle({ slug });

  return [
    {
      id: 'opengraph',
      alt: `${frontmatter.title} - ${frontmatter.description}`,
      contentType: 'image/png',
      size,
    },
  ];
}

export const alt = 'Blog Article Cover Image';

export default async function Image({ params }: ImageParams) {
  const { slug } = await params;
  const { frontmatter } = await getArticle({ slug });
  const { title, description, image, author } = frontmatter;

  if (image.startsWith('/')) {
    const imagePath = path.join(process.cwd(), 'public', image);
    const imageBuffer = readFileSync(imagePath);
    const base64Image = `data:image/png;base64,${imageBuffer.toString('base64')}`;

    return new ImageResponse(
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          position: 'relative',
        }}
      >
        {/** biome-ignore lint/performance/noImgElement: open graph image */}
        <img
          src={base64Image}
          alt={title}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
          }}
        />
        <div
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            background: 'linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.5) 50%, transparent 100%)',
            padding: '60px',
            display: 'flex',
            flexDirection: 'column',
            gap: '12px',
            backdropFilter: 'blur(8px)',
          }}
        >
          <div
            style={{
              fontSize: 48,
              fontWeight: 'bold',
              color: 'white',
              lineHeight: 1.2,
              textShadow: '0 4px 20px rgba(0,0,0,0.8), 0 2px 4px rgba(0,0,0,0.6)',
              filter: 'drop-shadow(0 0 20px rgba(0,0,0,0.5))',
            }}
          >
            {title}
          </div>
          <div
            style={{
              fontSize: 20,
              color: 'white',
              opacity: 0.95,
              display: 'flex',
              justifyContent: 'space-between',
              textShadow: '0 2px 8px rgba(0,0,0,0.7), 0 1px 2px rgba(0,0,0,0.5)',
            }}
          >
            <span>{author.name}</span>
            <span>{personal.website}</span>
          </div>
        </div>
      </div>,
      {
        ...size,
      },
    );
  }

  return new ImageResponse(
    <div
      style={{
        fontSize: 64,
        background: 'linear-gradient(135deg, #F59E0B 0%, #F59E0B 100%)',
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'white',
        fontFamily: 'system-ui, sans-serif',
        padding: '80px',
      }}
    >
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          justifyContent: 'space-between',
          width: '100%',
          height: '100%',
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '20px',
          }}
        >
          <div style={{ fontSize: 56, fontWeight: 'bold', lineHeight: 1.2 }}>{title}</div>
          <div style={{ fontSize: 28, opacity: 0.9, lineHeight: 1.4 }}>{description}</div>
        </div>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            width: '100%',
            fontSize: 24,
            opacity: 0.8,
          }}
        >
          <div>{author.name}</div>
          <div>{personal.website}</div>
        </div>
      </div>
    </div>,
    {
      ...size,
    },
  );
}
