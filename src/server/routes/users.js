const logger = require('../lib/logger');
const users = require('../lib/users');

function getNewId(req, res, next) {
  users.getNewId().then(function(userId) {
    res.json({ userId });
  }).catch(next);
}

module.exports = {
  getNewId
}
