#!/usr/bin/env node

const program = require('commander');
const init = require('../lib/init');
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
    console.log('init "%s" using %s mode', projectname, options.eslint);
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
 * parse commander object
 */

program.parse(process.argv);
