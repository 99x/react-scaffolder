const initApp = require("../lib/init");
const rmdir = require("rimraf");
const nock = require("nock");

init = new initApp();

describe("Initialize React application", () => {
	test("should initialize react app", done => {
		init.initialize("../test-project", undefined, undefined, function (result) {
			rmdir("../test-project", err => {
				if (err) throw new Error("failed");
				else {
					expect(result).toEqual(true);
					done();
				}
			});
		});
	});

	test("should initialize react app with eslint configuration", done => {
		init.initialize("../test-project", undefined, true, function (result) {
			rmdir("../test-project", err => {
				if (err) throw new Error("failed");
				else {
					expect(result).toEqual(true);
					done();
				}
			});
		});
	});

	test(
        "should initialize react app with git repository without eslint configuration",
        done => {
            init.initialize("../test-project", 'https://github.com/react-boilerplate/react-boilerplate', undefined, function (result) {
                rmdir("../test-project", err => {
                    if (err) throw new Error("failed");
                    else {
                        expect(result).toEqual(true);
                        done();
                    }
                });
            });
        }
    );

});
