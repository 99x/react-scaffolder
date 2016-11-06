'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var fs = require('fs.extra');
var path = require('path');
var getSourceDirectory = require('./source');
var ora = require('ora');

var generate = function () {
	function generate() {
		_classCallCheck(this, generate);
	}

	_createClass(generate, [{
		key: 'createComponentFile',

		/**
   * create component file with fs
   * @param {string} re - regular expresssion
   * @param {string} componentName - component name
   * @param {string} answersInner - options provided when creating component
   */
		value: function createComponentFile(re, componentName, answersInner) {
			var _modFile = file.replace(re, componentName);
			var __modFile = this.createModFile(_modFile, answersInner, componentName);
			console.log(__modFile);
			fs.writeFileSync(path.join(process.cwd(), 'src/components', module, componentName + '.react.js'), __modFile, 'utf-8');
		}

		/**
   * createComponentFacade
  	 * @param {string} module - module name to create a component
   * @param {string} componentName - component name
   * @param {string} asnwers - options provided when creating component
   * @param {string} answersInner - options provided when creating component
   * @param {function} cb - callback for status return
   */

	}, {
		key: 'generateComponent',
		value: function generateComponent(type, module, componentName, answers, answersInner, cb) {
			var sourceDirectory = getSourceDirectory();
			if (!sourceDirectory) {
				// Seems .reactclirc doesn't exist.
				cb({ success: false, msg: '.reactclirc doesn\'t exist' });
				return;
			}
			var exists = void 0;
			if (componentName !== undefined) {
				exists = fs.existsSync(path.join(process.cwd(), sourceDirectory, 'components', module, componentName + '.react.js'), fs.F_OK);
			} else {
				exists = fs.existsSync(path.join(process.cwd(), sourceDirectory, 'components', module + '.react.js'), fs.F_OK);
			}
			if (!exists) {
				var _file = fs.readFileSync(path.join(__dirname, '..', 'templates/components/' + type + '-component.react.js'), 'utf-8');
				var re = /<name>/gi;
				if (componentName !== undefined) {
					try {
						var moduleDirExists = fs.existsSync(path.join(process.cwd(), sourceDirectory, 'components', module), fs.F_OK);
						if (!moduleDirExists) {
							fs.mkdirSync(path.join(process.cwd(), sourceDirectory, 'components', module), 755);
						}
						var _modFile = _file.replace(re, componentName);
						if (answers.propTypes === 'no') {
							fs.writeFileSync(path.join(process.cwd(), sourceDirectory, 'components', module, componentName + '.react.js'), _modFile, 'utf-8');
						} else {
							var __modFile = this.createModFile(_modFile, answersInner, componentName);
							fs.writeFileSync(path.join(process.cwd(), sourceDirectory, 'components', module, componentName + '.react.js'), __modFile, 'utf-8');
						}
						cb({ success: true });
					} catch (ex) {
						cb({ success: false, msg: ex });
					}
				} else {
					try {
						var _modFile2 = _file.replace(re, module);
						var _modFile3 = this.createModFile(_modFile2, answersInner, module);
						fs.writeFileSync(path.join(process.cwd(), sourceDirectory, 'components', module + '.react.js'), _modFile3, 'utf-8');
						cb({ success: true });
					} catch (ex) {
						cb({ success: false, msg: ex });
					}
				}
			} else {
				cb({ success: false, msg: (componentName || module) + '.react.js already exists' });
				return;
			}
		}

		/**
   * create modified file
   * @param {string} _modFile - modified file
   * @param {string} answersInner - options provided when creating component
   * @param {string} componentName - component name
   */

	}, {
		key: 'createModFile',
		value: function createModFile(_modFile, answersInner, componentName) {
			var modFileIndex = Number(_modFile.indexOf('export')) - 1;
			return _modFile.slice(0, modFileIndex) + this.generatePropTypesSet(answersInner, componentName) + _modFile.slice(modFileIndex);
		}

		/**
   * generate propType set
   * @param {string} answersInner
   * @param {string} componentName - component name
   */

	}, {
		key: 'generatePropTypesSet',
		value: function generatePropTypesSet(answersInner, componentName) {
			var __propTypes = {};

			for (var propName in answersInner) {
				__propTypes[propName] = 'React.PropTypes.' + answersInner[propName];
			}

			var _answersInner = JSON.stringify(__propTypes, null, 2);
			var propTypes = '\n' + componentName + '.propTypes = ' + _answersInner + ';\n';
			//converting "" => non quotes
			var dynamicPropTypes = propTypes.replace(/"/g, '');
			return dynamicPropTypes;
		}

		/**
   * createComponentFacade
   * @param {string} module - module name to create a component
   * @param {string} componentName - component name
   * @param {string} asnwers - options provided when creating component
   * @param {string} answersInner - options provided when creating component
   * @param {function} cb - callback for status return
   */

	}, {
		key: 'createComponent',
		value: function createComponent(module, componentName, answers, answersInner, cb) {
			this.generateComponent(answers.componentType, module, componentName, answers, answersInner, cb);
		}

		/**
   * create test file
   * @param {string} module - module name to create a component
  	 * @param {string} testName - test file name
   * @param {function} cb - callback for status return
  	 */

	}, {
		key: 'createTest',
		value: function createTest(module, testName, cb) {
			var sourceDirectory = getSourceDirectory();
			if (!sourceDirectory) {
				// Seems .reactclirc doesn't exist.
				cb({ success: false, msg: '.reactclirc doesn\'t exist' });
				return;
			}
			var exists = void 0;
			if (testName !== undefined) {
				exists = fs.existsSync(path.join(process.cwd(), sourceDirectory, '__tests__', module, testName + '.js'), fs.F_OK);
			} else {
				exists = fs.existsSync(path.join(process.cwd(), sourceDirectory, '__tests__', module + '.js'), fs.F_OK);
			}
			if (!exists) {
				var _file2 = fs.readFileSync(path.join(__dirname, '..', 'templates/src/__tests__/app.js'), 'utf-8');
				if (testName !== undefined) {
					try {
						var moduleTestDirExists = fs.existsSync(path.join(process.cwd(), sourceDirectory, '__tests__', module), fs.F_OK);
						if (!moduleTestDirExists) {
							fs.mkdirSync(path.join(process.cwd(), sourceDirectory, '__tests__', module), 755);
						}
						fs.writeFileSync(path.join(process.cwd(), sourceDirectory, '__tests__', module, testName + '.js'), _file2, 'utf-8');
						cb({ success: true });
					} catch (ex) {
						cb({ success: false, msg: ex });
					}
				} else {
					try {
						fs.writeFileSync(path.join(process.cwd(), sourceDirectory, '__tests__', module + '.js'), _file2, 'utf-8');
						cb({ success: true });
					} catch (ex) {
						cb({ success: false, msg: ex });
					}
				}
			} else {
				cb({ success: false, msg: (testName || module) + '.react.js already exists' });
				return;
			}
		}
	}]);

	return generate;
}();

module.exports = generate;