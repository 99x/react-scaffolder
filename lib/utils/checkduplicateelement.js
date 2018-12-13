const fs = require('fs.extra');
const path = require('path');

/**
 * check for duplicates in provided set of propNames
 * @param {string} moduleName - propnames to compare
 * @param {string} elementName - propnames to compare
 * @param {string} type - propnames to compare
 */
const checkDuplicateElement = function (type, moduleName, elementName) {

  if(type === 'component'){
    if (elementName !== undefined) {
      if (fs.existsSync(path.join(process.cwd(), moduleName, elementName + '.js'))) {
        console.log('\x1b[1m\x1b[31m%s\x1b[0m', '\n ' + elementName + ' component is aready exsist \n Try with different name');
        return false;
      }
    }
    else {
      if (fs.existsSync(path.join(process.cwd(), moduleName + '.js'))) {
        console.log('\x1b[1m\x1b[31m%s\x1b[0m', '\n ' + elementName + ' component is aready exsist \n Try with different name');
        return false;
      }
    }
  }
  else if(type === 'test'){
    if (elementName !== undefined) {
      if (fs.existsSync(path.join(process.cwd(), 'tests', moduleName, elementName + '.js'))) {
        console.log('\x1b[1m\x1b[31m%s\x1b[0m', '\n ' + elementName + ' test file is aready exsist \n Try with different name');
        return false;
      }
    }
    else {
      if (fs.existsSync(path.join(process.cwd(), 'tests', moduleName + '.js'))) {
        console.log('\x1b[1m\x1b[31m%s\x1b[0m', '\n ' + elementName + ' test file is aready exsist \n Try with different name');
        return false;
      }
    }
  }

  return true;

};

module.exports = checkDuplicateElement;
