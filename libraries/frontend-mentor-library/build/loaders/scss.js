const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const BASE_URL = process.env.BASE_URL || 'http://localhost:3000';
const ASSETS_PATH = process.env.ASSETS_PATH || `${BASE_URL}/assets`;

const scss = {
    // use CSS and Sass loaders to compile CSS stylesheets
    test: /\.(sa|sc|c)ss$/,
    use: [
        MiniCssExtractPlugin.loader,
        'css-loader',
        {
            loader: 'sass-loader',
            options: {
                // Prefer `dart-sass`
                implementation: require('sass'),
                additionalData: `$assetsPath: '${ASSETS_PATH}';`,
            },
        },
    ],
};

module.exports = scss;
