const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  entry: {
    normalize: path.resolve(__dirname, '..', 'src', 'normalize.css'),
    card: path.resolve(__dirname, '..', 'src', 'webComponents', 'Card', 'styles.scss'),
    cardList: path.resolve(__dirname, '..', 'src', 'webComponents', 'CardList', 'styles.scss'),
    select: path.resolve(__dirname, '..', 'src', 'webComponents', 'Select', 'styles.scss'),
    stars: path.resolve(__dirname, '..', 'src', 'webComponents', 'Stars', 'styles.scss'),
    webComponents: path.resolve(__dirname, '..', 'src', 'webComponents', 'index.ts'),
    index: path.resolve(__dirname, '..', 'src', 'index.ts'),
  },
  output: {
    filename: '[name].[contenthash].js',
    path: path.resolve(__dirname, '..', 'dist'),
    clean: true,
  },
  resolve: {
    extensions: ['.ts', '.js'],
    modules: [path.resolve(__dirname, '..', 'src'), 'node_modules']
  },
  module: {
    rules: [
      {
        test: /\.svg$/,
        loader: 'svg-inline-loader'
      },
      {
        test: /.ts$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.(s[ac]ss|css)$/i,
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader",
          "sass-loader",
        ],
      },
      {
        test: /\.html$/i,
        include: [
          path.resolve(__dirname, '..', 'src', 'webComponents')
        ],
        use: [
          "raw-loader",
        ],
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: ({ chunk }) => {
        console.log('chunk: ', chunk);
        return `${chunk.name.replace('/js/', '/css/')}.css`
      },
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, '..', 'public', 'index.html'),
    }),
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
    })
  ],
}