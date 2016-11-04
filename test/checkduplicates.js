'use strict';

var _checkduplicates = require('../lib/utils/checkduplicates');

var _checkduplicates2 = _interopRequireDefault(_checkduplicates);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var assert = require('chai').assert;


describe('Check duplicates API', function () {
	it('should return false for duplicates', function (done) {
		var propNames = ['firstname', 'firstname'];
		assert.equal((0, _checkduplicates2.default)(propNames), false);
		done();
	});
	it('should return true for clean propNames', function (done) {
		var propNames = ['firstname', 'lastname'];
		assert.equal((0, _checkduplicates2.default)(propNames), true);
		done();
	});
});