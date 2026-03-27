// libraryTemplate.js
// Generates HTML for a library and its groups
import { generateGroupHTML } from './groupTemplate.js';

function filterVisibleComponents(categories) {
    return Object.entries(categories).reduce((acc, [categoryName, components]) => {
        const visibleComponents = components.filter((component) => !component.hide);
        if (visibleComponents.length > 0) {
            acc[categoryName] = visibleComponents;
        }
        return acc;
    }, {});
}

function filterVisibleGroups(groups) {
    return Object.entries(groups).reduce((acc, [groupName, categories]) => {
        const visibleCategories = filterVisibleComponents(categories);
        if (Object.keys(visibleCategories).length > 0) {
            acc[groupName] = visibleCategories;
        }
        return acc;
    }, {});
}

function filterVisibleLibrary(library) {
    return Object.entries(library).reduce((acc, [dir, groups]) => {
        const visibleGroups = filterVisibleGroups(groups);
        if (Object.keys(visibleGroups).length > 0) {
            acc[dir] = visibleGroups;
        }
        return acc;
    }, {});
}

/**
 * Generate HTML for a library and its groups.
 * @param {object} library
 * @param {string} baseUrl
 * @returns {string}
 */
function generateLibraryHTML(library, baseUrl) {
    const filteredLibrary = filterVisibleLibrary(library);

    return Object.entries(filteredLibrary)
        .map(([dir, groups]) => generateGroupHTML(baseUrl, dir, groups))
        .join('');
}

export {
    generateLibraryHTML,
};
