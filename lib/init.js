const fs = require('fs.extra');
const path = require('path');

/**
 * init command
 * @param {string} projectName - project name
 * @param {string} options - additional options for the project example: eslint configuration
 */

function init(projectName, eslint) {
	if(eslint === undefined) {
		let projectPath = '../' + projectName;
		fs.mkdirp(projectPath, (error) => {
			if(error) console.log(error);

			else
			{
				//resolve all promises async-ly 
				Promise.all([copyCommonTemplates(projectName), copyTemplate(projectName, 'webpack.config.js'), copyTemplate(projectName, '.gitignore'), copyTemplate(projectName, '.gitignore'), copyPackageJson(projectName)])
					.then((values) => {
						console.log(values);
					})
					.catch((err) => {
						console.log(err);
					});
			}
		});
	}
  else
  {
  	if(eslint) {
  		copyTemplate(projectName, '.eslintrc.json')
  			.then(function(res) {
  				console.log(res);
  			})
  			.catch(function(err) {
  				console.log(err);
  			});
  	}
	}
}

/**
 * copy common templates recursively
 * @param {string} projectName - project name
 */

function copyCommonTemplates(projectName) {
	return new Promise(function(resolve, reject) {
		fs.copyRecursive(path.join(__dirname, '..', 'templates/src'), path.join(projectName, 'src'), function (err) {
		  if (err) {
		  	console.log(err);
		  	reject(err);
		  }
		  else {
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

function copyTemplate(projectName, file) {
	return new Promise(function(resolve, reject) {
		fs.copy(path.join(__dirname, '..', 'templates', file), path.join(projectName, file), { replace: false }, function (err) {
		  if (err) {
		  	console.log(err);
		  	reject(err);
		  }
		  else {
		  	resolve(true);
		  }
		});
	});	
}

/**
 * copy package.json file to project destination
 * @param {string} projectName - project name
 */

function copyPackageJson(projectName) {
	return new Promise(function(resolve, reject) {
		fs.readFile(path.join(__dirname, '..', 'templates/package.json'), (err, buffer) => {
			console.log(JSON.parse(buffer.toString()).name);
			let jsonContent = JSON.parse(buffer.toString());
			jsonContent.name = projectName;
			console.log(jsonContent.name);
			console.log(path.join(projectName, 'package.json'));
			fs.writeFile(path.join(projectName, 'package.json'), JSON.stringify(jsonContent, null, 2), 'utf-8', (err) => {
				if(err) {
					reject(err);
				}
				else {
					resolve(true);
				}
			});
		});
	});	
}

module.exports = function(projectName, options) {
	console.log(projectName);
	init(projectName, options);
};
