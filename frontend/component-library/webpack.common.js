// import required dependencies
const path = require("path");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const constants = require("./paths");
const ESLintPlugin = require("eslint-webpack-plugin");
const glob = require("glob");
const fs = require("fs");

class DeleteScssPrefixedDirectoriesPlugin {
  apply(compiler) {
    compiler.hooks.afterEmit.tap('DeleteScssPrefixedDirectoriesPlugin', (compilation) => {
      const outputPath = compiler.options.output.path;

      fs.readdir(outputPath, (err, files) => {
        if (err) {
          console.error(err);
          return;
        }

        files.forEach((file) => {
          if (file.startsWith('scss-')) {
            const dirPath = path.join(outputPath, file);
            fs.stat(dirPath, (err, stats) => {
              if (err) {
                if (err.code === 'ENOENT') {
                  // Ignore the error if the file or directory doesn't exist
                  return;
                } else {
                  console.error(err);
                  return;
                }
              }

              if (stats.isDirectory()) {
                fs.rm(dirPath, { recursive: true }, (err) => {
                  if (err) {
                    console.error(err);
                  } else {
                    // console.log(`Removed: ${dirPath}`);
                  }
                });
              }
            });
          }
        });
      });
    });
  }
}

const generateHTMLWebpackPluginPages = (hbsEntries) => {
    return hbsEntries.reduce((accumulator, hbsEntry) => {
        const componentName = hbsEntry.split("/").slice(-3)[0];
        const variationName = hbsEntry.split("/").slice(-1)[0].split(".")[0];
        const metaFile = hbsEntry.split("/").slice(0, -2).join("/") + "/meta.json";
        accumulator[variationName] = new HtmlWebpackPlugin({
            template: hbsEntry,
            filename: path.join(constants.DIST_DIR, `${componentName}`, `${variationName}.html`),
            inject: false,
        });
        return accumulator;
    }, {});
};

const globPatterns = "{atoms,molecules,organisms,templates}";

const getEntries = () => {
    const jsEntries = glob.sync(path.join(constants.SRC_DIR, globPatterns, "*", "js", "main.entry.js"));
    const scssEntries = glob.sync(path.join(constants.SRC_DIR, globPatterns, "*", "scss", "main.entry.scss"));
    const hbsEntries = glob.sync(path.join(constants.SRC_DIR, globPatterns, "*", "markup", "*.entry.hbs"));

    const jsEntriesObj = jsEntries.reduce((accumulator, jsEntry) => {
        const componentName = jsEntry.split("/").slice(-3)[0];
        accumulator[componentName] = jsEntry;
        return accumulator;
    }, {});

    const scssEntriesObj = scssEntries.reduce((accumulator, scssEntry) => {
        const componentName = scssEntry.split("/").slice(-3)[0];
        accumulator[`scss-${componentName}`] = scssEntry;
        return accumulator;
    }, {});

    const readmeEntries = glob
        .sync(path.join(constants.SRC_DIR, "*", "*", "readme.mdx"))
        .reduce((accumulator, readmeEntry) => {
            const componentName = readmeEntry.split("/").slice(-2)[0];
            accumulator.push({ from: readmeEntry, to: componentName });
            return accumulator;
        }, []);

    const metaEntries = glob.sync(path.join(constants.SRC_DIR, "*", "*", "meta.json"))
        .reduce((accumulator, metaEntry) => {
            const componentName = metaEntry.split("/").slice(-2)[0];
            accumulator.push({ from: metaEntry, to: componentName });
            return accumulator;
        }, []);

    return {
        jsEntries,
        scssEntries,
        hbsEntries,
        jsEntriesObj,
        scssEntriesObj,
        readmeEntries,
        metaEntries,
        htmlWebpackPluginPages: generateHTMLWebpackPluginPages(hbsEntries),
    };
};

const { jsEntriesObj, scssEntriesObj, htmlWebpackPluginPages, metaEntries, readmeEntries } = getEntries();

// export webpack configuration
module.exports = {
    entry: {
        ...jsEntriesObj,
        ...scssEntriesObj,
    },
    resolve: {
        alias: {
            Utils: path.resolve(__dirname, "src/utils/"),
        },
    },
    output: {
        filename: "[name]/script.js",
        path: constants.DIST_DIR,
        publicPath: process.env.PUBLIC_PATH || "/",
        clean: true,
    },
    module: {
        rules: [
            {
                // use babel to transpile JavaScript code
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: ["@babel/preset-env"],
                        plugins: ["@babel/plugin-proposal-class-properties"],
                    },
                },
            },
            {
                // use handlebars to compile HTML templates
                test: /\.hbs$/,
                use: [
                    {
                        loader: "handlebars-loader",
                    },
                ],
            },
            {
                // use CSS and Sass loaders to compile CSS stylesheets
                test: /\.(sa|sc|c)ss$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                    },
                    "css-loader",
                    "sass-loader",
                ],
            },
            {
                // use asset modules to handle text assets
                test: /\.(txt)$/,
                type: "asset/source",
            },
        ],
    },
    // configure plugins
    plugins: [
        // use eslint to lint JavaScript code
        new ESLintPlugin(),
        // extract CSS styles into separate files
        new MiniCssExtractPlugin({
            filename: ({ chunk }) => {
                return `${chunk.name.replace("scss-", "")}/style.css`; // Remove 'scss-' prefix for CSS output
            },
        }),
        new CopyWebpackPlugin({
            patterns: [...readmeEntries, ...metaEntries],
        }),
        // clean the output directory before building
        new CleanWebpackPlugin(),
        // show progress during build process
        new webpack.ProgressPlugin(),
        // generate HTML file using *.hbs files as source
        ...Object.values(htmlWebpackPluginPages),
        new DeleteScssPrefixedDirectoriesPlugin()
    ],
};
