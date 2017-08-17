
const winston = require('winston');
const Graylog2Transport = require('winston-graylog2');

const logLevel = process.env.LOGLEVEL || 'info';
const useGraylog = Boolean(process.env.GREYLOG) || false;
const host = process.env.GREYLOG_HOST || 'graylog';
const port = process.env.GREYLOG_PORT || 12201;

const graylogConfig = {
  servers: [{ host, port }],
  hostname: 'myServer',
  facility: 'canwatch',
  bufferSize: 1400
};

const transports = [
  new (winston.transports.Console)({ timestamp: true, level: logLevel}),
];

if (useGraylog) {
  transports.push(new (Graylog2Transport)({ timestamp: true, level: logLevel, graylog: graylogConfig}));
}

const logger = new (winston.Logger)({
  exitOnError: false,
  transports: transports
});

module.exports = logger;
