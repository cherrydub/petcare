/** @type {import('next').NextConfig} */
const nextConfig = {
  //i want to use images from a certain domain
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "bytegrad.com",
      },
    ],
  },
};

export default nextConfig;
