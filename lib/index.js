import React from 'react';


export default class InlineSVG extends React.Component {
    render() {
        var svgProps;
        var src = this.props.src;
        var __html = src;

        if (this.props.children != null) {
            console.info('<InlineSVG />: `children` will be always ignored.');
        }

        var Element = this.props.element;
        return <Element {...svgProps} {...this.props} src={null} children={null}
                        dangerouslySetInnerHTML={{ __html }} />
    }
}

InlineSVG.defaultProps = { element: 'i' };
InlineSVG.propTypes = {
    src: React.PropTypes.string.isRequired,
    element: React.PropTypes.string,
};
