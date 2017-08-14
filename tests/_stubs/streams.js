
function ret() {
  return new Promise(function(resolve) {
    resolve(1);
  });
}

module.exports = {
  getNewId: ret,
  activate: ret,
  deactivate: ret
};
