# fetch-json-webpack-plugin
Webpack plugin to generate JSON assets from data api endpoints.

[![License](https://img.shields.io/npm/l/express.svg)](https://github.com/dblodorn/fetch-json-webpack-plugin/blob/master/LICENSE)
[![Build Status](https://travis-ci.org/dblodorn/fetch-json-webpack-plugin.svg?branch=master)](https://travis-ci.org/dblodorn/fetch-json-webpack-plugin)

## Installation

```shell
npm i fetch-json-webpack-plugin -D
```

## Usage

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
      hash: true,
    }),
  ]
  // ...
};
```

## Options

Three options can be passed to Fetch Json Webpack Plugin, the endpoint to fetch data from (url string), the filename (string with no .json at end), and hash (boolean).

```js
new FetchJsonWebpackPlugin({
  // Enpoint UTL exposing valid json data.
  // Default: null
  endpoint: 'https://5bfc3529cf9d29001345c585.mockapi.io/fjwp/v1/data',
  // Your filename that you will be referencing in your application
  // Default: 'data'
  filename: 'data',
  // True if you want to add the build hash to your json file - data.[hash].json - recommended for cache busting.
  // Default: false
  hash: true,
}),
```

If you want to access the webpack hash in your application code make sure to include Webpack's [ExtendedAPIPlugin](https://github.com/webpack/docs/wiki/list-of-plugins#extendedapiplugin), after which `__webpack_hash__` will be available as a free var.

```js
  // ...
  plugins: [
    new webpack.ExtendedAPIPlugin()
  ],
  // ...
```
