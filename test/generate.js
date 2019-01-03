const assert = require("chai").assert;
const generateApp = require("../lib/generate");
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
		generate.createComponent(
			"TestComponent",
			"FileName",
			answers,
			answersInner,
			function(status) {
				rmdir("./templates/src/components/TestComponent", err => {
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
