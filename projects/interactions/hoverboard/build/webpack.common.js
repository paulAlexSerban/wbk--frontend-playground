const dotenv = require('dotenv');
const path = require('path');
const fs = require('fs');

const loaders = require('./loaders');
const plugins = require('./plugins');

dotenv.config();
const cwd = process.cwd();

const publicPath = process.env.PUBLIC_PATH || '/';

const scriptsFile = path.join(cwd, 'src', 'scripts.js');
const stylesFile = path.join(cwd, 'src', 'styles.scss');

const getEntryPoints = () => {
    if (!fs.existsSync(scriptsFile)) {
        console.warn('Warning: src/scripts.js file not found. Skipping scripts entry point.');
    }

    if (!fs.existsSync(stylesFile)) {
        console.warn('Warning: src/styles.scss file not found. Skipping styles entry point.');
    }
    const entryPoints = {};
    if (fs.existsSync(scriptsFile)) {
        entryPoints.scripts = scriptsFile;
    }
    if (fs.existsSync(stylesFile)) {
        entryPoints.styles = stylesFile;
    }
    return entryPoints;
}


module.exports = {
    entry: getEntryPoints(),
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
