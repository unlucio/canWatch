const counter = 0;

module.exports = {
  getNewId() {
    return Promise.resolve(`stream-id#${++counter}`);
  },
  activate() {
    return Promise.resolve();
  },
  deactivate() {
    return Promise.resolve();
  }
};
