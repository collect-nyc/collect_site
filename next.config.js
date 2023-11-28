/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: "/profile",
        destination: "/about",
        permanent: true,
      },
    ];
  },
  // images: {
  //   domains: ["images.prismic.io", "collectnyc.cdn.prismic.io"],
  //   formats: ["image/avif", "image/webp"],
  // },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**.prismic.io",
      },
    ],
  },
  reactStrictMode: true,
  env: {
    projectID: "w96ud7kz",
    dataset: "production",
  },
  webpack: (config, { dev }) => {
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"],
    });
    return config;
  },
};

module.exports = nextConfig;
