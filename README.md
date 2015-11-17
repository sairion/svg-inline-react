# `svg-inline-react`: Inline SVG wrapper component for React

This component wraps `dangerouslyInnerHTML` prop for easier use. Inlining SVGs have many benefits and cons too; See ["Using SVG"](https://css-tricks.com/using-svg/) for further detail. Transpiling is not required (written with pre-ES6 syntax).

## Usage

You can use [`svg-inline-loader`](https://github.com/sairion/svg-inline-loader) with [Webpack](https://webpack.github.io) to inline SVG.

Use like:

```jsx
var InlineSVG = require('svg-inline-react');

<InlineSVG src={require("svg-inline!icon.svg")} /> // Use with loader
```

### prop `element`

You can change element where svg included using `element` prop, default is `<i />`. But self closed tags like `img` is not allowed, and an error will be thrown from React side.

## Notes

This component was initially included with `svg-inline-loader`, but since it is totally diffrent domain, I moved this component to separate package. Any suggestion or pull request to improve this component would be welcome!

[inspired by](https://gist.github.com/MoOx/1eb30eac43b2114de73a)
