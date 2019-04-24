const express = require('express');
const app = express();
const server = require('http').createServer(app);
const route = require('./config/route.js');
const os = require('os');
const env = 'development';
var cors = require('cors');

//credentials
const db = require('./config/database')(env);
require('./database').connect(db.url);

app.get('/room/*', function(req, res){
  res.sendFile('index.html', { root: './dist/' });
});

app.use(cors());
app.use(express.static('dist'));
app.use('/api', route);

//WebSocket
require('./sockets')(server);

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

server.listen(8081, function () {
  var host = server.address().address;
  var port = server.address().port;
  console.log('Express listening on port http://%s:%s', host, port);
});

module.exports = app;
