const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { resolveFromCwd, asArray } = require('../../internal/paths');

function createBabelLoader() {
    return {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
            loader: 'babel-loader',
            options: {
                presets: ['@babel/preset-env'],
            },
        },
    };
}

function createHandlebarsLoader(options = {}) {
    const cwd = options.cwd || process.cwd();
    const handlebarsOptions = options.handlebars || {};

    const helperDirs = asArray(handlebarsOptions.helperDirs || ['build/helpers/handlebars']).map((dirPath) =>
        resolveFromCwd(cwd, dirPath)
    );

    const partialDirs = asArray(handlebarsOptions.partialDirs || ['src/library', 'src/system']).map((dirPath) =>
        resolveFromCwd(cwd, dirPath)
    );

    return {
        test: /\.hbs$/,
        use: [
            {
                loader: 'handlebars-loader',
                options: {
                    knownHelpersOnly: false,
                    ...handlebarsOptions,
                    helperDirs,
                    partialDirs,
                },
            },
        ],
    };
}

function createScssLoader() {
    const baseUrl = process.env.BASE_URL || 'http://localhost:3000';
    const assetsPath = process.env.ASSETS_PATH || `${baseUrl}/assets`;

    return {
        test: /\.(sa|sc|c)ss$/,
        use: [
            MiniCssExtractPlugin.loader,
            'css-loader',
            {
                loader: 'sass-loader',
                options: {
                    implementation: require('sass'),
                    additionalData: `$assetsPath: '${assetsPath}';`,
                },
            },
        ],
    };
}

function createAssetsLoader() {
    return {
        test: /\.(txt|png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
    };
}

function createHandlebarsWebpackLoaders(options = {}) {
    return [createBabelLoader(), createHandlebarsLoader(options), createScssLoader(), createAssetsLoader()];
}

module.exports = {
    createHandlebarsWebpackLoaders,
};
