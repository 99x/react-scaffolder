const fs = require("fs.extra");
const path = require("path");
const clone = require("git-clone");
const init = function() {};
const ora = require("ora");

/**
 * init command
 * @param {string} projectName - project name
 * @param {string} gitrepository - template repository url
 * @param {string} options - additional options for the project example: eslint configuration
 * @param {function} cb - callback for status return
 */
init.prototype.initialize = function(projectName, gitrepository, eslint, cb) {
	if (gitrepository === undefined) {
		if (eslint === undefined) {
			let projectPath = projectName;
			fs.mkdirp(projectPath, error => {
				if (error) {
					cb(error);
				} else {
					//resolve all promises async-ly
					Promise.all([
						this.copyCommonTemplates(projectName),
						this.copyPublicFolder(projectName),
						this.copyTemplate(
							projectName,
							"package.json",
							false
						),
						this.copyTemplate(projectName, "gitignore", true),
						this.copyPackageJson(projectName)
					])
						.then(values => {
							cb(true);
						})
						.catch(err => {
							console.log(err);
							cb(false);
						});
				}
			});
		} else {
			if (eslint) {
				Promise.all([
					this.copyCommonTemplates(projectName),
					this.copyPublicFolder(projectName),
					this.copyTemplate(projectName, "package.json", false),
					this.copyTemplate(projectName, "gitignore", true),
					this.copyTemplate(projectName, "eslintrc.json", true),
					this.copyPackageJson(projectName)
				])
					.then(values => {
						cb(true);
					})
					.catch(err => {
						console.log(err);
						cb(false);
					});
			}
		}
	} else {
		if (eslint === undefined) {
			let projectPath = projectName;
			fs.mkdirp(projectPath, error => {
				if (error) {
					cb(error);
				} else {
					// resolve all promises async-ly
					Promise.all([
						this.copyTemplate(
							projectName,
							"package.json",
							false
						),
						this.copyTemplate(projectName, "gitignore", true),
						this.copyPackageJson(projectName)
					])
						.then(values => {
							const spinner = ora("cloning template").start();

							clone(
								gitrepository,
								projectName + "/public" + "/src",
								value => {
									setTimeout(() => {
										spinner.text =
											"template cloned successfully";
										spinner.succeed();
										cb(true);
									}, 1000);
								},
							);
						})
						.catch(err => {
							console.log(err);
							cb(false);
						});
				}
			});
		} else {
			if (eslint) {
				Promise.all([
					this.copyTemplate(projectName, "package.json", false),
					this.copyTemplate(projectName, "gitignore", true),
					this.copyTemplate(projectName, "eslintrc.json", true),
					this.copyPackageJson(projectName)
				])
					.then(values => {
						const spinner = ora("cloning template").start();

						clone(gitrepository, 
							projectName + "/public" + "/src",
							value => {
							setTimeout(() => {
								spinner.text = "template cloned successfully";
								spinner.succeed();
								cb(true);
							}, 1000);
						});
					})
					.catch(err => {
						console.log(err);
						cb(false);
					});
			}
		}
	}
};

/**
 * copy common templates recursively
 * @param {string} projectName - project name
 */
init.prototype.copyPublicFolder = function(projectName) {
	return new Promise(function(resolve, reject) {
		fs.copyRecursive(
			path.join(__dirname, "..", "templates/src"),
			path.join(projectName, "src"),

			function(err) {
				if (err) {
					console.log(err);
					reject(err);
				} else {
					resolve(true);
				}
			}
		);
	});
};

/**
 * copy public folder recursively
 * @param {string} projectName - project name
 */
init.prototype.copyCommonTemplates = function(projectName) {
	return new Promise(function(resolve, reject) {
		fs.copyRecursive(
			path.join(__dirname, "..", "templates/public"),
			path.join(projectName, "public"),

			function(err) {
				if (err) {
					console.log(err);
					reject(err);
				} else {
					resolve(true);
				}
			}
		);
	});
};
/**
 * prototype function for copying a special template file
 * @param {string} projectName - project name
 * @param {string} file - name of the file to be copied
 */
init.prototype.copyTemplate = function(projectName, file, dotFile) {
	return new Promise(function(resolve, reject) {
		let destFile = null;
		if (dotFile) {
			destFile = "." + file;
		} else {
			destFile = file;
		}
		fs.copy(
			path.join(__dirname, "..", "templates", file),
			path.join(projectName, destFile),
			{ replace: false },
			function(err) {
				if (err) {
					console.log(err);
					reject(err);
				} else {
					resolve(true);
				}
			}
		);
	});
};

/**
 * copy package.json file to project destination
 * @param {string} projectName - project name
 */
init.prototype.copyPackageJson = function(projectName) {
	return new Promise(function(resolve, reject) {
		fs.readFile(
			path.join(__dirname, "..", "templates/package.json"),
			(err, buffer) => {
				let jsonContent = JSON.parse(buffer.toString());
				jsonContent.name = projectName;
				fs.writeFile(
					path.join(projectName, "package.json"),
					JSON.stringify(jsonContent, null, 2),
					"utf-8",
					err => {
						if (err) {
							console.log(err);
							reject(err);
						} else {
							resolve(true);
						}
					}
				);
			}
		);
	});
};

module.exports = init;