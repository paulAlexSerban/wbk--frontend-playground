const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');
const TerserPlugin = require('terser-webpack-plugin');

const NODE_ENV = process.env.NODE_ENV || 'production';

module.exports = (env) =>
    merge(common, {
        mode: NODE_ENV,
        module: {
            rules: [
                {
                    test: /\.(png|jpg|svg)$/,
                    type: 'asset',
                    parser: {
                        dataUrlCondition: {
                            maxSize: 3 * 1024, // 3 kilobytes
                        },
                    },
                    generator: {
                        filename: './images/[name][contenthash:12][ext]',
                    },
                },
            ],
        },
        plugins: [
            new TerserPlugin({
                parallel: true,
                terserOptions: {
                    ecma: 5,
                    compress: { warnings: false },
                    output: { comments: false },
                },
            }),
        ],
    });
