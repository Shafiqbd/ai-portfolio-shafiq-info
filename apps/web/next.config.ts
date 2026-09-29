import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Minimal self-contained server output for the production Docker image
  // (docker/web.Dockerfile) — avoids shipping the full node_modules tree.
  output: "standalone",
  // Workspace packages ship raw TS/TSX source, not a prebuilt dist — Next
  // needs to compile them the same way it compiles apps/web's own code.
  transpilePackages: ["@shafiq-info/ui", "@shafiq-info/config", "@shafiq-info/types"],
};

export default nextConfig;
