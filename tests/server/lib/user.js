const expect = require('chai').expect;
const proxyquire = require('proxyquire');

const stubs = {
  '../stores/redisClient': require('../../_stubs/redisClient'),
  './streams': require('../../_stubs/streams'),
  'uuid/v4': function() {
    return 'user-id'
  }
};

const user = proxyquire.noCallThru().load('../../../src/server/lib/user', stubs);

const userId = 'user-id';
const streamId = 'stream-id'

describe('User Module', function() {

  it('Should generate a stream id: ', function(done) {
    user.getNewId().then(function(result) {
      expect(result).to.equal('user-id');
      done();
    }).catch(done);
  });

  it('Should activate a stream: ', function(done) {
    user.exists(userId).then(function(result) {
      done();
    }).catch(done);
  });

  it('Should deactivate a stream: ', function(done) {
    user.startViewing(userId, streamId).then(function(result) {
      done();
    }).catch(done);
  });

  it('Should deactivate a stream: ', function(done) {
    user.stopViewing(userId, streamId).then(function(result) {
      done();
    }).catch(done);
  });

  it('Should reject more than 3 streams: ', function(done) {
    user.startViewing('user-id#1', 'stream-id#1').then(function() {
      return user.startViewing('user-id#1', 'stream-id#2');
    }).then(function() {
      return user.startViewing('user-id#1', 'stream-id#3');
    }).then(function() {
      user.startViewing('user-id#1', 'stream-id#4').then(function(result) {
        done(new Error('The user was able to activate a 4th stream'));
      }).catch(function() {
        done();
      });
    });
  });


});
