// dataLoader.js
// Handles loading and transforming component data for the dashboard

import utils from '../utils/index.js';
import path from 'path';

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

export {
    loadComponentData,
};
