const fs = require('fs.extra');
const path = require('path');

/**
 * get source directory file
 */

const getSourceDirectory = function() {
	const buffer = fs.readFileSync(path.join(process.cwd(), '.reactclirc'));
	const jsonContent = JSON.parse(buffer.toString());
	return jsonContent['client'];
}

module.exports = getSourceDirectory;