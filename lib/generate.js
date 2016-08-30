const fs = require('fs.extra');

/**
 * generate parent component at given module if module is provided
 * @param {string} module - module name to create a component
 * @param {string} options - additional options for the project example: eslint configuration
 */
function generateParentComponent() {
	return new Promise(function(resolve, reject) {
		resolve();
	});
}

function generateChildComponent() {
	return new Promise(function(resolve, reject) {
		resolve();
	});
}

const create = function(module, componentName, componentType) {
	if(componentType === 'child') {
		generateChildComponent(module, componentName, componentType)
			.then((res) => {
				console.log(res);
			})
			.catch((err) => {
				console.log(err);
			});
	}
}

module.exports.create = create;