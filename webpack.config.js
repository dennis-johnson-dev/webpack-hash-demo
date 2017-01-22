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
        filename: "styles.[contenthash].css"
      }),
      new StatsWriterPlugin({
        fields: ['entrypoints', 'chunks'],
        transform: (stats, options) => {
          const entryPoints = Object.keys(stats.entrypoints);

          const bundleFiles = entryPoints.reduce((acc, entryPoint) => {
            const chunks = stats.entrypoints[entryPoint].chunks.map((chunk) => {
              return stats.chunks.find((statsChunk) => statsChunk.id === chunk);
            });

            acc[entryPoint] = sortFilesByType(chunks);
            return acc;
          }, {});

          return JSON.stringify(Object.assign({}, bundleFiles), null, 2);
        }
      }),
      new webpack.optimize.AggressiveSplittingPlugin({
        minSize: 90000,
        maxSize: 200000
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

const sortFilesByType = (chunks) => {
  return _.flatten(chunks.map((chunk) => {
    return chunk.files;
  })).reduce((acc, file) => {
    const ext = file.match(/\.([\w]+)$/)[1];

    acc.hasOwnProperty(ext) ? acc[ext].push(file) : acc[ext] = [file]

    return acc;
  }, {});
};

const setConfig = function(overrides) {
  const config = _.assign(defaultConfig, overrides);
  return config;
};

module.exports = setConfig({});
