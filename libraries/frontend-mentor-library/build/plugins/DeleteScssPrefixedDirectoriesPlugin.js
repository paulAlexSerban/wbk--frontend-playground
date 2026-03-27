const fs = require('fs');
const path = require('path');

class DeleteScssPrefixedDirectoriesPlugin {
    apply(compiler) {
        compiler.hooks.done.tap('DeleteScssPrefixedDirectoriesPlugin', (stats) => {
            const outputPath = compiler.options.output.path;

            // Use setTimeout to ensure this runs after webpack is completely done
            setTimeout(() => {
                fs.readdir(outputPath, (err, files) => {
                    if (err) {
                        console.error(err);
                        return;
                    }

                    files.forEach((file) => {
                        if (file.startsWith('cssExtract')) {
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
            }, 100);
        });
    }
}

module.exports = DeleteScssPrefixedDirectoriesPlugin;
