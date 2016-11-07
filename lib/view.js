'use strict';

var fs = require('fs.extra');
var path = require('path');
var dirTree = require('directory-tree');
var AsciiTable = require('ascii-table');
var getSourceDirectory = require('./source');

/**
 * view directory stcuture facade
 * @param {string} component - component name
 * @param {string} test - test file
 * @param {function} cb - callback for status return
 */
var viewDirectoryStructure = function viewDirectoryStructure(component, test, cb) {
	var sourceDirectory = getSourceDirectory();
	if (!sourceDirectory) {
		// Seems .reactclirc doesn't exist or client isn't set
		cb({ success: false, msg: '.reactclirc doesn\'t exist or client isn\'t set in .reactclirc' });
		return;
	}
	if (component) {
		// Make sure directory exists
		var exists = fs.existsSync(path.join(process.cwd(), sourceDirectory, 'components'), fs.F_OK);;
		if (exists) {
			var treeComponents = dirTree(sourceDirectory + '/components');
			renderView(treeComponents);
			cb({ success: true });
		} else {
			cb({ success: false, msg: 'components directory doesn\'t exist!' });
			return;
		}
	}
	if (test) {
		// Make sure directory actually exists
		var _exists = fs.existsSync(path.join(process.cwd(), sourceDirectory, '__tests__'), fs.F_OK);;
		if (_exists) {
			var treeTests = dirTree(sourceDirectory + '/__tests__');
			renderView(treeTests);
			cb({ success: true });
		} else {
			cb({ success: false, msg: '__tests__ directory doesn\'t exist!' });
			return;
		}
	}
};

/**
 * rendering table
 * @param {string} type - component/test
 */
var renderView = function renderView(type) {
	var table = new AsciiTable().fromJSON({
		title: '',
		heading: ['Directory', 'size (kb)'],
		rows: []
	});

	table.setHeading('Directory', 'size (kb)');

	type.children.map(function (component) {
		if (component.children) {
			component.children.map(function (_component) {
				table.addRow(_component.path, _component.size);
			});
		} else {
			table.addRow(component.path, component.size);
		}
	});

	console.log(table.toString());
};

module.exports = viewDirectoryStructure;