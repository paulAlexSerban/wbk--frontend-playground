
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const webpack = require('webpack');

const NODE_ENV = process.env.NODE_ENV || 'development';

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
                        if (assetName === 'styles.js' || assetName.startsWith('styles.') && assetName.endsWith('.js')) {
                            compilation.deleteAsset(assetName);
                        }
                    });
                }
            );
        });
    }
}

const plugins = [
    new RemoveStyleJsAssetPlugin(),
    new MiniCssExtractPlugin({
        filename: (all) => {
            return `${all.chunk.name}.css`;
        },
    }),
    new webpack.ProgressPlugin(),
    new HtmlWebpackPlugin({
        template: 'src/index.hbs',
        filename: 'index.html',
        inject: false,
    }),
    new CopyWebpackPlugin({
        patterns: [
            { from: 'assets', to: 'assets', noErrorOnMissing: true },
            { from: 'favicon.ico', to: 'favicon.ico', noErrorOnMissing: true },
            { from: 'manifest.json', to: 'manifest.json', noErrorOnMissing: true }
        ],
    }),
];

if (NODE_ENV !== 'production') {
    // no extra plugins for development
}

module.exports = plugins;
