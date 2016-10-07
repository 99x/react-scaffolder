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
 * @param {string} type - type of the component (child/parent)
 * @param {string} module - module name to create a component
 * @param {string} componentName - component name
 * @param {string} asnwers - options provided when creating component
 */
function generateComponent(type, module, componentName, answers) {
	try {
		if(componentName !== undefined) {
			const exists = fs.accessSync(path.join(process.cwd(), 'src/components', module, componentName + '.react.js'), fs.F_OK);
			console.log(`${componentName}.react.js already exists`);
			return;
		}
		else {
			const exists = fs.accessSync(path.join(process.cwd(), 'src/components', componentName + '.react.js'), fs.F_OK);
			console.log(`${componentName}.react.js already exists`);
			return;
		}
	}
	catch(e) {
		const file = fs.readFileSync(path.join(__dirname, '..', `templates/components/${type}-component.react.js`), 'utf-8');
		const re = /<name>/gi;
		if(componentName !== undefined) {
			try {
				const modFile = file.replace(re, componentName);
				fs.writeFileSync(path.join(process.cwd(), 'src/components', module, componentName + '.react.js'), modFile, 'utf-8');
				console.log('done');
			}
			catch(ex) {
				if(ex.syscall == 'open') {
					console.log('module doesn\'t exist');
				}
				else {
					console.log(ex);
				}
			}
		}
		else {
			try {
				const modFile = file.replace(re, module);
				fs.writeFileSync(path.join(process.cwd(), 'src/components', module + '.react.js'), modFile, 'utf-8');
				console.log('done');
			}
			catch(ex) {
				console.log('error');
			}
		}
	}
}

function clientDirectory() {

}

const createComponent = function(module, componentName, answers) {
	generateComponent(answers.componentType, module, componentName, answers);
}

module.exports.createComponent = createComponent;