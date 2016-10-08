/**
 * A in memory event log store. Keeps track of the events logged as well
 * as the time when they where logged. The size of the log (number of
 * log entries) can be set trough the enviroment variable 'HISTORY_SIZE',
 * the dafule value is 500.
 *
 * @author Jonas
 * @license MIT
 *
 */
'use strict';

var historySize = process.env.HISTORY_SIZE || 500;

var history = [];


// Public API

module.exports = {

  logEvent : function ( desc ) {
    var evt = { timeStamp : Date(), description: desc};

    if ( history.unshift( evt ) > historySize )
      history.pop();
  },

  getEvents : function() {
    return JSON.parse(JSON.stringify(history));
  },

  getEvent : function( index ) {
    return JSON.parse(JSON.stringify(history[index]));
  },

  clear : function() {
    history = [];
  }

}
