'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var fs = require('fs.extra');
var path = require('path');

var init = function () {
	function init() {
		_classCallCheck(this, init);
	}

	_createClass(init, [{
		key: 'initialize',

		/**
  	 * init command
  	 * @param {string} projectName - project name
   	 * @param {string} options - additional options for the project example: eslint configuration
   * @param {function} cb - callback for status return
   */
		value: function initialize(projectName, eslint, cb) {
			var _this = this;

			if (!eslint) {
				var projectPath = projectName;
				fs.mkdirp(projectPath, function (error) {
					if (error) {
						cb(error);
					} else {
						// Resolve all promises async-ly
						promiseShortcut(_this, 'reactclirc');
					}
				});
			} else {
				// Resolve all promises async-ly
				promiseShortcut(this, 'eslintrc.json');
			}

			/**
    * promiseShortcut() function
    * Helper method. Created in order to shorten 2 almost the same promise calls.
    * @param {init} t Reference to this. Won't work if you just use this, you have to get the reference from a function parameter.
    * @param {string} customTemplate Custom template to copy.
    */
			function promiseShortcut(t, customTemplate) {
				Promise.all([t.copyCommonTemplates(projectName), t.copyTemplate(projectName, 'webpack.config.js', false), t.copyTemplate(projectName, 'gitignore', true), t.copyTemplate(projectName, customTemplate, true), t.copyPackageJson(projectName)]).then(function (values) {
					cb(true);
				}).catch(function (err) {
					console.log(err);
					cb(false);
				});
			}
		}

		/**
  	 * copy common templates recursively
   	 * @param {string} projectName - project name
   */

	}, {
		key: 'copyCommonTemplates',
		value: function copyCommonTemplates(projectName) {
			return new Promise(function (resolve, reject) {
				fs.copyRecursive(path.join(__dirname, '..', 'templates/src'), path.join(projectName, 'src'), function (err) {
					if (err) {
						console.log(err);
						reject(err);
					} else {
						resolve(true);
					}
				});
			});
		}

		/**
   * prototype function for copying a special template file
   * @param {string} projectName - project name
   * @param {string} file - name of the file to be copied
   */

	}, {
		key: 'copyTemplate',
		value: function copyTemplate(projectName, file, dotFile) {
			return new Promise(function (resolve, reject) {
				var destFile = null;
				if (dotFile) {
					destFile = '.' + file;
				} else {
					destFile = file;
				}
				fs.copy(path.join(__dirname, '..', 'templates', file), path.join(projectName, destFile), { replace: false }, function (err) {
					if (err) {
						console.log(err);
						reject(err);
					} else {
						resolve(true);
					}
				});
			});
		}

		/**
   * copy package.json file to project destination
   * @param {string} projectName - project name
   */

	}, {
		key: 'copyPackageJson',
		value: function copyPackageJson(projectName) {
			return new Promise(function (resolve, reject) {
				fs.readFile(path.join(__dirname, '..', 'templates/package.json'), function (err, buffer) {
					var jsonContent = JSON.parse(buffer.toString());
					jsonContent.name = projectName;
					fs.writeFile(path.join(projectName, 'package.json'), JSON.stringify(jsonContent, null, 2), 'utf-8', function (err) {
						if (err) {
							console.log(err);
							reject(err);
						} else {
							resolve(true);
						}
					});
				});
			});
		}
	}]);

	return init;
}();

module.exports = init;