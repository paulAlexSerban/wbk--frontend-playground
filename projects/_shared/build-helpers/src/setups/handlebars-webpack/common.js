const dotenv = require('dotenv');
const path = require('path');

const { createHandlebarsWebpackLoaders } = require('./loaders');
const { createHandlebarsWebpackPlugins } = require('./plugins');
const { resolveEntry } = require('./entries');

function createHandlebarsWebpackCommonConfig(options = {}) {
    dotenv.config();

    const cwd = options.cwd || process.cwd();
    const publicPath = options.publicPath || process.env.PUBLIC_PATH || '/';

    return {
        entry: resolveEntry({
            cwd,
            entry: options.entry,
            entryResolver: options.entryResolver,
        }),
        resolve: {
            modules: [path.join(cwd, 'node_modules'), 'node_modules'],
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
            filename: ({ chunk }) => `${chunk.name}.js`,
            path: path.join(cwd, 'dist'),
            publicPath,
            clean: true,
        },
        module: {
            rules: createHandlebarsWebpackLoaders({
                cwd,
                handlebars: options.handlebars,
            }),
        },
        plugins: createHandlebarsWebpackPlugins({
            html: options.html,
            copy: options.copy,
        }),
    };
}

module.exports = {
    createHandlebarsWebpackCommonConfig,
};
