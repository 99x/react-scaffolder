const checkDuplicates = require("../lib/utils/checkduplicates");

describe("Check duplicates API", () => {
	test("should return false for duplicates", done => {
		let propNames = ["firstname", "firstname"];
		expect(checkDuplicates(propNames)).toEqual(false);
		done();
	});
	
	test("should return true for clean propNames", done => {
		let propNames = ["firstname", "lastname"];
		expect(checkDuplicates(propNames)).toEqual(true);
		done();
	});
});
