/**
 * Application main entrypoint starting the server.
 *
 * @author Jonas
 * @license MIT
 *
 */
'use strict';

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

var verisureConfig = {
  username: process.env.VERISURE_USER,
  password: process.env.VERISURE_PASSWORD
};

var verisureApi = require('verisure-api').setup(verisureConfig);

/**
 * Get telldus API secrets from the environment.
 */
var telldusConfig = {
  telldusPublicKey: process.env.TELLDUS_PUBLIC_KEY,
  telldusPrivateKey: process.env.TELLDUS_PRIVATE_KEY,
  telldusToken: process.env.TELLDUS_TOKEN,
  telldusTokenSecret: process.env.TELLDUS_TOKEN_SECRET
};

var armedHomeDevice = process.env.TELLDUS_ARMEDHOME_DEVICE;
var armedAwayDevice = process.env.TELLDUS_ARMEDAWAY_DEVICE;


var telldus = require('telldus-live-promise');
var api = telldus.API(telldusConfig);
var devices = telldus.Devices(api);

/**
 * Called when a change in alarm status is detected, toggles the state
 * of given telldus dvices depending on the new alarm state.
 *
 * @param {object} data - The alarm status info object
 */
function updateTelldus(data) {
  logger.info("Alarm state changed, new state is [%s]", data.status);

  switch (data.status) {
    case 'unarmed':
      devices.turnOff(armedHomeDevice).then(
        function (response) {
          logger.info("Armed home device set to off");
        },
        function (response) {
          logger.error("Could not change state of armed home device, result", response);
        }
      )

      devices.turnOff(armedAwayDevice).then(
        function (response) {
          logger.info("Armed away device set to off");
        },
        function (response) {
          logger.error("Could not change state of armed away device, result", response);
        }
      )
      break;

    case 'armedhome':
      devices.turnOn(armedHomeDevice).then(
        function (response) {
          logger.info("Armed home device set to on");
        },
        function (response) {
          logger.error("Could not change state of armed home device, result", response);
        }
      )
      break;

    case 'armedaway':
      devices.turnOn(armedAwayDevice).then(
        function (response) {
          logger.info("Armed away device set to on");
        },
        function (response) {
          logger.error("Could not change state of armed away device, result", response);
        }
      )
      break;

    default:
      logger.error("Got unknown alarm state [%s]", data.status );

  }
}

// Subscribe to alarm state changes
verisureApi.on('alarmChange', updateTelldus);
