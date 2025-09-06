const dotenv = require('dotenv');
dotenv.config();

const path = require('path');
const configs = require('./configs');
const loaders = require('./loaders');
const plugins = require('./plugins');
const utils = require('./utils');
const { getEntries } = utils;
const { jsEntriesObj, scssEntriesObj, metaEntries } = getEntries();
const { paths } = configs;
const cwd = process.cwd();

// export webpack configuration
module.exports = {
    entry: {
        ...jsEntriesObj,
        ...scssEntriesObj,
    },
    resolve: {
        modules: [path.join(__dirname, '../node_modules')],
        alias: {
            ScssAbstracts: path.join(cwd, 'src', '_abstracts', 'scss', 'abstracts.scss'),
        },
    },
    stats: {
        children: true,
    },
    output: {
        filename: ({ chunk }) => {
            const groupSlug = chunk.name.split('.')[0];
            const categorySlug = chunk.name.split('.')[1];
            const componentSlug = chunk.name.split('.')[2];
            const variantSlug = chunk.name.split('.')[3];
            if (variantSlug.includes('miniCssExtract')) {
                return `.miniCssExtract/${variantSlug}.js`;
            } else {
                return `${groupSlug}/${categorySlug}/${componentSlug}/${variantSlug}.js`;
            }
        },
        path: paths.DIST_DIR,
        publicPath: process.env.PUBLIC_PATH || '/',
        clean: true,
    },
    module: {
        rules: loaders,
    },
    plugins,
};
