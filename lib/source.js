'use strict';

var fs = require('fs.extra');
var path = require('path');

/**
 * get source directory file
 */
var getSourceDirectory = function getSourceDirectory() {
	var buffer = fs.readFileSync(path.join(process.cwd(), '.reactclirc'));
	var jsonContent = JSON.parse(buffer.toString());
	return jsonContent['client'];
};

module.exports = getSourceDirectory;