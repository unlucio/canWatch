var expect = require('chai').expect;
var proxyquire = require('proxyquire');

var stubs = {
  '../stores/redisClient': require('../../_stubs/redisClient'),
  './users': require('../../_stubs/users'),
  'uuid/v4': function() {
    return 'stream-id'
  }
};

var streams = proxyquire.noCallThru().load('../../../src/server/lib/streams', stubs);

describe('Streams Module', function() {

  it('Should generate a stream id: ', function(done) {
    streams.getNewId().then(function(result) {
      expect(result).to.equal('stream-id');
      done();
    }).catch(done);
  });

  it('Should activate a stream: ', function(done) {
    streams.activate().then(function(result) {
      done();
    }).catch(done);
  });

  it('Should deactivate a stream: ', function(done) {
    streams.deactivate().then(function(result) {
      done();
    }).catch(done);
  });

});
