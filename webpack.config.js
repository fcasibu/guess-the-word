const path = require("path");

module.exports = {
  mode: "development",
  entry: {
    index: "./src/index.js",
  },
  devtool: "inline-source-map",
  devServer: {
    static: "./dist/js/",
  },
  output: {
    filename: "main.js",
    path: path.resolve(__dirname, "dist/js/"),
  },
};
