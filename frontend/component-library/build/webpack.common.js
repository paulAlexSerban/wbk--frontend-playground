// import required dependencies
const path = require("path");
const configs = require("./configs");
const plugins = require("./plugins");
const utils = require("./utils");
const { getEntries } = utils;
const { jsEntriesObj, scssEntriesObj } = getEntries();
const { paths, tasks } = configs;

const cwd = process.cwd();

// export webpack configuration
module.exports = {
    entry: {
        ...jsEntriesObj,
        ...scssEntriesObj,
    },
    resolve: {
        modules: [path.join(__dirname, "../node_modules")],
        alias: {
            ScssAbstracts: path.join(cwd, "src", "_commons", "scss", "_01_abstracts", "abstracts.scss"),
        }
    },
    output: {
        filename: ({ chunk }) => {
                const categorySlug = chunk.name.split(".")[0];
                const componentSlug = chunk.name.split(".")[1];
                const variantSlug = chunk.name.split(".")[2];
                if(variantSlug.includes('miniCssExtract')) {
                    return `.miniCssExtract/${variantSlug}.js`;
                } else {
                    return `${categorySlug}/${componentSlug}/${variantSlug}.js`;
                }

        },
        path: paths.DIST_DIR,
        publicPath: process.env.PUBLIC_PATH || "/",
        clean: true,
    },
    module: {
        rules: tasks,
    },
    plugins,
};
