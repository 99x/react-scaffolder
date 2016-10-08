const fs = require('fs.extra');
const path = require('path');

/**
 * generate parent component at given module if module is provided
 * @param {string} type - type of the component (child/parent)
 * @param {string} module - module name to create a component
 * @param {string} componentName - component name
 * @param {string} asnwers - options provided when creating component
 */
function generateComponent(type, module, componentName, answers, answersInner) {
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
				if(answers.propTypes === 'yes') {
					generatePropTypesSet(answersInner, componentName);	
				}
				const _modFile = file.replace(re, componentName);
				const __modFile = createModFile(_modFile, answersInner, componentName);
				console.log(__modFile);
				fs.writeFileSync(path.join(process.cwd(), 'src/components', module, componentName + '.react.js'), __modFile, 'utf-8');
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
				const _modFile = file.replace(re, module);
				const __modFile = createModFile(_modFile, answersInner, module);
				fs.writeFileSync(path.join(process.cwd(), 'src/components', module + '.react.js'), __modFile, 'utf-8');
				console.log('done');
			}
			catch(ex) {
				console.log('error');
			}
		}
	}
}

const createModFile = function(_modFile, answersInner, componentName) {
	return _modFile.slice(0, Number(_modFile.indexOf('export'))-1) + generatePropTypesSet(answersInner, componentName) + _modFile.slice(Number(_modFile.indexOf('export'))-1);
}

const generatePropTypesSet = function(answersInner, componentName) {
	let __propTypes = {};
	
	for(let propName in answersInner) {
		__propTypes[propName] = `React.PropTypes.${answersInner[propName]}`;
	}

	const _answersInner = JSON.stringify(__propTypes, null, 2);
	const _propTypes = `\n${componentName}.propTypes = ${_answersInner};\n`;
	//converting "" => non quotes
	const ppp = _propTypes.replace(/"/g, '');
	return ppp;
}

const createComponent = function(module, componentName, answers, answersInner) {
	generateComponent(answers.componentType, module, componentName, answers, answersInner);
}

module.exports.createComponent = createComponent;