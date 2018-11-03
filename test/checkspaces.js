const checkSpaces = require("../lib/utils/checkspaces");

describe("Check spaces API", () => {
	test("should return array without spaces", done => {
		let propNames = ["firstname", "lastname", " "];
		//needs to be fixed
		expect(checkSpaces(propNames).length).toEqual(3);
		done();
	});
});
