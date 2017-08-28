const assert = require("chai").assert;
const checkDuplicates = require("../lib/utils/checkduplicates");

describe("Check duplicates API", function() {
	it("should return false for duplicates", function(done) {
		let propNames = ["firstname", "firstname"];
		assert.equal(checkDuplicates(propNames), false);
		done();
	});
	
	it("should return true for clean propNames", function(done) {
		let propNames = ["firstname", "lastname"];
		assert.equal(checkDuplicates(propNames), true);
		done();
	});
});
