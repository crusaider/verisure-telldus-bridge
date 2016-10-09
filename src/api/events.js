/**
 * events.js - express router implementing the /api/events endpoint
 */
'use strict';

var express = require('express');
var request = require('request');
var history = require('../history');
var logger = require('../logger');

var router = express.Router();

router.route('/events')

  .get(function (req, res) {

    return res.json(history.getEvents());
  });

module.exports = router;
