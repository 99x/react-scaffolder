const dirTree = require('directory-tree');
const AsciiTable = require('ascii-table');
const getSourceDirectory = require('./source');

const viewDirectoryStructure = function(component, test) {
	const src = getSourceDirectory();
	if(component) {
		const treeComponents = dirTree(`${src}/components`);
		renderView(treeComponents);
	}
	if(test) {
		const treeTests = dirTree(`${src}/__tests__`);
		renderView(treeTests);
	}
}

const renderView = function(type) {
	const table = new AsciiTable().fromJSON({
	  title: ''
		, heading: [ 'Directory', 'size (kb)' ]
		, rows: [ 
		   
		  ] 
	});

	table
	  .setHeading('Directory', 'size (kb)');

	type.children.map((component) => {
		if(component.children) {
			component.children.map((_component) => {
				table.addRow(_component.path, _component.size);
			});
		}
		else {
			table.addRow(component.path, component.size);
		}
	});

	console.log(table.toString());
}

module.exports = viewDirectoryStructure;