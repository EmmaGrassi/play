const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const nodeModules = path.resolve(__dirname, 'node_modules');

const config = {
  entry: {
    app: path.resolve(__dirname, 'client/bootstrap.js'),
    vendor: ['angular']
  },
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: '[name].bundle.js'
  },
  module: {
    noParse: [
      path.resolve(nodeModules, 'angular/angular.min.js')
    ],
    loaders: [
      { test: /\.html$/, loader: 'raw' },
      { test: /\.json$/, loader: 'json-loader' },
      {
        test: /\.js$/,
        loader: 'babel',
        query: {
          presets: ['es2015']
        },
        exclude: /node_modules/
      },
      {
        test: /\.s?css$/,
        loader: 'style!css!sass'
      }
    ]
  },
  devtool: '#source-map',
  plugins: [
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.CommonsChunkPlugin('vendor', 'vendor.bundle.js'),
    new webpack.optimize.UglifyJsPlugin({
      minimize: true,
      sourcemap: true,
      mangle: true
    }),
    new HtmlWebpackPlugin({
      template: 'client/index.html'
    }),
    new CopyWebpackPlugin([
      { from: path.resolve(__dirname, 'client/images'), to: 'images' },
      { from: path.resolve(__dirname, 'client/styles'), to: 'styles' },
    ])
  ]
};

module.exports = config;
