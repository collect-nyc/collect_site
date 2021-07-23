const path = require("path");

module.exports = {
  images: {
    domains: ["images.prismic.io", "collectnyc.cdn.prismic.io"],
  },
  sassOptions: {
    includePaths: [path.join(__dirname, "styles")],
  },
  reactStrictMode: true,
};
