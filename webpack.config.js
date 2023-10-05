const webpack = require("webpack");

module.exports = {
  // ...
  plugins: [
    // Suppress the warning about CommonJS dependencies
    new webpack.IgnorePlugin(/^rfdc$/),
    // ...
  ],
  // ...
};
