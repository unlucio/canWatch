const uuid = require('uuid/v4');
const store = require('../stores/redisClient');
const logger = require('./logger');

const setName = 'validUsers';

function getNewId() {
  const userId = uuid();

  return store.add(userId, setName).then(function(result) {
    logger.debug(`UserLib:: new user id: ${userId}`);
    return(userId);
  });
}

function exists(userId) {
  return store.check(userId, setName).then(function(result) {
    logger.debug('UserLib:: extsts result: ', result);
    if (result) {
      return true;
    }

    throw Error('Invalid User Id');
  });
}

function hasSlots(userId) {
  return store.count(userId).then(function (result) {
    logger.debug('UserLib:: hasSlots result: ', result);
    if (result < 3) {
      return true;
    }

    return false;
  });
}

function isAlreadyViewing(userId, streamId) {
  return store.check(streamId, userId);
}

function canWatchStream(userId, streamId) {
   const checks = [
    hasSlots(userId).catch(() => false),
    isAlreadyViewing(userId, streamId).catch(() => false)
  ];

  return Promise.all(checks).then(function (result) {
    logger.debug('UserLib:: canWatchStream result: ', result);
    const [hasSlots, isWatching] = result;

    if (isWatching || hasSlots) {
      return true;
    }

    throw Error('Stream Limit Reached');
  });
}

function startViewing(userId, streamId) {
  logger.debug(`UserLib:: startViewing: userId->${userId}, userId->${streamId}`);
  return canWatchStream(userId, streamId).then(function () {
    return store.add(streamId, userId);
  });
}

function stopViewing(userId, streamId) {
  logger.debug(`UserLib:: stopViewing: userId->${userId}, userId->${streamId}`);
  return store.remove(streamId, userId);
}

module.exports = {
  getNewId,
  exists,
  startViewing,
  stopViewing
};
