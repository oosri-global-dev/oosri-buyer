/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    styledComponents: true,
  },
  images: {
    domains: ["backend-oosri.onrender.com"],
  },
};

module.exports = nextConfig