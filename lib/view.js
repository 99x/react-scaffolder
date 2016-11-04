'use strict';

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
	var src = getSourceDirectory();
	if (component) {
		var treeComponents = dirTree(src + '/components');
		renderView(treeComponents);
		cb(true);
	}
	if (test) {
		var treeTests = dirTree(src + '/__tests__');
		renderView(treeTests);
		cb(true);
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