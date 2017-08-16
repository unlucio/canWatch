const uuid = require('uuid/v4');
const store = require('../stores/redisClient');
const user = require('./user');
const logger = require('./logger');

const setName = 'validStreams';

function getNewId() {
  const streamId = uuid();

  return store.add(streamId, setName).then(function() {
    return streamId;
  });
}

function exists(streamId) {
  return store.check(streamId, setName).then(function(result) {
    if (result) {
      return true;
    }

    throw Error('Invalid Stream Id');
  });
}

function validateData(streamId, userId) {
  const checks = [
    exists(streamId).catch(function(){
      logger.error('Nonexistent stramId: ', streamId);
      return false;
    }),
    user.exists(userId).catch(function(){
      logger.error('Nonexistent userId: ', streamId);
      return false;
    })
  ];

  return Promise.all(checks).then(function (result) {
    const [validStream, validUser] = result;

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
