const API_ORIGIN = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:4000";

const nextConfig = {
  reactStrictMode: true,
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
