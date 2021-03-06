const uuid = require('uuid/v4');
const store = require('../stores/redisClient');
const user = require('./user');
const logger = require('./logger');

const setName = 'validStreams';

function getNewId() {
  const streamId = uuid();

  return store.add(streamId, setName).then(function() {
    logger.debug(`StreamLib:: new stream id: ${streamId}`);
    return streamId;
  });
}

function exists(streamId) {
  return store.check(streamId, setName).then(function(result) {
    logger.debug('StreamLib:: extsts result: ', result);
    if (result) {
      return true;
    }

    return Promise.reject(new Error('Invalid Stream Id'));
  });
}

function validateData(streamId, userId) {
  const checks = [
    exists(streamId).catch(function(){
      logger.error('StreamLib:: Nonexistent stramId: ', streamId);

      return false;
    }),
    user.exists(userId).catch(function(){
      logger.error('StreamLib:: Nonexistent userId: ', streamId);

      return false;
    })
  ];

  return Promise.all(checks).then(function (result) {
    logger.debug('StreamLib:: validateData result: ', result);
    const [validStream, validUser] = result;

    if (validStream && validUser) {
      return true;
    }

    return Promise.reject(new Error('Invalid Data.'));
  });
}

function activate(streamId, userId) {
  return  validateData(streamId, userId).then(function() {
    return user.startViewing(userId, streamId);
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
