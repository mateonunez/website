import type { BlogPosting, BreadcrumbList, Person, WebSite, WithContext } from 'schema-dts';
import config from '@/lib/config';
import personal from '@/lib/config/personal';
import type { ArticleFrontmatter } from '@/types/article';

type Schema = Record<string, unknown>;

export function createJSONLD<T extends Schema>(schema: WithContext<T>): string {
  return JSON.stringify(schema, null, 2);
}

export function getBlogPostingSchema(frontmatter: ArticleFrontmatter): WithContext<BlogPosting> {
  const { title, description, date, author, tags } = frontmatter;
  const url = `${config.baseUrl}/blog/${frontmatter.slug}`;
  const imageUrl = `${config.baseUrl}${frontmatter.image}`;

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
      'query-input': 'required name=search_term_string',
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
