//
//
// Stolen with pride from: http://tostring.it/2014/06/23/advanced-logging-with-nodejs/
//
//
'use strict';

var logLevel = process.env.LOGLEVEL || 'info';

var dateFormat = require('dateformat');

var winston = require('winston');
winston.emitErrs = true;

var logger = new winston.Logger({
  transports: [
    /*
    new winston.transports.File({
        level: 'info',
        filename: './logs/all-logs.log',
        handleExceptions: true,
        json: true,
        maxsize: 5242880, //5MB
        maxFiles: 5,
        colorize: false
    }),
    */
    new winston.transports.Console({
      level: logLevel,
      handleExceptions: true,
      json: false,
      colorize: true,
      timestamp: function () {
        return dateFormat(Date.now(), "isoDateTime");
      },
      formatter: function (options) {
        // Return string will be passed to logger.
        return options.timestamp() + ' ' + options.level.toUpperCase() + ' ' + (undefined !== options.message ? options.message : '') +
          (options.meta && Object.keys(options.meta).length ? '\n\t' + JSON.stringify(options.meta) : '');
      }

    })
  ],
  exitOnError: false
});

module.exports = logger;
module.exports.stream = {
  write: function (message, encoding) {
    logger.info(message);
  }
};
module.exports.logLevel = logLevel;
