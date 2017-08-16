const logger = require('../lib/logger');
const streams = require('../lib/streams');
const _ = require('lodash');

function getNewId(req, res, next) {
  streams.getNewId().then(function(streamId) {
    res.json({ streamId });
  }).catch(next);
}

function activate(req, res, next) {
  const streamId = _.get(req, 'params.streamId');
  streams.activate(streamId, req.userId).then(function () {
    res.json({ status: 'ok' });
  }).catch(next);
}

function deactivate(req, res, next) {
  const streamId = _.get(req, 'params.streamId');
  streams.deactivate(streamId, req.userId).then(function () {
    res.json({ status: 'ok' });
  }).catch(next);
}

module.exports = {
  getNewId,
  activate,
  deactivate,
}
