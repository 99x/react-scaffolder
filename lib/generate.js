const fs = require('fs.extra');
const path = require('path');

/**
 * generate parent component at given module if module is provided
 * @param {string} module - module name to create a component
 * @param {string} options - additional options for the project example: eslint configuration
 */
function generateParentComponent(module, componentName, answers) {
	console.log('running ');

}

/**
 * generate parent component at given module if module is provided
 * @param {string} module - module name to create a component
 * @param {string} options - additional options for the project example: eslint configuration
 */
function generateChildComponent(module, componentName, answers) {
	try {
		const exists = fs.accessSync(path.join(process.cwd(), 'src/components', componentName + '.react.js'), fs.F_OK);
		console.log(`${componentName}.react.js already exists`);
		return;
	}
	catch(e) {
		const file = fs.readFileSync(path.join(__dirname, '..', 'templates/components/child-component.react.js'), 'utf-8');
		const re = /<name>/gi;
		const modFile = file.replace(re, componentName);
		try {
			fs.writeFileSync(path.join(process.cwd(), 'src/components', componentName + '.react.js'), modFile, 'utf-8');	
			console.log('done');
		}
		catch(ex) {
			console.log('error');
		}	
	}
}

function clientDirectory() {

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