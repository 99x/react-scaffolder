"use strict";

/**
 * check for spaces in a given array
 * @param {string} propNames - propnames to check for spaces
 */
var checkSpaces = function checkSpaces(propNames) {
  var sanitizedPropNames = propNames.filter(function (current) {
    return (/\S/.test(current)
    );
  });
  return sanitizedPropNames;
};

module.exports = checkSpaces;