const path = require("path");
const withSvgr = require("next-svgr");

module.exports = withSvgr({
  images: {
    domains: ["images.prismic.io", "collectnyc.cdn.prismic.io"],
    formats: ["image/avif", "image/webp"],
  },
  sassOptions: {
    includePaths: [path.join(__dirname, "styles")],
  },
  reactStrictMode: true,
});
