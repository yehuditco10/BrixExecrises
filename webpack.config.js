const path = require('path');

module.exports = {
    entry: {
        index: './src/index.js',
        promise: './src/promise.js'
    },
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname,'dist')
        // filename: 'bundle.js',
        // path: path.resolve(__dirname)
    },
    module: {
        rules: [
            // {
            //     enforce: 'pre',
            //     test: /\.js$/,
            //     exclude: /node_modules|sortable/,
            //     loader: 'eslint-loader'
            // }

        ]
    },
    mode: 'development',
    devtool: 'eval-source-map',
    
};
