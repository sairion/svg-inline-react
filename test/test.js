import React from 'react';
import ReactDOM from 'react-dom';
import assert from 'assert';

import InlineSVG from '../lib';


describe('<InlineSVG />', function () {
    var src = require('./fixture/1.svg');
    var target;

    before(() => {
        target = document.createElement('div');
        document.body.appendChild(target);
    });

    it('should render component correctly with expected output', () => {
        const rendered = ReactDOM.render(<InlineSVG src={src} />, target);
        const r = ReactDOM.findDOMNode(rendered);
        const svg = r.children[0];
        const g = svg.children[0];

        // TODO: automated 1:1 element prop check
        assert.equal(r.tagName, 'I');
        assert.equal(svg.tagName, 'svg');
        assert.equal(g.tagName, 'g');
        assert.equal(g.id, 'artboard-1');
    });

    it('should be able to change container element', function () {
        const rendered = ReactDOM.render(<InlineSVG src={src} element="span" />, target);
        const withContainerOption = ReactDOM.findDOMNode(rendered);
        assert.equal(withContainerOption.tagName, 'SPAN');
    });

    it('should render svg element when using `raw` prop', function () {
        const rendered = ReactDOM.render(<InlineSVG src={src} raw={true} />, target);
        const svg = ReactDOM.findDOMNode(rendered);
        assert.equal(svg.tagName, 'svg');
    });
});
