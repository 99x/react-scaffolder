#!/usr/bin/env node
'use strict';

var program = require('commander');
var inquirer = require('inquirer');
var initApp = require('../lib/init');
var generateApp = require('../lib/generate');
var configRc = require('../lib/config');
var viewDirectoryStructure = require('../lib/view');
var packageVersion = require('../package.json').version;
var checkDuplicates = require('../lib/utils/checkduplicates');
var ora = require('ora');

var init = new initApp();

/**
 * set commander version
 */
program.version(packageVersion);

/**
 * command for initializing a project
 */
program.command('init [projectname]').alias('i').description('initialize React project').option("-l, --eslint", "eslint required or not ?").action(function (projectname, options) {
	if (projectname === undefined) {
		console.log('provide a project name');
		return;
	} else {
		(function () {
			var spinner = ora('creating directory structure').start();
			init.initialize(projectname, options.eslint, function initProject(res) {
				if (res) {
					setTimeout(function () {
						spinner.text = 'application created successfully';
						spinner.succeed();
						console.log('\t$ cd ' + projectname + '\n \t$ npm install \n \tHappy hacking \u2665');
					}, 1000);
				} else {
					setTimeout(function () {
						spinner.text = 'something went wrong !';
						spinner.fail();
					}, 1000);
				}
			});
		})();
	}
}).on('--help', function () {
	console.log('  Examples:');
	console.log();
	console.log('    $ react-cli init awesomereact');
	console.log('    $ react-cli init -l awesomereact');
	console.log();
});

/**
 * command changing .reactclirc file
 */
program.command('config [key] [value]').alias('c').action(function (key, value) {
	var spinner = ora('configuring .reactclirc').start();
	configRc(key, value, function config(err, res) {
		if (err) {
			setTimeout(function () {
				spinner.text = 'something went wrong !';
				spinner.fail();
			}, 1000);
			throw new Error('unable to change config');
		}
		setTimeout(function () {
			spinner.text = 'successfully configured !';
			spinner.succeed();
		}, 1000);
	});
});

/**
 * command view directory structure - components/tests
 */
program.command('view').alias('v').option('-c, --component', 'view component only').option('-t, --test', 'view test only').action(function (options) {
	var spinner = ora('loading directory structure \n').start();
	if (options.component && options.test) {
		viewDirectoryStructure(true, true, function (status) {
			if (status) {
				spinner.text = 'successfully loaded !';
				spinner.succeed();
			} else {
				spinner.fail();
			}
		});
	} else if (options.component) {
		viewDirectoryStructure(true, false, function (status) {
			if (status) {
				spinner.text = 'successfully loaded !';
				spinner.succeed();
			} else {
				spinner.text = 'successfully loaded !';
				spinner.fail();
			}
		});
	} else if (options.test) {
		viewDirectoryStructure(false, true, function (status) {
			if (status) {
				spinner.text = 'successfully loaded !';
				spinner.succeed();
			} else {
				spinner.fail();
			}
		});
	} else if (!options.component && !options.test) {
		spinner.text = 'provide options';
		spinner.fail();
	}
});

/**
 * command for generating a react component
 */
program.command('generate [type] [modulename] [name]').alias('g').description('generate a react component').action(function (type, modulename, name, options) {
	if (type !== undefined && modulename !== undefined) {
		if (type === 'component') {
			(function () {
				var choices = [];

				var numberOfPropTypes = 0;

				var inputPropTypeName = {
					type: 'input',
					name: 'propName',
					message: 'Prop name',
					paginated: true,
					validate: function validate(input) {
						var regex = /[^a-z\d]/i;
						return false;
						return regex.test(input);
					},
					when: function when(answer) {
						return answer.propTypes === 'yes';
					}
				};

				choices.push({
					name: 'child',
					value: 'child',
					short: 'child'
				});

				choices.push({
					name: 'parent',
					value: 'parent',
					short: 'parent'
				});

				inquirer.prompt([{
					type: 'list',
					name: 'componentType',
					message: 'Select component type',
					paginated: true,
					choices: choices
				}, {
					type: 'list',
					name: 'propTypes',
					message: 'Add propTypes',
					paginated: true,
					choices: ['yes', 'no']
				}, {
					type: 'input',
					name: 'propNo',
					message: 'Number of prop types',
					paginated: true,
					validate: function validate(input) {
						var regex = /^\d+$/;
						//return false;
						if (!regex.test(input)) {
							return 'enter a number';
						}
						return true;
					},
					when: function when(answer) {
						return answer.propTypes === 'yes';
					}
				}, {
					type: 'input',
					name: 'propNames',
					message: 'Prop names',
					paginated: true,
					when: function when(answer) {
						numberOfPropTypes = answer.propNo;
						return answer.propTypes === 'yes';
					},
					validate: function validate(input) {
						var propNames = input.split(' ');
						if (propNames.length !== Number(numberOfPropTypes)) {
							return 'enter ' + numberOfPropTypes + ' prop names';
						}
						var regex = /^[a-zA-Z]+$/;

						if (!checkDuplicates(propNames)) {
							return 'duplicate prop names';
						}
						// if(!regex.test(input)) {
						// 	return 'enter valid name [alpha]'
						// }
						return true;
					}
				}]).then(function (answers) {
					var generate = new generateApp();
					if (answers.propTypes === 'no') {
						generate.createComponent(modulename, name, answers, null, function (status) {
							if (status) {
								var spinner = ora('loading directory structure \n').start();
								spinner.text = 'component created successfully';
								spinner.succeed();
							}
						});
					} else {
						var opts = [];
						var propNames = answers.propNames.split(' ');

						for (var count = 0; count < numberOfPropTypes; count++) {
							var propTypeChoice = {
								type: 'list',
								name: '' + propNames[count],
								message: 'Select prop type for ' + propNames[count],
								paginated: true,
								choices: ['number', 'string', 'bool', 'object', 'array', 'func', 'symbol']
							};
							opts.push(propTypeChoice);
						}
						inquirer.prompt(opts).then(function (answersInner) {
							generate.createComponent(modulename, name, answers, answersInner, function (status) {
								if (status) {
									var spinner = ora('loading directory structure \n').start();
									spinner.text = 'component created successfully';
									spinner.succeed();
								}
							});
						});
					}
				});
			})();
		} else if (type === 'test') {
			var generate = new generateApp();
			generate.createTest(modulename, name, function (status) {
				var spinner = ora('creating test file \n').start();
				spinner.text = 'test file created successfully';
				spinner.succeed();
			});
		}
	} else {
		setTimeout(function () {
			var spinner = ora('').start();
			spinner.text = 'please provide required options';
			spinner.fail();
		}, 500);
	}
}).on('--help', function () {
	console.log('  Examples:');
	console.log();
	console.log('    $ react-cli generate core helloworld -p');
	console.log('    $ react-cli generate core hello -c');
	console.log();
});

/**
 * parse commander object
 */
program.parse(process.argv);