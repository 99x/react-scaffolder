const assert = require('chai').assert;
const generateApp = require('../lib/generate');
const fs = require('fs.extra');
const path = require('path');
const rmdir = require('rimraf');

const generate = new generateApp();

describe('Create constatns file', function() {
  it('should create a file with exported constants', function(done) {
    const answers = {
      constants: {
        path: 'some_path',
        list: [
          'LOAD_SOME_DATA',
          'LOAD_SOME_DATA_START',
          'LOAD_SOME_DATA_SUCCESS',
          'LOAD_SOME_DATA_ERROR'
        ]
      }
    };
    generate.createConstants({answers});
  });
});
