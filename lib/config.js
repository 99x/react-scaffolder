'use strict';

var fs = require('fs.extra');
var path = require('path');

/**
 * change .reactclirc file configs
 * @param {string} key - key of the value to be changed
 * @param {string} value - value to be changed
 * @param {function} cb - callback
 */
var configReactCliRc = function configReactCliRc(key, value, cb) {
	fs.readFile(path.join(process.cwd(), '.reactclirc'), function (err, buffer) {
		var jsonContent = JSON.parse(buffer.toString());
		jsonContent[key] = value;
		fs.writeFile(path.join(process.cwd(), '.reactclirc'), JSON.stringify(jsonContent, null, 2), 'utf-8', function (err) {
			err ? cb(true, null) : cb(null, true);
		});
	});
};

module.exports = configReactCliRc;