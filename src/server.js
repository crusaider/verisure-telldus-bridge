/**
 * Application main entrypoint starting the server.
 *
 * @author Jonas
 * @license MIT
 *
 */
'use strict';

var history = require('./history');
var logger = require('./logger');

logger.info("============================================================");
logger.info("Runtime configuration");
logger.info("LogLevel: %s", logger.logLevel);
logger.info("NODE_ENV: %s", process.env.NODE_ENV);
logger.info("Verisure username: %s", process.env.VERISURE_USER);
logger.info("Verisure password: %s", process.env.VERISURE_PASSWORD ? "Is set" : "Is NOT set");
logger.info("Telldus public key: %s", process.env.TELLDUS_PUBLIC_KEY ? "Is set" : "Is NOT set");
logger.info("Telldus private key: %s", process.env.TELLDUS_PRIVATE_KEY ? "Is set" : "Is NOT set");
logger.info("Telldus token: %s", process.env.TELLDUS_TOKEN ? "Is set" : "Is NOT set");
logger.info("Telldus token secret: %s", process.env.TELLDUS_TOKEN_SECRET ? "Is set" : "Is NOT set");
logger.info("Telldus armed home device: %s", process.env.TELLDUS_ARMEDHOME_DEVICE ? process.env.TELLDUS_ARMEDHOME_DEVICE : "Is NOT set");
logger.info("Telldus armed away device: %s", process.env.TELLDUS_ARMEDAWAY_DEVICE ? process.env.TELLDUS_ARMEDAWAY_DEVICE : "Is NOT set");
logger.info("============================================================");


// Install process exit handler
var nodeCleanup = require('node-cleanup');

nodeCleanup(function() {
  logger.info("Process Exiting");
});

require('./bridge');
