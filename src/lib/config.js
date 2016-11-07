const fs = require('fs.extra');
const path = require('path');

/**
 * change .reactclirc file configs
 * @param {string} key - key of the value to be changed
 * @param {string} value - value to be changed
 * @param {function} cb - callback
 */
const configReactCliRc = (key, value, cb) => {	
	fs.readFile(path.join(process.cwd(), '.reactclirc'), (err, buffer) => {
		let jsonContent = JSON.parse(buffer.toString());
		jsonContent[key] = value;
		fs.writeFile(path.join(process.cwd(), '.reactclirc'), JSON.stringify(jsonContent, null, 2), 'utf-8', (err) => {
			err ? cb(true, null) : cb(null, true);
		});
	});
}

module.exports = configReactCliRc;