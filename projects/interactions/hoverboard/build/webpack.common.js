const fs = require('fs');
const path = require('path');

const { createHandlebarsWebpackCommonConfig } = require('@wbk-frontend-forge/_shared__build-helpers');

const manifestPath = path.resolve(process.cwd(), 'manifest.json');

function getManifestData() {
    try {
        return JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
    } catch (error) {
        console.warn(`Could not load manifest.json from ${manifestPath}: ${error.message}`);
        return {};
    }
}

module.exports = createHandlebarsWebpackCommonConfig({
    html: {
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
    },
});
