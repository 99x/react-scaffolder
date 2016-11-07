const fs = require('fs.extra');
const path = require('path');
const dirTree = require('directory-tree');
const AsciiTable = require('ascii-table');
const getSourceDirectory = require('./source');

/**
 * view directory stcuture facade
 * @param {string} component - component name
 * @param {string} test - test file
 * @param {function} cb - callback for status return
 */
const viewDirectoryStructure = (component, test, cb) => {
	const sourceDirectory = getSourceDirectory();
	if (!sourceDirectory) {
		// Seems .reactclirc doesn't exist or client isn't set
		cb({success: false, msg: '.reactclirc doesn\'t exist or client isn\'t set in .reactclirc'});
		return;
	}
	if (component) {
		// Make sure directory exists
		const exists = fs.existsSync(path.join(process.cwd(), sourceDirectory, 'components'), fs.F_OK);;
		if (exists) {
			const treeComponents = dirTree(`${sourceDirectory}/components`);
			renderView(treeComponents);
			cb({success: true});
		} else {
			cb({success: false, msg: 'components directory doesn\'t exist!'});
			return;
		}
	}
	if (test) {
		// Make sure directory actually exists
		const exists = fs.existsSync(path.join(process.cwd(), sourceDirectory, '__tests__'), fs.F_OK);;
		if (exists) {
			const treeTests = dirTree(`${sourceDirectory}/__tests__`);
			renderView(treeTests);
			cb({success: true});
		} else {
			cb({success: false, msg: '__tests__ directory doesn\'t exist!'});
			return;
		}
	}
}

/**
 * rendering table
 * @param {string} type - component/test
 */
const renderView = (type) => {
	const table = new AsciiTable().fromJSON({
	  title: '', 
	  heading: ['Directory', 'size (kb)'], 
	  rows: [] 
	});

	table.setHeading('Directory', 'size (kb)');

	type.children.map((component) => {
		if(component.children) {
			component.children.map((_component) => {
				table.addRow(_component.path, _component.size);
			});
		} else {
			table.addRow(component.path, component.size);
		}
	});

	console.log(table.toString());
}

module.exports = viewDirectoryStructure;