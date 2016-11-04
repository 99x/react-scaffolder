const fs = require('fs.extra');
const path = require('path');

class init {
	/**
 	 * init command
 	 * @param {string} projectName - project name
  	 * @param {string} options - additional options for the project example: eslint configuration
	 * @param {function} cb - callback for status return
	 */
	initialize(projectName, eslint, cb) {
		if (!eslint) {
			let projectPath = projectName;
			fs.mkdirp(projectPath, (error) => {
				if (error) {
					cb(error);
				} else {
					// Resolve all promises async-ly
					promiseShortcut(this, 'reactclirc');
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
			Promise.all([
					t.copyCommonTemplates(projectName), 
					t.copyTemplate(projectName, 'webpack.config.js', false),
					t.copyTemplate(projectName, 'gitignore', true),
					t.copyTemplate(projectName, customTemplate, true),
					t.copyPackageJson(projectName)
				])
				.then((values) => {
					cb(true);
				})
				.catch((err) => {
					console.log(err);
					cb(false);
				});
		} 
	}

	/**
 	 * copy common templates recursively
  	 * @param {string} projectName - project name
	 */
	copyCommonTemplates(projectName) {
		return new Promise((resolve, reject) => {
			fs.copyRecursive(path.join(__dirname, '..', 'templates/src'), path.join(projectName, 'src'), (err) => {
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
	copyTemplate(projectName, file, dotFile) {
		return new Promise((resolve, reject) => {
			let destFile = null;
			if (dotFile) {
				destFile = '.' + file;
			} else {
				destFile = file;
			}
			fs.copy(path.join(__dirname, '..', 'templates', file), path.join(projectName, destFile), { replace: false }, (err) => {
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
	copyPackageJson(projectName) {
		return new Promise((resolve, reject) => {
			fs.readFile(path.join(__dirname, '..', 'templates/package.json'), (err, buffer) => {
				let jsonContent = JSON.parse(buffer.toString());
				jsonContent.name = projectName;
				fs.writeFile(path.join(projectName, 'package.json'), JSON.stringify(jsonContent, null, 2), 'utf-8', (err) => {
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
}
module.exports = init