const assert = require('chai').assert;
const rmdir = require('rimraf');
const initApp = require('../lib/init');

let init = new initApp();

describe('Initialize React application', () => {
	it('should initialize react app', (done) => {
		init.initialize('../test-project', undefined, (result) => {
			rmdir('../test-project', err => {
				if (err) {
					throw new Error('failed');
				} else {
					assert.equal(result, true);
					done();
				}
			});
		});
	});

	it('should initialize react app with eslint configuration', (done) => {
		init.initialize('../test-project', true, (result) => {
			rmdir('../test-project', err => {
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
