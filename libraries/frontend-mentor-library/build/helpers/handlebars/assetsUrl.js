const process = require('process');
/**
 * returns path to assets depending on the name of the environment
 * @param {*} path
 * @param {*} resource
 * @returns
 */

module.exports = function (path, resource) {
    const BASE_URL = process.env.BASE_URL || 'http://localhost:3000';
    const ASSETS_PATH = process.env.ASSETS_PATH || `${BASE_URL}/assets`;
    return `${ASSETS_PATH}/${path}/${resource}`;
};
