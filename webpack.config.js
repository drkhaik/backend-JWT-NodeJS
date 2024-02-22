const path = require('path');

module.exports = {
    entry: './src/server.js',
    output: {
        path: path.join(__dirname, '/dist'),
        filename: 'bundle.js',
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: 'babel-loader',
            },
            {
                test: /\.(?:ico|gif|png|jpg|jpeg)$/i,
                exclude: /public/,
            }
        ],
    },
};