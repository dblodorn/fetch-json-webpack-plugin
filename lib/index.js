const { RawSource } = require('webpack-sources');
const fetch = require('node-fetch');

const waitFor = (ms) => new Promise(r => setTimeout(r, ms))

const asyncForEach = async (array, callback) => {
  for (let index = 0; index < array.length; index++) {
    try {
      await callback(array[index], index, array);
    } catch (err) {
      console.log(err);
    }
}

module.exports = class FetchJsonWebpackPlugin {
  constructor(options) {
    this.options = options || {};
    this.options.endpoints = options.endpoints || null;
    this.options.hash = options.hash || false;
    this.createJson = this.createJson.bind(this);
  }
  apply(compiler) {
    compiler.hooks.emit.tapAsync(this.constructor.name, this.createJson);
  }

  createJson(compilation, cb) {
    
    const returnHash = (filename) =>
      this.options.hash
        ? `${filename}.${compilation.hash}.json`
        : `${filename}.json`;
    
    const request = async () => {
      try {
        await asyncForEach(this.options.endpoint, async (endpoint) => {
          await waitFor(50);
          let data = {};
          const response = await fetch(endpoint.url);
          data = await response.json();
          compilation.assets[returnHash(endpoint.filename)] = new RawSource(JSON.stringify(data));
          console.log(`Successfully compiled ${endpoint.filename} from data endpoint!`);
        });
        cb();
        console.log('Done');
      } catch (err) {
        console.log(err);
        cb();
      }
    };
    request();
  }
};
