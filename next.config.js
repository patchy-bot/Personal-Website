// next.config.js
// Enhanced security configuration for Next.js

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  // Enable HTTP security headers
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'Content-Security-Policy',
            // Strict CSP: adjust allowed sources as necessary
            value: "default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline'; img-src 'self' data:; connect-src 'self'; font-src 'self'; frame-ancestors 'none';",
          },
          { key: 'Referrer-Policy', value: 'no-referrer-when-downgrade' },
          { key: 'X-Frame-Options', value: 'DENY' },
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'X-DNS-Prefetch-Control', value: 'off' },
          { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains; preload' },
          { key: 'Permissions-Policy', value: 'geolocation=(), microphone=(), camera=()' }
        ],
      },
    ];
  },
  // Secure environment variable exposure
  env: {
    NEXT_PUBLIC_API_BASE_URL: process.env.NEXT_PUBLIC_API_BASE_URL,
    // Do not expose secrets to client
  },
  // Disable source maps in production to avoid leaking code
  productionBrowserSourceMaps: false,
  // Prevent unauthorized file system access
  experimental: {
    // Disable file system public access to .env files
    fs: { allow: [] }
  }
};

module.exports = nextConfig;
