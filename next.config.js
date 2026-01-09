/** @type {import('next').NextConfig} */
const nextConfig = {
  // Static export for GitHub Pages deployment
  // GitHub Pages doesn't support Next.js server features, so we use static export
  output: 'export',

  // Webpack configuration for PDF.js worker
  webpack: (config) => {
    // Handle PDF.js worker
    config.resolve.alias.canvas = false;
    config.resolve.alias.encoding = false;
    return config;
  },

  // Trailing slashes for cleaner URLs and better SEO
  trailingSlash: true,

  // Image optimization settings for static export
  images: {
    // Disable image optimization for static export (GitHub Pages)
    // Next.js Image component will still provide responsive images but without server-side optimization
    unoptimized: true,
    // Device sizes for responsive images
    deviceSizes: [640, 750, 828, 1080, 1200],
    // Image sizes for srcset generation
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    // Remote image patterns for external images
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'picsum.photos',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
  },

  // Disable x-powered-by header for security
  poweredByHeader: false,

  // Enable React strict mode for better development experience
  reactStrictMode: true,

  // Compress output for smaller bundle sizes
  compress: true,
};

module.exports = nextConfig;
