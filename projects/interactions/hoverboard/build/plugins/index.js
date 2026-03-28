
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const webpack = require('webpack');
const fs = require('fs');
const path = require('path');

const NODE_ENV = process.env.NODE_ENV || 'development';
const manifestPath = path.resolve(process.cwd(), 'manifest.json');

const getManifestData = () => {
    try {
        return JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
    } catch (error) {
        console.warn(`Could not load manifest.json from ${manifestPath}: ${error.message}`);
        return {};
    }
};

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
        templateParameters: (compilation, assets, assetTags, options) => ({
            compilation,
            webpackConfig: compilation.options,
            htmlWebpackPlugin: {
                tags: assetTags,
                files: assets,
                options,
            },
            manifest: getManifestData(),
        }),
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
