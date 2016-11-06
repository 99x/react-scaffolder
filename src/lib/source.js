const fs = require('fs.extra');
const path = require('path');

/**
 * get source directory file
 * @return {string} or {boolean} If the .reactclirc file exists, return it's content. If it doesn't exist, return false. 
 */
const getSourceDirectory = () => {
	const exists = fs.existsSync(path.join(process.cwd(), '.reactclirc'));
	if (exists) {
		const buffer = fs.readFileSync(path.join(process.cwd(), '.reactclirc'));
		const jsonContent = JSON.parse(buffer.toString());
		return jsonContent['client'];
	} else {
		return false;
	}
}

module.exports = getSourceDirectory;