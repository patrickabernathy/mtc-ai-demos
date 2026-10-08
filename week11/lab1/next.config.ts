import path from "node:path";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Pins the build to this folder. Without it, Next notices the other
  // lockfiles elsewhere in the Projects workspace and prints a workspace-root
  // warning on every build.
  outputFileTracingRoot: path.join(__dirname),
};

export default nextConfig;
