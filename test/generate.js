const assert = require("chai").assert;
const generateApp = require("../lib/generate");

generate = new generateApp();

describe("Create react components", function() {
	it("should create a parent react component", function(done) {
		const answers = {
			componentType: "parent",
			propTypes: "yes",
			propNames: "one two"
		};
		const answersInner = {
			one: "number",
			two: "string"
		};
		generate.createComponent(
			"Test",
			"That",
			answers,
			answersInner,
			function(status) {
				assert.equal(status, true);
				done();
			}
		);
	});
});
