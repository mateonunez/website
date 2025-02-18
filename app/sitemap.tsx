import fs from 'node:fs';
import config from '@/lib/config';
import path from 'node:path';

function generateArticlesSitemap(): Sitemap[] {
  const result: Sitemap[] = [];
  const articleSlugs = fs
    .readdirSync(path.join(process.cwd(), './articles'))
    .filter((file) => /\.mdx?$/.test(file))
    .map((file) => file.replace(/\.mdx?$/, ''));

  for (const slug of articleSlugs) {
    result.push({
      url: new URL(`/blog/${slug}`, config.baseUrl).toString(),
      lastModified: new Date(),
    });
  }

  return result;
}

type Sitemap = {
  url: string;
  lastModified: Date;
};

export default function sitemap(): Sitemap[] {
  const articles = generateArticlesSitemap();

  return [
    {
      url: new URL('/', config.baseUrl).toString(),
      lastModified: new Date(),
    },
    {
      url: new URL('/blog', config.baseUrl).toString(),
      lastModified: new Date(),
    },
    ...articles,
    {
      url: new URL('/open-source', config.baseUrl).toString(),
      lastModified: new Date(),
    },
    {
      url: new URL('/spotify', config.baseUrl).toString(),
      lastModified: new Date(),
    },
  ];
}
