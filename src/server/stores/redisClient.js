const logger = require('../lib/logger');
const redis = require('redis');
const host = process.env.REDIS_URL || 'redis';
const client = redis.createClient({ host });

let clientOk = false;

client.on('connect', function () {
    logger.info('Redis Client Connected!');
    clientOk = true;
});

client.on('reconnecting', function () {
    logger.warn('Redis Client Reconnecting...');
    clientOk = false;
});

client.on('error', function (error) {
    logger.error('Redis Client Error: ', error);
});

client.on('end', function (error) {
    logger.error('Redis Client Ended!');
    clientOk = false;
});

function add(what, where) {
  logger.debug(`Redis:: add what(${what}), where(${where})`);
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
  logger.debug(`Redis:: remove what(${what}), where(${where})`);
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
  logger.debug(`Redis:: check what(${what}), where(${where})`);
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
  logger.debug(`Redis:: count where(${where})`);
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
  count,
  isConnected() {
    return clientOk;
  }
};
