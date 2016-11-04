'use strict';

var assert = require('chai').assert;
var rmdir = require('rimraf');
var initApp = require('../lib/init');

var init = new initApp();

describe('Initialize React application', function () {
	it('should initialize react app', function (done) {
		init.initialize('../test-project', undefined, function (result) {
			rmdir('../test-project', function (err) {
				if (err) {
					throw new Error('failed');
				} else {
					assert.equal(result, true);
					done();
				}
			});
		});
	});

	it('should initialize react app with eslint configuration', function (done) {
		init.initialize('../test-project', true, function (result) {
			rmdir('../test-project', function (err) {
				if (err) {
					throw new Error('failed');
				} else {
					assert.equal(result, true);
					done();
				}
			});
		});
	});
});