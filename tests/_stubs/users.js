
function ret() {
  return new Promise(function(resolve) {
    resolve(1);
  });
}

module.exports = {
  getNewId: ret,
  exists: ret,
  setViewing: ret,
  stopViewing: ret
};
