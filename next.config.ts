import bundleAnalyzer from '@next/bundle-analyzer';
import type { NextConfig } from 'next';

const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
});

const contentSecurityPolicy = `
  default-src 'self' https://*.googletagmanager.com https://*.google-analytics.com https://analytics.google.com https://*.analytics.google.com https://*.vercel-insights.com https://vercel.live https://mateonunez.co/;
  base-uri 'self';
  block-all-mixed-content;
  connect-src 'self' https://*.googletagmanager.com https://*.google-analytics.com https://analytics.google.com https://*.analytics.google.com https://*.vercel-insights.com https://vercel.live https://mateonunez.co/ https://*.doubleclick.net;
  font-src 'self' https://fonts.gstatic.com https://*.vercel.com https://vercel.live;
  frame-ancestors 'self';
  img-src 'self' data: https://i.scdn.co https://avatars.githubusercontent.com https://*.googletagmanager.com https://*.google-analytics.com https://*.vercel.com https://*.vercel-insights.com https://vercel.live https://*.google.com https://*.google.it https://*.githubassets.com https://*.githubusercontent.com https://*.github.com https://*.gstatic.com;
  object-src 'none';
  script-src 'self' 'unsafe-eval' 'unsafe-inline' https://*.googletagmanager.com https://*.google-analytics.com https://*.vercel-insights.com https://vercel.live https://*.vercel-scripts.com https://*.doubleclick.net;
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
  transpilePackages: ['next-mdx-remote'],
  reactStrictMode: true,
  compress: true,
  pageExtensions: ['ts', 'tsx', 'js', 'jsx', 'md', 'mdx'],
  reactCompiler: {
    compilationMode: 'infer',
  },
  cacheLife: {
    default: {
      stale: 60,
      revalidate: 300,
      expire: 3600,
    },
    articles: {
      stale: 300,
      revalidate: 900,
      expire: 86400,
    },
    dynamic: {
      stale: 0,
      revalidate: 60,
      expire: 300,
    },
  },
  experimental: {
    inlineCss: true,
    optimizePackageImports: ['lucide-react', 'date-fns', 'framer-motion'],
  },
  output: 'standalone',
  images: {
    formats: ['image/avif', 'image/webp'],
    minimumCacheTTL: 86400,
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
      {
        protocol: 'https',
        hostname: '**.spotifycdn.com',
      },
    ],
  },

  async headers() {
    return [
      {
        source: '/(.*)',
        headers: securityHeaders,
      },
      {
        source: '/images/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/fonts/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/_next/static/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ];
  },
};

export default withBundleAnalyzer(nextConfig);
