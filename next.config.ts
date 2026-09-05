import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  outputFileTracingIncludes: {
    "/api/contact": ["./emails/**/*"],
  },
};

export default nextConfig;
