// libraryTemplate.js
// Generates HTML for a library and its groups
import { generateGroupHTML } from './groupTemplate.js';
import utils from '../../utils/index.js';

/**
 * Generate HTML for a library and its groups.
 * @param {object} library
 * @param {string} baseUrl
 * @returns {string}
 */
function generateLibraryHTML(library, baseUrl) {
    // filter library content but maintain object format
    const filteredLibrary = Object.entries(library).reduce((acc, [dir, groups]) => {
        const filteredGroups = Object.entries(groups).reduce((acc, [groupName, categories]) => {
            const filteredCategories = Object.entries(categories).reduce((acc, [categoryName, components]) => {
                const filteredComponents = components.filter((component) => !component.hide);
                if (filteredComponents.length) {
                    acc[categoryName] = filteredComponents;
                }
                return acc;
            }, {});
            if (Object.keys(filteredCategories).length) {
                acc[groupName] = filteredCategories;
            }
            return acc;
        }, {});
        if (Object.keys(filteredGroups).length) {
            acc[dir] = filteredGroups;
        }
        return acc;
    }, {});
    return Object.entries(filteredLibrary)
        .map(
            ([dir, groups]) => `
                ${generateGroupHTML(baseUrl, dir, groups)}
            `
        )
        .join('');
}

export {
    generateLibraryHTML,
};
