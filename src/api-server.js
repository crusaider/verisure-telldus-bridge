/**
 * api-server.js Init code for the HTTP server serving the rest API and
 * static content. The port can be set troug the environment variable
 * 'PORT', defaults to 8080.
 */
'use strict';

var logger = require('./logger');

// Set up web server

var port = process.env.PORT || 8080;

var http = require('http');
var bodyParser = require('body-parser');

var express = require('express');
var webapp = express();

// configure app to use bodyParser()
webapp.use(bodyParser.urlencoded({ extended: true }));
webapp.use(bodyParser.json());

// Add logger middleware
webapp.use(require('./request-logger'));

// Serve client code as static assets
// webapp.use(express.static('./src/client'));
// webapp.use('/node_modules', express.static('./node_modules'));

// Set up routes for the API
webapp.use('/api', require('./api/events'));

// Start the HTTP server
var server = http.createServer(webapp).listen(port);

logger.info('API Server listening on ' + port);


// Install process exit handler to close web server in a well behaved
// manner
var nodeCleanup = require('node-cleanup');

nodeCleanup(function() {

  logger.info("Shuttting down API server")
  server.close(function () {
    logger.info("API Server closed sucessfully");
    logger.info("Shutdown completed, exiting");
    return;
  });

  // if after
  setTimeout(function () {
    logger.error("Could not close connections in time, forcefully shutting down");
    return;
  }, 10 * 1000);
});
