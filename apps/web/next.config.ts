import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Workspace packages ship raw TS/TSX source, not a prebuilt dist — Next
  // needs to compile them the same way it compiles apps/web's own code.
  transpilePackages: ["@shafiq-info/ui", "@shafiq-info/config", "@shafiq-info/types"],
};

export default nextConfig;
