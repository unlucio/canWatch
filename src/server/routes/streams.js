const logger = require('../lib/logger');
const streams = require('../lib/streams');

function getNew(req, res, next) {
  const streamId = uuid();

  streams.getNewId().then(function(streamId) {
    res.json({ streamId });
  }).catch(next);
}

function activate(req, res) {
  streams.activate(streamId, userId).then(function () {
    res.json({ status: 'ok' });
  });
}

function deactivate(req, res) {
  streams.activate(streamId, userId).then(function () {
    res.json({ status: 'ok' });
  });
}

module.exports = {
  getNew,
  activate,
  deactivate,
}
