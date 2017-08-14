function ret() {
  return new Promise(function(resolve) {
    resolve(1);
  });
}

module.exports = {
  add: ret,
  remove: ret,
  check: ret,
  count: ret
};
