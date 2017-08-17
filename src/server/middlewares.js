const store = require('./stores/redisClient');
const logger = require('./lib/logger');

function getUserId(req, res, next) {
  req.userId = req.headers['x-userid'];

  next();
}

function storeConnectionCheck(req, res, next) {
    if (!store.isConnected()) {
        logger.debug('Store not connected!');
        res.status(503).json({ status: 'ko', error: 'Service Unavailable' });
        return;
    }

    next();
}

module.exports = {
    getUserId,
    storeConnectionCheck,
}
