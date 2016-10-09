/**
 * Express middleware that loggs all requests with the prefix
 * "HTTP-ACCESS: " to the verbose log.
 *
 * @author Jonas <jonas.m.andreasson@gmail.com>
 * @license MIT
 */

'use strict';

var logger = require('./logger');

module.exports = function (req, res, next) {
  next();
  logger.verbose("HTTP-ACCESS: %s %s : %s [%s]",
    req.method, req.path, res.statusCode,
    req.headers['user-agent']);
}
