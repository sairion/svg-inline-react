module.exports = {
    cache: true,
    debug: true,
    devtool: 'cheap-module-hidden-source-map',
    entry: [
        './lib/index.js'
    ],
    output: {
        filename: './dist/index.js',
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
            },
            {
                test: /\.svg$/,
                loader: 'svg-inline-loader',
            },
        ]
    }
}
