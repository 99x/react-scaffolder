#!/usr/bin/env node

const program = require('commander');
const init = require('../lib/init');
const packageVersion = require('../package.json').version;

program
	.version(packageVersion);

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
      init(projectname, options.eslint);
    }
  }).on('--help', function() {
    console.log('  Examples:');
    console.log();
    console.log('    $ react-cli init awesomereact');
    console.log('    $ react-cli init -l awesomereact');
    console.log();
  });

program.parse(process.argv);
