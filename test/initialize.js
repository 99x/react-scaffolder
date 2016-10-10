const assert = require('chai').assert;
const init = require('../lib/init');
const rmdir = require('rimraf');

describe('Initialize React application', function() {
	it('should initialize react app', function(done) {
		init('../test-project', undefined, function(result) {
			rmdir('../test-project', err => {
				if(err) throw new Error('failed');
				else {
					assert.equal(result, true);
					done();
				}
			});
		});
	});

	it('should initialize react app with eslint configuration', function(done) {
		init('../test-project', true, function(result) {
			rmdir('../test-project', err => {
				if(err) throw new Error('failed');
				else {
					assert.equal(result, true);
          done();
				}
			});
		});
	});
});
