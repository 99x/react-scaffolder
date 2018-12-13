const dirTree = require("directory-tree");
const AsciiTable = require("ascii-table");

/**
 * view directory stcuture facade
 * @param {string} component - component name
 * @param {string} test - test file
 * @param {function} cb - callback for status return
 */
const viewDirectoryStructure = function(component, test, cb) {
	if (component) {
		const treeComponents = dirTree(`${src}/components`);
		renderView(treeComponents);
		cb(true);
	}
	if (test) {
		const treeTests = dirTree(`${src}/tests`);
		renderView(treeTests);
		cb(true);
	}
};

/**
 * rendering table
 * @param {string} type - component/test
 */
const renderView = function(type) {
	const table = new AsciiTable().fromJSON({
		title: "",
		heading: ["Directory", "size (kb)"],
		rows: []
	});

	table.setHeading("Directory", "size (kb)");

	type.children.map(component => {
		if (component.children) {
			component.children.map(_component => {
				table.addRow(_component.path, _component.size);
			});
		} else {
			table.addRow(component.path, component.size);
		}
	});

	console.log(table.toString());
};

module.exports = viewDirectoryStructure;
