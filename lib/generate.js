const fs = require('fs.extra');

/**
 * generate parent component at given module if module is provided
 * @param {string} module - module name to create a component
 * @param {string} options - additional options for the project example: eslint configuration
 */
function generateParentComponent(module, componentName, answers) {
	console.log('running ');
}

function generateChildComponent(module, componentName, answers) {
	console.log(answers);
	console.log('running child copy');
}

const createComponent = function(module, componentName, answers) {
	if(answers.componentType === 'child') {
		generateChildComponent(module, componentName, answers);
	}
	else if(answers.componentType === 'parent') {
		generateParentComponent(module, componentName, answers);	
	}
}

module.exports.createComponent = createComponent;