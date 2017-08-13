const express = require('express');
const path = require('path');
const morgan = require('morgan')
const app = express();
const server = require('http').Server(app);
const logger = require('./lib/logger');


app.use(morgan('combined'));
app.set('port', process.env.PORT || 3000);

app.get('/', function (req, res) {
  logger.info('someone called /');
  res.end('yo');
});

server.listen(app.get('port'), function () {
  logger.info('CanWatch listening on ' + app.get('port'))
});
