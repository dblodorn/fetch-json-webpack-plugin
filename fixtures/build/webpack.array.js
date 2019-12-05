const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const FetchJsonWebpackPlugin = require('../../lib');

module.exports = merge(common, {
  plugins: [
    new FetchJsonWebpackPlugin({
      endpoint: [
        {
          endpoint: 'https://5bfc3529cf9d29001345c585.mockapi.io/fjwp/v1/data',
          filename: 'data-1'
        },
        {
          endpoint: 'https://5bfc3529cf9d29001345c585.mockapi.io/fjwp/v1/data',
          filename: 'data-2'
        }
      ],
      hash: true,
    }),
  ],
});
