const streams = require('./streams');
const user = require('./user');
const logger = require('../lib/logger');
const _ = require('lodash');

function webRoot(req, res) {
  logger.info('someone called /');
  res.end('yo');
}

module.exports = function(app) {

  app.get('/', webRoot);

  app.get('/users/newId', user.getNewId);

  app.get('/streams/newId', streams.getNewId);

  app.put('/streams/:streamId/activate', streams.activate);

  app.put('/streams/:streamId/deactivate', streams.deactivate);

  app.use(function(error, req, res, next) {
    let status = 403;

    if (_.includes(error.message, 'Invalid Data.')) {
      status = 404
    }

    logger.error(error);
    res.status(status).json({ status: 'ko', error: error.message });
  })
}
