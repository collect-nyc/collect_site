const withSvgr = require("next-svgr");
const path = require("path");

module.exports = withSvgr({
  async redirects() {
    return [
      {
        source: "/profile",
        destination: "/about",
        permanent: true,
      },
    ];
  },
  images: {
    domains: ["images.prismic.io", "collectnyc.cdn.prismic.io"],
    formats: ["image/avif", "image/webp"],
  },
  sassOptions: {
    fiber: false,
    includePaths: [path.join(__dirname, "styles")],
  },
});
