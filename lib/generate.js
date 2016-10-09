const fs = require('fs.extra');
const path = require('path');
const getSourceDirectory = require('./source');

// const getSourceDirectory = function() {
// 	const buffer = fs.readFileSync(path.join(process.cwd(), '.reactclirc'));
// 	const jsonContent = JSON.parse(buffer.toString());
// 	return jsonContent['client'];
// }

const createComponentFile = function(re, componentName, answersInner) {
	const _modFile = file.replace(re, componentName);
	const __modFile = createModFile(_modFile, answersInner, componentName);
	console.log(__modFile);
	fs.writeFileSync(path.join(process.cwd(), 'src/components', module, componentName + '.react.js'), __modFile, 'utf-8');
}

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
			const exists = fs.accessSync(path.join(process.cwd(), getSourceDirectory(), 'components', module, componentName), fs.F_OK);
			console.log(`${componentName}.react.js already exists`);
			return;
		}
		else {
			const exists = fs.accessSync(path.join(process.cwd(), getSourceDirectory(), 'components', module + '.react.js'), fs.F_OK);
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
				fs.mkdirSync(path.join(process.cwd(), getSourceDirectory(), 'components', module), 0755);
				const _modFile = file.replace(re, componentName);
				const __modFile = createModFile(_modFile, answersInner, componentName);
				console.log(__modFile);
				fs.writeFileSync(path.join(process.cwd(), getSourceDirectory(), 'components', module, componentName + '.react.js'), __modFile, 'utf-8');
				console.log('done');
			}
			catch(ex) {
				if(ex.syscall == 'open') {
					console.log('module doesn\'t exist');
				}
				else {
					const _modFile = file.replace(re, componentName);
					const __modFile = createModFile(_modFile, answersInner, componentName);
					console.log(__modFile);
					fs.writeFileSync(path.join(process.cwd(), getSourceDirectory(), 'components', module, componentName + '.react.js'), __modFile, 'utf-8');
				}
			}
		}
		else {
			try {
				const _modFile = file.replace(re, module);
				const __modFile = createModFile(_modFile, answersInner, module);
				fs.writeFileSync(path.join(process.cwd(), getSourceDirectory(), 'components', module + '.react.js'), __modFile, 'utf-8');
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
	const propTypes = `\n${componentName}.propTypes = ${_answersInner};\n`;
	//converting "" => non quotes
	const dynamicPropTypes = propTypes.replace(/"/g, '');
	return dynamicPropTypes;
}

const createComponent = function(module, componentName, answers, answersInner) {
	generateComponent(answers.componentType, module, componentName, answers, answersInner);
}

const createTest = function(module, testName) {
	try {
		if(testName !== undefined) {
			const existsModule = fs.accessSync(path.join(process.cwd(), getSourceDirectory(), '__tests__', module, testName), fs.F_OK);
			console.log(`${componentName}.js test file already exists`);
			return;
		}
		else {
			const exists = fs.accessSync(path.join(process.cwd(), getSourceDirectory(), '__tests__', module + '.js'), fs.F_OK);
			console.log(`${componentName}.js test file already exists`);
			return;
		}
	}
	catch(e) {
		const file = fs.readFileSync(path.join(__dirname, '..', `templates/src/__tests__/app.js`), 'utf-8');
		if(testName !== undefined) {
			try {
				fs.mkdirSync(path.join(process.cwd(), getSourceDirectory(), '__tests__', module), 0755);
				fs.writeFileSync(path.join(process.cwd(), getSourceDirectory(), '__tests__', module, testName + '.js'), file, 'utf-8');
				console.log('test copy done');
			}
			catch(ex) {
				if(ex.syscall == 'open') {
					console.log('module doesn\'t exist');
				}
				else {
					fs.writeFileSync(path.join(process.cwd(), getSourceDirectory(), '__tests__', module, testName + '.js'), file, 'utf-8');
					console.log('done');
					//console.log(ex);
				}
			}
		}
		else {
			try {
				fs.writeFileSync(path.join(process.cwd(), getSourceDirectory(), '__tests__', module + '.js'), file, 'utf-8');
				console.log('test copy done');
			}
			catch(ex) {
				if(ex.syscall == 'open') {
					console.log('file doesn\'t exist');
				}
				else {
					console.log(ex);
				}
			}
		}
	}
}

module.exports.createComponent = createComponent;
module.exports.createTest = createTest;