#!/usr/bin/env node

const program = require("commander");
const inquirer = require("inquirer");
const initApp = require("../lib/init");
const generateApp = require("../lib/generate");
const configRc = require("../lib/config");
const viewDirectoryStructure = require("../lib/view");
const packageVersion = require("../package.json").version;
const checkDuplicates = require("../lib/utils/checkduplicates");
const checkDuplicateElement = require("../lib/utils/checkduplicateelement");

const ora = require("ora");

init = new initApp();

/**
 * set commander version
 */
program.version(packageVersion);

/**
 * command for initializing a project
 */
program
	.command("init [projectname] [gitrepository]")
	.alias("i")
	.description("initialize React project")
	.option("-l, --eslint", "eslint required or not ?")
	.action(function(projectname, gitrepository, options) {
		if (projectname === undefined) {
			console.log("provide a project name");
			return;
		} else {
			const spinner = ora("creating directory structure").start();

			init.initialize(
				projectname,
				gitrepository,
				options.eslint,
				function initProject(res) {
					if (res) {
						setTimeout(() => {
							spinner.text = "application created successfully";
							spinner.succeed();
							console.log(
								`\t$ cd ${projectname}\n \t$ npm install \n \tHappy hacking ♥`
							);
						}, 1000);
					} else {
						setTimeout(() => {
							spinner.text = "something went wrong!";
							spinner.fail();
						}, 1000);
					}
				}
			);
		}
	})
	.on("--help", function() {
		console.log("  Examples:");
		console.log();
		console.log("    $ react-cli init awesomereact");
		console.log("    $ react-cli init -l awesomereact");
		console.log();
	});

/**
 * command changing .reactclirc file
 */
program.command("config [key] [value]").alias("c").action(function(key, value) {
	configRc(key, value, function config(err, res) {
		if (err) {
			setTimeout(() => {
				spinner.text = "something went wrong !";
				spinner.fail();
			}, 1000);
			throw new Error("unable to change config");
		}
		setTimeout(() => {
			spinner.text = "successfully configured !";
			spinner.succeed();
		}, 1000);
	});
});

/**
 * command view directory structure - tests
 */
program
	.command("view")
	.alias("v")
	.option("-c, --component", "view component only")
	.option("-t, --test", "view test only")
	.action(function(options) {
		const spinner = ora("loading directory structure \n").start();
		if (options.component && options.test) {
			viewDirectoryStructure(true, true, function(status) {
				if (status) {
					spinner.text = "successfully loaded !";
					spinner.succeed();
				} else {
					spinner.fail();
				}
			});
		} else if (options.component) {
			viewDirectoryStructure(true, false, function(status) {
				if (status) {
					spinner.text = "successfully loaded !";
					spinner.succeed();
				} else {
					spinner.text = "successfully loaded !";
					spinner.fail();
				}
			});
		} else if (options.test) {
			viewDirectoryStructure(false, true, function(status) {
				if (status) {
					spinner.text = "successfully loaded !";
					spinner.succeed();
				} else {
					spinner.fail();
				}
			});
		} else if (!options.component && !options.test) {
			spinner.text = "provide options";
			spinner.fail();
		}
	});

/**
 * command for generating a react component
 */
program
	.command("generate [type] [modulename] [name]")
	.alias("g")
	.description("generate a react component")
	.action(function(type, modulename, name, options) {
		if (type !== undefined && modulename !== undefined) {
      if(!checkDuplicateElement (type, modulename, name)){
        return;
      }
			if (type === "component") {

				let choices = [];

				let numberOfPropTypes = 0;

				let inputPropTypeName = {
					type: "input",
					name: "propName",
					message: "Prop name",
					paginated: true,
					validate: function(input) {
						let regex = /[^a-z\d]/i;
						return false;
						return regex.test(input);
					},
					when: function(answer) {
						return answer.propTypes === "yes";
					}
				};

				choices.push({
					name: "child",
					value: "child",
					short: "child"
				});

				choices.push({
					name: "parent",
					value: "parent",
					short: "parent"
				});

				inquirer
					.prompt([
						{
							type: "list",
							name: "componentType",
							message: "Select component type",
							paginated: true,
              choices: choices
            },
						{
							type: "list",
							name: "propTypes",
							message: "Add propTypes",
							paginated: true,
							choices: ["yes", "no"]
						},
						{
							type: "input",
							name: "propNo",
							message: "Number of prop types",
							paginated: true,
							validate: function(input) {
								let regex = /^\d+$/;
								//return false;
								if (!regex.test(input)) {
									return "enter a number";
								}
								return true;
							},
							when: function(answer) {
								return answer.propTypes === "yes";
							}
						},
						{
							type: "input",
							name: "propNames",
							message: "Prop names",
							paginated: true,
							when: function(answer) {
								numberOfPropTypes = answer.propNo;
								return answer.propTypes === "yes";
							},
							validate: function(input) {
								let propNames = input.split(" ");
								if (
									propNames.length !==
									Number(numberOfPropTypes)
								) {
									return `enter ${numberOfPropTypes} prop names`;
								}
								let regex = /^[a-zA-Z]+$/;

								if (!checkDuplicates(propNames)) {
									return "duplicate prop names";
								}
								// if(!regex.test(input)) {
								// 	return 'enter valid name [alpha]'
								// }
								return true;
							}
						}
					])
					.then(function(answers) {
						generate = new generateApp();
						if (answers.propTypes === "no") {
							generate.createComponent(
								modulename,
								name,
								answers,
								null,
								function(status) {
									if (status) {
										const spinner = ora(
											"loading directory structure \n"
										).start();
										spinner.text =
											"component created successfully";
										spinner.succeed();
									}
								}
							);
						} else {
							let opts = [];
							let propNames = answers.propNames.split(" ");

							for (
								let count = 0;
								count < numberOfPropTypes;
								count++
							) {
								let propTypeChoice = {
									type: "list",
									name: `${propNames[count]}`,
									message: `Select prop type for ${propNames[count]}`,
									paginated: true,
									choices: [
										"number",
										"string",
										"bool",
										"object",
										"array",
										"func",
										"symbol"
									]
								};
								opts.push(propTypeChoice);
							}
							inquirer.prompt(opts).then(function(answersInner) {
								generate.createComponent(
									modulename,
									name,
									answers,
									answersInner,
									function(status) {
										if (status) {
											const spinner = ora(
												"loading directory structure \n"
											).start();
											spinner.text =
												"component created successfully";
											spinner.succeed();
										}
									}
								);
							});
						}
					});
			} else if (type === "test") {
				generate = new generateApp();
				generate.createTest(modulename, name, function(status) {
					const spinner = ora("creating test file \n").start();
					spinner.text = "test file created successfully";
					spinner.succeed();
				});
			}
		} else {
			setTimeout(() => {
				const spinner = ora("").start();
				spinner.text = "please provide required options";
				spinner.fail();
			}, 500);
		}
	})
	.on("--help", function() {
		console.log("  Examples:");
		console.log();
		console.log("    $ react-cli generate core helloworld -p");
		console.log("    $ react-cli generate core hello -c");
		console.log();
	});

/**
 * parse commander object
 */
program.parse(process.argv);
