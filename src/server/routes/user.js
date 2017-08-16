const user = require('../lib/user');

function getNewId(req, res, next) {
  user.getNewId().then(function(userId) {
    res.json({ userId });
  }).catch(next);
}

module.exports = {
  getNewId
}
