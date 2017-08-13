const streams = require('./streams');
const users = require('./users');
const logger = require('../lib/logger');

function webRoot(req, res) {
  logger.info('someone called /');
  res.end('yo');
}

module.exports = function(app) {

  app.get('/', webRoot);

  app.get('/users/new', users.getNew);

  app.get('/streams/new', streams.getNew);

  app.put('/streams/:id/activate', streams.activate)

  app.put('/streams/:id/deactivate', streams.deactivate)


}
