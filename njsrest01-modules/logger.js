// var x =; use to see the module wrapper function in the error log
var url = 'http://mylogger.io/log';

function log(message) {
    // send a HTTP request
    console.log(message);
}

// we need to add the log function to the module (one file = one module) exports

module.exports.log = log;
// module.exports.endpointurl = url; - you can export anything and also rename 

// *** module.exports = log - by exporting only the function in app.js we can use it with logger(message)
