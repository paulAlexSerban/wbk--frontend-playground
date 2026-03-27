// dashboard/utils/index.js
// Utility functions for loading component data from packaged library directories

import fs from 'fs';
import path from 'path';

async function readComponentList(filePath) {
    try {
        const content = await fs.promises.readFile(filePath, 'utf-8');
        return JSON.parse(content);
    } catch (err) {
        if (err.code === 'ENOENT') {
            return null;
        }
        throw err;
    }
}

async function readPackagedLibraries(sourceDir) {
    const entries = await fs.promises.readdir(sourceDir, { withFileTypes: true });
    const dirs = entries.filter((entry) => entry.isDirectory());
    const result = {};

    await Promise.all(
        dirs.map(async (entry) => {
            const listPath = path.join(sourceDir, entry.name, 'componentList.json');
            const componentList = await readComponentList(listPath);
            if (componentList) {
                result[entry.name] = componentList;
            }
        })
    );

    return result;
}

async function readLibraryDistFallback(sourceDir) {
    // sourceDir points to <project>/package/libraries, so move back to project root
    const projectRoot = path.resolve(sourceDir, '..', '..');
    const librariesDir = path.join(projectRoot, 'libraries');
    const entries = await fs.promises.readdir(librariesDir, { withFileTypes: true });
    const dirs = entries.filter((entry) => entry.isDirectory());
    const result = {};

    await Promise.all(
        dirs.map(async (entry) => {
            const listPath = path.join(librariesDir, entry.name, 'dist', 'componentList.json');
            const componentList = await readComponentList(listPath);
            if (componentList) {
                result[entry.name] = componentList;
            }
        })
    );

    return result;
}

/**
 * Processes library directories under sourceDir.
 * Reads componentList.json from each subdirectory.
 * @param {string} sourceDir - Path to the libraries root (e.g. package/libraries/)
 * @returns {Promise<Object>} { [dirName]: [component, ...] }
 */
async function processDirectories(sourceDir) {
    try {
        const packagedResult = await readPackagedLibraries(sourceDir);
        if (Object.keys(packagedResult).length > 0) {
            return packagedResult;
        }

        const fallbackResult = await readLibraryDistFallback(sourceDir);
        if (Object.keys(fallbackResult).length > 0) {
            return fallbackResult;
        }

        console.warn('No componentList.json found in package/libraries or libraries/*/dist.');
        return {};
    } catch (err) {
        if (err.code === 'ENOENT') {
            try {
                const fallbackResult = await readLibraryDistFallback(sourceDir);
                if (Object.keys(fallbackResult).length > 0) {
                    return fallbackResult;
                }
            } catch (fallbackErr) {
                if (fallbackErr.code !== 'ENOENT') {
                    throw fallbackErr;
                }
            }

            console.warn(`Source directory not found: ${sourceDir}`);
            console.warn('Fallback libraries/*/dist also not found or empty.');
            return {};
        }
        throw err;
    }
}

/**
 * Transforms a flat array of component objects into a nested structure
 * grouped by group → category.
 * @param {Array} components - Array of component metadata objects
 * @returns {Object} { [group]: { [category]: [component, ...] } }
 */
function transformArrayToObj(components) {
    return components.reduce((acc, component) => {
        const { group, category } = component;
        if (!acc[group]) acc[group] = {};
        if (!acc[group][category]) acc[group][category] = [];
        acc[group][category].push(component);
        return acc;
    }, {});
}

export default {
    processDirectories,
    transformArrayToObj,
};
