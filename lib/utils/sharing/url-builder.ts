import config from '@/lib/config';
import type { ShareableContentType } from '@/types/sharing';

export function buildCanonicalUrl(type: ShareableContentType, slug: string): string {
  const baseUrl = config.baseUrl.endsWith('/') ? config.baseUrl.slice(0, -1) : config.baseUrl;

  switch (type) {
    case 'article':
      return `${baseUrl}/blog/${slug}`;
    case 'playlist':
      return `${baseUrl}/spotify#playlist-${slug}`;
    case 'repository':
      return `${baseUrl}/open-source/projects#repo-${slug}`;
    default:
      return `${baseUrl}/${slug}`;
  }
}

export function ensureAbsoluteUrl(url: string): string {
  if (url.startsWith('http://') || url.startsWith('https://')) {
    return url;
  }

  const baseUrl = config.baseUrl.endsWith('/') ? config.baseUrl.slice(0, -1) : config.baseUrl;

  if (url.startsWith('/')) {
    return `${baseUrl}${url}`;
  }

  return `${baseUrl}/${url}`;
}

export function getFullUrl(path: string): string {
  if (typeof window === 'undefined') {
    return ensureAbsoluteUrl(path);
  }

  try {
    const url = new URL(path, window.location.origin);
    return url.toString();
  } catch {
    return ensureAbsoluteUrl(path);
  }
}
