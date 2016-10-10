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
		const answersInner = { 
			first: 'string', 
			last: 'string' 
		};
	  createComponent('core', 'sample', answers, answersInner, function(status) {
	  	assert.equal(status, 'module doesn\'t exist');
	  	done();
	  });
	});
});
