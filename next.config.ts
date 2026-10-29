import type { NextConfig } from 'next';

const isProd = process.env.NODE_ENV === 'production';

const nextConfig: NextConfig = {
  output: 'export',
  basePath: isProd ? '/boatrace-motivation-viz' : '',
  assetPrefix: isProd ? '/boatrace-motivation-viz/' : '',
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
