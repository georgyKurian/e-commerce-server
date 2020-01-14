const withCSS = require("@zeit/next-css");

const isProd = process.env.NODE_ENV === "production";

module.exports = withCSS({
  poweredByHeader: false,
  distDir: "dist",
  env: {
    REACT_APP_API_URL: "http://localhost:8085"
  }
});
