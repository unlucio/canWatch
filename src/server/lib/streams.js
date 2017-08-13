const uuid = require('uuid/v4');
const store = require('../../stores/redisClient');
const user = require('./user');

function getNewId() {
  const streamId = uuid();

  return store.add(streamId, 'validStreams').then(function(result) {
    console.log('=====> streamId result: ', result);
    return(streamId);
  });
}

function activate(streamId, userId) {
  return user.exists(userId).then(function() {
    return user.setViewing(userId, streamId);
  });
}

module.exports = {
  getNewId,
  activate
};
