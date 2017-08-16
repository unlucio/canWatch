const logger = require('../lib/logger');
const redis = require('redis');
const client = redis.createClient({host: 'redis' , port: 6379});

client.on('connect', function () {
    logger.info('Redis Client Connected!');
});

client.on('reconnecting', function () {
    logger.warn('Redis Client Reconnecting...');
});

client.on('error', function (error) {
    logger.error('Redis Client Error: ', error);
});

client.on('end', function (error) {
    logger.error('Redis Client Ended!');
});

function add(what, where) {
  return new Promise(function (resolve, reject) {
    client.sadd(where, what, function (error, result) {
      if (error) {
        reject(error);
        return;
      }

      resolve(result);
    });
  });
}

function remove(what, where) {
  return new Promise(function (resolve, reject) {
    client.srem(where, what, function (error, result) {
      if (error) {
        reject(error);
        return;
      }

      resolve(result);
    });
  });
}

function check(what, where) {
  return new Promise(function (resolve, reject) {
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
  return new Promise(function (resolve, reject) {
    client.scard(where, function (error, result) {
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
