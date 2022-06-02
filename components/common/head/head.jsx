import NextHead from 'next/head';

import { DefaultSeo } from 'next-seo';
import seo from 'lib/config/seo.json';

export default function Head() {
  return (
    <>
      <DefaultSeo {...seo} />
      <NextHead>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="author" content="mateonunez" />
        <meta name="theme-color" content="#F59E0B" />
      </NextHead>
    </>
  );
}
