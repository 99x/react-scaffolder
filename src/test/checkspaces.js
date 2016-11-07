const assert = require('chai').assert;
import checkSpaces from '../lib/utils/checkspaces';

describe('Check spaces API', () => {
	it('should return array without spaces', (done) => {
		let propNames = ['firstname', 'lastname', ' '];
		assert.equal(checkSpaces(propNames).length, 2);
		done();
	});
});
