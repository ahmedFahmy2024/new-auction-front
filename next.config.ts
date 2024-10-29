import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      // Development patterns
      {
        protocol: "http",
        hostname: "localhost",
        port: "8000",
        pathname: "/projects/**",
      },
      {
        protocol: "http",
        hostname: "localhost",
        port: "8000",
        pathname: "/auctions/**",
      },
      // Production patterns
      {
        protocol: "https",
        hostname: "auctionbackend-von8.onrender.com",
        pathname: "/projects/**",
      },
      {
        protocol: "https",
        hostname: "auctionbackend-von8.onrender.com",
        pathname: "/auctions/**",
      },
    ],
  },
};

export default nextConfig;
