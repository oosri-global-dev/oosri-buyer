/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    styledComponents: true,
  },
  images: {
    domains: ["https://backend-oosri.onrender.com"],
  },
};

module.exports = nextConfig