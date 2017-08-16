const expect = require('chai').expect;
const client = require('../client');

describe('Testing Activating Too Many Streams', function() {
  let userId;
  const streamIds = [];

  it('Getting ids: ', function(done) {
    client.getUserId().then(function(result) {
      userId = result.userId;
      console.log('Got userId: ', userId);
      done();
    }).catch(done);
  });

  it('Activating stream 1', function(done) {
    client.getStremId().then(function({ streamId }) {
      streamIds.push(streamId);
      console.log(streamIds);
      return client.activateStream({ userId, streamId }).then(function(result) {
        console.log('Activated Stream 1: ', result);
        done();
      });
    }).catch(done);
  });

  it('Activating stream 2', function(done) {
    client.getStremId().then(function({ streamId }) {
      streamIds.push(streamId);
      return client.activateStream({ userId, streamId }).then(function(result) {
        console.log('Activated Stream 2: ', result);
        done();
      });
    }).catch(done);
  });

  it('Activating stream 3', function(done) {
    client.getStremId().then(function({ streamId }) {
      streamIds.push(streamId);
      return client.activateStream({ userId, streamId }).then(function(result) {
        console.log('Activated Stream 3: ', result);
        done();
      });
    }).catch(done);
  });

  it('Activating stream 4', function(done) {
    client.getStremId().then(function({ streamId }) {
      streamIds.push(streamId);
      return client.activateStream({ userId, streamId }).catch(function(error) {
        console.log('failed activating stream 4: ', error);
        done();
      });
    }).then(function(){ done() ;});
  });

});
