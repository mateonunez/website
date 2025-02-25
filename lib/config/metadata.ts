import type { Robots } from 'next/dist/lib/metadata/types/metadata-types';
import config from './index';

const author = {
  name: 'Mateo Nunez',
  twitter: '@mmateonunez',
  github: '@mateonunez',
  email: 'mateonunez95@gmail.com',
  website: 'https://mateonunez.dev',
};

const siteName = 'Mateo Nunez - A Chill Software Engineer';
const defaultTitle = siteName;
const defaultDescription =
  "Hey, I'm Mateo Nunez, a Senior Software Engineer at BonusX, originally from Colombia and now based in Milan. I'm passionate about crafting modern web experiences with JavaScript, Next.js, and AI, while diving deep into open-source projects on GitHub. When I'm not coding, you'll find me jamming to music on Spotify, exploring Milan's food scene, or tackling challenges with a chill vibe—because, let's be real, I also create MIT bugs! This site is my digital playground, featuring an interactive terminal, my latest open-source contributions, and a glimpse into my life as a developer who loves technology, creativity, and continuous improvement.";

const assets = {
  ogImage: 'https://mateonunez.dev/card.png',
  favicons: {
    ico: '/favicon.ico',
    apple: '/apple-touch-icon.png',
    favicon16: '/favicon-16x16.png',
    favicon32: '/favicon-32x32.png',
    favicon192: '/favicon-192x192.png',
  },
  manifest: '/site.webmanifest',
};

const keywords = [
  'mateo nunez',
  'mmateonunez',
  'senior software engineer',
  'open source',
  'javascript',
  'nextjs',
  'typescript',
  'react',
  'node.js',
  'artificial intelligence',
  'ai developer',
  'web development',
  'software engineering',
  'github',
  'bonusx',
  'colombia',
  'milan',
  'music',
  'developer portfolio',
  'interactive terminal',
];

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
  alt: "Preview of Mateo Nunez's Digital Playground",
};

const metadata = {
  title: {
    template: '%s | Mateo Nunez',
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
    title: defaultTitle,
    description: defaultDescription,
    creator: author.twitter,
    images: [assets.ogImage],
  },
};

export default metadata;
