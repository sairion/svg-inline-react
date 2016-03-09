module.exports = function(config) {
    var conf = {
        basePath: '.',
        files: [
            './test/test.js',
        ],
        exclude: [],
        frameworks: ['mocha'],
        preprocessors: {
            './test/**/*.js': ['webpack'],
        },
        port: 9876,
        colors: true,
        logLevel: config.LOG_DEBUG,
        browsers: ['Chrome'],
        browserNoActivityTimeout: 1000000,
        plugins: [
            'karma-spec-reporter',
            'karma-mocha',
            'karma-chrome-launcher',
            'karma-webpack',
        ],
        webpack: {
            cache: true,
            debug: true,
            devtool: 'inline-source-map',
            entry: [
                './dist/index.js'
            ],
            module: {
                loaders: [
                    {
                        test: /\.js$/,
                        loader: 'babel',
                    },
                    {
                        test: /\.svg$/,
                        loader: 'svg-inline',
                    },
                ]
            }
        },
        autoWatch: true,
        singleRun: false
    };

    config.set(conf);
};
