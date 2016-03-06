import React from 'react';
import assert from 'assert';

function isSubclass(a, b) {
    return Object.getPrototypeOf ? Object.getPrototypeOf(a) === b : a.__proto__ === b;
}

// ES module import
import InlineSVG1 from '../es';

assert.equal(isSubclass(InlineSVG1, React.Component), true);

// CommonJS import
var InlineSVG2 = require('../dist');
import InlineSVG3 from '../dist';

assert.equal(isSubclass(InlineSVG2, React.Component), true);
assert.equal(isSubclass(InlineSVG3, React.Component), true);

console.log('Import test: ok');
