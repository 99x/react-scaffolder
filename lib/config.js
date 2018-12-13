const fs = require("fs.extra");
const path = require("path");

/**
 * change .reactclirc file configs
 * @param {string} key - key of the value to be changed
 * @param {string} value - value to be changed
 * @param {function} cb - callback
 */
function configReactCliRc(key, value, cb) {
	fs.readFile(path.join(process.cwd()), (err, buffer) => {
		let jsonContent = JSON.parse(buffer.toString());
		jsonContent[key] = value;
		fs.writeFile(
			path.join(process.cwd()),
			JSON.stringify(jsonContent, null, 2),
			"utf-8",
			err => {
				if (err) {
					cb(true, null);
				} else {
					cb(null, true);
				}
			}
		);
	});
}

module.exports = configReactCliRc;
