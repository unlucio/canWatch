const logger = require('../lib/logger');
const streams = require('../lib/streams');

function getNew(req, res, next) {
  const streamId = uuid();

  streams.getNewId().then(function(streamId) {
    res.json({ streamId });
  }).catch(next);
}

function activate(req, res, next) {
  streams.activate(streamId, userId).then(function () {
    res.json({ status: 'ok' });
  }).catch(next);
}

function deactivate(req, res, next) {
  streams.deactivate(streamId, userId).then(function () {
    res.json({ status: 'ok' });
  }).catch(next);
}

module.exports = {
  getNew,
  activate,
  deactivate,
}
