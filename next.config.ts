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
      {
        protocol: "http",
        hostname: "localhost",
        port: "8000",
        pathname: "/banners/**",
      },
      // Production patterns
      {
        protocol: "https",
        hostname: "new-auction-pc.onrender.com",
        pathname: "/projects/**",
      },
      {
        protocol: "https",
        hostname: "new-auction-pc.onrender.com",
        pathname: "/auctions/**",
      },
      {
        protocol: "https",
        hostname: "new-auction-pc.onrender.com",
        pathname: "/banners/**",
      },
      {
        protocol: "https",
        hostname: "konouz.site-pocket.com",
        pathname: "/projects/**",
      },
      {
        protocol: "https",
        hostname: "konouz.site-pocket.com",
        pathname: "/auctions/**",
      },
      {
        protocol: "https",
        hostname: "konouz.site-pocket.com",
        pathname: "/banners/**",
      },
    ],
  },
};

export default nextConfig;
