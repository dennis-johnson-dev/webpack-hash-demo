const _ = require('lodash');
const config = require('../webpack.config.js');
const chalk = require('chalk');
const fs = require('fs');
const rimraf = require('rimraf');
const path = require('path');
const util = require('util');
const webpack = require("webpack");

rimraf(path.resolve(__dirname, '../dist'), (err) => {
  if (err) {
    console.log('there was an error deleting the dist directory', err);
    process.exit(1);
  }

  const compiler = webpack(config);

  compiler.apply(new webpack.ProgressPlugin((percentage, msg) => {
    process.stdout.write(chalk.yellow(`${Math.round(percentage * 100)} %\r`))
  }));

  compiler.run((err, stats) => {
    if (err || stats.hasErrors()) {
      console.log('there was an error in the compilation', err, stats.compilation.errors.map((error) => error.message));
      process.exit(1);
    }
    const entryPoints = Object.keys(stats.compilation.entrypoints);

    const bundleFiles = entryPoints.reduce((acc, entryPoint) => {
      acc[entryPoint] = sortFilesByType(stats.compilation.entrypoints[entryPoint].chunks);
      return acc;
    }, {});

    fs.writeFile('./dist/stats.json', JSON.stringify(Object.assign({}, bundleFiles), null, 2), (err) => {
      if (err) {
        console.log('error writing stats file', err);
      }

      console.log(chalk.cyan('Success!'));
    });
  });
});

const sortFilesByType = (chunks) => {
  return _.flatten(chunks.map((chunk) => {
    return chunk.files;
  })).reduce((acc, file) => {
    if (file.includes('.js')) {
      acc.js.push(file);
    } else if (file.includes('.css')) {
      acc.css.push(file);
    }

    return acc;
  }, { js: [], css: [] });
};
