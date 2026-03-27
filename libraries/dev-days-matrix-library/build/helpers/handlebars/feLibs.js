const process = require('process');
const projectName = require('../../../package.json').name;

function normalizeRootPath(value) {
    const raw = String(value || '/wbk--frontend-playground').trim();
    if (!raw || raw === '/') {
        return '';
    }

    return `/${raw.replace(/^\/+|\/+$/g, '')}`;
}

function toAbsoluteUrl(pathname) {
    const baseUrl = String(process.env.BASE_URL || '').replace(/\/+$/g, '');
    return baseUrl ? `${baseUrl}${pathname}` : pathname;
}

function buildAbsoluteLibraryPath(...segments) {
    const repositoryRoot = normalizeRootPath(process.env.REPOSITORY_ROOT_PATH);
    const libraryRoot = `${repositoryRoot}/libraries/${projectName}`;
    return toAbsoluteUrl(`${libraryRoot}/${segments.join('/')}`);
}

module.exports = function (group, category, name, variation, type) {
    const path = buildAbsoluteLibraryPath(group, category, name, variation);
    const feLibs = {
        css: `<link rel="stylesheet" href="${path}.css">`,
        js: `<script src="${path}.js" defer></script>`,
        all: `<link rel="stylesheet" href="${path}.css">
             <script src="${path}.js" defer></script>`,
    };

    return feLibs[type];
};
