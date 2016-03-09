# `svg-inline-react`: Inline SVG wrapper component for React

This component wraps `dangerouslyInnerHTML` prop for easier use. Inlining SVG has pros and cons; See ["Using SVG"](https://css-tricks.com/using-svg/) for further detail.

## notice on transpilation

Distributed source is transpiled. If you want to use ES module version, please import from `svg-inline-react/es`. (Rollup's jsnext:main' also option points to it)

## Usage

You can use [`svg-inline-loader`](https://github.com/sairion/svg-inline-loader) with [Webpack](https://webpack.github.io) to inline SVG.

Use like:

```jsx
var InlineSVG = require('svg-inline-react');  // CommonJS
import InlineSVG from 'svg-inline-react'; // ES2015

<InlineSVG src={require("svg-inline!icon.svg")} /> // Use with loader
```

### prop `src` : string

valid SVG string.

### prop `element` : string

You can change element where svg included using `element` prop, default is `<i />`. But self closed tags like `img` is not allowed, and an error will be thrown from React side.

### prop `raw` : bool (experimental!)

This prop allows your svg file to be rendered directly, without a container element wraps it. This is an experimental feature. Since this feature needs `DOMParser` svg+xml support, it's only avaialble on >= IE10 and other modern browsers (it checks support before use, so errors won't be thrown though). Also, the prop will be ignored on server side rendering environment.

## Notes

This component was initially included with `svg-inline-loader`, but since it is totally diffrent domain, I moved this component to separate package. Any suggestion or pull request to improve this component would be welcome!

[inspired by](https://gist.github.com/MoOx/1eb30eac43b2114de73a)
