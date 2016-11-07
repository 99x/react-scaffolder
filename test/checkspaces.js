'use strict';

var _checkspaces = require('../lib/utils/checkspaces');

var _checkspaces2 = _interopRequireDefault(_checkspaces);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var assert = require('chai').assert;


describe('Check spaces API', function () {
	it('should return array without spaces', function (done) {
		var propNames = ['firstname', 'lastname', ' '];
		assert.equal((0, _checkspaces2.default)(propNames).length, 2);
		done();
	});
});