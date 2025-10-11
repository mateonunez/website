import type { Robots } from 'next/dist/lib/metadata/types/metadata-types';
import config from './index';
import personal from './personal';

const author = {
  name: personal.name,
  twitter: `@${personal.social.twitter}`,
  github: `@${personal.social.github}`,
  email: personal.email,
  website: personal.website,
};

const siteName = personal.site.name;
const defaultTitle = siteName;
const defaultDescription = `Who is ${personal.name}? A ${personal.jobTitle} at ${personal.company}, building web & AI systems with TypeScript/Next.js. Discover open source projects, technical blog posts, and a digital playground featuring an interactive terminal, music integration, and real-time GitHub activity. ${personal.location.display}.`;

const assets = {
  ogImage: personal.assets.ogImage,
  logo: personal.assets.logo,
  favicons: personal.assets.favicons,
  manifest: personal.assets.manifest,
};

const keywords = personal.site.keywords;

const robotSettings: Robots = {
  index: true,
  follow: true,
  googleBot: {
    index: true,
    follow: true,
    'max-video-preview': -1,
    'max-image-preview': 'large',
    'max-snippet': -1,
  },
};

const socialImage = {
  url: assets.ogImage,
  width: 1200,
  height: 630,
  alt: `${personal.name} - ${personal.jobTitle} at ${personal.company}. ${personal.location.display}. Building web & AI systems with TypeScript/Next.js.`,
  type: 'image/png',
};

const metadata = {
  title: {
    template: `%s | ${personal.name}`,
    default: defaultTitle,
  },
  description: defaultDescription,
  keywords,

  author,
  authors: [author],
  creator: author.name,
  publisher: author.name,

  'color-scheme': 'dark',

  metadataBase: new URL(config.baseUrl),
  alternates: {
    canonical: config.baseUrl,
  },

  robots: robotSettings,

  openGraph: {
    type: 'website',
    url: config.baseUrl,
    title: defaultTitle,
    description: defaultDescription,
    siteName,
    images: [socialImage],
    locale: 'en_US',
    logo: assets.logo,
  },

  other: {
    'og:logo': assets.logo,
  },

  icons: {
    icon: [
      { url: assets.favicons.favicon16, sizes: '16x16', type: 'image/png' },
      { url: assets.favicons.favicon32, sizes: '32x32', type: 'image/png' },
    ],
    shortcut: assets.favicons.ico,
    apple: assets.favicons.apple,
    other: [
      {
        rel: 'icon',
        url: assets.favicons.favicon192,
        sizes: '192x192',
        type: 'image/png',
      },
    ],
  },
  manifest: assets.manifest,

  twitter: {
    card: 'summary_large_image',
    site: author.twitter,
    creator: author.twitter,
    title: defaultTitle,
    description: defaultDescription,
    images: {
      url: assets.ogImage,
      alt: `${personal.name} - ${personal.jobTitle} at ${personal.company}`,
    },
  },
};

export default metadata;
