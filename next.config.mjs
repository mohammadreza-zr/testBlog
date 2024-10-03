/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverComponentsExternalPackages: ["@node-rs/argon2"],
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "nabsteel.rahkartest.ir",
      },
      {
        protocol: "https",
        hostname: "flowbite.s3.amazonaws.com",
      },
    ],
  },
};

export default nextConfig;
