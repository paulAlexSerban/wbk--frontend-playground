// categoryTemplate.js
// Generates HTML for a category and its components
import { generateComponentHTML } from './componentTemplate.js';

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
        .map(([categoryName, components]) =>
            components
                .filter((component) => !component.hide)
                .map((component) => generateComponentHTML(baseUrl, dir, groupName, categoryName, component))
                .join('')
        )
        .join('');
}

export {
    generateCategoryHTML,
};
