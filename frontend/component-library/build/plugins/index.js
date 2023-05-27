const ESLintPlugin = require("eslint-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const webpack = require("webpack");
const DeleteScssPrefixedDirectoriesPlugin = require("./DeleteScssPrefixedDirectoriesPlugin");
const utils = require("../utils");
const { getEntries } = utils;
const { htmlWebpackPluginPages, metaEntries, readmeEntries,assetsEntries } = getEntries();


const plugins = [
    // use eslint to lint JavaScript code
    new ESLintPlugin(),
    // extract CSS styles into separate files
    new MiniCssExtractPlugin({
        filename: (all) => {
            const categorySlug = all.chunk.name.split(".")[0];
            const componentSlug = all.chunk.name.split(".")[1];
            const variantSlug = all.chunk.name.split(".")[2].split('-').splice(1).join('-');
            return `${categorySlug}/${componentSlug}/${variantSlug}.css`;
        },
    }),
    new CopyWebpackPlugin({
        patterns: [...readmeEntries, ...metaEntries, ...assetsEntries],
    }),
    // clean the output directory before building
    new CleanWebpackPlugin(),
    // show progress during build process
    new webpack.ProgressPlugin(),
    // generate HTML file using *.hbs files as source
    ...Object.values(htmlWebpackPluginPages),
    new DeleteScssPrefixedDirectoriesPlugin(),
];

module.exports = plugins;