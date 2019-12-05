const { RawSource } = require('webpack-sources');
const fetch = require('node-fetch');
const chalk = require('chalk');
const { waitFor, asyncForEach } = require('./utils');
const log = console.log;

module.exports = class FetchJsonWebpackPlugin {
  constructor(options) {
    this.options = options || {};
    this.options.endpoints = options.endpoints || null;
    this.createJson = this.createJson.bind(this);
  }
  
  apply(compiler) {
    compiler.hooks.emit.tapAsync(this.constructor.name, this.createJson);
  }
  
  createJson(compilation, cb) {
    
    const returnFileName = (filename, i) =>
      filename === undefined
        ? `data-${i + 1}`
        : filename;

    const returnHash = (name, hash) =>
      (hash === undefined || hash === false)
        ? `${name}.json`
        : `${name}.${compilation.hash}.json`;
    
    const request = async () => {
      try {
        await asyncForEach(this.options.endpoints, async (endpoint, i) => {
          await waitFor(50);
          let data = {};
          const response = await fetch(endpoint.url);
          data = await response.json();
          const file = returnHash(returnFileName(endpoint.filename, i), endpoint.hash);
          compilation.assets[file] = new RawSource(JSON.stringify(data));
          log(chalk.yellow.bgRed.bold(`Successfully compiled endpoint file ${i + 1} as ${file} from data endpoint!`));
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