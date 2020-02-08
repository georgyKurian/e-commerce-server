module.exports = {
  env: {
    commonjs: true,
    "jest/globals": true
  },
  extends: ["standard", "plugin:prettier/recommended"],
  plugins: ["jest"],
  parser: "babel-eslint",
  rules: {}
};
