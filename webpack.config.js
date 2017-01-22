const _ = require('lodash');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const StatsWriterPlugin = require("webpack-stats-plugin").StatsWriterPlugin;
const path = require("path");
const webpack = require('webpack');

const defaultConfig = {
    entry: {
      bundle1: './pages/pageA',
      bundle2: './pages/pageB'
    },
    output: {
      path: path.join(__dirname, "dist"),
      filename: "[name].[chunkhash].js",
      chunkFilename: '[name].[chunkhash].js',
    },
    resolve: {
      extensions: ['.css', '.js']
    },
    stats: {
    },
    devtool: 'source-map',
    recordsPath: path.resolve(__dirname, './records.json'),
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          loader: 'babel-loader'
        },
        {
          test: /\.css$/, loader: ExtractTextPlugin.extract({
            fallbackLoader: "style-loader",
            loader: "css-loader?sourceMap"
          })
        }
      ]
    },
    plugins: [
      new webpack.optimize.CommonsChunkPlugin({
        names: ['common', 'runtime'],
        minChunkSize: 2
      }),
      new ExtractTextPlugin({
        filename: "styles.[contenthash].css",
        allChunks: false
      }),
      new webpack.optimize.AggressiveSplittingPlugin({
        chunkOverhead: 300,
        entryChunkMultiplicator: 1,
        maxSize: 80000
      }),
      new webpack.LoaderOptionsPlugin({
        minimize: true,
        debug: false
      }),
      new webpack.optimize.UglifyJsPlugin({
        beautify: false,
        mangle: {
          screw_ie8: true,
          keep_fnames: true
        },
        compress: {
          screw_ie8: true,
          warnings: false
        },
        sourceMap: true
      })
    ]
};

const setConfig = function(overrides) {
  const config = _.assign(defaultConfig, overrides);
  return config;
};

module.exports = setConfig({});
