const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const FetchJsonWebpackPlugin = require('../../lib');

module.exports = merge(common, {
  plugins: [
    new FetchJsonWebpackPlugin({
      endpoint: [
        {
          url: 'https://dmbk.io/wp-json/dmbk-io-api/v1/core',
          filename: 'dmbk-core'
        },
        {
          url: 'hts://dmbk.io/wp-json/dmbk-io-api/v1/derpyn',
          filename: 'derpyvision'
        }
      ],
      hash: true,
    }),
  ],
});
