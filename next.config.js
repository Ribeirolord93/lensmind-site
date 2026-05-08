/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  // Imagens: usar AVIF quando suportado (40% menor que WebP), fallback WebP, último JPEG
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.shopify.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        pathname: '/**',
      },
    ],
    formats: ['image/avif', 'image/webp'],
    // Tamanhos de device pra responsive images
    deviceSizes: [360, 640, 750, 828, 1080, 1200, 1440, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 31536000, // 1 ano
  },

  // Tree-shake imports pesados (framer-motion, lucide-react)
  experimental: {
    optimizePackageImports: ['framer-motion', 'lucide-react'],
  },

  // Compress responses
  compress: true,

  // Disable powered-by header (security + bytes)
  poweredByHeader: false,

  // Production sourcemaps off (menor bundle)
  productionBrowserSourceMaps: false,
};

module.exports = nextConfig;
