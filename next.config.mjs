// @ts-check

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async redirects() {
    return [
      {
        source: '/',
        destination: '/todos',
        permanent: true,
      },
    ]
  },
};

export default nextConfig;
