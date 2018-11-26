const fs = require('fs');
const path = require('path');
const webpack = require('webpack');
const config = require('../build/webpack.hash');

describe('webpack build hash', () => {
  it(`creates my file hashed data.json`, () =>
    new Promise((resolve, reject) => {
      webpack(config, (error, stats) => {
        if (error) {
          reject(error);
        }
        fs.readFile(
          path.resolve(
            stats.compilation.compiler.outputPath,
            `data.${stats.compilation.hash}.json`
          ),
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
