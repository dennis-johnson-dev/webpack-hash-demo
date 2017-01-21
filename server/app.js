import express from 'express';
import path from 'path';
import stats from '../dist/stats.json';

const app = express();

app.use(express.static(path.join(__dirname, '../dist')));

app.get('/', (req, res) => {
  res.send('hai');
});

app.get('/bundle1', (req, res) => {
  res.send(getResponse(stats['bundle1']));
});

app.get('/bundle2', (req, res) => {
  res.send(getResponse(stats['bundle2']));
});

module.exports = app;

const getResponse = (bundle) => {
  return `
    <!doctype>
    <html>
    <head>
      ${getScripts(bundle.js)}
      ${getStyles(bundle.css)}
    </head>
    <body>
      <p>ho</p>
    </body>
    </html>
  `;
};

const getScripts = (js) => {
  return js.reduce((acc, file) => {
    return acc + `<script src=/${file}></script>\n`;
  }, '');
};

const getStyles = (js) => {
  return js.reduce((acc, file) => {
    return acc + `<link rel="stylesheet" href=/${file} type="text/css" />\n`;
  }, '');
};
