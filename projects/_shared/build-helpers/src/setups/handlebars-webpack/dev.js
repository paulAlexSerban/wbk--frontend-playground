const { merge } = require('webpack-merge');

const { createHandlebarsWebpackCommonConfig } = require('./common');

function createHandlebarsWebpackDevConfig(options = {}) {
    const nodeEnv = process.env.NODE_ENV || 'production';
    const commonConfig = createHandlebarsWebpackCommonConfig(options);

    const devDefaults = {
        mode: nodeEnv,
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
    };

    return merge(commonConfig, devDefaults, options.dev?.merge || {});
}

module.exports = {
    createHandlebarsWebpackDevConfig,
};
