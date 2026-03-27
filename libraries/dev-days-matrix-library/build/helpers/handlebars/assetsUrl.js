/**
 * returns path to assets depending on the name of the environment
 * @param {*} path
 * @param {*} resource
 * @returns
 */

const process = require('process');

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

module.exports = function (path, resource) {
    const repositoryRoot = normalizeRootPath(process.env.REPOSITORY_ROOT_PATH);
    return toAbsoluteUrl(`${repositoryRoot}/assets/${path}/${resource}`);
};
