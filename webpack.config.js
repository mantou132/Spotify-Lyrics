const path = require('path');

const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const { ReplaceWithChunkPlugin } = require('replace-with-chunk-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const isProd = process.env.NODE_ENV === 'production';

/**
 * @type {import('webpack/declarations/WebpackOptions').WebpackOptions}
 */
module.exports = {
  mode: 'development',
  entry: {
    content: './src/content',
    welcome: './src/welcome',
    page: process.env.TEST === 'matchrate' ? './script/matchrate' : './src/page',
    popup: './src/popup',
    options: './src/options',
    background: './src/background',
  },
  module: {
    rules: [
      {
        test: /\.ts?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.(svg|png|jpg|gif|gz)$/,
        use: ['file-loader'],
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  output: {
    publicPath: '/',
    path: path.resolve(__dirname, 'extension'),
  },
  plugins: [
    new HtmlWebpackPlugin({
      chunks: ['options'],
      filename: 'options.html',
      title: 'Spotify Lyrics Options',
    }),
    new HtmlWebpackPlugin({ chunks: ['popup'], filename: 'popup.html' }),
    new HtmlWebpackPlugin({ chunks: ['welcome'], filename: 'welcome.html', title: 'Welcome' }),
    new CleanWebpackPlugin({ cleanStaleWebpackAssets: false }),
    new CopyWebpackPlugin({ patterns: [{ from: './public', to: './' }] }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
      'process.env.VERSION': JSON.stringify(process.env.npm_package_version),
    }),
    new ReplaceWithChunkPlugin({
      chunks: ['content'],
    }),
  ],
  devtool: isProd ? false : 'source-map',
};
