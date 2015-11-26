import React from 'react';
import assert from 'assert';

function isSubclass(a, b) {
    return Object.getPrototypeOf ? Object.getPrototypeOf(a) === b : a.__proto__ === b;
}

// ES module import
import InlineSVG from '../lib';

assert.equal(isSubclass(InlineSVG, React.Component), true);

// CommonJS import
var InlineSVG2 = require('../dist');

assert.equal(isSubclass(InlineSVG2, React.Component), true);

console.log('Import test ok')
