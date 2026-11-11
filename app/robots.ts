import type { MetadataRoute } from 'next';
import config from '@/lib/config';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: ['/', '/api/rss'],
      disallow: '/api/',
    },
    sitemap: `${config.baseUrl}/sitemap.xml`,
  };
}
