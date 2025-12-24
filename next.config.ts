import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,

  // Transpile Three.js packages for proper SSR handling
  transpilePackages: ['three', '@react-three/fiber', '@react-three/drei'],

  // Empty Turbopack config to use Turbopack (default in Next.js 16)
  turbopack: {},

  // Allow external images from Unsplash
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'amlkydskhnqmhnndkaap.supabase.co',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;

