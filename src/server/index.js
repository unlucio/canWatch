const express = require('express');
const path = require('path');
const morgan = require('morgan')
const app = express();
const server = require('http').Server(app);
const logger = require('./lib/logger');
const routes =  require('./routes');

app.set('port', process.env.PORT || 3000);
app.use(morgan('combined'));

app.use(function(req, res, next) {
    req.userId = req.headers['x-userid'];
    next();
});

routes(app);

server.listen(app.get('port'), function () {
  logger.info('CanWatch listening on ' + app.get('port'))
});
