import type { Options as MDXOptions } from '@mdx-js/loader';
import type { NextConfig } from 'next';
import createMDX from '@next/mdx';
import rehypePrism from 'rehype-prism-plus';
import rehypeSlug from 'rehype-slug';
import remarkGfm from 'remark-gfm';

const contentSecurityPolicy = `
  default-src 'self' https://*.googletagmanager.com https://*.google-analytics.com https://analytics.google.com https://*.analytics.google.com https://*.vercel-insights.com https://vercel.live https://mateonunez.dev/;
  base-uri 'self';
  block-all-mixed-content;
  connect-src 'self' https://*.googletagmanager.com https://*.google-analytics.com https://analytics.google.com https://*.analytics.google.com https://*.vercel-insights.com https://vercel.live https://mateonunez.dev/;
  font-src 'self' https://fonts.gstatic.com https://*.vercel.com https://vercel.live;
  frame-ancestors 'self';
  img-src 'self' data: https://i.scdn.co https://avatars.githubusercontent.com https://*.googletagmanager.com https://*.google-analytics.com https://*.vercel.com https://*.vercel-insights.com https://vercel.live https://*.google.com https://*.google.it https://*.githubassets.com https://*.githubusercontent.com https://*.github.com https://*.gstatic.com;
  object-src 'none';
  script-src 'self' 'unsafe-eval' 'unsafe-inline' https://*.googletagmanager.com https://*.google-analytics.com https://*.vercel-insights.com https://vercel.live https://*.vercel-scripts.com;
  script-src-attr 'none';
  style-src 'self' 'unsafe-inline' https://fonts.googleapis.com
`;

type SecurityHeader = {
  key: string;
  value: string;
};

const securityHeaders: SecurityHeader[] = [
  {
    key: 'Content-Security-Policy',
    value: contentSecurityPolicy.replace(/\s{2,}/g, ' ').trim(),
  },
  {
    key: 'X-XSS-Protection',
    value: '1; mode=block',
  },
  {
    key: 'X-Content-Type-Options',
    value: 'nosniff',
  },
  {
    key: 'Strict-Transport-Security',
    value: 'max-age=31536000; includeSubDomains; preload',
  },
  {
    key: 'Referrer-Policy',
    value: 'same-origin',
  },
  {
    key: 'X-Frame-Options',
    value: 'DENY',
  },
];

const nextConfig: NextConfig = {
  reactStrictMode: true,
  pageExtensions: ['ts', 'tsx', 'js', 'jsx', 'md', 'mdx'],
  experimental: {
    mdxRs: true,
  },
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.scdn.co',
      },
      {
        protocol: 'https',
        hostname: '**.githubusercontent.com',
      },
      {
        protocol: 'https',
        hostname: '**.githubassets.com',
      },
    ],
    minimumCacheTTL: 60,
  },

  async headers() {
    return [
      {
        source: '/(.*)',
        headers: securityHeaders,
      },
    ];
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};

const mdxOptions: MDXOptions = {
  remarkPlugins: [remarkGfm],
  rehypePlugins: [
    [
      rehypePrism,
      {
        showLineNumbers: true,
        ignoreMissing: true,
        defaultLanguage: 'bash',
        theme: {
          dark: 'github-dark',
          light: 'github-light',
        },
      },
    ],
    rehypeSlug,
  ],
  format: 'mdx',
};

const withMDX = createMDX({
  extension: /\.mdx?$/,
  options: mdxOptions,
});

export default withMDX(nextConfig);
