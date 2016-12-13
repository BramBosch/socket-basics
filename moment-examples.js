var moment = require('moment');
var now = moment().format('year H:mm a');

var timestamp = moment().format('X');
var timestampmoment = moment.utc(timestamp);

console.log(timestampmoment.format());