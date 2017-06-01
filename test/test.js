import React from 'react';
import ReactDOM from 'react-dom';
import assert from 'assert';

import InlineSVG from '../src';


describe('<InlineSVG />', function () {
    let src = require('./fixture/1.svg');
    let target;

    before(() => {
        target = document.createElement('div');
        document.body.appendChild(target);
    });

    it('should render component correctly with expected output', () => {
        const rendered = ReactDOM.render(<InlineSVG src={src} />, target);
        const r = ReactDOM.findDOMNode(rendered);
        const svg = r.firstElementChild;
        const g = svg.firstElementChild;
        [
            [r.tagName, 'I'],
            [svg.tagName, 'svg'],
            [g.tagName, 'g'],
            [g.id, 'artboard-1']
        ].forEach(([a, b]) => { assert.equal(a, b) });
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

        // node removed data-reactroot
        const svg2 = svg.cloneNode(true);
        svg2.removeAttribute('data-reactroot');
        assert.equal(src, svg2.outerHTML);
    });
});
