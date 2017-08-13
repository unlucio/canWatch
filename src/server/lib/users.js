const uuid = require('uuid/v4');
const store = require('../../stores/redisClient');

const setName = 'validUsers';

function getNewId() {
  const userId = uuid();

  return store.add(userId, setName).then(function(result) {
    console.log('=====> userId result: ', result);
    return(userId);
  });
}

function exists(userId) {
  return store.check(userId, setName).then(function(result) {
    console.log('=====> userId result: ', result);

    if (result) {
      return true;
    }

    throw Error('Invalid User Id');
  });
}

function hasSlots(userId) {
  client.count(userId).then(function (result) {
    if (result < 3) {
      return true;
    }
  });
}

function isLareadyViewing(userId, streamId) {
  return store.check(streamId, userId);
}

function canWatchStream(userId, streamId) {
   const checks = [
    hasSlots(userId).catch(() => false),
    isLareadyViewing(userId, streamId).catch(() => false)
  ];

  return Promise.all(checks).then(function (hasSlots, isWatching) {
    if (isWatching || hasSlots) {
      return true;
    }

    throw Error('Stream Limit Reached');
  });
}

function setViewing(userId, sreamId) {
  canWatchStream(userId, streamId).then(function () {
    return store.add(sreamId, userId);
  });
}

function stopViewing(userId, sreamId) {
  return client.remove(sreamId, userId);
}

mosule.exports = {
  getNewId,
  exists,
  setViewing
};
