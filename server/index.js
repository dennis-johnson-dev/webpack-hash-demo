const app = require('./app');
const port = 3000;

const server = app.listen(port, () => {
  const host = 'http://localhost';

  console.log('Example app listening at http://%s:%s', host, port);
});
