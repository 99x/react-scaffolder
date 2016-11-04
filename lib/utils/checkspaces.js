"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = checkSpaces;
/**
 * check for spaces in a given array
 * @param {string} propNames - propnames to check for spaces
 */
function checkSpaces(propNames) {
  var sanitizedPropNames = propNames.filter(function (current) {
    return (/\S/.test(current)
    );
  });
  return sanitizedPropNames;
}