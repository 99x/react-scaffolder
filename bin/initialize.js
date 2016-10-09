#!/usr/bin/env node

const program = require('commander');
const inquirer = require('inquirer');
const init = require('../lib/init');
const generate = require('../lib/generate');
const configRc = require('../lib/config');
const viewDirectoryStructure = require('../lib/view');
const packageVersion = require('../package.json').version;
const checkDuplicates = require('../lib/utils/checkduplicates');

/**
 * set commander version
 */
program
	.version(packageVersion);

/**
 * command for initializing a project
 */
program
  .command('init [projectname]')
  .alias('i')
  .description('initialize React project')
  .option("-l, --eslint", "eslint required or not ?")
  .action(function(projectname, options) {
    if (projectname === undefined) {
      console.log('provide a project name');
      return;
    }
    else
		{
			init(projectname, options.eslint, function initProject(res) {
				if(res) {
					console.log('application created successfully');
				}
				else {
					console.log('something went wrong !');
				}
			});
		}
  }).on('--help', function() {
    console.log('  Examples:');
    console.log();
    console.log('    $ react-cli init awesomereact');
    console.log('    $ react-cli init -l awesomereact');
    console.log();
  });

/**
 * command changing .reactclirc file
 */
program
  .command('config [key] [value]')
  .action(function (key, value) {
  	configRc(key, value, function config(err, res) {
  		if(err) throw new Error('unable to change config');
  	});
  });

/**
 * command view directory structure - components/tests
 */
program
  .command('view')
  .option('-c, --component', 'view component only')
  .option('-t, --test', 'view test only')
  .action(function (options) {
  	if(options.component && options.test) {
  		viewDirectoryStructure(true, true);
  	}
  	else if(options.component) {
  		viewDirectoryStructure(true, false);
  	}
  	else if(options.test) {
  		viewDirectoryStructure(false, true);
  	}
  	else if(!options.component && !options.test) {
  		console.log('provide options');	
  	}
  });

/**
 * command for generating a react component
 */
program
  .command('generate [type] [modulename] [name]')
  .alias('g')
  .description('generate a react component')
  .action(function(type, modulename, name, options) {
    if(type !== undefined && modulename !== undefined) {
    	if(type === 'component') {

    		let choices = [];

    		let numberOfPropTypes = 0;

    		let inputPropTypeName = {
			    type: 'input',
			    name: 'propName',
			    message: 'Prop name',
			    paginated: true,
			    validate: function(input) {
			    	let regex = /[^a-z\d]/i;
			    	return false;
			    	return (regex.test(input));
			    },
			    when: function(answer) {
			    	return answer.propTypes === 'yes'
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
				
				inquirer.prompt([
				  {
				    type: 'list',
				    name: 'componentType',
				    message: 'Select component type',
				    paginated: true,
				    choices: choices
				  },
				  {
				    type: 'list',
				    name: 'propTypes',
				    message: 'Add propTypes',
				    paginated: true,
				    choices: ['yes', 'no']
				  },
				  {
				    type: 'input',
				    name: 'propNo',
				    message: 'Number of prop types',
				    paginated: true,
				    validate: function(input) {
				    	let regex = /^\d+$/;
				    	//return false;
				    	if(!regex.test(input)) {
				    		return 'enter a number';
				    	}
				    	return true;
				    },
				    when: function(answer) {
				    	return answer.propTypes === 'yes'
				    }
				  },
				  {
				    type: 'input',
				    name: 'propNames',
				    message: 'Prop names',
				    paginated: true,
				    when: function(answer) {
				    	numberOfPropTypes = answer.propNo;
				    	return answer.propTypes === 'yes'
				    },
				    validate: function(input) {
				    	let propNames = input.split(' ');
				    	if(propNames.length !== Number(numberOfPropTypes)) {
				    		return `enter ${numberOfPropTypes} prop names`;
				    	}
				    	let regex = /^[a-zA-Z]+$/;
				    	
				    	if(!checkDuplicates(propNames)) {
				    		return 'duplicate prop names';
				    	}
				    	// if(!regex.test(input)) {
				    	// 	return 'enter valid name [alpha]'
				    	// }
				    	return true;
				    }
				  }
				]).then(function (answers) {
					let opts = [];
					let propNames = answers.propNames.split(' ');

					for(let count=0; count<numberOfPropTypes; count++) {
						let propTypeChoice = {
							type: 'list',
							name: `${propNames[count]}`,
							message: `Select prop type for ${propNames[count]}`,
							paginated: true,
							choices: ['number', 'string', 'bool', 'object', 'array', 'func', 'symbol'],
						};
						opts.push(propTypeChoice);
					}
					inquirer.prompt(opts)
						.then(function(answersInner) {
							generate.createComponent(modulename, name, answers, answersInner);
						});
				});
			} else if(type === 'test') {
				generate.createTest(modulename, name);
			}
    }
    else
    {
    	console.log('please provide required options');
    }
  }).on('--help', function() {
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
