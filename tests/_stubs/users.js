const counter = 0;

const viewers = {};

module.exports = {
  getNewId() {
    return Promise.resolve(`user-id#${++counter}`);
  },
  exists() {
    return Promise.resolve(true);
  },
  setViewing(userId, streamId) {
    viewers[userId] = viewers[userId] || [];

    if (viewers[userId].length > 2) {
      return Promise.reject();
    }

    viewers[userId].push(streamId)

    return Promise.resolve();
  },
  stopViewing(userId, streamId) {
    const index = viewers[userId].indexOf(streamId);

    if (index > -1) {
      viewers[userId].splice(index, 1);
    }

    return Promise.resolve();
  }
};
