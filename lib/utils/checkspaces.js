/**
 * check for in a given array
 * @param {string} propNames - propnames to check for spaces
 */
const checkSpaces = function(propNames) {
	let sanitizedPropNames = [];
	for (let count = 0; count <= propNames.length; count++) {
		if (propNames[count] !== " ") {
			sanitizedPropNames.push(propNames[count]);
		}
	}
	return sanitizedPropNames;
};

module.exports = checkSpaces;
