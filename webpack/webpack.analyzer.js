const path = require('path');
const prod = require('./webpack.production');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = Object.assign(prod, {
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: {
    static: path.resolve(__dirname, '..', 'dist'),
    hot: true,
    compress: true,
    port: 3000
  },
  plugins: [
    ...prod.plugins,
    new BundleAnalyzerPlugin(),
  ]
}) 