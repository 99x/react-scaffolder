const fs = require('fs.extra');
const path = require('path');
const getSourceDirectory = require('./source');

/**
 * create component file with fs
 * @param {string} re - regular expresssion
 * @param {string} componentName - component name
 * @param {string} answersInner - options provided when creating component
 */
const generate = function() {};

generate.prototype.createComponentFile = function(re, componentName, answersInner) {
	const _modFile = file.replace(re, componentName);
	const __modFile = this.createModFile(_modFile, answersInner, componentName);
	fs.writeFileSync(path.join(process.cwd(), 'src/components', module, componentName + '.js'), __modFile, 'utf-8');
}

/**
 * createComponentFacade
 * @param {string} module - module name to create a component
 * @param {string} componentName - component name
 * @param {string} asnwers - options provided when creating component
 * @param {string} answersInner - options provided when creating component
 * @param {function} cb - callback for status return
 * @param {string} onlyFile - option provided when creating component
 */
generate.prototype.generateComponent = function(type, module, componentName, answers, answersInner, onlyFile, cb) {
	try {
		if(componentName !== undefined) {
			const exists = fs.accessSync(path.join(process.cwd(), getSourceDirectory(), 'components', module, componentName), fs.F_OK);
      cb(`${componentName}.js already exists`);
      return;
		}
		else {
			const exists = fs.accessSync(path.join(process.cwd(), getSourceDirectory(), 'components', module + '.js'), fs.F_OK);
			cb(`${componentName}.js already exists`);
			return;
		}
	}
	catch(e) {
		const file = fs.readFileSync(path.join(__dirname, '..', `templates/components/${type}-component.js`), 'utf-8');
		const re = /<name>/gi;
		if(componentName !== undefined) {
			try {
				if(answers.propTypes === 'no') {
					fs.mkdirSync(path.join(process.cwd(), getSourceDirectory(), 'components', module), 0755);
					const _modFile = file.replace(re, componentName);
					fs.writeFileSync(path.join(process.cwd(), getSourceDirectory(), 'components', module, componentName + '.js'), _modFile, 'utf-8');
					cb(true);
				}
				else {
					fs.mkdirSync(path.join(process.cwd(), getSourceDirectory(), 'components', module), 0755);
					const _modFile = file.replace(re, componentName);
					const __modFile = this.createModFile(_modFile, answersInner, componentName);
					fs.writeFileSync(path.join(process.cwd(), getSourceDirectory(), 'components', module, componentName + '.js'), __modFile, 'utf-8');
					cb(true);
				}
			}
			catch(ex) {
				if(ex.syscall == 'open') {
					cb('module doesn\'t exist');
				}
				else {
					const _modFile = file.replace(re, componentName);
					const __modFile = this.createModFile(_modFile, answersInner, componentName);
					fs.writeFileSync(path.join(process.cwd(), getSourceDirectory(), 'components', module, componentName + '.js'), __modFile, 'utf-8');
					cb(true);
				}
			}
		}
		else {
			try {
				let directory = '';
        let fileName = module;
				if(!onlyFile){
					directory = module;
					fileName = 'index'
					fs.mkdirSync(path.join(process.cwd(), getSourceDirectory(), 'components', directory), 0755);
				}
				const _modFile = file.replace(re, module);
				const __modFile = this.createModFile(_modFile, answersInner, module);
				fs.writeFileSync(path.join(process.cwd(), getSourceDirectory(), 'components', directory, fileName + '.js'), __modFile, 'utf-8');
				cb(true);
			}
			catch(ex) {
				cb('error');
			}
		}
	}
}

/**
 * create modifiled file
 * @param {string} _modFile - modified file
 * @param {string} answersInner - options provided when creating component
 * @param {string} componentName - component name
 */
generate.prototype.createModFile = function(_modFile, answersInner, componentName) {
	return _modFile.slice(0, Number(_modFile.indexOf('export'))-1) + this.generatePropTypesSet(answersInner, componentName) + _modFile.slice(Number(_modFile.indexOf('export'))-1);
}

/**
 * generate propType set
 * @param {string} answersInner
 * @param {string} componentName - component name
 */
generate.prototype.generatePropTypesSet = function(answersInner, componentName) {
	let __propTypes = {};

	for(let propName in answersInner) {
		const [prop, required] = propName.match(/^[a-z0-9]+|\*$/gi);
		__propTypes[prop] = `React.PropTypes.${answersInner[propName]}${required ? '.isRequired' : ''}`;
	}

	const _answersInner = JSON.stringify(__propTypes, null, 2);
	const propTypes = `\n${componentName}.propTypes = ${_answersInner};\n`;
	//converting "" => non quotes
	const dynamicPropTypes = propTypes.replace(/"/g, '');
	return dynamicPropTypes;
}

/**
 * createComponentFacade
 * @param {string} module - module name to create a component
 * @param {string} componentName - component name
 * @param {string} asnwers - options provided when creating component
 * @param {string} answersInner - options provided when creating component
 * @param {function} cb - callback for status return
 * @param {string} onlyFile - option provided when creating component
 */
generate.prototype.createComponent = function(module, componentName, answers, answersInner, onlyFile, cb) {
	this.generateComponent(answers.componentType, module, componentName, answers, answersInner, onlyFile, cb);
}

/**
 * creat test file
 * @param {string} module - module name to create a component
 * @param {string} testName - test file name
 * @param {function} cb - callback for status return
 */
generate.prototype.createTest = function(module, testName, cb) {
	try {
		if(testName !== undefined) {
			const existsModule = fs.accessSync(path.join(process.cwd(), getSourceDirectory(), '__tests__', module, testName), fs.F_OK);
			cb(`${componentName}.js test file already exists`);
			return;
		}
		else {
			const exists = fs.accessSync(path.join(process.cwd(), getSourceDirectory(), '__tests__', module + '.js'), fs.F_OK);
			cb(`${componentName}.js test file already exists`);
			return;
		}
	}
	catch(e) {
		const file = fs.readFileSync(path.join(__dirname, '..', `templates/src/__tests__/app.js`), 'utf-8');
		if(testName !== undefined) {
			try {
				fs.mkdirSync(path.join(process.cwd(), getSourceDirectory(), '__tests__', module), 0755);
				fs.writeFileSync(path.join(process.cwd(), getSourceDirectory(), '__tests__', module, testName + '.js'), file, 'utf-8');
				cb(true);
			}
			catch(ex) {
				if(ex.syscall == 'open') {
					cb('module doesn\'t exist');
				}
				else {
					fs.writeFileSync(path.join(process.cwd(), getSourceDirectory(), '__tests__', module, testName + '.js'), file, 'utf-8');
					cb(true);
				}
			}
		}
		else {
			try {
				fs.writeFileSync(path.join(process.cwd(), getSourceDirectory(), '__tests__', module + '.js'), file, 'utf-8');
				cb(true);
			}
			catch(ex) {
				if(ex.syscall == 'open') {
					cb('file doesn\'t exist');
				}
				else {
					cb(ex);
				}
			}
		}
	}
}

/**
 * creat redux constants
 * @param {string} asnwers - options provided when creating component
 * @param {function} cb - callback for status return
 */
generate.prototype.createConstants = function({ answers: { constants, path: _path }, cb }) {
	try {
    const consts = constants.replace(/\s/g, '').split(',');
    let output = '';
    const tpl = (path, constant) => `export const ${constant} = '${path ? `${path}/` : ''}${constant}';\n`;
    for(constant of consts){
      output += tpl(_path, constant);
    }
    // TODO: generate to specific path
    fs.writeFileSync(path.join(process.cwd(), getSourceDirectory(), 'constant.js'), output, 'utf-8');
    cb(true);
	} catch(e) {
		cb(e);
	}
}

module.exports = generate;
