const contentSecurityPolicy = `
  default-src 'self' https://*.googletagmanager.com https://*.google-analytics.com https://*.analytics.google.com https://*.vercel-insights.com https://vercel.live https://*.mateonunez.dev;
  base-uri 'self';
  block-all-mixed-content;
  connect-src 'self' https://*.googletagmanager.com https://*.google-analytics.com https://*.analytics.google.com https://*.vercel-insights.com https://vercel.live https://*.mateonunez.dev;
  font-src 'self' https://fonts.gstatic.com https://*.vercel.com https://vercel.live;
  frame-ancestors 'self';
  img-src 'self' data: https://i.scdn.co https://avatars.githubusercontent.com https://*.googletagmanager.com https://*.google-analytics.com https://*.vercel.com https://*.vercel-insights.com https://vercel.live https://*.google.com https://*.google.it https://*.githubassets.com https://*.githubusercontent.com https://*.github.com https://*.gstatic.com;
  object-src 'none';
  script-src 'self' 'unsafe-eval' 'unsafe-inline' https://*.googletagmanager.com https://*.google-analytics.com https://*.vercel-insights.com https://vercel.live;
  script-src-attr 'none';
  style-src 'self' 'unsafe-inline' https://fonts.googleapis.com
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
    value: 'same-origin'
  },
  // Frame Options
  {
    key: 'X-Frame-Options',
    value: 'DENY'
  }
];

module.exports = {
  reactStrictMode: true,
  experimental: {
    appDir: true
  },
  images: {
    formats: ['image/avif', 'image/webp'],
    domains: ['i.scdn.co', 'avatars.githubusercontent.com', 'github.githubassets.com'],
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
