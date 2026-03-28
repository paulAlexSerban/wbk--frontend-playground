const dotenv = require('dotenv');
const path = require('path');

const loaders = require('./loaders');
const plugins = require('./plugins');

dotenv.config();
const cwd = process.cwd();

const publicPath = process.env.PUBLIC_PATH || '/';

module.exports = {
    entry: {
        "scripts": path.join(cwd, 'src', 'scripts.js'),
        "styles": path.join(cwd, 'src', 'styles.scss'),
    },
    resolve: {
        modules: [path.join(__dirname, '../node_modules')],
    },
    stats: {
        children: false,
        modules: false,
        chunks: false,
        chunkModules: false,
        chunkOrigins: false,
        entrypoints: false,
        assets: true,
        errors: true,
        warnings: true,
        colors: true,
        performance: false,
        timings: true,
        builtAt: true,
        hash: false,
        version: false,
    },
    output: {
        filename: ({ chunk }) => {
            return `${chunk.name}.js`;
        },
        path: path.join(cwd, 'dist'),
        publicPath,
        clean: true,
    },
    module: {
        rules: loaders,
    },
    plugins,
};
