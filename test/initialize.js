const assert = require('chai').assert;
const init = require('../lib/init');
const fs = require('fs.extra');
const rmdir = require('rimraf');

describe('initialize React application', function() {
	
	it('should initialize react app', function(done) {
		init('../test-project', undefined, function(result) {
			rmdir('../test-project', err => {
				if(err) throw new Error('failed');
				else {
					done();
				}
			});
		});
	});

});