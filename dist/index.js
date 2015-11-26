'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var DOMParser = typeof window !== 'undefined' && window.DOMParser;

function isParserAvailable(src) {
    // kinda naive but meh, ain't gonna use full-blown parser for this
    return typeof DOMParser === 'function' && typeof src === 'string' && src.trim().substr(0, 4) === '<svg';
}

// parse SVG string using `DOMParser`
function parseFromSVGString(src) {
    var parser = new DOMParser();
    return parser.parseFromString(src, "image/svg+xml");
}

// Transform DOM prop/attr names applicable to `<svg>` element but react-limited
function switchSVGAttrToReactProp(propName) {
    switch (propName) {
        case 'class':
            return 'className';
        default:
            return propName;
    }
}

var InlineSVG = (function (_React$Component) {
    _inherits(InlineSVG, _React$Component);

    function InlineSVG() {
        _classCallCheck(this, InlineSVG);

        _get(Object.getPrototypeOf(InlineSVG.prototype), 'constructor', this).call(this);
        this._extractSVGProps = this._extractSVGProps.bind(this);
    }

    // Serialize `Attr` objects in `NamedNodeMap`

    _createClass(InlineSVG, [{
        key: '_serializeAttrs',
        value: function _serializeAttrs(map) {
            var ret = {};
            var prop;
            for (var i = 0; i < map.length; i++) {
                prop = switchSVGAttrToReactProp(map[i].name);
                ret[prop] = map[i].value;
            }
            return ret;
        }

        // get <svg /> element props
    }, {
        key: '_extractSVGProps',
        value: function _extractSVGProps(src) {
            var map = parseFromSVGString(src).documentElement.attributes;
            return map.length > 0 ? this._serializeAttrs(map) : null;
        }

        // get content inside <svg> element.
    }, {
        key: '_stripSVG',
        value: function _stripSVG(src) {
            return parseFromSVGString(src).documentElement.innerHTML;
        }
    }, {
        key: 'render',
        value: function render() {
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
                    console && console.info('<InlineSVG />: `raw` prop works only when `window.DOMParser` exists.');
                }
            }

            return _react2['default'].createElement(Element, _extends({}, svgProps, this.props, { src: null, children: null,
                dangerouslySetInnerHTML: { __html: __html } }));
        }
    }]);

    return InlineSVG;
})(_react2['default'].Component);

exports['default'] = InlineSVG;

InlineSVG.defaultProps = { element: 'i' };
InlineSVG.propTypes = {
    src: _react2['default'].PropTypes.string.isRequired,
    element: _react2['default'].PropTypes.string,
    raw: _react2['default'].PropTypes.bool
};
module.exports = exports['default'];

