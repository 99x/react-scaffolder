/**
 * check for spaces in a given array
 * @param {string} propNames - propnames to check for spaces
 */
const checkSpaces = function(propNames) {
	let sanitizedPropNames = propNames.filter((current) => {
		return /\S/.test(current);
	});
  return sanitizedPropNames;
}

module.exports = checkSpaces;