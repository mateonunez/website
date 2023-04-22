import config from './index';
const author = {
  name: 'Mateo Nunez',
  twitter: '@mateonunez95',
  github: '@mateonunez',
  email: 'mateonunez95@gmail.com',
  website: 'https://mateonunez.dev'
};

const defaultTitle = '@mateonunez';
const defaultDescription =
  "Hi folks! I'm Mateo Nunez, a Software Engineer from Colombia based in Milan. I ❤️ Open Source, JavaScript, the music, the food, the challenges and the continous improvement.";

const metadata = {
  title: {
    template: '%s | @mateonunez',
    default: defaultTitle
  },
  description: defaultDescription,
  keywords: [
    'mateo nunez',
    'mateonunez',
    'software engineer',
    'open source',
    'javascript',
    'nodejs',
    'react'
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
        alt: 'Mateo Nunez'
      }
    ],
    locale: 'en-US',
    type: 'website'
  },
  icons: {
    icon: '/favicon-16x16.png',
    shortcut: '/favicon.ico',
    apple: '/apple-touch-icon.png'
  },
  themeColor: '#F59E0B',
  manifest: '/site.webmanifest',
  twitter: {
    card: 'summary_large_image',
    title: `${defaultTitle} on Twitter`,
    description: defaultDescription,
    creator: '@mateonunez95'
  },
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 5
  }
};

export default metadata;
