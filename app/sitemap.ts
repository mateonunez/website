import fs from 'node:fs';
import path from 'node:path';
import type { MetadataRoute } from 'next';
import config from '@/lib/config';

function generateArticlesSitemap(): MetadataRoute.Sitemap {
  const result: MetadataRoute.Sitemap = [];
  const articleSlugs = fs
    .readdirSync(path.join(process.cwd(), './articles'))
    .filter((file) => /\.mdx?$/.test(file))
    .map((file) => file.replace(/\.mdx?$/, ''));

  for (const slug of articleSlugs) {
    result.push({
      url: new URL(`/blog/${slug}`, config.baseUrl).toString(),
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.7,
    });
  }

  return result;
}

export default function sitemap(): MetadataRoute.Sitemap {
  const articles = generateArticlesSitemap();

  return [
    {
      url: new URL('/', config.baseUrl).toString(),
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: new URL('/blog', config.baseUrl).toString(),
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    ...articles,
    {
      url: new URL('/open-source', config.baseUrl).toString(),
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: new URL('/open-source/projects', config.baseUrl).toString(),
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.7,
    },
    {
      url: new URL('/spotify', config.baseUrl).toString(),
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.8,
    },
  ];
}
