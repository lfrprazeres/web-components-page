const path = require('path');
const common = require('./webpack.common');

module.exports = Object.assign(common, {
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: {
    static: path.resolve(__dirname, '..', 'dist'),
    hot: true,
    compress: true,
    port: 3000
  }
}) 