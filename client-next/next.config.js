const withCSS = require("@zeit/next-css");

const isProd = process.env.NODE_ENV === "production";

module.exports = withCSS({
  poweredByHeader: false,
  distDir: "dist"
});
