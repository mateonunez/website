const baseURL = process.env.NEXT_PUBLIC_BASE_URL || 'https://mateonunez.dev';

const contentSecurityPolicy = `
  default-src 'self' ${baseURL} https://vercel.live https://*.vercel.com https://*.vercel-insights.com https://*.googletagmanager.com https://*.google-analytics.com https://*.analytics.google.com;
  img-src 'self' data: https://i.scdn.co https://avatars.githubusercontent.com;
  script-src 'self' 'unsafe-eval' 'unsafe-inline' https://*.vercel.com https://*.vercel-insights.com https://*.googletagmanager.com https://*.google-analytics.com https://*.analytics.google.com;
  child-src 'self' 'unsafe-eval' 'unsafe-inline';
  style-src 'self' 'unsafe-inline' https://fonts.googleapis.com https://assets.vercel.com;
  frame-src 'self' https://*.vercel.com https://*.vercel-insights.com https://vercel.live;
  font-src 'self' https://fonts.gstatic.com https://assets.vercel.com;
`;

// Security Headers
const securityHeaders = [
  // Content Security Policy
  {
    key: 'Content-Security-Policy',
    value: contentSecurityPolicy.replace(/\s{2,}/g, ' ').trim()
  },
  // XSS Protection
  {
    key: 'X-XSS-Protection',
    value: '1; mode=block'
  },
  // No Sniff
  {
    key: 'X-Content-Type-Options',
    value: 'nosniff'
  },
  // Force HTTPS
  {
    key: 'Strict-Transport-Security',
    value: 'max-age=31536000; includeSubDomains; preload'
  },
  // Referrer Policy
  {
    key: 'Referrer-Policy',
    value: 'origin-when-cross-origin'
  },
  // Frame Options
  {
    key: 'X-Frame-Options',
    value: 'DENY'
  }
];

module.exports = {
  reactStrictMode: true,
  images: {
    formats: ['image/avif', 'image/webp'],
    domains: ['i.scdn.co', 'avatars.githubusercontent.com'],
    minimumCacheTTL: 60
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: securityHeaders
      }
    ];
  }
};
