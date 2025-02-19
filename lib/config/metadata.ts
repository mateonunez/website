import config from './index';
const author = {
  name: 'Mateo Nunez',
  twitter: '@mmateonunez',
  github: '@mateonunez',
  email: 'mateonunez95@gmail.com',
  website: 'https://mateonunez.dev',
};

const defaultTitle = "Hey, I'm Mateo 👋";
const defaultDescription =
  "Hey, I'm Mateo, a Software Engineer from Colombia based in Milan. I ❤️ Open Source, JavaScript, AI, and many other things.";

const metadata = {
  title: {
    template: '%s | @mateonunez',
    default: defaultTitle,
  },
  description: defaultDescription,
  keywords: [
    'mateo nunez',
    'mateonunez',
    'software engineer',
    'open source',
    'javascript',
    'nodejs',
    'react',
    'nextjs',
    'typescript',
    'colombia',
    'italy',
    'ai',
    'machine learning',
    'artificial intelligence',
    'software development',
    'software engineering',
    'software developer',
    'software engineer',
  ],
  author,
  authors: [author],
  colorSchema: 'dark',
  metadataBase: new URL(config.baseUrl),
  openGraph: {
    title: defaultTitle,
    description: defaultDescription,
    url: config.baseUrl,
    siteName: defaultTitle,
    images: [
      {
        url: 'https://mateonunez.dev/card.png',
        width: 512,
        height: 512,
        alt: 'Mateo Nunez',
      },
    ],
    locale: 'en-US',
    type: 'website',
  },
  icons: {
    icon: '/favicon-16x16.png',
    shortcut: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
  manifest: '/site.webmanifest',
  twitter: {
    card: 'summary_large_image',
    title: defaultTitle,
    description: defaultDescription,
    creator: '@mmateonunez',
  },
};

export default metadata;
