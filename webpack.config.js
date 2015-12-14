var path = require("path");
var webpack = require('webpack');
var ChunkManifestPlugin = require('chunk-manifest-webpack-plugin');
var _ = require('lodash');

var defaultConfig = {
    entry: {
      bundle1: './pages/pageA',
      bundle2: './pages/pageB'
    },
    output: {
      path: path.join(__dirname, "dist"),
      filename: "[chunkhash].[name].js",
      chunkFilename: '[chunkhash].[name].js',
      library: ["[name]"],
      libraryTarget: 'var'
    },
    module: {
      loaders: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          loader: 'script'
        }
      ]
    },
    plugins: [
      function() {
        this.plugin("done", function(stats) {
          require("fs").writeFileSync(
            path.join(__dirname, "stats.json"),
            JSON.stringify(stats.toJson()));
        });
      },
      new webpack.optimize.OccurenceOrderPlugin()
    ]
};

var setConfig = function(overrides) {
  var config = _.assign(defaultConfig, overrides);
  return config;
};

module.exports = setConfig({
  // entry: {
  //   index: './index',
  //   vendor: './modules/vendor'
  // },
  // module: {
  //   loaders: [
  //     {
  //       test: /\.js$/,
  //       exclude: /node_modules/,
  //       loader: 'babel'
  //     }
  //   ]
  // },
  // recordsPath: path.join(__dirname, './records.json')
});
