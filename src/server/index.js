const express = require('express');
const app = express();
const server = require('http').createServer(app);
// const server = require('http').Server(app);
const route = require('./config/route.js');
const os = require('os');
const env = 'development';

//credentials
const db = require('./config/database')(env);
require('./database').connect(db.url);

app.get('/*', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

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

server.listen(8080, function () {
  var host = server.address().address;
  var port = server.address().port;
  console.log('Express listening on port http://%s:%s', host, port);
});

module.exports = app;
