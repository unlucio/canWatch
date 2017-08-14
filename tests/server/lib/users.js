var expect = require('chai').expect;
var proxyquire = require('proxyquire');

var stubs = {
  '../stores/redisClient': require('../../_stubs/redisClient'),
  './streams': require('../../_stubs/streams'),
  'uuid/v4': function() {
    return 'user-id'
  }
};

var user = proxyquire.noCallThru().load('../../../src/server/lib/users', stubs);

describe('Streams Module', function() {

  it('Should generate a stream id: ', function(done) {
    user.getNewId().then(function(result) {
      expect(result).to.equal('user-id');
      done();
    }).catch(done);
  });

  it('Should activate a stream: ', function(done) {
    user.exists().then(function(result) {
      done();
    }).catch(done);
  });

  it('Should deactivate a stream: ', function(done) {
    user.setViewing().then(function(result) {
      done();
    }).catch(done);
  });

    it('Should deactivate a stream: ', function(done) {
    user.stopViewing().then(function(result) {
      done();
    }).catch(done);
  });

});
