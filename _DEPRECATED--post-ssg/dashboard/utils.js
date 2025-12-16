const fs = require('fs');
const path = require('path');

/**
 * Split string by '-' and capitalize each word, then join them back together.
 * @param {string} str
 * @returns {string}
 */
const capitalize = (str) => {
    return str
        .split('-')
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
};

/**
 * Transform an array of components into a grouped object by group and category.
 * @param {Array} arr
 * @returns {Object}
 */
const transformArrayToObj = (arr) => {
    let result = {};
    arr.forEach((item) => {
        if (!result[item.group]) {
            result[item.group] = {};
        }
        if (!result[item.group][item.category]) {
            result[item.group][item.category] = [];
        }
        const itemObj = {
            name: item.name,
            version: item.version,
            component: item.component,
            variations: item.variations,
        };
        if (item.hide) {
            itemObj.hide = item.hide;
        }
        result[item.group][item.category].push(itemObj);
    });
    return result;
};

/**
 * Read and parse a JSON file asynchronously.
 * @param {string} filePath
 * @returns {Promise<Object|null>}
 */
const readJsonFile = async (filePath) => {
    try {
        const jsonContent = await fs.promises.readFile(filePath, 'utf8');
        return JSON.parse(jsonContent);
    } catch (err) {
        console.error('Error reading the JSON file:', err);
        return null;
    }
};

/**
 * Process directories and read all JSON files in each subdirectory.
 * @param {string} source
 * @returns {Promise<Object>}
 */
const processDirectories = async (source) => {
    const componentLists = {};
    try {
        const files = await fs.promises.readdir(source);
        for (const file of files) {
            const dirPath = path.join(source, file);
            const stats = await fs.promises.stat(dirPath);
            if (stats.isDirectory()) {
                const jsonFiles = (await fs.promises.readdir(dirPath)).filter(
                    (f) => path.extname(f).toLowerCase() === '.json'
                );
                for (const jsonFile of jsonFiles) {
                    const filePath = path.join(dirPath, jsonFile);
                    const obj = await readJsonFile(filePath);
                    if (obj) {
                        componentLists[file] = obj;
                    }
                }
            }
        }
    } catch (err) {
        console.error('Error reading the directory:', err);
    }
    return componentLists;
};

module.exports = {
    capitalize,
    transformArrayToObj,
    readJsonFile,
    processDirectories,
};
