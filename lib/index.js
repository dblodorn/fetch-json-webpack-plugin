const { RawSource } = require('webpack-sources');
const chalkAnimation = require('chalk-animation');
const fetch = require('node-fetch');

module.exports = class FetchJsonWebpackPlugin {
  constructor(options) {
    this.options = options || {};
    this.options.endpoint = options.endpoint || '';
    this.options.hash = options.hash || false;
    this.options.filename = options.filename || 'data';
    this.data = {};
    this.createJson = this.createJson.bind(this);
  }
  apply(compiler) {
    compiler.hooks.emit.tapAsync(this.constructor.name, this.createJson);
  }
  createJson(compilation, cb) {
    const fileName = this.options.hash
      ? `${this.options.filename}.${compilation.hash}.json`
      : `${this.options.filename}.json`;
    const request = async () => {
      try {
        const response = await fetch(this.options.endpoint);
        this.data = await response.json();
        compilation.assets[fileName] = new RawSource(JSON.stringify(this.data));
        const successMsg = chalkAnimation.rainbow(
          `Successfully compiled ${fileName} from data endpoint!`
        );
        setTimeout(() => {
          successMsg.stop();
          cb();
        }, 1000);
      } catch (err) {
        console.log(err);
        cb();
      }
    };
    request();
  }
};
