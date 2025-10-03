import type {
  BlogPosting,
  BreadcrumbList,
  FAQPage,
  MusicPlaylist,
  Organization,
  Person,
  ProfilePage,
  Thing,
  WebSite,
  WithContext,
} from 'schema-dts';
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
    inLanguage: 'en-US',
  };
}

export function getWebSiteSchema(): WithContext<WebSite> {
  const url = config.baseUrl;
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    url,
    name: personal.site.name,
    description: personal.site.description,
    inLanguage: 'en-US',
    author: {
      '@type': 'Person',
      '@id': `${url}/#person`,
    },
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
  const { name, email, website, jobTitle, company } = personal;
  const { social, location } = personal;

  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    '@id': `${website}/#person`,
    name,
    givenName: personal.shortName,
    email,
    url: website,
    image: new URL(personal.assets.avatar, website).toString(),
    jobTitle,
    description: personal.bio.full,
    worksFor: {
      '@type': 'Organization',
      name: company,
      '@id': `${website}/#organization`,
    },
    nationality: {
      '@type': 'Country',
      name: location.origin,
    },
    address: {
      '@type': 'PostalAddress',
      addressLocality: location.current,
      addressCountry: 'IT',
    },
    knowsAbout: [
      ...personal.skills.languages,
      ...personal.skills.frameworks,
      ...personal.skills.ai,
      'Web Development',
      'AI Engineering',
      'Open Source Development',
      'Software Architecture',
      'Full Stack Development',
    ],
    knowsLanguage: personal.languagesSpoken,
    sameAs: [
      `https://github.com/${social.github}`,
      `https://twitter.com/${social.twitter}`,
      `https://linkedin.com/in/${social.linkedin}`,
      `https://instagram.com/${social.instagram}`,
      `https://open.spotify.com/user/${social.spotify}`,
    ],
  };
}

export function getOrganizationSchema(): WithContext<Organization> {
  const { company, website } = personal;

  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': `${website}/#organization`,
    name: company,
    url: 'https://bonusx.it',
  };
}

export function getProfilePageSchema(): WithContext<ProfilePage> {
  const { website, name, bio } = personal;

  return {
    '@context': 'https://schema.org',
    '@type': 'ProfilePage',
    '@id': `${website}/#profilepage`,
    url: website,
    name: `${name} - Personal Website`,
    description: bio.full,
    inLanguage: 'en-US',
    mainEntity: {
      '@type': 'Person',
      '@id': `${website}/#person`,
    },
    about: {
      '@type': 'Person',
      '@id': `${website}/#person`,
    },
  };
}

export function getMusicPlaylistSchema(
  playlistName: string,
  playlistUrl: string,
  trackCount?: number,
): WithContext<MusicPlaylist> {
  const { website, name } = personal;

  return {
    '@context': 'https://schema.org',
    '@type': 'MusicPlaylist',
    name: playlistName,
    url: playlistUrl,
    creator: {
      '@type': 'Person',
      name,
      '@id': `${website}/#person`,
    },
    ...(trackCount && { numTracks: trackCount }),
  };
}

export function getFAQPageSchema(faqs: { question: string; answer: string }[]): WithContext<FAQPage> {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };
}
