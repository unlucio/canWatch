const logger = require('./logger');
const redis = require('redis');
const client = redis.createClient();

client.on('connect', function () {
    logger.info('Redis Client Connected!');
});

client.on('reconnecting', function () {
    logger.warning('Redis Client Reconnecting...');
});

client.on('error', function (error) {
    logger.error('Redis Client Error: ', err);
});

client.on('end', function (error) {
    logger.error('Redis Client Ended!');
});

function add(where, what) {
  return Promise(function (resolve, reject) {
    client.sadd(where, what, function (error, result) {
      if (error) {
        reject(error);
        return;
      }

      resolve(result);
    });
  });
}

function remove(where, what) {
  return Promise(function (resolve, reject) {
    client.srem(where, what, function (error, result) {
      if (error) {
        reject(error);
        return;
      }

      resolve(result);
    });
  });
}

function check(where, what) {
  return Promise(function (resolve, reject) {
    client.sismember(where, what, function (error, result) {
      if (error) {
        reject(error);
        return;
      }

      resolve(result);
    });
  });
}

function count(where) {
  return Promise(function (resolve, reject) {
    client.scard(where, what, function (error, result) {
      if (error) {
        reject(error);
        return;
      }

      resolve(result);
    });
  });
}

module.exports = {
  add,
  remove,
  check,
  count
};
