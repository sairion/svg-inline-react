import React from 'react';


var DOMParser = typeof window !== 'undefined' && window.DOMParser;

function isParserAvailable(src) {
    // kinda naive but meh, ain't gonna use full-blown parser for this
    return typeof DOMParser === 'function' &&
           typeof src              === 'string' &&
           src.trim().substr(0, 4) === '<svg';
}

// parse SVG string using `DOMParser`
function parseFromSVGString(src) {
    var parser = new DOMParser();
    return parser.parseFromString(src, "image/svg+xml");
}

// Transform DOM prop/attr names applicable to `<svg>` element but react-limited
function switchSVGAttrToReactProp(propName) {
    switch (propName) {
    case 'class':     return 'className';
    default:          return propName;
    }
}

export default class InlineSVG extends React.Component {
    constructor() {
        super();
        this._extractSVGProps = this._extractSVGProps.bind(this);
    }

    // Serialize `Attr` objects in `NamedNodeMap`
    _serializeAttrs(map) {
        var ret = {};
        var prop;
        for (var i = 0; i < map.length; i++) {
            prop = switchSVGAttrToReactProp(map[i].name);
            ret[prop] = map[i].value;
        }
        return ret;
    }

    // get <svg /> element props
    _extractSVGProps(src) {
        var map = parseFromSVGString(src).documentElement.attributes;
        return (map.length > 0) ? this._serializeAttrs(map) : null;
    }

    // get content inside <svg> element.
    _stripSVG(src) {
        return parseFromSVGString(src).documentElement.innerHTML;
    }

    render() {
        var svgProps = {};
        var src = this.props.src;
        var __html = src;
        var Element = this.props.element;

        if (this.props.children != null) {
            console.info('<InlineSVG />: `children` will be always ignored.');
        }

        if (this.props.raw === true) {
            if (isParserAvailable(src)) {
                Element = 'svg';
                svgProps = this._extractSVGProps(src);
                __html = this._stripSVG(src);
            } else {
                console &&
                console.info('<InlineSVG />: `raw` prop works only when `window.DOMParser` exists.');
            }
        }

        return <Element {...svgProps} {...this.props} src={null} children={null}
                        dangerouslySetInnerHTML={{ __html }} />
    }
}

InlineSVG.defaultProps = { element: 'i' };
InlineSVG.propTypes = {
    src: React.PropTypes.string.isRequired,
    element: React.PropTypes.string,
    raw: React.PropTypes.bool
};
