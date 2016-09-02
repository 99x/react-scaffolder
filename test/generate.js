const assert = require('chai').assert;
const createComponent = require('../lib/generate').createComponent;

describe('Create react components', function() {
	it('should create a parent react component', function(done) {
		const answers = {
			"componentType": "child",
			"propTypes": "yes",
			"propNo": "2",
			"propName": "first",
			"propType": "number"
		};
	  const res = createComponent('core', 'sample', answers);
	  assert.equal(res, true);
	  done();
	});
	it('should not create a parent react component', function(done) {
	  const answers = {};
	  const res = createComponent('core', 'sample', answers);
	  assert.equal(res, false);
	  done();
	});
	it('should not create a react component', function(done) {
		const answers = {
			"componentType": "child",
			"propTypes": "yes",
			"propNo": "2",
			"propName": "first",
			"propType": "number"
		};
	  const res = createComponent('non-existing-module', 'sample', answers);
	  assert.equal(res, false);
	  done();
	});
});
