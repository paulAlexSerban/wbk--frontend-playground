
const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');


const NODE_ENV = process.env.NODE_ENV || 'production';

module.exports = (env) =>
    merge(common, {
        mode: NODE_ENV,

        watchOptions: {
            ignored: /node_modules/,
        },
        stats: {
            assets: false,
            cachedModules: false,
            cachedAssets: false,
            chunks: false,
            colors: true,
            depth: false,
            entrypoints: false,
        },
        module: {
            rules: [
                {
                    test: /\.(png|jpg|svg)$/,
                    type: 'asset',
                    parser: {
                        dataUrlCondition: {
                            maxSize: 10 * 1024,
                        },
                    },
                    generator: {
                        filename: './images/[name][ext]',
                    },
                },
            ],
        },
    });
