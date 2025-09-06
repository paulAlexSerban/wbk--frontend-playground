// categoryTemplate.js
// Generates HTML for a category and its components
const { generateComponentHTML } = require('./componentTemplate');
const utils = require('../../utils');

/**
 * Generate HTML for a category and its components.
 * @param {string} baseUrl
 * @param {string} dir
 * @param {string} groupName
 * @param {object} categoryContent
 * @returns {string}
 */
function generateCategoryHTML(baseUrl, dir, groupName, categoryContent) {
    return Object.entries(categoryContent)
        .map(
            ([categoryName, components]) => `
                ${components
                    .map((component) => {
                        if (!component.hide) {
                            return generateComponentHTML(baseUrl, dir, groupName, categoryName, component);
                        }
                        return '';
                    })
                    .join('')}
            `
        )
        .join('');
}

module.exports = {
    generateCategoryHTML,
};
