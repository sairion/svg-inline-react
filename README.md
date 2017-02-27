# `svg-inline-react`: Inline SVG wrapper component for React

This component wraps `dangerouslyInnerHTML` prop for easier use. Inlining SVG has pros and cons; See ["Using SVG"](https://css-tricks.com/using-svg/) for further detail. However, I recommended to use static svg transformed as React component, since React now supports svg properly.

## note for 1.x.x user: transpiling is discontinued

I removed `dist` and `es` and made `lib` (which is ES2015 source) default, and there are several reason for it. For now use of ES2015 (and modules) is widespread, there are many tools supporting it (i.e. Webpack 2, Rollup), and you will use them anyway – if you are using React/etc. If you want to stay in CommonJS land, please specify deps as `1.x.x`. i.e) `svg-inline-react: 1.x.x`

## Usage

You can use [`svg-inline-loader`](https://github.com/sairion/svg-inline-loader) with [Webpack](https://webpack.github.io) to inline SVG.

Example:

```jsx
import InlineSVG from 'svg-inline-react';

// Use with loader
<InlineSVG src={require("svg-inline-loader!icon.svg")} />

// Use without loader
const svgSource = `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" preserveAspectRatio="xMidYMid" width="48" height="48" viewBox="0 0 48 48">
  <g id="artboard-1">
    <path d="m-115.8,119.6c-12.8-22-3.2,33.6-3.2,33.6,8.8,34.4,145.6-17.6,145.6-17.6s168.8-30.4,180-34.4,96.8,1.6,96.8,1.6l-4.8-22.4c-64.8-46.4-75.2-16.8-88.8-20.8s-11.2,5.6-14.4,6.4-42.4-24-48.8-23.2-31.62-23.007-16.8,8.8c22.23,47.707-60.759,37.627-75.2,28-16.8-11.2,7.2,18.4,7.2,18.4,18.4,20-16,3.2-16,3.2-34.4-12.8-58.4,12.8-61.6,13.6s-8,4-8.8-2.4-6.865-21.256-40,3.2c-33.6,24.8-44,8.8-44,8.8l-7.2-4.8z" class="cls-1"/>
  </g>
</svg>`;
<InlineSVG src={svgSource} />
```

### prop `src` : string

valid SVG element string.

### prop `element` : string

You can change element where svg included using `element` prop, default is `<i />`. But self closed tags like `img` is not allowed, and an error will be thrown from React side.

### prop `raw` : bool (experimental!)

This prop allows your svg file to be rendered directly, without a container element wraps it. This is an experimental feature. Also, the prop will be ignored on server side rendering environment.

## Notes

[inspired by](https://gist.github.com/MoOx/1eb30eac43b2114de73a)
