const logger = require('../lib/logger');
const users = require('../lib/users');

function getNewId(req, res, next) {
  const streamId = uuid();

  users.getNewId().then(function(streamId) {
    res.json({ streamId });
  }).catch(next);
}

module.exports = {
  getNewId
}
