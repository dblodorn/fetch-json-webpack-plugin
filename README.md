# fetch-json-webpack-plugin
Webpack plugin to generate JSON assets from data api endpoints.

### Installation

```shell
npm i fetch-json-webpack-plugin -D
```

### Example Usage

```js
// webpack.config.js
const FetchJsonWebpackPlugin = require('fetch-json-webpack-plugin');

module.exports = {
  // ...
  plugins: [
    // ...
    new FetchJsonWebpackPlugin({
      endpoint: 'https://5bfc3529cf9d29001345c585.mockapi.io/fjwp/v1/data',
      filename: 'data',
      hash: ftrue,
    }),
  ]
  // ...
};
```