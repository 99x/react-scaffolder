const assert = require("chai").assert;
const generateApp = require("../lib/generate");
const fs = require('fs.extra');
const path = require('path');
const rmdir = require("rimraf");

generate = new generateApp();

describe("Create react components", function() {
	it("should create a parent react component", function(done) {
		const answers = {
			componentType: "parent",
			propTypes: "yes",
			propNames: "title likes"
		};
		const answersInner = {
			title: "string",
			likes: "number"
		};
		fs.mkdirp(path.join(process.cwd(), 'test_folder/components'), error => {
			generate.createComponent(
				"TestComponent",
				"FileName",
				answers,
				answersInner,
				function(status) {
					rmdir("./test_folder", err => {
						if (err) throw new Error("failed to remove folder");
						else {
							assert.equal(status, true);
							done();
						}
					});
				}
			);
		});
	});
});
