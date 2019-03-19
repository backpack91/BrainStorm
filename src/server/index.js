const express = require('express');
const route = require('./config/route.js');
const os = require('os');
const env = 'development';

const app = express();

const db = require('./config/database')(env);
require('./database').connect(db.url);

app.use(express.static('dist'));

app.use('/api', route);

app.use(function(req, res, next) {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.status(err.status || 500);
  res.json({error: err.message});
});

app.listen(8080, () => console.log('Listening on port 8080!'));
