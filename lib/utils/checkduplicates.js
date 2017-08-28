/**
 * check for duplicates in provided set of propNames
 * @param {string} propNames - propnames to compare
 */
const checkDuplicates = function(propNames) {
	let currentValue = null;
	for (let count = 0; count <= propNames.length; count++) {
		currentValue = propNames[count];
		for (
			let innerCounter = 0;
			innerCounter <= propNames.length;
			innerCounter++
		) {
			if (count !== innerCounter) {
				if (currentValue === propNames[innerCounter]) {
					return false;
				}
			}
		}
	}
	return true;
};

module.exports = checkDuplicates;
