# fetch-json-webpack-plugin
Webpack plugin to generate JSON assets from data api endpoints.

[![License](https://img.shields.io/npm/l/express.svg)](https://github.com/dblodorn/fetch-json-webpack-plugin/blob/master/LICENSE)
[![Build Status](https://travis-ci.org/dblodorn/fetch-json-webpack-plugin.svg?branch=master)](https://travis-ci.org/dblodorn/fetch-json-webpack-plugin) [![Greenkeeper badge](https://badges.greenkeeper.io/dblodorn/fetch-json-webpack-plugin.svg)](https://greenkeeper.io/)

## Motivation

I build a lot of sites with frontend js frameworks such as vue / react / etc. that render off of data that is not highly dynamic (think portfolios, blogs), I want to cache the data api requests as flat json files and then serve the site up completely static not relying on a secondary data api running on a server elsewhere to provide the data layer (and if it is down - block or disable rendering). I also want to inlclude the data layer as a static file for service workers to cache.

I use netlify as my CI publishing tool, so whenever I update content in my CMS i just trigger a build, with this plugin in your webpack build script you will be provided with a hashed json file containing all your api data.

I prefer to call the actual data endpoint during development and just use this in the webpack production config.

Example controller:

```js
  // fetchDataController.js
  import fetch from 'isomorphic-fetch'

  const endpoint = 'https://5bfc3529cf9d29001345c585.mockapi.io/fjwp/v1/data'
  // If using hash make sure to use webpack's ExtendedAPIPlugin
  const hash = __webpack_hash__

  export default () => {
    return new Promise((resolve, reject) => {
      fetch((process.env.NODE_ENV === 'development')
        ? endpoint 
        : `data.${hash}.json`,
        { method: 'GET' })
          .then(res => resolve(res))
          .catch(err => reject(err))
    })
  }

```

Use controller in application, (for example a redux action that adds your api call to your data store):

```js
  //fetchApiData.action.js
  import fetchDataController from './fetchDataController'
  
  export default () => {
    return (dispatch) => {
      const _dataHandler = (payload) => {
        dispatch(DATA_REDUCER(payload))
      }
      fetchDataController()
        .then(response => response.json())
        .then((payload) => _dataHandler(payload))
    }
  }
```

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
  // Enpoint URL exposing valid json data.
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
    // ...
    new webpack.ExtendedAPIPlugin()
    // ...
  ],
  // ...
```
