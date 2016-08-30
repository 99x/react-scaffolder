#!/usr/bin/env node

const program = require('commander');
const init = require('../lib/init');
const generate = require('../lib/generate');
const packageVersion = require('../package.json').version;

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
 * command for generating a react component
 */
program
  .command('generate [modulename] [name]')
  .alias('g')
  .description('generate a react component')
  .option("-p, --parent", "parent component")
  .option("-c, --child", "child component")
  .action(function(modulename, name, options) {
    console.log(modulename, name);
    if(modulename !== undefined && name !== undefined && options !== undefined) {
    	if(options.child) {
    		generate.create(modulename, name, 'child');
    	}
    	else
    	{
    		generate.create(modulename, name, 'parent');
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
