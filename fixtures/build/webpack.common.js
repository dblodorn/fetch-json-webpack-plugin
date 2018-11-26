const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');

const pathsToClean = [path.resolve(__dirname, './../dist')];
const cleanOptions = {
  exclude: ['.gitkeep'],
  root: process.cwd(),
  verbose: true,
  dry: false,
};
module.exports = {
  entry: path.resolve(__dirname, './../index.js'),
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, './../dist'),
    pathinfo: true,
  },
  plugins: [new CleanWebpackPlugin(pathsToClean, cleanOptions)],
};
