import React from 'react';


const DOMParser = typeof window !== 'undefined' && window.DOMParser;
const process = process || {};
      process.env = process.env || {};
const parserAvailable = typeof DOMParser !== 'undefined' &&
                        DOMParser.prototype != null &&
                        DOMParser.prototype.parseFromString != null;

function isParsable(src) {
    // kinda naive but meh, ain't gonna use full-blown parser for this
    return parserAvailable &&
           typeof src === 'string' &&
           src.trim().substr(0, 4) === '<svg';
}

// parse SVG string using `DOMParser`
function parseFromSVGString(src) {
    const parser = new DOMParser();
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
    static defaultProps = {
        element: 'i',
        raw: false,
        src: ''
    };
    static propTypes = {
        src: React.PropTypes.string.isRequired,
        element: React.PropTypes.string,
        raw: React.PropTypes.bool
    };

    constructor(props) {
        super(props);
        this._extractSVGProps = this._extractSVGProps.bind(this);
    }

    // Serialize `Attr` objects in `NamedNodeMap`
    _serializeAttrs(map) {
        const ret = {};
        let prop;
        for (let i = 0; i < map.length; i++) {
            prop = switchSVGAttrToReactProp(map[i].name);
            ret[prop] = map[i].value;
        }
        return ret;
    }

    // get <svg /> element props
    _extractSVGProps(src) {
        const map = parseFromSVGString(src).documentElement.attributes;
        return (map.length > 0) ? this._serializeAttrs(map) : null;
    }

    // get content inside <svg> element.
    _stripSVG(src) {
        return parseFromSVGString(src).documentElement.innerHTML;
    }

    componentWillReceiveProps({ children }) {
        if ("production" !== process.env.NODE_ENV && children != null) {
            console.info('<InlineSVG />: `children` prop will be ignored.');
        }
    }

    render() {
        let Element, __html, svgProps;
        const { element, raw, src, ...otherProps } = this.props;

        if (raw === true && isParsable(src)) {
            Element = 'svg';
            svgProps = this._extractSVGProps(src);
            __html = this._stripSVG(src);
        }
        __html = __html || src;
        Element = Element || element;
        svgProps = svgProps || {};

        return <Element {...svgProps} {...otherProps} src={null} children={null}
                        dangerouslySetInnerHTML={{ __html }} />
    }
}
