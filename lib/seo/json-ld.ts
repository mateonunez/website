import type { BlogPosting, BreadcrumbList, Person, Thing, WebSite, WithContext } from 'schema-dts';
import config from '@/lib/config';
import personal from '@/lib/config/personal';
import type { ArticleFrontmatter } from '@/types/article';

/**
 * @deprecated Use the JsonLdScript component instead for better type safety and React integration.
 * This function is kept for backward compatibility with existing implementations.
 */
export function createJSONLD<T extends Thing>(schema: WithContext<T>): string {
  return JSON.stringify(schema);
}

export function getBlogPostingSchema(frontmatter: ArticleFrontmatter): WithContext<BlogPosting> {
  const { title, description, date, author, tags } = frontmatter;
  const baseUrl = new URL(config.baseUrl);
  const url = new URL(`/blog/${frontmatter.slug}`, baseUrl).toString();

  const rawImage = (frontmatter.image || '').trim();
  let imageUrl: string;
  if (rawImage) {
    if (/^https?:\/\//i.test(rawImage)) {
      imageUrl = rawImage;
    } else {
      const normalizedPath = rawImage.startsWith('/') ? rawImage : `/${rawImage}`;
      imageUrl = new URL(normalizedPath, baseUrl).toString();
    }
  } else {
    imageUrl = new URL(personal.assets.ogImage, baseUrl).toString();
  }

  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: title,
    description,
    datePublished: date,
    dateModified: date,
    author: {
      '@type': 'Person',
      name: author.name,
      url: author.url,
    },
    image: imageUrl,
    keywords: tags.join(', '),
    url,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': url,
    },
  };
}

export function getWebSiteSchema(): WithContext<WebSite> {
  const url = config.baseUrl;
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    url,
    name: personal.site.name,
    potentialAction: {
      '@type': 'SearchAction',
      target: `${url}/search?q={search_term_string}`,
      query: 'search_term_string',
    },
  };
}

export function getBreadcrumbSchema(items: { name: string; href: string }[]): WithContext<BreadcrumbList> {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: `${config.baseUrl}${item.href}`,
    })),
  };
}

export function getPersonSchema(): WithContext<Person> {
  const { name, email, website } = personal;
  const { social } = personal;

  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name,
    email,
    url: website,
    sameAs: [
      `https://github.com/${social.github}`,
      `https://twitter.com/${social.twitter}`,
      `https://linkedin.com/in/${social.linkedin}`,
    ],
  };
}
