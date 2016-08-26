const assert = require('chai').assert;
const create = require('../lib/generate').create;

describe('Create react components', function() {
	it('should create a parent react component', function(done) {
    create('core', 'sample', 'child', function(res) {
      assert.equal(res, true);
      done();
    });
	});
	it('should not create a parent react component', function(done) {
    create('core', 'sample', 'somethingelse', function(res) {
      assert.equal(res, false);
      done();
    });
	});
	it('should not create a react component', function(done) {
    create('non-existing-module', 'sample', 'parent', function(res) {
      assert.equal(res, false);
      done();
    });
	});
});
