const path = require('path');

function resolveFromCwd(cwd, targetPath) {
    if (!targetPath) {
        return targetPath;
    }
    return path.isAbsolute(targetPath) ? targetPath : path.join(cwd, targetPath);
}

function asArray(value) {
    if (!value) {
        return [];
    }
    return Array.isArray(value) ? value : [value];
}

module.exports = {
    resolveFromCwd,
    asArray,
};
