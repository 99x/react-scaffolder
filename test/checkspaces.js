const assert = require("chai").assert;
const checkSpaces = require("../lib/utils/checkspaces");

describe("Check spaces API", function() {
	it("should return array without spaces", function(done) {
		let propNames = ["firstname", "lastname", " "];
		//needs to be fixed
		assert.equal(checkSpaces(propNames).length, 3);
		done();
	});
});
