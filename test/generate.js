const generateApp = require("../lib/generate");

generate = new generateApp();

describe("Create react components", () => {
	test("should create a parent react component", done => {
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
				expect(status).toEqual("module doesn't exist");
				done();
			}
		);
	});
});
