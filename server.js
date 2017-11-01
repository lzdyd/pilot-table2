const path = require('path');
const webpack = require('webpack');
const express = require('express');
const config = require('./webpack.config');

const app = express();
const compiler = webpack(config);

app.use(require('webpack-dev-middleware')(compiler, {
  publicPath: config.output.publicPath
}));

app.use(require('webpack-hot-middleware')(compiler));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/index.html'));
});

// app.get('/data.json', (req, res) => {
//   res.sendFile(path.join(__dirname, '/data.json'));
// });

app.get('/data2.json', (req, res) => {
  res.sendFile(path.join(__dirname, './data2.json'));
});

app.listen(3000, (err) => {
  if (err) {
    console.error(err);
  }

  console.log('Listening at http://localhost:3000/');
});
