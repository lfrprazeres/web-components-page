const common = require('./webpack.common');

module.exports = Object.assign(common, {
  mode: 'production',
  optimization: {
    splitChunks: {
      chunks: 'all',
    }
  },
}) 