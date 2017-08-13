const uuid = require('uuid/v4');
const store = require('../stores/redisClient');
const user = require('./users');

const setName = 'validStreams';

function getNewId() {
  const streamId = uuid();

  return store.add(streamId, setName).then(function() {
    return streamId;
  });
}

function exists(streamId) {
  return store.check(streamId, setName).then(function(result) {
    console.log('=====> userId result: ', result);

    if (result) {
      return true;
    }

    throw Error('Invalid Stream Id');
  });
}

function validateData(streamId, userId) {
  const checks = [
    exists(streamId).catch(() => false),
    user.exists(userId).catch(() => false)
  ];

  return Promise.all(checks).then(function (validStream, validUser) {
    if (validStream && validUser) {
      return true;
    }

    throw Error('Invalid Data.');
  });
}

function activate(streamId, userId) {
  return  validateData(streamId, userId).then(function() {
    return user.setViewing(userId, streamId);
  });
}

function deactivate(streamId, userId) {
  return  validateData(streamId, userId).then(function() {
    return user.stopViewing(userId, streamId);
  });
}

module.exports = {
  getNewId,
  activate,
  deactivate
};
