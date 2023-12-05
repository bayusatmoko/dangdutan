/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'standalone',
    images: {
        remotePatterns: [
          {
            protocol: 'https',
            hostname: 'songssongs.s3.ap-southeast-1.amazonaws.com',
            port: '',
            pathname: '/**',
          },
        ],
      },
}

module.exports = nextConfig
