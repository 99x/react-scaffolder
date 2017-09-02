const assert = require("chai").assert;
const generateApp = require("../lib/generate");

generate = new generateApp();

describe("Create react components", function() {
	it("should create a parent react component", function(done) {
		const answers = {
			componentType: "child",
			propTypes: "yes",
			propNo: "2",
			propName: "first",
			propType: "number"
		};
		const answersInner = {
			first: "string",
			last: "string"
		};
		generate.createComponent(
			"core",
			"sample",
			answers,
			answersInner,
			function(status) {
				assert.equal(status, "module doesn't exist");
				done();
			}
		);
	});
});
