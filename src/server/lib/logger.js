
const winston = require('winston');
const Graylog2Transport = require('winston-graylog2');
const logLevel = 'info';

const onGraylog = true;
const graylogConfig = {
    servers: [{host: 'graylog', port: 12201}],
    hostname: 'myServer',
    facility: 'canwatch',
    bufferSize: 1400
  }

const transports = [
  new (winston.transports.Console)({ timestamp: true, level: logLevel}),
];

if (onGraylog) {
  transports.push(new (Graylog2Transport)({ timestamp: true, level: logLevel, graylog: graylogConfig}));
}

const logger = new (winston.Logger)({
  exitOnError: false,
  transports: transports
});

module.exports = logger;
