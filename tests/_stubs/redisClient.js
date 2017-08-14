function ret() {
  return Promise.resolve(1);
}

const store = {};

module.exports = {
  add(what, where) {
    store[where] = store[where] || [];
    store[where].push(what)

    return Promise.resolve();
  },
  remove(what, where) {
    store[where] = store[where] || [];
    const index = store[where].indexOf(what);

    if (index > -1) {
      store[where].splice(index, 1);
    }

    return Promise.resolve();
  },
  check(what, where) {
    store[where] = store[where] || [];
    const index = store[where].indexOf(what);
    if (index > -1) {
      return Promise.resolve(1);
    }
    return Promise.resolve(0);
  },
  count(where) {
    store[where] = store[where] || [];
    return Promise.resolve(store[where].length);
  }
};
