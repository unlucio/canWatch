const expect = require('chai').expect;
const proxyquire = require('proxyquire');

const stubs = {
  '../stores/redisClient': require('../../_stubs/redisClient'),
  './users': require('../../_stubs/user'),
  'uuid/v4': function() {
    return 'stream-id'
  }
};

const streams = proxyquire.noCallThru().load('../../../src/server/lib/streams', stubs);

const userId = 'user-id';
const streamId = 'stream-id'

describe('Streams Module', function() {

  it('Should generate a stream id: ', function(done) {
    streams.getNewId().then(function(result) {
      expect(result).to.equal('stream-id');
      done();
    }).catch(done);
  });

  it('Should activate a stream: ', function(done) {
    streams.activate(streamId, userId).then(function(result) {
      done();
    }).catch(done);
  });

  it('Should deactivate a stream: ', function(done) {
    streams.deactivate(streamId, userId).then(function(result) {
      done();
    }).catch(done);
  });

  it('Should reject more than 3 streams: ', function(done) {
    streams.activate('stream-id#1', 'user-id#1');
    streams.activate('stream-id#2', 'user-id#1');
    streams.activate('stream-id#3', 'user-id#1');
    streams.activate('stream-id#4', 'user-id#1').then(function(result) {
      done(new Error('The user was able to activate a 4th stream'));
    }).catch(function() {
      done();
    });
  });

});
