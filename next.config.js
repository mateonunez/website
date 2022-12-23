const contentSecurityPolicy = `
  default-src 'self';
  script-src 'self';
  child-src mateonunez.dev;
  style-src 'self' mateonunez.dev;
  font-src 'self';
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
