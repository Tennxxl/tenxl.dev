import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Pin the workspace root to this project so Next doesn't get confused by an
  // unrelated package-lock.json elsewhere on the machine.
  turbopack: {
    root: __dirname,
  },
};

export default nextConfig;
