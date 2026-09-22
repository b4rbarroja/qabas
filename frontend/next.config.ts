import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "5000",
        pathname: "/uploads/**",
      },
      {
        protocol: "https",
        hostname: "qabas-nqg8.vercel.app",
        pathname: "/uploads/**",
      },
    ],
  },
};

export default nextConfig;
