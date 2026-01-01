/** @type {import('next').NextConfig} */
const nextConfig = {
  // NOTE: We do NOT use 'output: export' for Vercel deployment
  // Vercel handles static generation automatically and provides:
  // - Automatic image optimization via their CDN
  // - Better caching and performance
  // - No need for 'unoptimized: true' which would hurt performance

  // Trailing slashes for cleaner URLs and better SEO
  trailingSlash: true,

  // Image optimization settings (Vercel handles this automatically)
  images: {
    // Define allowed image formats - WebP for best compression
    formats: ['image/webp'],
    // Device sizes for responsive images
    deviceSizes: [640, 750, 828, 1080, 1200],
    // Image sizes for srcset generation
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    // Remote image patterns for placeholder images during development
    // Remove these when using local images in production
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
