'use strict';

var fs = require('fs.extra');
var path = require('path');

/**
 * get source directory file
 * @return {string} or {boolean} If the .reactclirc file exists, return it's content. If it doesn't exist, return false. 
 */
var getSourceDirectory = function getSourceDirectory() {
	var exists = fs.existsSync(path.join(process.cwd(), '.reactclirc'));
	if (exists) {
		var buffer = fs.readFileSync(path.join(process.cwd(), '.reactclirc'));
		var jsonContent = JSON.parse(buffer.toString());
		return jsonContent['client'];
	} else {
		return false;
	}
};

module.exports = getSourceDirectory;