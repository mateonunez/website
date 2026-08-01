import { readFileSync } from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';

const MIME_BY_EXTENSION: Record<string, string> = {
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.png': 'image/png',
  '.webp': 'image/webp',
};

const FALLBACK_MIME = 'image/png';

export const PREVIEW_BYTE_LIMIT = 300_000;

export interface OgImageMeta {
  width: number;
  height: number;
  type: string;
}

export function getImageMime(imagePath: string): string {
  return MIME_BY_EXTENSION[path.extname(imagePath).toLowerCase()] ?? FALLBACK_MIME;
}

export async function getOgImageMeta(imagePath: string): Promise<OgImageMeta | undefined> {
  if (!imagePath.startsWith('/')) return undefined;

  try {
    const buffer = readFileSync(path.join(process.cwd(), 'public', imagePath));
    const { width, height } = await sharp(buffer).metadata();
    if (!width || !height) return undefined;

    if (buffer.byteLength > PREVIEW_BYTE_LIMIT) {
      console.warn(
        `[og] ${imagePath} is ${Math.round(buffer.byteLength / 1024)}KB — WhatsApp drops previews over ${
          PREVIEW_BYTE_LIMIT / 1000
        }KB. Re-encode it as JPEG.`,
      );
    }

    return { width, height, type: getImageMime(imagePath) };
  } catch {
    return undefined;
  }
}

export function toOgLocale(inLanguage: string | undefined, fallback = 'en_US'): string {
  if (!inLanguage) return fallback;
  return inLanguage.replace('-', '_');
}
