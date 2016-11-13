const assert = require('chai').assert;
import checkDuplicates from '../lib/utils/checkduplicates';

describe('Check duplicates API', () => {
	it('should return false for duplicates', (done) => {
		let propNames = ['firstname', 'firstname'];
		assert.equal(checkDuplicates(propNames), false);
		done();
	});
	it('should return true for clean propNames', (done) => {
		let propNames = ['firstname', 'lastname'];
		assert.equal(checkDuplicates(propNames), true);
		done();
	});
});
