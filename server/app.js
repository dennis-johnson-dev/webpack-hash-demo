import express from 'express';
import path from 'path';
import stats from '../stats.json';
import chunkManifest from '../dist/chunk-manifest.json';

const app = express();

app.use(express.static(path.join(__dirname, '../dist')));

app.get('/', function(req, res) {
  var response = `<!doctype>
    <html>
    <head>
      <script>
        window.webpackManifest = ${JSON.stringify(chunkManifest)};
      </script>
      <script src=${stats.assetsByChunkName.bootstrap}></script>
      <script src=${stats.assetsByChunkName.index}></script>
    </head>
    <body>
      <p>hi</p>
    </body>
    </html>
  `;
  res.send(response);
});

module.exports = app;
