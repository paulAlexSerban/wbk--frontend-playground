const fs = require('fs');
const path = require('path');

// split string by - and capitalize each word in the string then join them back together
const capitalize = (str) => {
    return str
        .split('-')
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
};

const transformArrayToObj = (arr) => {
    // Create a result object instead of an array
    let result = {};

    // Iterate over the input array
    arr.forEach((item) => {
        // Find or create the group in the result object
        if (!result[item.group]) {
            result[item.group] = {};
        }

        // Find or create the category in the group
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

        // Add the component to the category
        result[item.group][item.category].push(itemObj);
    });

    return result;
};

const readJsonFile = async (filePath) => {
    try {
        const jsonContent = await fs.promises.readFile(filePath, 'utf8');
        return JSON.parse(jsonContent);
    } catch (err) {
        console.error('Error reading the JSON file:', err);
        return null;
    }
};

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
