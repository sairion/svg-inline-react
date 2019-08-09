import React from 'react';
import { string, bool } from 'prop-types';

import { getSVGFromSource, extractSVGProps } from './util';


const process = process || { env: {} };

export default class InlineSVG extends React.Component {
    componentDidMount() {
        const { children } = this.props;
        if ("production" !== process.env.NODE_ENV && children != null) {
            console.info('<InlineSVG />: `children` prop will be ignored.');
        }
    }

    render() {
        let Element, __html, svgProps;
        const { element, raw, src, ...otherProps } = this.props;

        if (raw === true) {
            Element = 'svg';
            svgProps = extractSVGProps(src);
            __html = getSVGFromSource(src).innerHTML;
        }
        __html = __html || src;
        Element = Element || element;
        svgProps = svgProps || {};

        return <Element {...svgProps} {...otherProps} src={null} children={null}
                        dangerouslySetInnerHTML={{ __html }} />
    }
}

InlineSVG.defaultProps = {
    element: 'i',
    raw: false,
    src: ''
}

InlineSVG.propTypes = {
    src: string.isRequired,
    element: string,
    raw: bool
}
