/* eslint-env node */

const path = require('path');

module.exports = {
  entry: {
    test: './dist/test/index.js',
  },
  resolve: {
    alias: {
      'with-global': path.join(__dirname, 'dist', 'index.js'),
    },
  },
  output: {
    path: path.join(__dirname, 'dist', 'test'),
    filename: '[name].webpack.js',
  },
};
