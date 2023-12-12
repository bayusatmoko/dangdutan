const isProd = false;

/** @type {import('next').NextConfig} */
const nextConfig = {
  assetPrefix: isProd ? "https://cdn.mydomain.com" : undefined,
  output: "standalone",
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "songssongs2.s3.ap-southeast-1.amazonaws.com",
        port: "",
        pathname: "/**",
      },
    ],
  },
};

module.exports = nextConfig;
