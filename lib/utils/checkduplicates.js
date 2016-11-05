"use strict";

/**
 * check for duplicates in provided set of propNames
 * @param {string} propNames - propnames to compare
 */
var checkDuplicates = function checkDuplicates(propNames) {
	var currentValue = null;
	for (var count = 0; count <= propNames.length; count++) {
		currentValue = propNames[count];
		for (var innerCounter = 0; innerCounter <= propNames.length; innerCounter++) {
			if (count !== innerCounter && currentValue === propNames[innerCounter]) {
				return false;
			}
		}
	}
	return true;
};

module.exports = checkDuplicates;