const fs = require('fs');
const path = require('path');

class MergeJsonWebpackPlugin {
    constructor(options) {
        this.options = options;
    }

    apply(compiler) {
        compiler.hooks.thisCompilation.tap('MergeJsonWebpackPlugin', (compilation) => {
            compilation.hooks.processAssets.tapAsync(
                {
                    name: 'MergeJsonWebpackPlugin',
                    stage: compilation.PROCESS_ASSETS_STAGE_ADDITIONAL,
                },
                (assets, callback) => {
                    const mergedData = this.options.files.reduce((acc, file) => {
                        const filePath = path.resolve(__dirname, file);
                        if (fs.existsSync(filePath)) {
                            const fileData = JSON.parse(fs.readFileSync(filePath));
                            acc.push(fileData);
                        }
                        return acc;
                    }, []);

                    const mergedDataJson = JSON.stringify(mergedData, null, 2);

                    // Use webpack 5's modern asset emission
                    compilation.emitAsset(this.options.output, {
                        source: () => mergedDataJson,
                        size: () => mergedDataJson.length,
                    });

                    callback();
                }
            );
        });
    }
}

module.exports = MergeJsonWebpackPlugin;
