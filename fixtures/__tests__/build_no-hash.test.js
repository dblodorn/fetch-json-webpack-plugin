const fs = require('fs');
const path = require('path');
const webpack = require('webpack');
const config = require('../build/webpack.nohash');

describe('webpack build no-hash', () => {
  it('creates my file data.json', () =>
    new Promise((resolve, reject) => {
      webpack(config, (error, stats) => {
        if (error) {
          reject(error);
        }
        fs.readFile(
          path.resolve(stats.compilation.compiler.outputPath, `data.json`),
          'utf8',
          (err, data) => {
            if (err) {
              reject(err);
            }
            expect(data).toBe('[{"hello":"world"}]');
            resolve();
          }
        );
      });
    }));
});
