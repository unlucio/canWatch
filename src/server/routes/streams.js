const logger = require('../lib/logger');

function getNew(req, res) {
  res.end('new stream id');
}

function activate(req, res) {
  res.end(`activated ${req.params.id}`);
}

function deactivate(req, res) {
  res.end(`deactivated ${req.params.id}`);
}

module.exports = {
  getNew,
  activate,
  deactivate,
}
