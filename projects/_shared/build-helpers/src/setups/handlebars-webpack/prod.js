const { merge } = require('webpack-merge');
const TerserPlugin = require('terser-webpack-plugin');

const { createHandlebarsWebpackCommonConfig } = require('./common');

function createHandlebarsWebpackProdConfig(options = {}) {
    const nodeEnv = process.env.NODE_ENV || 'production';
    const commonConfig = createHandlebarsWebpackCommonConfig(options);

    const prodDefaults = {
        mode: nodeEnv,
        module: {
            rules: [
                {
                    test: /\.(png|jpg|svg)$/,
                    type: 'asset',
                    parser: {
                        dataUrlCondition: {
                            maxSize: 3 * 1024,
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
    };

    return merge(commonConfig, prodDefaults, options.prod?.merge || {});
}

module.exports = {
    createHandlebarsWebpackProdConfig,
};
