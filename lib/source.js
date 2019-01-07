const fs = require('fs.extra');
const path = require('path');

const defaults = require('./config.default');

/**
 * get source directory file
 */
const getSourceDirectory = function() {
  try {
    const buffer = fs.readFileSync(path.join(process.cwd(), '.reactclirc'));
    const jsonContent = JSON.parse(buffer.toString());
    return jsonContent['client'];
  } catch (error) {
    return defaults['client'];
  }
};

module.exports = getSourceDirectory;
