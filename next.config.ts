import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images:{
    remotePatterns:[
      {
        protocol: 'https',
        hostname: './src/assets/logo.png',
        port: '',
      }
    ]
  }
};

export default nextConfig;
