const path = require('path');
const fs = require('fs');

const CopyWebpackPlugin = require('copy-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const { RawSource } = require('webpack-sources');

class ContentScriptPlugin {
  constructor(options = {}) {
    const { entry = 'content', template = './content.template.js' } = options;
    this.entry = entry;
    this.delimiter = '__PAGE_JS__';
    this.contentWrapString = fs.readFileSync(template, { encoding: 'utf8' });
  }
  apply(compiler) {
    compiler.hooks.emit.tapAsync('ContentScriptPlugin', (compilation, callback) => {
      const contentChildren = compilation.assets[`${this.entry}.js`].children;
      const source = contentChildren[0].source();
      contentChildren.splice(0, 1, new RawSource(this.contentWrapString.replace(this.delimiter, source)));
      callback();
    });
  }
}

/**
 * @type {import('webpack/declarations/WebpackOptions').WebpackOptions}
 */
module.exports = {
  mode: 'development',
  entry: {
    content: './src/content',
  },
  module: {
    rules: [
      {
        test: /\.ts?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.(svg|png|jpg|gif)$/,
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
    new CleanWebpackPlugin({ cleanStaleWebpackAssets: false }),
    new CopyWebpackPlugin([{ from: './public', to: './' }]),
    new ContentScriptPlugin(),
  ],
  devtool: 'source-map',
};
