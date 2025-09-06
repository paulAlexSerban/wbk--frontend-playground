// libraryTemplate.js
// Generates HTML for a library and its groups
const { generateGroupHTML } = require('./groupTemplate');
const utils = require('../../utils');

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
                <section>
                    <h2 class="px-2 row bg-secondary text-light">${utils.capitalize(dir)}</h2>
                        ${generateGroupHTML(baseUrl, dir, groups)}
                </section>
            `
        )
        .join('');
}

module.exports = {
    generateLibraryHTML,
};
