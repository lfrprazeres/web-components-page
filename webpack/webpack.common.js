const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  entry: {
    normalize: path.resolve(__dirname, '..', 'src', 'normalize.css'),
    index: path.resolve(__dirname, '..', 'src', 'index.ts'),
    cardList: path.resolve(__dirname, '..', 'src', 'webComponents', 'CardList', 'index.ts'),
    card: path.resolve(__dirname, '..', 'src', 'webComponents', 'Card', 'index.ts'),
    select: path.resolve(__dirname, '..', 'src', 'webComponents', 'Select', 'index.ts'),
    stars: path.resolve(__dirname, '..', 'src', 'webComponents', 'Stars', 'index.ts'),
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
        exclude: [
          path.resolve(__dirname, '..', 'src', 'webComponents')
        ],
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader",
          "sass-loader",
        ],
      },
      {
        test: /\.(s[ac]ss)$/i,
        include: [
          path.resolve(__dirname, '..', 'src', 'webComponents')
        ],
        use: [
          "raw-loader",
          {
            loader: "sass-loader",
            options: {
              sassOptions: {
                includePaths: [path.resolve(__dirname, 'node_modules')]
              }
            }
          }
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
    new MiniCssExtractPlugin(),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, '..', 'public', 'index.html'),
    })
  ],
}