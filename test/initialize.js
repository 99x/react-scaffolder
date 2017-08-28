const assert = require("chai").assert;
const initApp = require("../lib/init");
const rmdir = require("rimraf");
const nock = require("nock");

init = new initApp();

describe("Initialize React application", function () {
	it("should initialize react app", function (done) {
		init.initialize("../test-project", undefined, undefined, function (result) {
			rmdir("../test-project", err => {
				if (err) throw new Error("failed");
				else {
					assert.equal(result, true);
					done();
				}
			});
		});
	});

	it("should initialize react app with eslint configuration", function (done) {
		init.initialize("../test-project", undefined, true, function (result) {
			rmdir("../test-project", err => {
				if (err) throw new Error("failed");
				else {
					assert.equal(result, true);
					done();
				}
			});
		});
	});

	it("should initialize react app with git repository without eslint configuration", function (done) {
		init.initialize("../test-project", 'https://github.com/react-boilerplate/react-boilerplate', undefined, function (result) {
			rmdir("../test-project", err => {
				if (err) throw new Error("failed");
				else {
					assert.equal(result, true);
					done();
				}
			});
		});
	});

});
