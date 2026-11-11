import type { MetadataRoute } from 'next';
import { getAllArticles } from '@/lib/articles/parser';
import config from '@/lib/config';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Listed articles only, dated from their frontmatter; unlisted ones stay out like they do from RSS.
  const listed = await getAllArticles();
  const articles: MetadataRoute.Sitemap = listed.map(({ frontmatter }) => ({
    url: new URL(`/blog/${frontmatter.slug}`, config.baseUrl).toString(),
    lastModified: frontmatter.updated ?? frontmatter.date,
    changeFrequency: 'weekly',
    priority: 0.7,
  }));

  return [
    {
      url: new URL('/', config.baseUrl).toString(),
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: new URL('/blog', config.baseUrl).toString(),
      lastModified: listed[0]?.frontmatter.date,
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
