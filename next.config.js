/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    styledComponents: true,
  },
  images: {
    domains: ["oosri.com", "res.cloudinary.com"],
  },
};

module.exports = nextConfig
