/**
 * bridge.js - The bridge listening for chnages in the versiure
 * service and when relevant relays them to the telldus service.
 */

'use strict';

var history = require('./history');
var logger = require('./logger');

var verisureConfig = {
  username: process.env.VERISURE_USER,
  password: process.env.VERISURE_PASSWORD,
  onError: onVerisureError
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

var currentAlarmState = undefined;

// Subscribe to alarm state changes
verisureApi.on('alarmChange', updateTelldus);


// Log a event that the app has started
history.logEvent('Application started');

/**
 * Called when a change in alarm status is detected, toggles the state
 * of given telldus dvices depending on the new alarm state.
 *
 * @param {object} data - The alarm status info object
 */
function updateTelldus(data) {

  if ( currentAlarmState ) {
    logger.info("Alarm state changed, new state is [%s]", data.status);
  } else {
    logger.info("Current state unknown, will be set to [%s]", data.status);
  }
  history.logEvent( 'Alarm state changed from ' + currentAlarmState +
    ' to ' + data.status);

  switch (data.status) {
    case 'unarmed':
      switch (currentAlarmState) {
        case undefined:
          setDeviceState(armedHomeDevice, 'off');
          setDeviceState(armedAwayDevice, 'off');
          break;
        case 'unarmed':
          break;
        case 'armedhome':
          setDeviceState(armedHomeDevice, 'off');
          break;
        case 'armed':
          setDeviceState(armedAwayDevice, 'off');
          break;
      }
      break;

    case 'armedhome':
      switch (currentAlarmState) {
        case undefined:
          setDeviceState(armedHomeDevice, 'on');
          setDeviceState(armedAwayDevice, 'off');
          break;
        case 'unarmed':
          setDeviceState(armedHomeDevice, 'on');
          break;
        case 'armedhome':
          break;
        case 'armed':
          setDeviceState(armedHomeDevice, 'on');
          setDeviceState(armedAwayDevice, 'off');
          break;
      }
      break;

    case 'armed':
      switch (currentAlarmState) {
        case undefined:
          setDeviceState(armedHomeDevice, 'off');
          setDeviceState(armedAwayDevice, 'on');
          break;
        case 'unarmed':
          setDeviceState(armedAwayDevice, 'on');
          break;
        case 'armedhome':
          setDeviceState(armedHomeDevice, 'off');
          setDeviceState(armedAwayDevice, 'on');
          break;
        case 'armed':
          break;
      }
      break;

    default:
      logger.error("Got unknown alarm state [%s]", data.status);

  }

  currentAlarmState = data.status;
}

/**
 * Sets state of a verisure device and logs the result
 *
 * @param {any} device - ID of the device to set state of
 * @param {any} state - The state to set can be 'on' or 'off'
 */
function setDeviceState(device, state) {
  switch (state) {
    case 'on':
      devices.turnOn(device).then(
        function (response) {
          logger.debug("Device %s set to on", device);
        },
        function (response) {
          logger.error("Could not set state of device %s to on, response",
            device, response);
        });
      break;
    case 'off':
      devices.turnOff(device).then(
        function (response) {
          logger.debug("Device %s set to off", device);
        },
        function (response) {
          logger.error("Could not set state of device %s to on, response",
            device, response);
        });
      break;
    default:
      logger.error("Unknow device state %s", state);
  }
}

/**
 * Called when the verisure error module runs into a error calling the
 * verisure service.
 *
 * @param {any} error
 */
function onVerisureError( error ) {
  logger.error("Verisure error:", error);
}



