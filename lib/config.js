'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.default = configReactCliRc;
var fs = require('fs.extra');
var path = require('path');

/**
 * change .reactclirc file configs
 * @param {string} key - key of the value to be changed
 * @param {string} value - value to be changed
 * @param {function} cb - callback
 */
function configReactCliRc(key, value, cb) {
	fs.readFile(path.join(process.cwd(), '.reactclirc'), function (err, buffer) {
		var jsonContent = JSON.parse(buffer.toString());
		jsonContent[key] = value;
		fs.writeFile(path.join(process.cwd(), '.reactclirc'), JSON.stringify(jsonContent, null, 2), 'utf-8', function (err) {
			if (err) {
				cb(true, null);
			} else {
				cb(null, true);
			}
		});
	});
}