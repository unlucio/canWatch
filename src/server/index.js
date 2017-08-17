const express = require('express');
const path = require('path');
const morgan = require('morgan')
const app = express();
const server = require('http').Server(app);
const logger = require('./lib/logger');
const routes =  require('./routes');
const middlewares =  require('./middlewares');

const port = process.env.PORT || 3000;

app.use(morgan('combined'));

app.use(middlewares.storeConnectionCheck);
app.use(middlewares.getUserId);

routes(app);

server.listen(port, function () {
  logger.info(`CanWatch listening on ${port}`)
});
