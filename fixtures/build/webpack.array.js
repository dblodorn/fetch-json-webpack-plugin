const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const FetchJsonWebpackPlugin = require('../../lib');
const defaults = require('./defaults');

module.exports = merge(common, {
  plugins: [
    new FetchJsonWebpackPlugin({
      ...defaults
    }),
  ],
});
