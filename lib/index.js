const { RawSource } = require('webpack-sources');
const fetch = require('node-fetch');

const waitFor = (ms) => new Promise(r => setTimeout(r, ms))

const asyncForEach = async (array, callback) => {
  for (let index = 0; index < array.length; index++) {
    await callback(array[index], index, array)
  }
}

module.exports = class FetchJsonWebpackPlugin {
  constructor(options) {
    this.options = options || {};
    this.options.endpoint = options.endpoint || null;
    this.options.hash = options.hash || false;
    // this.options.filename = options.filename || 'data';
    this.data = {};
    this.createJson = this.createJson.bind(this);
  }
  apply(compiler) {
    compiler.hooks.emit.tapAsync(this.constructor.name, this.createJson);
  }
  createJson(compilation, cb) {

    const request = async () => {
      
      try {
        await asyncForEach(this.options.endpoint, async (endpoint, i) => {
          await waitFor(50);
          compilation.assets[`${endpoint.filename}.json`] = new RawSource(JSON.stringify(endpoint));
          console.log(endpoint.filename, i);
        });
        cb();
        console.log('Done');
      } catch (err) {
        console.log(err);
        cb();
      }
    };

    /*
    const request = async () => {
      const fileName = this.options.hash
      ? `${this.options.filename}.${compilation.hash}.json`
      : `${this.options.filename}.json`;
      try {
        const response = await fetch(this.options.endpoint);
        this.data = await response.json();
        compilation.assets[fileName] = new RawSource(JSON.stringify(this.data));
        console.log(`Successfully compiled ${fileName} from data endpoint!`);
        cb();
      } catch (err) {
        console.log(err);
        cb();
      }
    };
    */
    
    request();
  }
};
