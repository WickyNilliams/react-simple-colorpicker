var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {

  devtool : "eval",
  debug : true,

  entry: [
    'webpack-dev-server/client?http://localhost:3000',
    './example/src/app.js'
  ],

  output: {
    path: path.join(__dirname, 'example', 'dist'), // Must be an absolute path
    filename: 'bundle.js'
  },

  module: {
    loaders: [
      {
        test: /\.js$/,
        loaders: ['babel'],
        include: [
          path.join(__dirname, 'src'), // Must be an absolute path
          path.join(__dirname, 'example', 'src') // Must be an absolute path
        ]
      },
      {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract('style', 'css!sass'),
        exclude: /node_modules/
      },
      {
        test: /\.json$/,
        loaders: ["json"]
      }
    ]
  },

  plugins: [
    new ExtractTextPlugin('screen.css', { allChunks: true })
  ],

  devServer : {
    contentBase: "example/dist/",
    "host": "0.0.0.0"
  }
};
