const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const webpack = require('webpack');

class RemoveStyleJsAssetPlugin {
    apply(compiler) {
        compiler.hooks.thisCompilation.tap('RemoveStyleJsAssetPlugin', (compilation) => {
            compilation.hooks.processAssets.tap(
                {
                    name: 'RemoveStyleJsAssetPlugin',
                    stage: compiler.webpack.Compilation.PROCESS_ASSETS_STAGE_SUMMARIZE,
                },
                (assets) => {
                    Object.keys(assets).forEach((assetName) => {
                        if (
                            assetName === 'styles.js' ||
                            (assetName.startsWith('styles.') && assetName.endsWith('.js'))
                        ) {
                            compilation.deleteAsset(assetName);
                        }
                    });
                }
            );
        });
    }
}

function createHtmlPlugin(options = {}) {
    const html = options.html || {};

    return new HtmlWebpackPlugin({
        template: html.template || 'src/index.hbs',
        filename: html.filename || 'index.html',
        inject: html.inject ?? false,
        ...(html.templateParameters ? { templateParameters: html.templateParameters } : {}),
    });
}

function createCopyPlugin(options = {}) {
    const copy = options.copy || {};
    const patterns = copy.patterns || [
        { from: 'assets', to: 'assets', noErrorOnMissing: true },
        { from: 'favicon.ico', to: 'favicon.ico', noErrorOnMissing: true },
        { from: 'manifest.json', to: 'manifest.json', noErrorOnMissing: true },
    ];

    return new CopyWebpackPlugin({ patterns });
}

function createHandlebarsWebpackPlugins(options = {}) {
    return [
        new RemoveStyleJsAssetPlugin(),
        new MiniCssExtractPlugin({
            filename: ({ chunk }) => `${chunk.name}.css`,
        }),
        new webpack.ProgressPlugin(),
        createHtmlPlugin(options),
        createCopyPlugin(options),
    ];
}

module.exports = {
    createHandlebarsWebpackPlugins,
};
