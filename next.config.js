/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: "/",
        destination: "https://ap.ltd",
        permanent: true,
      },
      {
        source: "/about",
        destination: "https://ap.ltd/about",
        permanent: true,
      },
      {
        source: "/services",
        destination: "https://ap.ltd/about",
        permanent: true,
      },
      {
        source: "/services",
        destination: "https://ap.ltd/about",
        permanent: true,
      },
      {
        source: "/info/privacy",
        destination: "https://ap.ltd",
        permanent: true,
      },
      {
        source: "/info/impressum",
        destination: "https://ap.ltd",
        permanent: true,
      },
    ];
  },
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
    projectID: "b1xh2fd9",
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
