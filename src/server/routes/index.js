const streams = require('./streams');
const user = require('./user');
const logger = require('../lib/logger');

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
    logger.error(error);
    res.json({ status: 'ko', error: error.message });
  })
}
