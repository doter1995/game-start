const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CopyFileWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  devtool: 'inline-source-map',
  plugins: [
    new HtmlWebpackPlugin({
      title: 'hello word',
    }),
    new CleanWebpackPlugin(['dist']),
    new CopyFileWebpackPlugin([
      { from: 'Public/images', to: 'images' },
      { from: 'Public/data', to: 'data' },
      { from: 'Public/markdowns', to: 'markdowns' },
    ]),
  ],
  resolve: {
    extensions: ['.js', '.jsx', '.json'],
    alias: {
      Component: path.resolve(__dirname, './src/Components'),
      Page: path.resolve(__dirname, './src/Page'),
      Config: path.resolve(__dirname, './src/Config'),
    },
  },
  module: {
    rules: [
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: ['file-loader'],
      },
      {
        test: /\.js|jsx$/,
        exclude: /node_modules/,
        use: 'babel-loader',
      },
    ],
  },
  optimization: {
    splitChunks: {
      chunks: 'all',
    },
  },
};
