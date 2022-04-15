import NextHead from 'next/head';

import { DefaultSeo } from 'next-seo';
import seo from 'seo.json';

export default function Head() {
  return (
    <>
      <DefaultSeo {...seo} />
      <NextHead>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="author" content="mateonunez" />
        <meta name="theme-color" content="#F59E0B" />
        <link rel="manifest" href="/site.webmanifest" key="site-manifest" />
      </NextHead>
    </>
  );
}
