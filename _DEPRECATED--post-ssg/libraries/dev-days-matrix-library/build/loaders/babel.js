const babel = {
    // use babel to transpile JavaScript code
    test: /\.js$/,
    exclude: /node_modules/,
    use: {
        loader: 'babel-loader',
        options: {
            presets: ['@babel/preset-env'],
            plugins: ['@babel/plugin-proposal-class-properties'],
        },
    },
};

module.exports = babel;
