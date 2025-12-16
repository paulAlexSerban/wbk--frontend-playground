// dataLoader.js
// Handles loading and transforming component data for the dashboard

const utils = require('../utils');
const path = require('path');

/**
 * Loads and transforms all component data from the source directory.
 * @param {string} sourceDir - Absolute path to the libraries directory
 * @returns {Promise<Array<Object>>} Array of transformed component lists by directory
 */
async function loadComponentData(sourceDir) {
    const componentLists = await utils.processDirectories(sourceDir);
    return Object.entries(componentLists).map(([dir, components]) => ({
        [dir]: utils.transformArrayToObj(components),
    }));
}

module.exports = {
    loadComponentData,
};
