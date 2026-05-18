const API_ORIGIN = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:4000";
const DIST_DIR = process.env.NEXT_DIST_DIR || ".next";

const nextConfig = {
  reactStrictMode: true,
  distDir: DIST_DIR,
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: `${API_ORIGIN}/api/:path*`
      }
    ];
  }
};

export default nextConfig;
